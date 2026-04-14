import DashboardLayout from '../../components/layout/DashboardLayout';
import ReportPage from '../../components/erp/ReportPage';
import { getTrainerReport } from '../../services/reportService';

export default function TrainerReports() {
  return (
    <DashboardLayout>
      <ReportPage
        title="Trainer Report"
        description="Trainer specialization, assigned member load, and scheduled class activity."
        fetcher={getTrainerReport}
        columns={[
          { key: 'full_name', label: 'Trainer' },
          { key: 'specialization', label: 'Specialization' },
          { key: 'assigned_members', label: 'Assigned Members' },
          { key: 'scheduled_classes', label: 'Classes' },
          { key: 'status', label: 'Status' }
        ]}
      />
    </DashboardLayout>
  );
}
