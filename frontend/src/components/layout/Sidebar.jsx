import { NavLink } from 'react-router-dom';
import {
  FiActivity,
  FiBell,
  FiBox,
  FiClipboard,
  FiCreditCard,
  FiGrid,
  FiHardDrive,
  FiHome,
  FiLayers,
  FiPieChart,
  FiSettings,
  FiTarget,
  FiUser,
  FiUserCheck,
  FiUsers
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import usePermissions from '../../hooks/usePermissions';
import { useSettings } from '../../hooks/useSettings';

const links = [
  { to: '/', label: 'Dashboard', key: 'dashboard', icon: FiHome },
  { to: '/members', label: 'Members', key: 'members', icon: FiUsers },
  { to: '/trainers', label: 'Trainers', key: 'trainers', icon: FiUserCheck },
  { to: '/membership/plans', label: 'Membership', key: 'membership', icon: FiClipboard },
  { to: '/attendance', label: 'Attendance', key: 'attendance', icon: FiActivity },
  { to: '/payments', label: 'Payments', key: 'payments', icon: FiCreditCard },
  { to: '/classes', label: 'Classes', key: 'classes', icon: FiGrid },
  { to: '/workout/plans', label: 'Workout', key: 'workout', icon: FiTarget },
  { to: '/diet/plans', label: 'Diet', key: 'diet', icon: FiLayers },
  { to: '/staff', label: 'Staff', key: 'staff', icon: FiUser },
  { to: '/equipment', label: 'Equipment', key: 'equipment', icon: FiHardDrive },
  { to: '/inventory/products', label: 'Inventory', key: 'inventory', icon: FiBox },
  { to: '/notifications', label: 'Notifications', key: 'notifications', icon: FiBell },
  { to: '/reports/revenue', label: 'Reports', key: 'reports', icon: FiPieChart },
  { to: '/settings/general', label: 'Settings', key: 'settings', icon: FiSettings }
];

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth();
  const { canAccess } = usePermissions();
  const { settings } = useSettings();
  const general = settings?.general || {};
  const visibleLinks = links.filter((link) => canAccess(link.key));
  const brandName = general.gym_name || 'Vertex Gym';

  return (
    <>
      <div className={`fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm transition lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={onClose} />
      <aside className={`sidebar-shell fixed inset-y-0 left-0 z-50 flex w-[88vw] max-w-[21rem] flex-col border-r border-white/80 bg-[linear-gradient(180deg,#ffffff_0%,#f6fbff_55%,#eef7ff_100%)] p-4 text-slate-900 shadow-[0_20px_80px_rgba(14,30,37,0.18)] transition-transform duration-300 sm:p-5 lg:sticky lg:top-0 lg:min-h-screen lg:w-[19rem] lg:translate-x-0 lg:shadow-none xl:w-80 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-sky-700/70">Gym</p>
            <div className="mt-2 bg-gradient-to-r from-sky-700 via-blue-700 to-emerald-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">{brandName}</div>
            <p className="mt-2 max-w-xs text-sm text-slate-500">Premium operations dashboard</p>
          </div>
          <button type="button" className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm lg:hidden" onClick={onClose}>
            Close
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
          {visibleLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) => `sidebar-link group flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-medium transition sm:px-4 ${isActive ? 'bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-white shadow-lg shadow-sky-200' : 'text-slate-700 hover:bg-white hover:shadow-sm'}`}
            >
              <span className={`flex h-9 w-9 items-center justify-center rounded-2xl transition ${Icon ? '' : 'hidden'}`}>
                {Icon ? <Icon className="text-[1.05rem]" /> : null}
              </span>
              <span className="min-w-0 truncate">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-profile mt-5 rounded-3xl border border-sky-100 bg-white/90 p-4 text-sm text-slate-600 shadow-sm">
          <p className="font-semibold text-slate-900">{user?.full_name}</p>
          <p className="mt-1 capitalize">{String(user?.role || '').replace('_', ' ')}</p>
        </div>
      </aside>
    </>
  );
}
