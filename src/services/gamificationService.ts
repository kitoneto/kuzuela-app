import { supabase } from '../lib/supabase';
import type { Achievement, LeaderboardEntry } from '../types';

export const gamificationService = {
  async getAchievements(userId: string): Promise<Achievement[]> {
    const { data, error } = await supabase.from('achievements').select('*').eq('user_id', userId);
    if (error) throw error;
    return (data ?? []) as Achievement[];
  },

  async getLeaderboard(languageCode?: string): Promise<LeaderboardEntry[]> {
    let query = supabase.from('leaderboard').select('*, profile:profiles(*)').order('xp_this_week', { ascending: false }).limit(20);
    if (languageCode) query = query.eq('language_code', languageCode);
    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []) as LeaderboardEntry[];
  },
};
