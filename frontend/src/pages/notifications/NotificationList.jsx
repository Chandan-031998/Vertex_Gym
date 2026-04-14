import DashboardLayout from '../../components/layout/DashboardLayout';
import ReportPage from '../../components/erp/ReportPage';
import { getNotifications } from '../../services/notificationService';

export default function NotificationList() {
  return (
    <DashboardLayout>
      <ReportPage
        title="Notifications"
        description="Sent notifications, target roles, and reminder types."
        fetcher={getNotifications}
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'message', label: 'Message' },
          { key: 'target_role', label: 'Target Role' },
          { key: 'reminder_type', label: 'Type' },
          { key: 'status', label: 'Status' }
        ]}
      />
    </DashboardLayout>
  );
}
