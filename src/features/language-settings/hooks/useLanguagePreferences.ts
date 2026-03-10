import { useState, useEffect, useCallback } from 'react';
import { UserLanguagePreferencesRepository } from '../../../integrations/supabase/repositories/userLanguagePreferences.repository';
import type { UserLanguagePreferences } from '../../../shared/types/languages.types';

const repo = new UserLanguagePreferencesRepository();

export function useLanguagePreferences(userId?: string) {
  const [preferences, setPreferences] = useState<UserLanguagePreferences | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    setIsLoading(true);
    repo
      .getUserPreferences(userId)
      .then(setPreferences)
      .catch(e => setError((e as Error).message))
      .finally(() => setIsLoading(false));
  }, [userId]);

  const updatePreferences = useCallback(
    async (prefs: Partial<UserLanguagePreferences>) => {
      if (!userId) return;
      await repo.updateUserPreferences(userId, prefs);
      setPreferences(prev => (prev ? { ...prev, ...prefs } : null));
    },
    [userId]
  );

  return { preferences, isLoading, error, updatePreferences };
}
