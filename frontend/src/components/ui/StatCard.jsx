export default function StatCard({ title, value, hint }) {
  return (
    <div className="glass-card relative overflow-hidden p-5">
      <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-blue-50 blur-2xl" />
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      {hint ? <p className="mt-2 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}
