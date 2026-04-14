import DashboardLayout from '../../components/layout/DashboardLayout';
import CrudPage from '../../components/erp/CrudPage';
import { createEquipment, deleteEquipment, getEquipment, updateEquipment } from '../../services/equipmentService';
import { formatDate } from '../../utils/formatDate';

export default function EquipmentList() {
  return (
    <DashboardLayout>
      <CrudPage
        title="Equipment"
        description="Equipment inventory, purchase details, lifecycle status, and service dates."
        fields={[
          { name: 'equipment_name', label: 'Equipment Name' },
          { name: 'brand', label: 'Brand' },
          { name: 'purchase_date', label: 'Purchase Date', type: 'date' },
          { name: 'condition_status', label: 'Condition', type: 'select', options: [{ value: 'good', label: 'Good' }, { value: 'maintenance_due', label: 'Maintenance Due' }, { value: 'damaged', label: 'Damaged' }] },
          { name: 'serial_number', label: 'Serial Number' },
          { name: 'purchase_cost', label: 'Purchase Cost', type: 'number' },
          { name: 'next_service_date', label: 'Next Service Date', type: 'date' }
        ]}
        columns={[
          { key: 'equipment_name', label: 'Equipment' },
          { key: 'brand', label: 'Brand' },
          { key: 'condition_status', label: 'Condition' },
          { key: 'purchase_date', label: 'Purchased', render: (row) => formatDate(row.purchase_date) },
          { key: 'next_service_date', label: 'Next Service', render: (row) => formatDate(row.next_service_date) }
        ]}
        listRequest={getEquipment}
        createRequest={createEquipment}
        updateRequest={updateEquipment}
        deleteRequest={deleteEquipment}
      />
    </DashboardLayout>
  );
}
