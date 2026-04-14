import DashboardLayout from '../../components/layout/DashboardLayout';
import ReportPage from '../../components/erp/ReportPage';
import { getDuePayments } from '../../services/paymentService';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

export default function DuePayments() {
  return (
    <DashboardLayout>
      <ReportPage
        title="Due Payments"
        description="Outstanding and partial membership payments that require follow-up."
        fetcher={getDuePayments}
        columns={[
          { key: 'member_name', label: 'Member' },
          { key: 'plan_name', label: 'Plan' },
          { key: 'amount', label: 'Amount', render: (row) => formatCurrency(row.amount) },
          { key: 'payment_status', label: 'Payment Status' },
          { key: 'end_date', label: 'Ends', render: (row) => formatDate(row.end_date) }
        ]}
      />
    </DashboardLayout>
  );
}
