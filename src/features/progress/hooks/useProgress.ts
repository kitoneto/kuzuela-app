import { useState, useEffect } from 'react';
import { useAuth } from '../../../app/providers/AuthProvider';
import type { ProgressStats } from '../types/progress.types';
import { progressService } from '../services/progress.service';

export function useProgress() {
  const { user } = useAuth();
  const [stats, setStats] = useState<ProgressStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    progressService.getStats(user?.id ?? 'mock')
      .then(setStats)
      .finally(() => setLoading(false));
  }, [user?.id]);

  return { stats, loading };
}
