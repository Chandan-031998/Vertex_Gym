import DashboardLayout from '../../components/layout/DashboardLayout';
import ActionCardPage from '../../components/erp/ActionCardPage';
import { createNotification } from '../../services/notificationService';

export default function SendNotification() {
  return (
    <DashboardLayout>
      <ActionCardPage
        title="Send Notification"
        description="Create reminders for membership expiry, due payments, or general announcements."
        fields={[
          { name: 'title', label: 'Title' },
          { name: 'message', label: 'Message', fullWidth: true },
          { name: 'target_role', label: 'Target Role' },
          { name: 'reminder_type', label: 'Reminder Type' }
        ]}
        onSubmit={createNotification}
        submitLabel="Send Notification"
      />
    </DashboardLayout>
  );
}
