export default function Table({ title, subtitle, columns, rows, emptyLabel = 'No records found', compact = false }) {
  return (
    <div className="dashboard-card overflow-hidden">
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="bg-slate-50/80 px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((row, index) => (
                <tr key={row.id || `${title}-${index}`} className="transition hover:bg-slate-50/70">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`border-t border-slate-100 px-5 text-sm text-slate-600 ${compact ? 'py-3' : 'py-4'}`}
                    >
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center text-sm text-slate-400">
                  {emptyLabel}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
