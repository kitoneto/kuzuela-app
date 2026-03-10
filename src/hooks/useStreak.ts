import { useProfile } from './useProfile';

export function useStreak() {
  const { profile, updateProfile } = useProfile();
  const streakDays = profile?.streak_days ?? 0;

  const incrementStreak = async () => {
    if (!profile) return;
    await updateProfile({ streak_days: streakDays + 1 });
  };

  const resetStreak = async () => {
    if (!profile) return;
    await updateProfile({ streak_days: 0 });
  };

  return { streakDays, incrementStreak, resetStreak };
}
