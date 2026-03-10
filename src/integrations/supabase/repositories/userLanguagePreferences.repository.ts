import { supabase } from '../client';
import type { LanguageCode, ProficiencyCode, UserLanguagePreferences, UserLearningLanguage } from '../../../shared/types/languages.types';

export class UserLanguagePreferencesRepository {
  async getUserPreferences(userId: string): Promise<UserLanguagePreferences | null> {
    try {
      const { data, error } = await supabase
        .from('user_language_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();
      if (error || !data) return null;
      return {
        nativeLanguage: data.native_language as LanguageCode,
        learningLanguage: data.learning_language as LanguageCode,
        interfaceLanguage: data.interface_language as LanguageCode,
        explanationLanguage: data.explanation_language as LanguageCode,
      };
    } catch {
      return null;
    }
  }

  async updateUserPreferences(userId: string, prefs: Partial<UserLanguagePreferences>): Promise<void> {
    try {
      const dbPrefs: Record<string, string> = {};
      if (prefs.nativeLanguage) dbPrefs.native_language = prefs.nativeLanguage;
      if (prefs.learningLanguage) dbPrefs.learning_language = prefs.learningLanguage;
      if (prefs.interfaceLanguage) dbPrefs.interface_language = prefs.interfaceLanguage;
      if (prefs.explanationLanguage) dbPrefs.explanation_language = prefs.explanationLanguage;

      const { error } = await supabase
        .from('user_language_preferences')
        .upsert({ user_id: userId, ...dbPrefs }, { onConflict: 'user_id' });

      if (error) throw new Error(error.message);
    } catch (err) {
      throw err;
    }
  }

  async getUserLearningLanguages(userId: string): Promise<UserLearningLanguage[]> {
    try {
      const { data, error } = await supabase
        .from('user_learning_languages')
        .select('*')
        .eq('user_id', userId);
      if (error || !data) return [];
      return data.map(row => ({
        userId: row.user_id as string,
        languageCode: row.language_code as LanguageCode,
        proficiencyLevel: row.proficiency_level as ProficiencyCode,
        startedAt: row.started_at as string,
        lastStudiedAt: row.last_studied_at as string | null,
        totalXP: row.total_xp as number,
        streakDays: row.streak_days as number,
      }));
    } catch {
      return [];
    }
  }

  async addLearningLanguage(userId: string, lang: LanguageCode, level: ProficiencyCode = 'A1'): Promise<void> {
    try {
      const { error } = await supabase.from('user_learning_languages').upsert(
        {
          user_id: userId,
          language_code: lang,
          proficiency_level: level,
          started_at: new Date().toISOString(),
          last_studied_at: null,
          total_xp: 0,
          streak_days: 0,
        },
        { onConflict: 'user_id,language_code' }
      );
      if (error) throw new Error(error.message);
    } catch (err) {
      throw err;
    }
  }

  async removeLearningLanguage(userId: string, lang: LanguageCode): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_learning_languages')
        .delete()
        .eq('user_id', userId)
        .eq('language_code', lang);
      if (error) throw new Error(error.message);
    } catch (err) {
      throw err;
    }
  }
}
