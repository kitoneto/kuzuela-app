import type { DbProfile } from '../types';

export interface Profile {
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
  role: 'student' | 'premium' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export function mapDbProfileToProfile(db: DbProfile): Profile {
  return {
    id: db.id,
    userId: db.user_id,
    displayName: db.display_name ?? 'Learner',
    avatarUrl: db.avatar_url ?? '',
    xp: db.xp,
    hearts: db.hearts,
    streak: db.streak,
    currentCourseId: db.current_course_id,
    level: db.level,
    isPremium: db.is_premium,
    role: db.role,
    createdAt: db.created_at,
    updatedAt: db.updated_at,
  };
}
