import DashboardLayout from '../../components/layout/DashboardLayout';
import ActionCardPage from '../../components/erp/ActionCardPage';
import { updateProfileSettings } from '../../services/settingsService';

export default function ProfileSettings() {
  return (
    <DashboardLayout>
      <ActionCardPage
        title="Profile Settings"
        description="Maintain admin profile information used on the system shell and receipts."
        fields={[
          { name: 'full_name', label: 'Full Name' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'phone', label: 'Phone' }
        ]}
        onSubmit={updateProfileSettings}
        submitLabel="Save Profile"
      />
    </DashboardLayout>
  );
}
