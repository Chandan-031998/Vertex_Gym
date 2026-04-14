import DashboardLayout from '../../components/layout/DashboardLayout';
import CrudPage from '../../components/erp/CrudPage';
import { createStaff, deleteStaff, getStaff, updateStaff } from '../../services/staffService';

export default function StaffList() {
  return (
    <DashboardLayout>
      <CrudPage
        title="Staff"
        description="Staff records with role, salary, shift, and employment status."
        fields={[
          { name: 'full_name', label: 'Full Name' },
          { name: 'role', label: 'Role' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'phone', label: 'Phone' },
          { name: 'salary', label: 'Salary', type: 'number' },
          { name: 'shift_name', label: 'Shift Name' },
          { name: 'status', label: 'Status', type: 'select', options: [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }] }
        ]}
        columns={[
          { key: 'full_name', label: 'Name' },
          { key: 'role', label: 'Role' },
          { key: 'phone', label: 'Phone' },
          { key: 'shift_name', label: 'Shift' },
          { key: 'status', label: 'Status' }
        ]}
        listRequest={getStaff}
        createRequest={createStaff}
        updateRequest={updateStaff}
        deleteRequest={deleteStaff}
      />
    </DashboardLayout>
  );
}
