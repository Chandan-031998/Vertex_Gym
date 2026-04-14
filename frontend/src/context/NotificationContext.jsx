import { createContext, useCallback, useMemo, useState } from 'react';

export const NotificationContext = createContext({ notifications: [], notify: () => {} });

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const notify = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setNotifications((current) => [...current, { id, message, type }]);
    window.setTimeout(() => {
      setNotifications((current) => current.filter((item) => item.id !== id));
    }, 3000);
  }, []);

  const value = useMemo(() => ({ notifications, notify }), [notifications, notify]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-[60] space-y-3">
        {notifications.map((item) => (
          <div key={item.id} className={`rounded-2xl px-4 py-3 text-sm shadow-lg ${item.type === 'error' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-white'}`}>
            {item.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}
