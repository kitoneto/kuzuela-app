import { supabase } from '../client';
import type { LanguageCode, ProficiencyCode, UserLanguageProgress } from '../../../shared/types/languages.types';

export class UserLanguageProgressRepository {
  async getProgress(userId: string, lang: LanguageCode): Promise<UserLanguageProgress | null> {
    try {
      const { data, error } = await supabase
        .from('user_language_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('language_code', lang)
        .single();
      if (error || !data) return null;
      return this.mapRow(data);
    } catch {
      return null;
    }
  }

  async getAllProgress(userId: string): Promise<UserLanguageProgress[]> {
    try {
      const { data, error } = await supabase
        .from('user_language_progress')
        .select('*')
        .eq('user_id', userId);
      if (error || !data) return [];
      return data.map(row => this.mapRow(row));
    } catch {
      return [];
    }
  }

  async updateProgress(userId: string, lang: LanguageCode, progress: Partial<UserLanguageProgress>): Promise<void> {
    const dbData: Record<string, unknown> = {};
    if (progress.totalLessonsCompleted !== undefined) dbData.total_lessons_completed = progress.totalLessonsCompleted;
    if (progress.totalXP !== undefined) dbData.total_xp = progress.totalXP;
    if (progress.currentLevel !== undefined) dbData.current_level = progress.currentLevel;
    if (progress.streakDays !== undefined) dbData.streak_days = progress.streakDays;
    if (progress.bestStreakDays !== undefined) dbData.best_streak_days = progress.bestStreakDays;
    if (progress.lastActivityAt !== undefined) dbData.last_activity_at = progress.lastActivityAt;

    const { error } = await supabase
      .from('user_language_progress')
      .upsert({ user_id: userId, language_code: lang, ...dbData }, { onConflict: 'user_id,language_code' });

    if (error) throw new Error(error.message);
  }

  async initializeProgress(userId: string, lang: LanguageCode): Promise<void> {
    const { error } = await supabase.from('user_language_progress').upsert(
      {
        user_id: userId,
        language_code: lang,
        total_lessons_completed: 0,
        total_xp: 0,
        current_level: 'A1',
        streak_days: 0,
        best_streak_days: 0,
        last_activity_at: null,
      },
      { onConflict: 'user_id,language_code' }
    );
    if (error) throw new Error(error.message);
  }

  private mapRow(row: Record<string, unknown>): UserLanguageProgress {
    return {
      userId: row.user_id as string,
      languageCode: row.language_code as LanguageCode,
      totalLessonsCompleted: row.total_lessons_completed as number,
      totalXP: row.total_xp as number,
      currentLevel: row.current_level as ProficiencyCode,
      streakDays: row.streak_days as number,
      bestStreakDays: row.best_streak_days as number,
      lastActivityAt: row.last_activity_at as string | null,
    };
  }
}
