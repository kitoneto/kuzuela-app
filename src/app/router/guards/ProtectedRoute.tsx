import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import { Loading } from '../../../components/common/Loading';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuthContext();
  if (loading) return <Loading fullScreen />;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export function PublicOnlyRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuthContext();
  if (loading) return <Loading fullScreen />;
  if (user) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}
