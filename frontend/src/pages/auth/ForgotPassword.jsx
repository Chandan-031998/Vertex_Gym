import { useState } from 'react';
import AuthLayout from '../../components/layout/AuthLayout';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { forgotPassword } from '../../services/authService';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await forgotPassword({ email });
    setMessage(`Reset token generated: ${response.data.reset_token || 'No matching account'}`);
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <Card title="Forgot Password">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input type="email" placeholder="Registered email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <Button type="submit" className="w-full">Generate Reset Token</Button>
            {message ? <p className="text-sm text-slate-600">{message}</p> : null}
          </form>
        </Card>
      </div>
    </AuthLayout>
  );
}
