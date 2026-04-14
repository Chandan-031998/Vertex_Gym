import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/common/Loader';
import usePermissions from '../hooks/usePermissions';

export default function PrivateRoute({ children, permission }) {
  const { isAuthenticated, loading } = useAuth();
  const { canAccess } = usePermissions();
  if (loading) return <Loader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (permission && !canAccess(permission)) return <Navigate to="/" replace />;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
