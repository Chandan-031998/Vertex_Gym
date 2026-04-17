import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { NotificationContext } from '../../context/NotificationContext';
import { getMembers } from '../../services/memberService';
import { getTrainers } from '../../services/trainerService';
import { useTheme } from '../../hooks/useTheme';
import Badge from '../common/Badge';
import SearchBox from '../ui/SearchBox';

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notify } = useContext(NotificationContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    try {
      setSearching(true);
      const [membersResponse, trainersResponse] = await Promise.all([
        getMembers({ search: query }),
        getTrainers({ search: query })
      ]);

      const members = Array.isArray(membersResponse.data) ? membersResponse.data : [];
      const trainers = Array.isArray(trainersResponse.data) ? trainersResponse.data : [];

      if (members.length) {
        navigate(`/members?search=${encodeURIComponent(query)}`);
        return;
      }

      if (trainers.length) {
        navigate(`/trainers?search=${encodeURIComponent(query)}`);
        return;
      }

      notify(`No member or trainer found for "${query}"`, 'error');
    } catch (error) {
      notify(error?.response?.data?.message || 'Unable to search right now', 'error');
    } finally {
      setSearching(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-white/80 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
            onClick={onMenuClick}
          >
            ☰
          </button>
          <div className="min-w-0 flex-1">
            <form className="w-full max-w-xl" onSubmit={handleSearch}>
              <SearchBox
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={searching ? 'Searching...' : 'Search members, trainers, classes...'}
              />
              <button type="submit" className="hidden" aria-hidden="true" />
            </form>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 lg:justify-end">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-1 py-1 shadow-sm transition hover:bg-slate-50"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                theme === 'light' ? 'bg-slate-900 text-white' : 'text-slate-500'
              }`}
            >
              Light
            </span>
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                theme === 'dark' ? 'bg-slate-900 text-white' : 'text-slate-500'
              }`}
            >
              Dark
            </span>
          </button>
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
