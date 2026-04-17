import { useSettings } from '../../hooks/useSettings';

export default function Footer() {
  const { settings } = useSettings();
  const gymName = settings?.general?.gym_name || 'Vertex Gym';

  return <footer className="my-6 text-center text-sm text-slate-500">© 2026 {gymName}. Operations, reporting, and member lifecycle in one dashboard.</footer>;
}
