import { useProfile } from './useProfile';

export function useXP() {
  const { profile, updateProfile } = useProfile();
  const xp = profile?.xp ?? 0;

  const levelFromXP = (xp: number) => Math.floor(Math.sqrt(xp / 100)) + 1;
  const xpForLevel = (level: number) => Math.pow(level - 1, 2) * 100;
  const xpForNextLevel = (level: number) => Math.pow(level, 2) * 100;

  const level = levelFromXP(xp);
  const currentLevelXP = xpForLevel(level);
  const nextLevelXP = xpForNextLevel(level);
  const progressPercent = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  const addXP = async (amount: number) => {
    if (!profile) return;
    await updateProfile({ xp: xp + amount });
  };

  return { xp, level, progressPercent, currentLevelXP, nextLevelXP, addXP };
}
