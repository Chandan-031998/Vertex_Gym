import DashboardLayout from '../../components/layout/DashboardLayout';
import ReportPage from '../../components/erp/ReportPage';
import { getAttendanceReport } from '../../services/reportService';
import { formatDate } from '../../utils/formatDate';

export default function AttendanceReports() {
  return (
    <DashboardLayout>
      <ReportPage
        title="Attendance Report"
        description="Review check-ins, check-outs, and attendance trends across members."
        fetcher={getAttendanceReport}
        columns={[
          { key: 'member_code', label: 'Code' },
          { key: 'member_name', label: 'Member' },
          { key: 'entry_type', label: 'Entry' },
          { key: 'check_in_time', label: 'Check In', render: (row) => formatDate(row.check_in_time) },
          { key: 'check_out_time', label: 'Check Out', render: (row) => formatDate(row.check_out_time) }
        ]}
      />
    </DashboardLayout>
  );
}
