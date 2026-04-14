import DashboardLayout from '../../components/layout/DashboardLayout';
import ReportPage from '../../components/erp/ReportPage';
import { getReminderLogs } from '../../services/notificationService';

export default function ReminderLogs() {
  return (
    <DashboardLayout>
      <ReportPage
        title="Reminder Logs"
        description="Reminder history for expiry and payment follow-ups."
        fetcher={getReminderLogs}
        columns={[
          { key: 'target_name', label: 'Target' },
          { key: 'reminder_type', label: 'Reminder Type' },
          { key: 'due_date', label: 'Due Date' },
          { key: 'status', label: 'Status' }
        ]}
      />
    </DashboardLayout>
  );
}
