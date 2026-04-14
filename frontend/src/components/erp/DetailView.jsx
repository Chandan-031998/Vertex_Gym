import Card from '../common/Card';
import Table from '../common/Table';
import Badge from '../common/Badge';

export default function DetailView({ title, description, summary = [], sections = [] }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-950">{title}</h2>
        {description ? <p className="mt-2 text-sm text-slate-500">{description}</p> : null}
      </div>

      {summary.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summary.map((item) => (
            <Card key={item.label}>
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{item.badge ? <Badge tone={item.value}>{item.value}</Badge> : item.value}</p>
            </Card>
          ))}
        </div>
      ) : null}

      {sections.map((section) => (
        <Card key={section.title} title={section.title}>
          {section.columns ? <Table columns={section.columns} rows={section.rows || []} /> : section.content}
        </Card>
      ))}
    </div>
  );
}
