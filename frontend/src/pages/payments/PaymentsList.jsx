import DashboardLayout from '../../components/layout/DashboardLayout';
import CrudPage from '../../components/erp/CrudPage';
import Badge from '../../components/common/Badge';
import { createPayment, getPayments } from '../../services/paymentService';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

export default function PaymentsList() {
  return (
    <DashboardLayout>
      <CrudPage
        title="Payments"
        description="Collect payments, track invoice numbers, and review payment method and status history."
        fields={[
          { name: 'member_id', label: 'Member ID', type: 'number' },
          { name: 'membership_id', label: 'Membership ID', type: 'number' },
          { name: 'amount', label: 'Amount', type: 'number' },
          { name: 'payment_date', label: 'Payment Date', type: 'date' },
          { name: 'payment_method', label: 'Payment Method', type: 'select', options: [{ value: 'cash', label: 'Cash' }, { value: 'upi', label: 'UPI' }, { value: 'card', label: 'Card' }, { value: 'bank_transfer', label: 'Bank Transfer' }] },
          { name: 'status', label: 'Status', type: 'select', options: [{ value: 'paid', label: 'Paid' }, { value: 'partial', label: 'Partial' }, { value: 'due', label: 'Due' }] },
          { name: 'reference_no', label: 'Reference' },
          { name: 'notes', label: 'Notes', type: 'textarea', fullWidth: true }
        ]}
        columns={[
          { key: 'member_name', label: 'Member' },
          { key: 'amount', label: 'Amount', render: (row) => formatCurrency(row.amount) },
          { key: 'payment_method', label: 'Method' },
          { key: 'payment_date', label: 'Date', render: (row) => formatDate(row.payment_date) },
          { key: 'status', label: 'Status', render: (row) => <Badge tone={row.status}>{row.status}</Badge> },
          { key: 'invoice_number', label: 'Invoice' }
        ]}
        listRequest={getPayments}
        createRequest={createPayment}
        stats={(rows) => ([
          { label: 'Transactions', value: rows.length },
          { label: 'Collected', value: formatCurrency(rows.reduce((sum, row) => sum + Number(row.amount || 0), 0)) }
        ])}
      />
    </DashboardLayout>
  );
}
