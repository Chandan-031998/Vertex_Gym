import { useAuth } from '../../hooks/useAuth';
import Badge from '../common/Badge';

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-white/80 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
            onClick={onMenuClick}
          >
            ☰
          </button>
          <div>
            <h1 className="bg-gradient-to-r from-sky-700 via-blue-700 to-emerald-600 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
              Vertex Gym ERP
            </h1>
            <p className="text-sm text-slate-500">Manage gym operations in one place</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 lg:justify-end">
          <div className="text-left sm:text-right">
            <p className="text-sm font-semibold text-slate-800">{user?.full_name}</p>
            <Badge tone={user?.status}>{user?.role}</Badge>
          </div>
          <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
