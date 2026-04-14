export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="glass-card flex min-h-48 flex-col items-center justify-center gap-3 p-10 text-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}
