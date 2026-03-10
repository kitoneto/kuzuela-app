import { useState, useEffect, useCallback } from 'react';
import { UserLanguageProgressRepository } from '../../../integrations/supabase/repositories/userLanguageProgress.repository';
import type { LanguageCode, UserLanguageProgress } from '../../../shared/types/languages.types';

const repo = new UserLanguageProgressRepository();

export function useLanguageProgress(userId?: string) {
  const [progress, setProgress] = useState<UserLanguageProgress[]>([]);
  const [isLoading, setIsLoading] = useState(!!userId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    let active = true;
    repo
      .getAllProgress(userId)
      .then(data => { if (active) { setProgress(data); setIsLoading(false); } })
      .catch(e => { if (active) { setError((e as Error).message); setIsLoading(false); } });
    return () => { active = false; };
  }, [userId]);

  const getProgressForLanguage = useCallback(
    (lang: LanguageCode): UserLanguageProgress | undefined => {
      return progress.find(p => p.languageCode === lang);
    },
    [progress]
  );

  const refreshProgress = useCallback(async () => {
    if (!userId) return;
    const all = await repo.getAllProgress(userId);
    setProgress(all);
  }, [userId]);

  return { progress, isLoading, error, getProgressForLanguage, refreshProgress };
}
