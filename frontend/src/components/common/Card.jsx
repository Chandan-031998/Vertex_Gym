export default function Card({ title, actions = null, children, className = '' }) {
  return (
    <div className={`glass-card p-5 ${className}`}>
      {title ? (
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          {actions}
        </div>
      ) : null}
      {children}
    </div>
  );
}
