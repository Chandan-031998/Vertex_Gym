import DashboardLayout from '../../components/layout/DashboardLayout';
import CrudPage from '../../components/erp/CrudPage';
import Badge from '../../components/common/Badge';
import { createPlan, deletePlan, getPlans, updatePlan } from '../../services/planService';
import { formatCurrency } from '../../utils/formatCurrency';

const fields = [
  { name: 'plan_name', label: 'Plan Name' },
  { name: 'duration_days', label: 'Duration Days', type: 'number' },
  { name: 'price', label: 'Price', type: 'number' },
  { name: 'freeze_limit_days', label: 'Freeze Limit Days', type: 'number' },
  { name: 'status', label: 'Status', type: 'select', options: [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }] },
  { name: 'description', label: 'Description', type: 'textarea', fullWidth: true }
];

export default function PlansList() {
  return (
    <DashboardLayout>
      <CrudPage
        title="Plans"
        description="Membership plan CRUD with freeze limits, pricing, and active/inactive visibility."
        fields={fields}
        columns={[
          { key: 'plan_name', label: 'Plan' },
          { key: 'duration_days', label: 'Duration (Days)' },
          { key: 'price', label: 'Price', render: (row) => formatCurrency(row.price) },
          { key: 'freeze_limit_days', label: 'Freeze Limit' },
          { key: 'status', label: 'Status', render: (row) => <Badge tone={row.status}>{row.status}</Badge> }
        ]}
        listRequest={getPlans}
        createRequest={createPlan}
        updateRequest={updatePlan}
        deleteRequest={deletePlan}
        stats={(rows) => ([
          { label: 'Active Plans', value: rows.filter((row) => row.status === 'active').length },
          { label: 'Average Price', value: formatCurrency(rows.length ? rows.reduce((sum, row) => sum + Number(row.price || 0), 0) / rows.length : 0) }
        ])}
      />
    </DashboardLayout>
  );
}
