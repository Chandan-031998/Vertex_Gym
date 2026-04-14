import { useState } from 'react';
import AuthLayout from '../../components/layout/AuthLayout';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { resetPassword } from '../../services/authService';

export default function ResetPassword() {
  const [form, setForm] = useState({ token: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await resetPassword(form);
    setMessage('Password reset successful. You can login with the new password.');
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <Card title="Reset Password">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input placeholder="Reset token" value={form.token} onChange={(event) => setForm((current) => ({ ...current, token: event.target.value }))} />
            <Input type="password" placeholder="New password" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} />
            <Button type="submit" className="w-full">Reset Password</Button>
            {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
          </form>
        </Card>
      </div>
    </AuthLayout>
  );
}
