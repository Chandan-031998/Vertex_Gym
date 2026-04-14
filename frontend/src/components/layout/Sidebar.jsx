import { useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  FiUsers,
  FiChevronDown
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import usePermissions from '../../hooks/usePermissions';

const groups = [
  {
    title: 'Overview',
    links: [
      { to: '/', label: 'Dashboard', key: 'dashboard', icon: FiHome }
    ]
  },
  {
    title: 'Member Management',
    links: [
      { to: '/members', label: 'Members', key: 'members', icon: FiUsers },
      { to: '/trainers', label: 'Trainers', key: 'trainers', icon: FiUserCheck },
      { to: '/membership/plans', label: 'Membership', key: 'membership', icon: FiClipboard },
      { to: '/attendance', label: 'Attendance', key: 'attendance', icon: FiActivity },
      { to: '/payments', label: 'Payments', key: 'payments', icon: FiCreditCard },
      { to: '/classes', label: 'Classes', key: 'classes', icon: FiGrid },
      { to: '/workout/plans', label: 'Workout', key: 'workout', icon: FiTarget },
      { to: '/diet/plans', label: 'Diet', key: 'diet', icon: FiLayers }
    ]
  },
  {
    title: 'Operations',
    links: [
      { to: '/staff', label: 'Staff', key: 'staff', icon: FiUser },
      { to: '/equipment', label: 'Equipment', key: 'equipment', icon: FiHardDrive },
      { to: '/inventory/products', label: 'Inventory', key: 'inventory', icon: FiBox },
      { to: '/notifications', label: 'Notifications', key: 'notifications', icon: FiBell }
    ]
  },
  {
    title: 'Control Center',
    links: [
      { to: '/reports/revenue', label: 'Reports', key: 'reports', icon: FiPieChart },
      { to: '/settings/general', label: 'Settings', key: 'settings', icon: FiSettings }
    ]
  }
];

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth();
  const { canAccess } = usePermissions();
  const location = useLocation();
  const visibleGroups = groups
    .map((group) => ({ ...group, links: group.links.filter((link) => canAccess(link.key)) }))
    .filter((group) => group.links.length > 0);

  const initialOpenGroups = useMemo(
    () =>
      visibleGroups.reduce((acc, group) => {
        acc[group.title] = group.links.some((link) => link.to === location.pathname);
        return acc;
      }, {}),
    [visibleGroups, location.pathname]
  );
  const [openGroups, setOpenGroups] = useState(initialOpenGroups);

  const toggleGroup = (title) => {
    setOpenGroups((current) => ({ ...current, [title]: !current[title] }));
  };

  return (
    <>
      <div className={`fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm transition lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={onClose} />
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[88vw] max-w-[21rem] flex-col border-r border-white/80 bg-[linear-gradient(180deg,#ffffff_0%,#f6fbff_55%,#eef7ff_100%)] p-4 text-slate-900 shadow-[0_20px_80px_rgba(14,30,37,0.18)] transition-transform duration-300 sm:p-5 lg:sticky lg:top-0 lg:min-h-screen lg:w-[19rem] lg:translate-x-0 lg:shadow-none xl:w-80 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-sky-700/70">Vertex</p>
            <div className="mt-2 bg-gradient-to-r from-sky-700 via-blue-700 to-emerald-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">Gym ERP</div>
            <p className="mt-2 max-w-xs text-sm text-slate-500">Premium operations dashboard</p>
          </div>
          <button type="button" className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm lg:hidden" onClick={onClose}>
            Close
          </button>
        </div>

        <nav className="flex-1 space-y-4 overflow-y-auto pr-1">
          {visibleGroups.map((group) => (
            <div key={group.title}>
              <button
                type="button"
                onClick={() => toggleGroup(group.title)}
                className="mb-2 flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 transition hover:bg-white/70"
              >
                <span>{group.title}</span>
                <FiChevronDown className={`text-sm transition-transform ${openGroups[group.title] ? 'rotate-180' : ''}`} />
              </button>
              <div className={`space-y-1 overflow-hidden transition-all duration-200 ${openGroups[group.title] ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'}`}>
                {group.links.map(({ to, label, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={onClose}
                    className={({ isActive }) => `group flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-medium transition sm:px-4 ${isActive ? 'bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-white shadow-lg shadow-sky-200' : 'text-slate-700 hover:bg-white hover:shadow-sm'}`}
                  >
                    <span className={`flex h-9 w-9 items-center justify-center rounded-2xl transition ${Icon ? '' : 'hidden'}`}>
                      {Icon ? <Icon className="text-[1.05rem]" /> : null}
                    </span>
                    <span className="min-w-0 truncate">{label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-5 rounded-3xl border border-sky-100 bg-white/90 p-4 text-sm text-slate-600 shadow-sm">
          <p className="font-semibold text-slate-900">{user?.full_name}</p>
          <p className="mt-1 capitalize">{String(user?.role || '').replace('_', ' ')}</p>
        </div>
      </aside>
    </>
  );
}
