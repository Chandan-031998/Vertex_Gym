import DashboardLayout from '../../components/layout/DashboardLayout';
import ActionCardPage from '../../components/erp/ActionCardPage';
import { renewMembership } from '../../services/planService';

export default function RenewMembership() {
  return (
    <DashboardLayout>
      <ActionCardPage
        title="Renew Membership"
        description="Create a new membership cycle, update payment status, and optionally apply a freeze window."
        fields={[
          { name: 'member_id', label: 'Member ID', type: 'number' },
          { name: 'plan_id', label: 'Plan ID', type: 'number' },
          { name: 'start_date', label: 'Start Date', type: 'date' },
          { name: 'amount', label: 'Amount', type: 'number' },
          { name: 'payment_status', label: 'Payment Status', type: 'select', options: [{ value: 'paid', label: 'Paid' }, { value: 'partial', label: 'Partial' }, { value: 'due', label: 'Due' }] },
          { name: 'notes', label: 'Notes', fullWidth: true }
        ]}
        onSubmit={renewMembership}
        submitLabel="Renew Membership"
      />
    </DashboardLayout>
  );
}
