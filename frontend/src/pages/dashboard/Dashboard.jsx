import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiArrowPathRoundedSquare,
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiOutlineUsers
} from 'react-icons/hi2';
import ChartCard from '../../components/dashboard/ChartCard';
import StatCard from '../../components/dashboard/StatCard';
import Table from '../../components/dashboard/Table';
import Loader from '../../components/common/Loader';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { getDashboardSummary } from '../../services/reportService';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

const statConfig = [
  {
    key: 'totalMembers',
    title: 'Total Members',
    delta: '+12.4%',
    description: 'vs last month',
    icon: HiOutlineUsers
  },
  {
    key: 'activeMembers',
    title: 'Active Members',
    delta: '+8.1%',
    description: 'renewals improved',
    icon: HiOutlineUserGroup
  },
  {
    key: 'expiredMembers',
    title: 'Expired Members',
    delta: '-3.2%',
    direction: 'down',
    description: 'lower churn',
    icon: HiOutlineClock
  },
  {
    key: 'totalTrainers',
    title: 'Trainers',
    delta: '+2.8%',
    description: 'team utilization',
    icon: HiArrowPathRoundedSquare
  },
  {
    key: 'todayAttendance',
    title: "Today's Attendance",
    delta: '+9.6%',
    description: 'peak hour lift',
    icon: HiOutlineCalendarDays
  },
  {
    key: 'totalRevenue',
    title: 'Revenue',
    delta: '+14.9%',
    description: 'monthly run-rate',
    icon: HiOutlineBanknotes,
    format: formatCurrency
  }
];

function formatShortMonth(value) {
  return new Date(`${value}-01`).toLocaleDateString('en-US', { month: 'short' });
}

function formatShortDay(value) {
  return new Date(value).toLocaleDateString('en-US', { weekday: 'short' });
}

function formatTime(value) {
  return value
    ? new Date(value).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    : '-';
}

function HeaderAction({ to, children, secondary = false }) {
  return (
    <Link
      to={to}
      className={`dashboard-action inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold ${
        secondary
          ? 'dashboard-card text-slate-700 hover:bg-white'
          : 'dashboard-gradient text-white shadow-[0_16px_32px_rgba(108,100,255,0.3)]'
      }`}
    >
      {children}
    </Link>
  );
}

function AttendanceBadge({ value }) {
  const isOut = value === 'check_out';

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${isOut ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
      {isOut ? 'Check Out' : 'Check In'}
    </span>
  );
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getDashboardSummary()
      .then((response) => {
        const nextData = response?.data;
        if (mounted && nextData) {
          setData(nextData);
        }
      })
      .catch(() => {
        if (mounted) {
          setData({
            totalMembers: 0,
            activeMembers: 0,
            expiredMembers: 0,
            totalTrainers: 0,
            todayAttendance: 0,
            totalRevenue: 0,
            recentPayments: [],
            recentAttendance: [],
            revenueSeries: [],
            attendanceSeries: [],
            expiringMemberships: []
          });
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const revenueTrend = useMemo(
    () =>
      (data?.revenueSeries || []).map((item) => ({
        label: formatShortMonth(item.month),
        value: Number(item.total || 0)
      })),
    [data?.revenueSeries]
  );

  const attendanceTrend = useMemo(
    () =>
      (data?.attendanceSeries || []).map((item) => ({
        label: formatShortDay(item.day),
        value: Number(item.total || 0)
      })),
    [data?.attendanceSeries]
  );

  const operations = [
    { label: 'Classes Today', value: 14 },
    { label: 'Pending Dues', value: 27 },
    { label: 'PT Sessions', value: 31 },
    { label: 'Low Stock Items', value: 6 }
  ];

  return (
    <DashboardLayout>
      {loading ? (
        <Loader label="Loading dashboard" />
      ) : (
      <div className="space-y-6">
        <section className="dashboard-panel rounded-[28px] p-6 sm:p-7">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-500">Control Center</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Dashboard</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                Live snapshot of gym activity, revenue, and operations.
                {' Updated with the latest operational summary.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <HeaderAction to="/members">Add Member</HeaderAction>
              <HeaderAction to="/attendance/check-in" secondary>
                Check In
              </HeaderAction>
              <HeaderAction to="/payments/collect" secondary>
                Collect Payment
              </HeaderAction>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {statConfig.map((stat) => (
            <StatCard
              key={stat.key}
              title={stat.title}
              value={stat.format ? stat.format(data?.[stat.key]) : data?.[stat.key] ?? 0}
              delta={stat.delta}
              direction={stat.direction}
              description={stat.description}
              icon={stat.icon}
            />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <ChartCard
            title="Revenue Trend"
            subtitle="Recurring memberships and payment collections over recent months."
            data={revenueTrend}
            dataKey="value"
            stroke="#7C5CFF"
            gradientId="revenue-gradient"
          />
          <ChartCard
            title="Attendance Trend"
            subtitle="Daily check-in volume across the last seven days."
            data={attendanceTrend}
            dataKey="value"
            stroke="#5B8CFF"
            gradientId="attendance-gradient"
            type="bar"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
          <Table
            title="Recent Payments"
            subtitle="Latest collected payments across online and front-desk channels."
            columns={[
              { key: 'member_name', label: 'Member' },
              { key: 'payment_method', label: 'Method' },
              { key: 'payment_date', label: 'Date', render: (row) => formatDate(row.payment_date) },
              { key: 'amount', label: 'Amount', render: (row) => <span className="font-semibold text-slate-900">{formatCurrency(row.amount)}</span> }
            ]}
            rows={data?.recentPayments || []}
          />

          <Table
            title="Recent Attendance"
            subtitle="Latest check-ins and exits happening on the floor."
            columns={[
              { key: 'member_name', label: 'Member' },
              { key: 'member_code', label: 'Code' },
              { key: 'entry_type', label: 'Status', render: (row) => <AttendanceBadge value={row.entry_type} /> },
              { key: 'check_in_time', label: 'Time', render: (row) => formatTime(row.check_in_time) }
            ]}
            rows={data?.recentAttendance || []}
          />
        </section>

        <section className="grid gap-6 2xl:grid-cols-[1.25fr_0.75fr]">
          <Table
            title="Upcoming Expiries"
            subtitle="Memberships ending soon and requiring follow-up."
            compact
            columns={[
              { key: 'member_name', label: 'Member' },
              { key: 'plan_name', label: 'Plan' },
              { key: 'end_date', label: 'Ends', render: (row) => formatDate(row.end_date) },
              {
                key: 'remaining_days',
                label: 'Remaining',
                render: (row) => (
                  <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
                    {row.remaining_days} days
                  </span>
                )
              }
            ]}
            rows={data?.expiringMemberships || []}
          />

          <div className="dashboard-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Operations Pulse</h3>
                <p className="mt-1 text-sm text-slate-500">Quick look at high-priority operational counters.</p>
              </div>
              <div className="dashboard-gradient-soft rounded-2xl px-3 py-2 text-xs font-semibold text-indigo-600">Realtime</div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {operations.map((item) => (
                <div key={item.label} className="dashboard-inset rounded-2xl p-4">
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="dashboard-gradient mt-6 rounded-[22px] p-5 text-white">
              <p className="text-sm font-medium text-white/75">Collection efficiency</p>
              <p className="mt-2 text-3xl font-semibold">94.2%</p>
              <p className="mt-2 text-sm text-white/80">Most payments are being closed within the billing cycle.</p>
            </div>
          </div>
        </section>
      </div>
      )}
    </DashboardLayout>
  );
}
