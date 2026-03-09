import { supabase } from '../lib/supabase';
import type { UserProgress } from '../types';

export const progressService = {
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    const { data, error } = await supabase.from('user_progress').select('*').eq('user_id', userId);
    if (error) throw error;
    return (data ?? []) as UserProgress[];
  },

  async completeLesson(userId: string, lessonId: string, score: number, xpEarned: number) {
    const { error } = await supabase.from('user_progress').upsert({
      user_id: userId,
      lesson_id: lessonId,
      completed: true,
      score,
      xp_earned: xpEarned,
      completed_at: new Date().toISOString(),
    });
    if (error) throw error;
  },
};
