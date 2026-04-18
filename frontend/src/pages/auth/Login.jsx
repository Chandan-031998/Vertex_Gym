import { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import {
  HiArrowTrendingUp,
  HiOutlineBolt,
  HiOutlineChartBarSquare,
  HiOutlineLockClosed,
  HiOutlineSparkles,
  HiOutlineUserCircle
} from 'react-icons/hi2';
import AuthLayout from '../../components/layout/AuthLayout';
import { useAuth } from '../../hooks/useAuth';

const highlights = [
  { value: '24/7', label: 'Member tracking' },
  { value: 'Live', label: 'Attendance control' },
  { value: 'Smart', label: 'Revenue visibility' }
];

const metrics = [
  {
    icon: HiOutlineBolt,
    title: 'Front desk ready',
    text: 'Fast member check-ins, payment collection, and class operations from one workspace.'
  },
  {
    icon: HiArrowTrendingUp,
    title: 'Revenue clarity',
    text: 'Track collections, due payments, and growth signals without switching tools.'
  },
  {
    icon: HiOutlineChartBarSquare,
    title: 'Operational reporting',
    text: 'Keep admins, trainers, and staff aligned with real-time reporting and visibility.'
  }
];

function LoginField({ icon: Icon, type, placeholder, value, onChange }) {
  return (
    <label className="dashboard-inset flex items-center gap-3 rounded-2xl px-4 py-3.5">
      <Icon className="shrink-0 text-lg text-slate-400" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border-0 bg-transparent text-base text-slate-800 outline-none placeholder:text-slate-400"
      />
    </label>
  );
}

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'admin@gymerp.com', password: 'Admin@123' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError('');
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] xl:gap-16">
        <section className="relative overflow-hidden rounded-[36px] px-2 py-2 lg:px-6">
          <div className="absolute left-0 top-8 h-56 w-56 rounded-full bg-indigo-200/40 blur-3xl" />
          <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-sky-200/35 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-sky-700/70 shadow-[0_12px_30px_rgba(148,163,184,0.15)]">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#5B8CFF]" />
              Vertex Fitness Suite
            </div>

            <h1 className="mt-8 max-w-3xl text-5xl font-semibold leading-[1.06] tracking-tight text-slate-900 sm:text-6xl xl:text-7xl">
              Run your gym on a
              <span className="bg-gradient-to-r from-sky-700 via-blue-700 to-cyan-500 bg-clip-text text-transparent"> bright, premium ERP </span>
              workspace.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-600">
              Members, trainers, attendance, payments, classes, inventory, and reports stay connected in one responsive dashboard built for daily front-desk operations.
            </p>

            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="dashboard-card rounded-[24px] p-5">
                  <p className="text-4xl font-semibold tracking-tight text-slate-900">{item.value}</p>
                  <p className="mt-2 text-base text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid max-w-3xl gap-4">
              {metrics.map(({ icon: Icon, title, text }) => (
                <div key={title} className="dashboard-card flex items-start gap-4 rounded-[24px] p-5">
                  <div className="dashboard-gradient-soft inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl text-indigo-600">
                    <Icon />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{title}</p>
                    <p className="mt-1 text-sm leading-7 text-slate-500">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="dashboard-panel relative mx-auto w-full max-w-xl overflow-hidden rounded-[32px] p-6 sm:p-8">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-indigo-200/35 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-cyan-200/25 blur-3xl" />

            <div className="relative">
              <div className="dashboard-gradient-soft inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">
                <HiOutlineSparkles className="text-sm" />
                Secure access
              </div>

              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Login to Gym ERP</h2>
              <p className="mt-3 text-base leading-7 text-slate-500">
                Use your admin credentials to access the control center.
              </p>

              <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                <LoginField
                  icon={HiOutlineUserCircle}
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                />

                <LoginField
                  icon={HiOutlineLockClosed}
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(event) => setForm({ ...form, password: event.target.value })}
                />

                <div className="flex items-center justify-between gap-4 text-sm">
                  <p className="text-slate-400">Use the account configured in your backend seed data.</p>
                  <Link className="font-semibold text-indigo-600 transition hover:text-indigo-500" to="/forgot-password">
                    Forgot password?
                  </Link>
                </div>

                {error ? (
                  <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="dashboard-action w-full rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 px-5 py-4 text-lg font-semibold text-white shadow-[0_18px_34px_rgba(59,130,246,0.24)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? 'Signing in...' : 'Login'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </AuthLayout>
  );
}
