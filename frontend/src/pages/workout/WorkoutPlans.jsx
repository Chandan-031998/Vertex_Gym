import DashboardLayout from '../../components/layout/DashboardLayout';
import CrudPage from '../../components/erp/CrudPage';
import { createWorkoutPlan, deleteWorkoutPlan, getWorkoutPlans, updateWorkoutPlan } from '../../services/workoutService';

export default function WorkoutPlans() {
  return (
    <DashboardLayout>
      <CrudPage
        title="Workout Plans"
        description="Workout programming, assignment, progress tracking, and goal ownership."
        fields={[
          { name: 'member_id', label: 'Member ID', type: 'number' },
          { name: 'trainer_id', label: 'Trainer ID', type: 'number' },
          { name: 'plan_name', label: 'Plan Name' },
          { name: 'goal', label: 'Goal' },
          { name: 'progress_percent', label: 'Progress %', type: 'number' },
          { name: 'target_date', label: 'Target Date', type: 'date' },
          { name: 'plan_text', label: 'Plan Details', type: 'textarea', fullWidth: true }
        ]}
        columns={[
          { key: 'plan_name', label: 'Plan' },
          { key: 'member_name', label: 'Member' },
          { key: 'trainer_name', label: 'Trainer' },
          { key: 'goal', label: 'Goal' },
          { key: 'progress_percent', label: 'Progress %' }
        ]}
        listRequest={getWorkoutPlans}
        createRequest={createWorkoutPlan}
        updateRequest={updateWorkoutPlan}
        deleteRequest={deleteWorkoutPlan}
      />
    </DashboardLayout>
  );
}
