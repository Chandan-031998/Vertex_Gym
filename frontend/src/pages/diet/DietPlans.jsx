import DashboardLayout from '../../components/layout/DashboardLayout';
import CrudPage from '../../components/erp/CrudPage';
import { createDietPlan, deleteDietPlan, getDietPlans, updateDietPlan } from '../../services/dietService';

export default function DietPlans() {
  return (
    <DashboardLayout>
      <CrudPage
        title="Diet Plans"
        description="Diet assignment, nutrition targets, and macro tracking for members."
        fields={[
          { name: 'member_id', label: 'Member ID', type: 'number' },
          { name: 'trainer_id', label: 'Trainer ID', type: 'number' },
          { name: 'plan_name', label: 'Plan Name' },
          { name: 'goal', label: 'Goal' },
          { name: 'calories', label: 'Calories', type: 'number' },
          { name: 'protein_grams', label: 'Protein (g)', type: 'number' },
          { name: 'carbs_grams', label: 'Carbs (g)', type: 'number' },
          { name: 'fat_grams', label: 'Fat (g)', type: 'number' },
          { name: 'plan_text', label: 'Diet Details', type: 'textarea', fullWidth: true }
        ]}
        columns={[
          { key: 'plan_name', label: 'Plan' },
          { key: 'member_name', label: 'Member' },
          { key: 'goal', label: 'Goal' },
          { key: 'calories', label: 'Calories' },
          { key: 'status', label: 'Status' }
        ]}
        listRequest={getDietPlans}
        createRequest={createDietPlan}
        updateRequest={updateDietPlan}
        deleteRequest={deleteDietPlan}
      />
    </DashboardLayout>
  );
}
