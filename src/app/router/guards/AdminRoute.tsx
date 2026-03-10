import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { Loading } from '../../../shared/components/feedback/Loading';

export function AdminRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <Loading fullScreen />;
  if (!user) return <Navigate to="/login" replace />;
  // Check admin role from user metadata
  const role = user.user_metadata?.role as string | undefined;
  if (role !== 'admin') return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}
