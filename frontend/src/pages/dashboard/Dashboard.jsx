import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import Loader from '../../components/common/Loader';
import RevenueChart from '../../components/charts/RevenueChart';
import AttendanceChart from '../../components/charts/AttendanceChart';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import { getDashboardSummary } from '../../services/reportService';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardSummary().then((res) => setData(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout>
      {loading ? <Loader label="Loading dashboard" /> : (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-950">Dashboard</h2>
              <p className="mt-2 text-sm text-slate-500">Live snapshot of member activity, revenue, and gym operations.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/members"><Button>Add Member</Button></Link>
              <Link to="/attendance/check-in"><Button variant="secondary">Check In</Button></Link>
              <Link to="/payments/collect"><Button variant="secondary">Collect Payment</Button></Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            <StatCard title="Total Members" value={data?.totalMembers || 0} />
            <StatCard title="Active Members" value={data?.activeMembers || 0} />
            <StatCard title="Expired Members" value={data?.expiredMembers || 0} />
            <StatCard title="Trainers" value={data?.totalTrainers || 0} />
            <StatCard title="Today's Attendance" value={data?.todayAttendance || 0} />
            <StatCard title="Revenue" value={formatCurrency(data?.totalRevenue || 0)} />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <RevenueChart data={data?.revenueSeries || []} />
            <AttendanceChart data={data?.attendanceSeries || []} />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card title="Recent Payments">
              <Table
                columns={[
                  { key: 'member_name', label: 'Member' },
                  { key: 'amount', label: 'Amount', render: (row) => formatCurrency(row.amount) },
                  { key: 'payment_method', label: 'Method' },
                  { key: 'payment_date', label: 'Date', render: (row) => formatDate(row.payment_date) }
                ]}
                rows={data?.recentPayments || []}
              />
            </Card>
            <Card title="Recent Attendance">
              <Table
                columns={[
                  { key: 'member_name', label: 'Member' },
                  { key: 'member_code', label: 'Code' },
                  { key: 'entry_type', label: 'Entry', render: (row) => <Badge tone={row.entry_type}>{row.entry_type}</Badge> },
                  { key: 'check_in_time', label: 'Check In', render: (row) => formatDate(row.check_in_time) }
                ]}
                rows={data?.recentAttendance || []}
              />
            </Card>
          </div>

          <Card title="Upcoming Expiries">
            <Table
              columns={[
                { key: 'member_name', label: 'Member' },
                { key: 'plan_name', label: 'Plan' },
                { key: 'end_date', label: 'Ends', render: (row) => formatDate(row.end_date) },
                { key: 'remaining_days', label: 'Remaining Days' }
              ]}
              rows={data?.expiringMemberships || []}
            />
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
