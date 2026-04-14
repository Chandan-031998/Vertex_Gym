import DashboardLayout from '../../components/layout/DashboardLayout';
import CrudPage from '../../components/erp/CrudPage';
import Badge from '../../components/common/Badge';
import { checkOutAttendance, createAttendance, getAttendance } from '../../services/attendanceService';
import { formatDate } from '../../utils/formatDate';

export default function AttendanceList() {
  return (
    <DashboardLayout>
      <CrudPage
        title="Attendance"
        description="Manual check-in records, QR entries, and same-day checkout monitoring."
        fields={[
          { name: 'member_id', label: 'Member ID', type: 'number' },
          { name: 'entry_type', label: 'Entry Type', type: 'select', options: [{ value: 'manual', label: 'Manual' }, { value: 'qr', label: 'QR' }] },
          { name: 'notes', label: 'Notes', type: 'textarea', fullWidth: true }
        ]}
        columns={[
          { key: 'member_code', label: 'Member Code' },
          { key: 'member_name', label: 'Member Name' },
          { key: 'entry_type', label: 'Entry Type', render: (row) => <Badge tone={row.entry_type}>{row.entry_type}</Badge> },
          { key: 'check_in_time', label: 'Check In', render: (row) => formatDate(row.check_in_time) },
          { key: 'check_out_time', label: 'Check Out', render: (row) => formatDate(row.check_out_time) }
        ]}
        listRequest={getAttendance}
        createRequest={createAttendance}
        rowActions={(row) => !row.check_out_time ? (
          <button
            type="button"
            className="rounded-xl border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            onClick={() => checkOutAttendance(row.id)}
          >
            Check Out
          </button>
        ) : null}
        stats={(rows) => ([
          { label: 'Today Entries', value: rows.length },
          { label: 'Checked Out', value: rows.filter((row) => row.check_out_time).length }
        ])}
      />
    </DashboardLayout>
  );
}
