import { createContext, useEffect, useMemo, useState } from 'react';
import { getSettings } from '../services/settingsService';
import { useAuth } from '../hooks/useAuth';

const defaultGeneralSettings = {
  gym_name: 'Vertex Gym',
  currency: 'INR',
  timezone: 'Asia/Kolkata'
};

export const SettingsContext = createContext({
  settings: { general: defaultGeneralSettings },
  refreshSettings: async () => {},
  updateLocalGeneralSettings: () => {}
});

export function SettingsProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [settings, setSettings] = useState({ general: defaultGeneralSettings });

  const refreshSettings = async () => {
    if (!isAuthenticated) {
      setSettings({ general: defaultGeneralSettings });
      return;
    }

    try {
      const response = await getSettings();
      setSettings((current) => ({
        ...current,
        ...response.data,
        general: {
          ...defaultGeneralSettings,
          ...(response.data?.general || {})
        }
      }));
    } catch {
      setSettings((current) => ({
        ...current,
        general: current.general || defaultGeneralSettings
      }));
    }
  };

  const updateLocalGeneralSettings = (generalSettings) => {
    setSettings((current) => ({
      ...current,
      general: {
        ...current.general,
        ...generalSettings
      }
    }));
  };

  useEffect(() => {
    refreshSettings();
  }, [isAuthenticated]);

  const value = useMemo(
    () => ({ settings, refreshSettings, updateLocalGeneralSettings }),
    [settings]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
