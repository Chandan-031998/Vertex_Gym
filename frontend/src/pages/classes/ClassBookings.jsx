import DashboardLayout from '../../components/layout/DashboardLayout';
import ReportPage from '../../components/erp/ReportPage';
import { getClassBookings } from '../../services/classService';
import { formatDate } from '../../utils/formatDate';

export default function ClassBookings() {
  return (
    <DashboardLayout>
      <ReportPage
        title="Class Bookings"
        description="Bookings and capacity usage across classes and members."
        fetcher={getClassBookings}
        columns={[
          { key: 'class_name', label: 'Class' },
          { key: 'class_date', label: 'Date', render: (row) => formatDate(row.class_date) },
          { key: 'member_name', label: 'Member' },
          { key: 'booking_status', label: 'Booking Status' }
        ]}
      />
    </DashboardLayout>
  );
}
