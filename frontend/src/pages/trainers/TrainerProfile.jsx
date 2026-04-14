import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Loader from '../../components/common/Loader';
import DetailView from '../../components/erp/DetailView';
import { getTrainer } from '../../services/trainerService';
import { formatDate } from '../../utils/formatDate';

export default function TrainerProfile() {
  const { id = '1' } = useParams();
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    getTrainer(id).then((response) => setTrainer(response.data));
  }, [id]);

  if (!trainer) return <DashboardLayout><Loader label="Loading trainer profile" /></DashboardLayout>;

  return (
    <DashboardLayout>
      <DetailView
        title={trainer.full_name}
        description={trainer.specialization || 'Trainer'}
        summary={[
          { label: 'Status', value: trainer.status },
          { label: 'Experience', value: `${trainer.experience_years || 0} years` },
          { label: 'Phone', value: trainer.phone || '-' },
          { label: 'Salary', value: trainer.salary || 0 }
        ]}
        sections={[
          { title: 'Assigned Members', columns: [{ key: 'member_code', label: 'Code' }, { key: 'full_name', label: 'Member' }, { key: 'status', label: 'Status' }], rows: trainer.assignedMembers || [] },
          { title: 'Trainer Schedule', columns: [{ key: 'class_name', label: 'Class' }, { key: 'class_date', label: 'Date', render: (row) => formatDate(row.class_date) }, { key: 'batch_name', label: 'Batch' }, { key: 'status', label: 'Status' }], rows: trainer.schedule || [] }
        ]}
      />
    </DashboardLayout>
  );
}
