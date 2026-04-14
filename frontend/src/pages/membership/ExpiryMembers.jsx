import DashboardLayout from '../../components/layout/DashboardLayout';
import ReportPage from '../../components/erp/ReportPage';
import { getExpiryMembers } from '../../services/planService';
import { formatDate } from '../../utils/formatDate';

export default function ExpiryMembers() {
  return (
    <DashboardLayout>
      <ReportPage
        title="Expiry Members"
        description="Members with memberships expiring within the next 15 days."
        fetcher={getExpiryMembers}
        columns={[
          { key: 'member_code', label: 'Code' },
          { key: 'member_name', label: 'Member' },
          { key: 'plan_name', label: 'Plan' },
          { key: 'end_date', label: 'End Date', render: (row) => formatDate(row.end_date) },
          { key: 'remaining_days', label: 'Remaining Days' }
        ]}
      />
    </DashboardLayout>
  );
}
