import DashboardLayout from '../../components/layout/DashboardLayout';
import ReportPage from '../../components/erp/ReportPage';
import { getRevenueReport } from '../../services/reportService';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

export default function RevenueReports() {
  return (
    <DashboardLayout>
      <ReportPage
        title="Revenue Report"
        description="Revenue performance across collected payments, methods, and invoice flow."
        fetcher={getRevenueReport}
        columns={[
          { key: 'member_name', label: 'Member' },
          { key: 'amount', label: 'Amount', render: (row) => formatCurrency(row.amount) },
          { key: 'payment_method', label: 'Method' },
          { key: 'payment_date', label: 'Date', render: (row) => formatDate(row.payment_date) },
          { key: 'invoice_number', label: 'Invoice' }
        ]}
      />
    </DashboardLayout>
  );
}
