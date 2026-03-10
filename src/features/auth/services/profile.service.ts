import { usersRepository } from '../../../integrations/supabase/repositories/users.repository';
import { mapDbProfileToProfile } from '../../../integrations/supabase/mappers/profile.mapper';
import type { UserProfile } from '../types/profile.types';

const MOCK_PROFILE: UserProfile = {
  id: 'mock-profile-1',
  userId: 'mock-user-1',
  displayName: 'Learner',
  avatarUrl: '',
  xp: 250,
  hearts: 5,
  streak: 3,
  currentCourseId: '1',
  level: 2,
  isPremium: false,
  role: 'student',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export class ProfileService {
  async getProfile(userId: string): Promise<UserProfile> {
    try {
      const { data, error } = await usersRepository.getProfile(userId);
      if (error || !data) return { ...MOCK_PROFILE, userId };
      return mapDbProfileToProfile(data);
    } catch {
      return { ...MOCK_PROFILE, userId };
    }
  }

  async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const dbUpdates = {
        display_name: updates.displayName,
        avatar_url: updates.avatarUrl,
        xp: updates.xp,
        hearts: updates.hearts,
        streak: updates.streak,
      };
      const { data, error } = await usersRepository.updateProfile(userId, dbUpdates);
      if (error || !data) return { ...MOCK_PROFILE, ...updates, userId };
      return mapDbProfileToProfile(data);
    } catch {
      return { ...MOCK_PROFILE, ...updates, userId };
    }
  }
}

export const profileService = new ProfileService();
