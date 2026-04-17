import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ActionCardPage from '../../components/erp/ActionCardPage';
import { useSettings } from '../../hooks/useSettings';
import { getSettings, updateGeneralSettings } from '../../services/settingsService';

export default function GeneralSettings() {
  const [defaults, setDefaults] = useState({});
  const { updateLocalGeneralSettings } = useSettings();

  useEffect(() => {
    getSettings().then((response) => setDefaults(response.data.general || {}));
  }, []);

  return (
    <DashboardLayout>
      <ActionCardPage
        title="General Settings"
        description="Update gym name, default currency, and general operating preferences."
        fields={[
          { name: 'gym_name', label: 'Gym Name', defaultValue: defaults.gym_name || '' },
          { name: 'currency', label: 'Currency', defaultValue: defaults.currency || 'INR' },
          { name: 'timezone', label: 'Timezone', defaultValue: defaults.timezone || 'Asia/Kolkata' }
        ]}
        onSubmit={updateGeneralSettings}
        onSuccess={(_response, form) => {
          setDefaults(form);
          updateLocalGeneralSettings(form);
        }}
        submitLabel="Save Settings"
      />
    </DashboardLayout>
  );
}
