import { useProgress } from '../../progress/hooks/useProgress';
export function useStreak() {
  const { stats, loading } = useProgress();
  return { streak: stats?.currentStreak ?? 0, loading };
}
