import { useState, useEffect, useCallback } from 'react';
import { UserLanguagePreferencesRepository } from '../../../integrations/supabase/repositories/userLanguagePreferences.repository';
import type { UserLanguagePreferences } from '../../../shared/types/languages.types';

const repo = new UserLanguagePreferencesRepository();

export function useLanguagePreferences(userId?: string) {
  const [preferences, setPreferences] = useState<UserLanguagePreferences | null>(null);
  const [isLoading, setIsLoading] = useState(!!userId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    let active = true;
    repo
      .getUserPreferences(userId)
      .then(data => { if (active) { setPreferences(data); setIsLoading(false); } })
      .catch(e => { if (active) { setError((e as Error).message); setIsLoading(false); } });
    return () => { active = false; };
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
