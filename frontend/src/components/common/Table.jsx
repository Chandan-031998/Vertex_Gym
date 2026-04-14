import EmptyState from '../ui/EmptyState';

export default function Table({ columns = [], rows = [], emptyTitle = 'No records found', emptyDescription = 'There is no data to display yet.' }) {
  if (!rows?.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50/90">
          <tr>{columns.map((col) => <th key={col.key} className="px-4 py-3 text-left font-semibold text-slate-600">{col.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.id || idx} className="border-t border-slate-100 transition hover:bg-slate-50/80">
              {columns.map((col) => <td key={col.key} className="px-4 py-3">{col.render ? col.render(row) : row[col.key]}</td>)}
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
}
