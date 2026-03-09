import { useAppContext } from '../contexts/AppContext';
export function useProfile() {
  const { profile, loadingProfile, refreshProfile, updateProfile } = useAppContext();
  return { profile, loading: loadingProfile, refreshProfile, updateProfile };
}
