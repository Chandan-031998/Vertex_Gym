import DashboardLayout from '../../components/layout/DashboardLayout';
import ActionCardPage from '../../components/erp/ActionCardPage';
import { createPayment } from '../../services/paymentService';

export default function CollectPayment() {
  return (
    <DashboardLayout>
      <ActionCardPage
        title="Collect Payment"
        description="Collect a member payment and attach it to a membership or invoice reference."
        fields={[
          { name: 'member_id', label: 'Member ID', type: 'number' },
          { name: 'membership_id', label: 'Membership ID', type: 'number' },
          { name: 'amount', label: 'Amount', type: 'number' },
          { name: 'payment_date', label: 'Payment Date', type: 'date' },
          { name: 'payment_method', label: 'Payment Method', type: 'select', options: [{ value: 'cash', label: 'Cash' }, { value: 'upi', label: 'UPI' }, { value: 'card', label: 'Card' }, { value: 'bank_transfer', label: 'Bank Transfer' }] },
          { name: 'status', label: 'Status', type: 'select', options: [{ value: 'paid', label: 'Paid' }, { value: 'partial', label: 'Partial' }, { value: 'due', label: 'Due' }] }
        ]}
        onSubmit={createPayment}
        submitLabel="Record Payment"
      />
    </DashboardLayout>
  );
}
