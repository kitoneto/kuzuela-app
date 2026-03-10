import { useState, useEffect } from 'react';
import type { UserProgress } from '../types';
import { supabase } from '../lib/supabase';
import { useAuthContext } from '../contexts/AuthContext';

export function useProgress(lessonId?: string) {
  const { user } = useAuthContext();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchProgress = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id);
        if (lessonId) {
          query = query.eq('lesson_id', lessonId);
        }
        const { data } = await query;
        setProgress((data as UserProgress[]) ?? []);
      } catch {
        setProgress([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, [user, lessonId]);

  const completeLesson = async (lessonId: string, score: number, xpEarned: number) => {
    if (!user) return;
    await supabase.from('user_progress').upsert({
      user_id: user.id,
      lesson_id: lessonId,
      completed: true,
      score,
      xp_earned: xpEarned,
      completed_at: new Date().toISOString(),
    });
    setProgress(prev => {
      const existing = prev.findIndex(p => p.lesson_id === lessonId);
      const newEntry: UserProgress = {
        id: String(Date.now()),
        user_id: user.id,
        lesson_id: lessonId,
        completed: true,
        score,
        xp_earned: xpEarned,
        completed_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      };
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newEntry;
        return updated;
      }
      return [...prev, newEntry];
    });
  };

  const isLessonCompleted = (id: string) => progress.some(p => p.lesson_id === id && p.completed);

  return { progress, loading, completeLesson, isLessonCompleted };
}
