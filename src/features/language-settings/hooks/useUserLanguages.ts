import { useState, useEffect, useCallback } from 'react';
import { UserLanguagePreferencesRepository } from '../../../integrations/supabase/repositories/userLanguagePreferences.repository';
import type { LanguageCode, ProficiencyCode, UserLearningLanguage } from '../../../shared/types/languages.types';

const repo = new UserLanguagePreferencesRepository();

export function useUserLanguages(userId?: string) {
  const [learningLanguages, setLearningLanguages] = useState<UserLearningLanguage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLanguages = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const langs = await repo.getUserLearningLanguages(userId);
      setLearningLanguages(langs);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchLanguages();
  }, [fetchLanguages]);

  const addLanguage = useCallback(
    async (lang: LanguageCode, level?: ProficiencyCode) => {
      if (!userId) return;
      await repo.addLearningLanguage(userId, lang, level);
      await fetchLanguages();
    },
    [userId, fetchLanguages]
  );

  const removeLanguage = useCallback(
    async (lang: LanguageCode) => {
      if (!userId) return;
      await repo.removeLearningLanguage(userId, lang);
      setLearningLanguages(prev => prev.filter(l => l.languageCode !== lang));
    },
    [userId]
  );

  return { learningLanguages, isLoading, error, addLanguage, removeLanguage, refresh: fetchLanguages };
}
