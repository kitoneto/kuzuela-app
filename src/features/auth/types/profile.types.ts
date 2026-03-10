import type { UserRole } from './auth.types';

export interface UserProfile {
  id: string;
  userId: string;
  displayName: string;
  avatarUrl: string;
  xp: number;
  hearts: number;
  streak: number;
  currentCourseId: string | null;
  level: number;
  isPremium: boolean;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}
