import { useProgress } from './useProgress';

export function useXP() {
  const { stats, loading } = useProgress();
  return {
    totalXP: stats?.totalXP ?? 0,
    weeklyXP: stats?.weeklyXP ?? [],
    loading,
  };
}
