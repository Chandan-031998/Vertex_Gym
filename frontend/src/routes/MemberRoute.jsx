import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function MemberRoute({ children }) {
  const { user } = useAuth();
  return user?.role === 'member' || user?.role === 'admin' ? children : <Navigate to="/" replace />;
}
