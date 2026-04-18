import { HiArrowTrendingDown, HiArrowTrendingUp } from 'react-icons/hi2';

export default function StatCard({ title, value, delta, direction = 'up', icon: Icon, description }) {
  const positive = direction !== 'down';

  return (
    <div className="dashboard-card dashboard-action relative overflow-hidden p-5">
      <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
        </div>
        <div className="dashboard-gradient-soft inline-flex h-12 w-12 items-center justify-center rounded-2xl text-lg text-indigo-600">
          {Icon ? <Icon /> : null}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'
          }`}
        >
          {positive ? <HiArrowTrendingUp /> : <HiArrowTrendingDown />}
          {delta}
        </div>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
    </div>
  );
}
