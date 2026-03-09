import { supabase } from '../lib/supabase';
import type { Profile } from '../types';

export const profileService = {
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (error) return null;
    return data as Profile;
  },

  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { error } = await supabase.from('profiles').upsert({ id: userId, ...updates, updated_at: new Date().toISOString() });
    if (error) throw error;
  },

  async uploadAvatar(userId: string, file: File): Promise<string | null> {
    const ext = file.name.split('.').pop();
    const path = `${userId}/avatar.${ext}`;
    const { error } = await supabase.storage.from('avatars').upload(path, file, { upsert: true });
    if (error) return null;
    const { data } = supabase.storage.from('avatars').getPublicUrl(path);
    return data.publicUrl;
  },
};
