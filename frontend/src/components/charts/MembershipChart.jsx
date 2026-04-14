import Card from '../common/Card';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#16a34a', '#f59e0b', '#ef4444'];

export default function MembershipChart({ data = [] }) {
  return (
    <Card title="Membership Mix">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>
              {data.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
