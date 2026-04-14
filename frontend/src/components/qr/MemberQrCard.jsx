import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import Button from '../common/Button';
import Card from '../common/Card';

export default function MemberQrCard({ member, qrPayload }) {
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    if (!qrPayload) return;
    QRCode.toDataURL(qrPayload, {
      width: 280,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    }).then(setQrUrl);
  }, [qrPayload]);

  const downloadQr = () => {
    if (!qrUrl) return;
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `${member.member_code}-qr.png`;
    link.click();
  };

  const printQr = () => {
    if (!qrUrl) return;
    const popup = window.open('', '_blank', 'width=420,height=560');
    if (!popup) return;
    popup.document.write(`
      <html>
        <head><title>${member.full_name} QR Card</title></head>
        <body style="font-family: Arial, sans-serif; padding: 24px; text-align: center;">
          <h2 style="margin-bottom: 8px;">${member.full_name}</h2>
          <p style="margin-top: 0; color: #475569;">${member.member_code}</p>
          <img src="${qrUrl}" style="width: 280px; height: 280px;" />
          <p style="margin-top: 16px; color: #64748b;">Scan to record attendance</p>
        </body>
      </html>
    `);
    popup.document.close();
    popup.focus();
    popup.print();
  };

  return (
    <Card className="border-sky-100 bg-[linear-gradient(180deg,#ffffff_0%,#f4fbff_100%)]">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700/70">Member QR Card</p>
          <h3 className="mt-3 text-2xl font-bold text-slate-900">{member.full_name}</h3>
          <p className="mt-1 text-sm text-slate-500">{member.member_code}</p>
          <p className="mt-4 text-sm text-slate-600">Use this secure QR for gym attendance. It contains the member code and a protected token.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="secondary" onClick={printQr}>Print QR Card</Button>
            <Button onClick={downloadQr}>Download QR</Button>
          </div>
        </div>
        <div className="mx-auto rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          {qrUrl ? <img src={qrUrl} alt={`${member.full_name} QR`} className="h-64 w-64 object-contain" /> : <div className="flex h-64 w-64 items-center justify-center text-sm text-slate-500">Generating QR...</div>}
        </div>
      </div>
    </Card>
  );
}
