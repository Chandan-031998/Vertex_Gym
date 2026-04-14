import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'admin@gymerp.com', password: 'Admin@123' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      <div className="grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden lg:block">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-700/70">Vertex Fitness Suite</p>
          <h1 className="mt-4 max-w-xl bg-gradient-to-r from-sky-700 via-blue-700 to-emerald-600 bg-clip-text text-5xl font-bold leading-tight text-transparent">
            Run your gym on a bright, premium ERP workspace.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            Members, trainers, attendance, payments, classes, inventory, and reports stay connected in one responsive dashboard built for daily front-desk operations.
          </p>
          <div className="mt-8 grid max-w-xl gap-4 sm:grid-cols-3">
            <div className="glass-card p-4">
              <p className="text-2xl font-bold text-slate-900">24/7</p>
              <p className="mt-1 text-sm text-slate-500">Member tracking</p>
            </div>
            <div className="glass-card p-4">
              <p className="text-2xl font-bold text-slate-900">Live</p>
              <p className="mt-1 text-sm text-slate-500">Attendance control</p>
            </div>
            <div className="glass-card p-4">
              <p className="text-2xl font-bold text-slate-900">Smart</p>
              <p className="mt-1 text-sm text-slate-500">Revenue visibility</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md justify-self-center">
          <Card title="Login to Gym ERP" className="border-sky-100/80 bg-white/92 p-6 sm:p-7">
            <p className="mb-5 text-sm text-slate-500">Use your admin credentials to access the control center.</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <Button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500">
              {submitting ? 'Signing in...' : 'Login'}
            </Button>
          </form>
          </Card>
        </div>
      </div>
    </AuthLayout>
  );
}
