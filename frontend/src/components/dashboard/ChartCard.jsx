import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

function CustomTooltip({ active, payload, label, valuePrefix, formatValue }) {
  if (!active || !payload?.length) return null;

  const value = payload[0]?.value;

  return (
    <div className="dashboard-card rounded-2xl px-3 py-2 text-sm shadow-lg">
      <p className="font-semibold text-slate-900">{label}</p>
      <p className="mt-1 text-slate-500">
        {valuePrefix}
        {formatValue ? formatValue(value) : value}
      </p>
    </div>
  );
}

export default function ChartCard({
  title,
  subtitle,
  data,
  type = 'area',
  dataKey,
  stroke,
  gradientId,
  formatValue
}) {
  return (
    <div className="dashboard-card p-5">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
        <div className="rounded-full bg-slate-100/80 px-3 py-1 text-xs font-semibold text-slate-500">Last 7 days</div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data} barSize={20}>
              <defs>
                <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={stroke} stopOpacity={0.92} />
                  <stop offset="100%" stopColor={stroke} stopOpacity={0.25} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis axisLine={false} dataKey="label" tickLine={false} tickMargin={10} stroke="#94a3b8" />
              <YAxis axisLine={false} tickLine={false} tickMargin={10} stroke="#94a3b8" />
              <Tooltip content={<CustomTooltip formatValue={formatValue} />} cursor={{ fill: 'rgba(124,92,255,0.06)' }} />
              <Bar dataKey={dataKey} fill={`url(#${gradientId})`} radius={[12, 12, 4, 4]} />
            </BarChart>
          ) : (
            <AreaChart data={data}>
              <defs>
                <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={stroke} stopOpacity={0.36} />
                  <stop offset="100%" stopColor={stroke} stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis axisLine={false} dataKey="label" tickLine={false} tickMargin={10} stroke="#94a3b8" />
              <YAxis axisLine={false} tickLine={false} tickMargin={10} stroke="#94a3b8" />
              <Tooltip
                content={<CustomTooltip formatValue={formatValue || ((value) => currencyFormatter.format(value))} />}
                cursor={{ stroke: 'rgba(124,92,255,0.18)', strokeWidth: 2 }}
              />
              <Area dataKey={dataKey} fill={`url(#${gradientId})`} fillOpacity={1} stroke={stroke} strokeWidth={3} type="monotone" />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
