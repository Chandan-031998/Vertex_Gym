const statusStyles = {
  active: 'bg-emerald-50 text-emerald-700',
  inactive: 'bg-slate-100 text-slate-700',
  expired: 'bg-rose-50 text-rose-700',
  paused: 'bg-amber-50 text-amber-700',
  paid: 'bg-emerald-50 text-emerald-700',
  partial: 'bg-amber-50 text-amber-700',
  due: 'bg-rose-50 text-rose-700',
  damaged: 'bg-rose-50 text-rose-700',
  scheduled: 'bg-sky-50 text-sky-700',
  completed: 'bg-emerald-50 text-emerald-700',
  cancelled: 'bg-slate-100 text-slate-700'
};

export default function Badge({ children, tone }) {
  const key = String(tone || children || '').toLowerCase().replace(/\s+/g, '_');
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[key] || 'bg-slate-100 text-slate-700'}`}>{children}</span>;
}
