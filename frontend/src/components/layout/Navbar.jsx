import { useContext, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HiChevronDown,
  HiMagnifyingGlass,
  HiMoon,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineBars3,
  HiOutlineBell,
  HiOutlineCog6Tooth,
  HiOutlineUserCircle,
  HiSun
} from 'react-icons/hi2';
import { NotificationContext } from '../../context/NotificationContext';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { getMembers } from '../../services/memberService';
import { getTrainers } from '../../services/trainerService';

function getInitials(name) {
  return String(name || 'Gym Admin')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notify } = useContext(NotificationContext);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimerRef = useRef(null);

  const statusLabel = useMemo(() => String(user?.role || 'operator').replace('_', ' '), [user?.role]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    try {
      setSearching(true);
      const [members, trainers] = await Promise.all([
        getMembers({ search: trimmed }),
        getTrainers({ search: trimmed })
      ]);

      const memberRows = Array.isArray(members?.data) ? members.data : Array.isArray(members) ? members : [];
      const trainerRows = Array.isArray(trainers?.data) ? trainers.data : Array.isArray(trainers) ? trainers : [];

      if (memberRows.length) {
        navigate(`/members?search=${encodeURIComponent(trimmed)}`);
        return;
      }

      if (trainerRows.length) {
        navigate(`/trainers?search=${encodeURIComponent(trimmed)}`);
        return;
      }

      notify(`No member or trainer found for "${trimmed}"`, 'error');
    } catch (error) {
      notify(error?.response?.data?.message || 'Search is unavailable right now', 'error');
    } finally {
      setSearching(false);
    }
  };

  const scheduleMenuClose = () => {
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setMenuOpen(false), 120);
  };

  return (
    <header className="sticky top-0 z-30 px-4 pt-4 sm:px-6 lg:px-8 xl:px-10">
      <div className="dashboard-panel flex flex-col gap-4 rounded-[28px] px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="dashboard-action inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white/70 text-slate-600 lg:hidden"
            aria-label="Open sidebar"
          >
            <HiOutlineBars3 className="text-xl" />
          </button>

          <form onSubmit={handleSearch} className="dashboard-inset flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-4 py-3 lg:min-w-[24rem] lg:flex-none">
            <HiMagnifyingGlass className="shrink-0 text-lg text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searching ? 'Searching members and trainers...' : 'Search members, trainers, classes...'}
              className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </form>
        </div>

        <div className="flex flex-wrap items-center gap-3 lg:justify-end">
          <button
            type="button"
            className="dashboard-action dashboard-inset inline-flex h-12 w-12 items-center justify-center rounded-2xl text-slate-500"
            aria-label="Notifications"
          >
            <HiOutlineBell className="text-xl" />
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="dashboard-action dashboard-inset inline-flex items-center gap-2 rounded-2xl px-3 py-3 text-sm font-medium text-slate-600"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <span className={`inline-flex h-8 w-8 items-center justify-center rounded-xl ${theme === 'light' ? 'dashboard-gradient text-white' : 'bg-slate-900/10 text-slate-500'}`}>
              <HiSun className="text-base" />
            </span>
            <span className={`inline-flex h-8 w-8 items-center justify-center rounded-xl ${theme === 'dark' ? 'dashboard-gradient text-white' : 'bg-slate-900/10 text-slate-500'}`}>
              <HiMoon className="text-base" />
            </span>
          </button>

          <div
            className="relative"
            onMouseEnter={() => {
              window.clearTimeout(closeTimerRef.current);
              setMenuOpen(true);
            }}
            onMouseLeave={scheduleMenuClose}
          >
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="dashboard-action dashboard-inset inline-flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left"
            >
              <div className="dashboard-gradient inline-flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-semibold text-white">
                {getInitials(user?.full_name)}
              </div>
              <div className="hidden min-w-0 sm:block">
                <p className="truncate text-sm font-semibold text-slate-900">{user?.full_name || 'Gym Admin'}</p>
                <p className="truncate text-xs capitalize text-slate-500">{statusLabel}</p>
              </div>
              <HiChevronDown className="hidden text-slate-400 sm:block" />
            </button>

            {menuOpen ? (
              <div className="dashboard-card absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl p-2">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/settings/profile');
                  }}
                  className="dashboard-action flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm text-slate-600 hover:bg-slate-50/80"
                >
                  <HiOutlineUserCircle className="text-lg" />
                  Profile Settings
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/settings/general');
                  }}
                  className="dashboard-action flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm text-slate-600 hover:bg-slate-50/80"
                >
                  <HiOutlineCog6Tooth className="text-lg" />
                  Workspace Settings
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="dashboard-action mt-1 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-rose-500 hover:bg-rose-50"
                >
                  <HiOutlineArrowLeftOnRectangle className="text-lg" />
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
