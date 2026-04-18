import { useSettings } from '../../hooks/useSettings';

export default function Footer() {
  const { settings } = useSettings();
  const gymName = settings?.general?.gym_name || 'Vertex Gym';

  return (
    <footer className="px-1 text-sm text-slate-500">
      <div className="dashboard-card flex flex-col gap-2 rounded-[22px] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p>{gymName} ERP dashboard</p>
        <p>Live operations, payments, attendance, and member lifecycle in one workspace.</p>
      </div>
    </footer>
  );
}
