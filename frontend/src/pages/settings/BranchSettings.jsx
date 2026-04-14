import DashboardLayout from '../../components/layout/DashboardLayout';
import ActionCardPage from '../../components/erp/ActionCardPage';
import { createBranch } from '../../services/settingsService';

export default function BranchSettings() {
  return (
    <DashboardLayout>
      <ActionCardPage
        title="Branch Settings"
        description="Add and maintain branch records for multi-branch ERP operations."
        fields={[
          { name: 'branch_name', label: 'Branch Name' },
          { name: 'city', label: 'City' },
          { name: 'address', label: 'Address', fullWidth: true },
          { name: 'phone', label: 'Phone' }
        ]}
        onSubmit={createBranch}
        submitLabel="Add Branch"
      />
    </DashboardLayout>
  );
}
