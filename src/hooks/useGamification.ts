import { useState, useEffect } from 'react';
import type { Achievement, LeaderboardEntry } from '../types';
import { supabase } from '../lib/supabase';
import { useAuthContext } from '../contexts/AuthContext';

const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: '1', user_id: '', type: 'first_lesson', title: 'First Steps', description: 'Complete your first lesson', icon: '🎯', earned_at: new Date().toISOString() },
  { id: '2', user_id: '', type: 'streak_7', title: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', earned_at: new Date().toISOString() },
  { id: '3', user_id: '', type: 'xp_100', title: 'XP Collector', description: 'Earn 100 XP', icon: '⭐', earned_at: new Date().toISOString() },
];

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: '1', user_id: 'u1', xp_this_week: 850, rank: 1, language_code: 'en', week_start: new Date().toISOString(), profile: { id: 'u1', email: 'ana@example.com', full_name: 'Ana Silva', avatar_url: null, xp: 850, hearts: 5, streak_days: 7, current_course_id: null, subscription_tier: 'pro', created_at: '', updated_at: '' } },
  { id: '2', user_id: 'u2', xp_this_week: 720, rank: 2, language_code: 'en', week_start: new Date().toISOString(), profile: { id: 'u2', email: 'jo@example.com', full_name: 'João Costa', avatar_url: null, xp: 720, hearts: 5, streak_days: 5, current_course_id: null, subscription_tier: 'free', created_at: '', updated_at: '' } },
  { id: '3', user_id: 'u3', xp_this_week: 580, rank: 3, language_code: 'en', week_start: new Date().toISOString(), profile: { id: 'u3', email: 'maria@example.com', full_name: 'Maria Fernanda', avatar_url: null, xp: 580, hearts: 5, streak_days: 3, current_course_id: null, subscription_tier: 'plus', created_at: '', updated_at: '' } },
  { id: '4', user_id: 'u4', xp_this_week: 440, rank: 4, language_code: 'en', week_start: new Date().toISOString(), profile: { id: 'u4', email: 'pedro@example.com', full_name: 'Pedro Alves', avatar_url: null, xp: 440, hearts: 5, streak_days: 2, current_course_id: null, subscription_tier: 'free', created_at: '', updated_at: '' } },
  { id: '5', user_id: 'u5', xp_this_week: 320, rank: 5, language_code: 'en', week_start: new Date().toISOString(), profile: { id: 'u5', email: 'sofia@example.com', full_name: 'Sofia Mendes', avatar_url: null, xp: 320, hearts: 5, streak_days: 1, current_course_id: null, subscription_tier: 'free', created_at: '', updated_at: '' } },
];

export function useGamification() {
  const { user } = useAuthContext();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (user) {
          const { data: achData } = await supabase
            .from('achievements')
            .select('*')
            .eq('user_id', user.id);
          setAchievements(achData && achData.length > 0 ? (achData as Achievement[]) : MOCK_ACHIEVEMENTS.map(a => ({ ...a, user_id: user.id })));
        }

        const { data: lbData } = await supabase
          .from('leaderboard')
          .select('*, profile:profiles(*)')
          .order('xp_this_week', { ascending: false })
          .limit(20);
        setLeaderboard(lbData && lbData.length > 0 ? (lbData as LeaderboardEntry[]) : MOCK_LEADERBOARD);
      } catch {
        if (user) setAchievements(MOCK_ACHIEVEMENTS.map(a => ({ ...a, user_id: user.id })));
        setLeaderboard(MOCK_LEADERBOARD);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  return { achievements, leaderboard, loading };
}
