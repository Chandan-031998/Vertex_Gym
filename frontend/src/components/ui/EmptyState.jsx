export default function EmptyState({ title = 'Nothing here yet', description = 'Add records to get started.' }) {
  return (
    <div className="glass-card flex min-h-48 flex-col items-center justify-center p-8 text-center">
      <div className="mb-3 rounded-full bg-slate-100 p-4 text-2xl">◎</div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-500">{description}</p>
    </div>
  );
}
