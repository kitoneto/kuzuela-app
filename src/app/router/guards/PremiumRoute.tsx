import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { Loading } from '../../../shared/components/feedback/Loading';

export function PremiumRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <Loading fullScreen />;
  if (!user) return <Navigate to="/login" replace />;
  // In a real app, check user's premium status from profile
  return <>{children}</>;
}
