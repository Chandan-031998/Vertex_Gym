import DashboardLayout from '../../components/layout/DashboardLayout';
import CrudPage from '../../components/erp/CrudPage';
import { createClass, deleteClass, getClasses, updateClass } from '../../services/classService';
import { formatDate } from '../../utils/formatDate';

export default function ClassesList() {
  return (
    <DashboardLayout>
      <CrudPage
        title="Classes"
        description="Class scheduling with trainer assignment, batch naming, and capacity planning."
        fields={[
          { name: 'class_name', label: 'Class Name' },
          { name: 'trainer_id', label: 'Trainer ID', type: 'number' },
          { name: 'class_date', label: 'Class Date', type: 'date' },
          { name: 'start_time', label: 'Start Time', type: 'time' },
          { name: 'end_time', label: 'End Time', type: 'time' },
          { name: 'capacity', label: 'Capacity', type: 'number' },
          { name: 'batch_name', label: 'Batch Name' },
          { name: 'room_name', label: 'Room Name' },
          { name: 'description', label: 'Description', type: 'textarea', fullWidth: true }
        ]}
        columns={[
          { key: 'class_name', label: 'Class' },
          { key: 'trainer_name', label: 'Trainer' },
          { key: 'class_date', label: 'Date', render: (row) => formatDate(row.class_date) },
          { key: 'batch_name', label: 'Batch' },
          { key: 'capacity', label: 'Capacity' },
          { key: 'booked_count', label: 'Booked' }
        ]}
        listRequest={getClasses}
        createRequest={createClass}
        updateRequest={updateClass}
        deleteRequest={deleteClass}
      />
    </DashboardLayout>
  );
}
