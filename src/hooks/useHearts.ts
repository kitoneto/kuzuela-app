import { useProfile } from './useProfile';

export function useHearts() {
  const { profile, updateProfile } = useProfile();
  const hearts = profile?.hearts ?? 5;
  const maxHearts = 5;

  const loseHeart = async () => {
    if (!profile || hearts <= 0) return;
    await updateProfile({ hearts: hearts - 1 });
  };

  const gainHeart = async () => {
    if (!profile || hearts >= maxHearts) return;
    await updateProfile({ hearts: hearts + 1 });
  };

  const refillHearts = async () => {
    if (!profile) return;
    await updateProfile({ hearts: maxHearts });
  };

  return { hearts, maxHearts, loseHeart, gainHeart, refillHearts };
}
