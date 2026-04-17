import { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import CrudPage from '../../components/erp/CrudPage';
import { getMembers } from '../../services/memberService';
import { getTrainers } from '../../services/trainerService';
import { createWorkoutPlan, deleteWorkoutPlan, getWorkoutPlans, updateWorkoutPlan } from '../../services/workoutService';

export default function WorkoutPlans() {
  const [memberOptions, setMemberOptions] = useState([]);
  const [trainerOptions, setTrainerOptions] = useState([]);

  useEffect(() => {
    getMembers()
      .then((response) => {
        const members = Array.isArray(response.data) ? response.data : [];
        setMemberOptions(
          members.map((member) => ({
            value: String(member.id),
            label: member.full_name
          }))
        );
      })
      .catch(() => {
        setMemberOptions([]);
      });

    getTrainers()
      .then((response) => {
        const trainers = Array.isArray(response.data) ? response.data : [];
        setTrainerOptions(
          trainers.map((trainer) => ({
            value: String(trainer.id),
            label: trainer.full_name
          }))
        );
      })
      .catch(() => {
        setTrainerOptions([]);
      });
  }, []);

  const fields = useMemo(
    () => [
      { name: 'member_id', label: 'Member Name', type: 'select', options: memberOptions },
      { name: 'trainer_id', label: 'Trainer Name', type: 'select', options: trainerOptions },
      { name: 'plan_name', label: 'Plan Name' },
      { name: 'goal', label: 'Goal' },
      { name: 'progress_percent', label: 'Progress %', type: 'number' },
      { name: 'target_date', label: 'Target Date', type: 'date' },
      { name: 'plan_text', label: 'Plan Details', type: 'textarea', fullWidth: true }
    ],
    [memberOptions, trainerOptions]
  );

  return (
    <DashboardLayout>
      <CrudPage
        title="Workout Plans"
        description="Workout programming, assignment, progress tracking, and goal ownership."
        fields={fields}
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
