import { useAuth } from '../../../app/providers/AuthProvider';
import type { UserRole } from '../types/auth.types';

export function useRole(): UserRole | null {
  const { user } = useAuth();
  if (!user) return null;
  return (user.user_metadata?.role as UserRole | undefined) ?? 'student';
}
