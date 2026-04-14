import DashboardLayout from '../../components/layout/DashboardLayout';
import ReportPage from '../../components/erp/ReportPage';
import { getMembershipReport } from '../../services/reportService';
import { formatDate } from '../../utils/formatDate';

export default function MembershipReports() {
  return (
    <DashboardLayout>
      <ReportPage
        title="Membership Report"
        description="Track active, paused, and expiring memberships with remaining days."
        fetcher={getMembershipReport}
        columns={[
          { key: 'member_name', label: 'Member' },
          { key: 'plan_name', label: 'Plan' },
          { key: 'status', label: 'Status' },
          { key: 'start_date', label: 'Start', render: (row) => formatDate(row.start_date) },
          { key: 'end_date', label: 'End', render: (row) => formatDate(row.end_date) },
          { key: 'remaining_days', label: 'Remaining Days' }
        ]}
      />
    </DashboardLayout>
  );
}
