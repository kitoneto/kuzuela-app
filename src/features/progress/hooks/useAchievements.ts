import { useState, useEffect } from 'react';
import { useAuth } from '../../../app/providers/AuthProvider';
import type { Achievement } from '../types/progress.types';
import { progressService } from '../services/progress.service';

export function useAchievements() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    progressService.getAchievements(user?.id ?? 'mock')
      .then(setAchievements)
      .finally(() => setLoading(false));
  }, [user?.id]);

  const unlocked = achievements.filter(a => a.isUnlocked);
  const locked = achievements.filter(a => !a.isUnlocked);

  return { achievements, unlocked, locked, loading };
}
