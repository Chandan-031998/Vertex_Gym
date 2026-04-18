import { NavLink } from 'react-router-dom';
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineArchiveBox,
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBarSquare,
  HiOutlineClipboardDocumentCheck,
  HiOutlineClipboardDocumentList,
  HiOutlineCog6Tooth,
  HiOutlineCube,
  HiOutlineHome,
  HiOutlineSparkles,
  HiOutlineUserGroup,
  HiOutlineUsers,
  HiOutlineWrenchScrewdriver
} from 'react-icons/hi2';
import { useAuth } from '../../hooks/useAuth';
import usePermissions from '../../hooks/usePermissions';
import { useSettings } from '../../hooks/useSettings';

const links = [
  { to: '/', label: 'Dashboard', key: 'dashboard', icon: HiOutlineHome },
  { to: '/members', label: 'Members', key: 'members', icon: HiOutlineUsers },
  { to: '/trainers', label: 'Trainers', key: 'trainers', icon: HiOutlineUserGroup },
  { to: '/membership/plans', label: 'Membership', key: 'membership', icon: HiOutlineClipboardDocumentList },
  { to: '/attendance', label: 'Attendance', key: 'attendance', icon: HiOutlineClipboardDocumentCheck },
  { to: '/payments', label: 'Payments', key: 'payments', icon: HiOutlineBanknotes },
  { to: '/classes', label: 'Classes', key: 'classes', icon: HiOutlineCalendarDays },
  { to: '/workout/plans', label: 'Workout', key: 'workout', icon: HiOutlineSparkles },
  { to: '/diet/plans', label: 'Diet', key: 'diet', icon: HiOutlineAdjustmentsHorizontal },
  { to: '/staff', label: 'Staff', key: 'staff', icon: HiOutlineUserGroup },
  { to: '/equipment', label: 'Equipment', key: 'equipment', icon: HiOutlineWrenchScrewdriver },
  { to: '/inventory/products', label: 'Inventory', key: 'inventory', icon: HiOutlineArchiveBox },
  { to: '/reports/revenue', label: 'Reports', key: 'reports', icon: HiOutlineChartBarSquare },
  { to: '/settings/general', label: 'Settings', key: 'settings', icon: HiOutlineCog6Tooth }
];

function getInitials(name) {
  return String(name || 'Gym Admin')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth();
  const { canAccess } = usePermissions();
  const { settings } = useSettings();
  const brandName = settings?.general?.gym_name || 'Vertex Gym';
  const visibleLinks = links.filter((link) => canAccess(link.key));

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/25 backdrop-blur-sm transition lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
      />

      <aside
        className={`dashboard-sidebar dashboard-scrollbar fixed inset-y-0 left-0 z-50 flex w-[17rem] flex-col overflow-y-auto px-4 py-5 transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-start justify-between gap-3 px-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
              <span className="h-2 w-2 rounded-full dashboard-gradient" />
              Gym ERP
            </div>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">{brandName}</h1>
            <p className="mt-1 text-sm text-slate-500">Operations dashboard</p>
          </div>
          <button
            type="button"
            className="dashboard-action inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 text-slate-500 lg:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <HiOutlineCube className="text-lg" />
          </button>
        </div>

        <nav className="mt-8 space-y-1.5">
          {visibleLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `dashboard-action flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium ${
                  isActive
                    ? 'dashboard-gradient text-white shadow-[0_16px_30px_rgba(108,100,255,0.32)]'
                    : 'text-slate-600 hover:bg-white/75 hover:text-slate-900'
                }`
              }
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 text-lg">
                <Icon />
              </span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="dashboard-inset mt-8 rounded-[22px] p-4">
          <div className="flex items-center gap-3">
            <div className="dashboard-gradient inline-flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-semibold text-white">
              {getInitials(user?.full_name)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">{user?.full_name || 'Gym Admin'}</p>
              <p className="truncate text-xs capitalize text-slate-500">{String(user?.role || 'operator').replace('_', ' ')}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
