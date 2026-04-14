import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function TrainerRoute({ children }) {
  const { user } = useAuth();
  return user?.role === 'trainer' || user?.role === 'admin' ? children : <Navigate to="/" replace />;
}
