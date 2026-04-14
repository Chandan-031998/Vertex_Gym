import DashboardLayout from '../../components/layout/DashboardLayout';
import ActionCardPage from '../../components/erp/ActionCardPage';
import { createAttendance } from '../../services/attendanceService';

export default function CheckIn() {
  return (
    <DashboardLayout>
      <ActionCardPage
        title="Manual Check-In"
        description="Create a manual attendance check-in for a member."
        fields={[
          { name: 'member_id', label: 'Member ID', type: 'number' },
          { name: 'entry_type', label: 'Entry Type', type: 'select', options: [{ value: 'manual', label: 'Manual' }, { value: 'qr', label: 'QR' }] },
          { name: 'notes', label: 'Notes', fullWidth: true }
        ]}
        onSubmit={createAttendance}
        submitLabel="Check In Member"
      />
    </DashboardLayout>
  );
}
