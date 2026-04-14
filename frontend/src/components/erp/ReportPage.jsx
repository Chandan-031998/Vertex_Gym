import { useContext, useEffect, useState } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';
import Loader from '../common/Loader';
import Table from '../common/Table';
import StatCard from '../ui/StatCard';
import { NotificationContext } from '../../context/NotificationContext';
import { exportExcel } from '../../utils/exportExcel';
import { exportPDF } from '../../utils/exportPDF';

export default function ReportPage({ title, description, fetcher, columns }) {
  const { notify } = useContext(NotificationContext);
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState({ rows: [], summary: {} });

  useEffect(() => {
    fetcher()
      .then((response) => {
        const payload = response.data;
        setReport(Array.isArray(payload) ? { rows: payload, summary: {} } : payload);
      })
      .catch((error) => notify(error?.response?.data?.message || 'Unable to load report', 'error'))
      .finally(() => setLoading(false));
  }, [fetcher]);

  const stats = Object.entries(report.summary || {});

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-950">{title}</h2>
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => exportExcel(report.rows, title)}>Export Excel</Button>
          <Button variant="secondary" onClick={() => exportPDF(title)}>Export PDF</Button>
        </div>
      </div>

      {stats.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map(([key, value]) => <StatCard key={key} title={key.replace(/([A-Z])/g, ' $1')} value={value} />)}
        </div>
      ) : null}

      {loading ? <Loader /> : (
        <Card>
          <Table columns={columns} rows={report.rows || []} />
        </Card>
      )}
    </div>
  );
}
