import DashboardLayout from '../../components/layout/DashboardLayout';
import CrudPage from '../../components/erp/CrudPage';
import Badge from '../../components/common/Badge';
import { createTrainer, deleteTrainer, getTrainer, getTrainers, updateTrainer } from '../../services/trainerService';

const fields = [
  { name: 'full_name', label: 'Full Name' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone' },
  { name: 'specialization', label: 'Specialization' },
  { name: 'experience_years', label: 'Experience Years', type: 'number' },
  { name: 'salary', label: 'Salary', type: 'number' },
  { name: 'status', label: 'Status', type: 'select', options: [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }] },
  { name: 'availability_notes', label: 'Availability Notes', type: 'textarea', fullWidth: true }
];

export default function TrainersList() {
  return (
    <DashboardLayout>
      <CrudPage
        title="Trainers"
        description="Manage trainer specialization, compensation, assigned members, and active schedules."
        fields={fields}
        columns={[
          { key: 'full_name', label: 'Name' },
          { key: 'specialization', label: 'Specialization' },
          { key: 'experience_years', label: 'Experience' },
          { key: 'salary', label: 'Salary' },
          { key: 'status', label: 'Status', render: (row) => <Badge tone={row.status}>{row.status}</Badge> }
        ]}
        listRequest={getTrainers}
        createRequest={createTrainer}
        updateRequest={updateTrainer}
        deleteRequest={deleteTrainer}
        getDetailRequest={getTrainer}
        filters={[
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' }
        ]}
        stats={(rows) => ([
          { label: 'All Trainers', value: rows.length },
          { label: 'Active', value: rows.filter((row) => row.status === 'active').length },
          { label: 'Specializations', value: new Set(rows.map((row) => row.specialization).filter(Boolean)).size }
        ])}
      />
    </DashboardLayout>
  );
}
