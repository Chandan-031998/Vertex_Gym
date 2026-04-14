import DashboardLayout from '../../components/layout/DashboardLayout';
import ActionCardPage from '../../components/erp/ActionCardPage';
import { updateRolesPermissions } from '../../services/settingsService';

export default function RolesPermissions() {
  return (
    <DashboardLayout>
      <ActionCardPage
        title="Roles & Permissions"
        description="Configure access rules for super admin, admin, receptionist, trainer, and member roles."
        fields={[
          { name: 'super_admin', label: 'Super Admin Permissions', defaultValue: 'all', fullWidth: true },
          { name: 'admin', label: 'Admin Permissions', defaultValue: 'dashboard,members,trainers,reports,settings', fullWidth: true },
          { name: 'receptionist', label: 'Receptionist Permissions', defaultValue: 'dashboard,members,attendance,payments', fullWidth: true },
          { name: 'trainer', label: 'Trainer Permissions', defaultValue: 'dashboard,members,classes,workout,diet', fullWidth: true },
          { name: 'member', label: 'Member Permissions', defaultValue: 'dashboard', fullWidth: true }
        ]}
        onSubmit={updateRolesPermissions}
        submitLabel="Save Permissions"
      />
    </DashboardLayout>
  );
}
