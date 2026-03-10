import type { ProgressStats, Achievement } from '../types/progress.types';

const MOCK_STATS: ProgressStats = {
  totalXP: 1250,
  currentStreak: 7,
  longestStreak: 14,
  lessonsCompleted: 12,
  coursesEnrolled: 2,
  weeklyXP: [45, 80, 30, 95, 60, 120, 70],
  dailyGoal: 50,
  dailyProgress: 35,
};

const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: '1', key: 'first_lesson', title: 'First Steps', description: 'Complete your first lesson', icon: '👣', isUnlocked: true, unlockedAt: '2025-01-01' },
  { id: '2', key: 'streak_3', title: '3-Day Streak', description: 'Maintain a 3-day streak', icon: '🔥', isUnlocked: true, unlockedAt: '2025-01-03' },
  { id: '3', key: 'streak_7', title: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '⚔️', isUnlocked: true, unlockedAt: '2025-01-07' },
  { id: '4', key: 'streak_30', title: 'Monthly Master', description: 'Maintain a 30-day streak', icon: '🏆', isUnlocked: false, progress: 7, maxProgress: 30 },
  { id: '5', key: 'xp_100', title: 'Century', description: 'Earn 100 XP', icon: '💯', isUnlocked: true, unlockedAt: '2025-01-05' },
  { id: '6', key: 'xp_1000', title: 'XP Master', description: 'Earn 1000 XP', icon: '⭐', isUnlocked: true, unlockedAt: '2025-01-15' },
  { id: '7', key: 'xp_5000', title: 'Legend', description: 'Earn 5000 XP', icon: '🌟', isUnlocked: false, progress: 1250, maxProgress: 5000 },
  { id: '8', key: 'courses_2', title: 'Explorer', description: 'Enroll in 2 courses', icon: '🗺️', isUnlocked: true, unlockedAt: '2025-01-10' },
  { id: '9', key: 'perfect_lesson', title: 'Perfectionist', description: 'Complete a lesson with 100% score', icon: '💎', isUnlocked: false },
  { id: '10', key: 'social_share', title: 'Social', description: 'Share your progress', icon: '📱', isUnlocked: false },
];

export class ProgressService {
  async getStats(_userId: string): Promise<ProgressStats> {
    await new Promise(r => setTimeout(r, 300));
    return MOCK_STATS;
  }

  async getAchievements(_userId: string): Promise<Achievement[]> {
    await new Promise(r => setTimeout(r, 200));
    return MOCK_ACHIEVEMENTS;
  }
}

export const progressService = new ProgressService();
