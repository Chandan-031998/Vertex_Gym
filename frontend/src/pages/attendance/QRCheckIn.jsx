import { useContext, useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { NotificationContext } from '../../context/NotificationContext';
import { getAttendance, processQrAttendance } from '../../services/attendanceService';
import { formatDate } from '../../utils/formatDate';

export default function QRCheckIn() {
  const scannerRef = useRef(null);
  const containerId = 'vertex-qr-scanner';
  const [manualPayload, setManualPayload] = useState('');
  const [recentRows, setRecentRows] = useState([]);
  const [loadingRows, setLoadingRows] = useState(true);
  const [scannerReady, setScannerReady] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { notify } = useContext(NotificationContext);

  const loadAttendance = async () => {
    setLoadingRows(true);
    try {
      const response = await getAttendance();
      setRecentRows((response.data || []).slice(0, 8));
    } finally {
      setLoadingRows(false);
    }
  };

  const submitPayload = async (qr_payload) => {
    if (!qr_payload || processing) return;
    try {
      setProcessing(true);
      const response = await processQrAttendance({ qr_payload });
      const actionLabel = response.data.action === 'check_out' ? 'checked out' : 'checked in';
      notify(`${response.data.member_name} ${actionLabel} at ${new Date(response.data.timestamp).toLocaleTimeString()}`);
      setManualPayload('');
      await loadAttendance();
    } catch (error) {
      notify(error?.response?.data?.message || 'QR scan failed', 'error');
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  useEffect(() => {
    let mounted = true;
    const qrScanner = new Html5Qrcode(containerId);
    scannerRef.current = qrScanner;

    qrScanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 220, height: 220 } },
      async (decodedText) => {
        if (!mounted) return;
        await submitPayload(decodedText);
      },
      () => {}
    )
      .then(() => mounted && setScannerReady(true))
      .catch(() => {
        if (mounted) {
          setScannerReady(false);
          notify('Camera access unavailable. Use manual QR payload input.', 'error');
        }
      });

    return () => {
      mounted = false;
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(() => {});
      }
      scannerRef.current?.clear().catch(() => {});
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-950">QR Check-In</h2>
          <p className="mt-2 text-sm text-slate-500">Scan member QR cards to mark check-in or checkout automatically.</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card title="Live Scanner">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div id={containerId} className="mx-auto min-h-[320px] max-w-md" />
              </div>
              <p className="text-sm text-slate-500">
                {scannerReady ? 'Scanner is active. Present a member QR to the camera.' : 'Scanner is preparing or camera access is blocked.'}
              </p>
            </div>
          </Card>

          <Card title="Manual QR Payload">
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                submitPayload(manualPayload);
              }}
            >
              <Input
                value={manualPayload}
                onChange={(event) => setManualPayload(event.target.value)}
                placeholder="Paste scanned QR payload"
              />
              <Button type="submit" className="w-full">{processing ? 'Processing...' : 'Submit QR Payload'}</Button>
            </form>
          </Card>
        </div>

        <Card title="Recent QR Attendance">
          {loadingRows ? <Loader label="Refreshing attendance" /> : (
            <Table
              columns={[
                { key: 'member_code', label: 'Code' },
                { key: 'member_name', label: 'Member' },
                { key: 'entry_type', label: 'Entry Type' },
                { key: 'check_in_time', label: 'Check In', render: (row) => formatDate(row.check_in_time) },
                { key: 'check_out_time', label: 'Check Out', render: (row) => formatDate(row.check_out_time) }
              ]}
              rows={recentRows}
            />
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
