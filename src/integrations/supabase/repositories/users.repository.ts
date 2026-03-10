import { supabaseClient } from '../client';
import type { DbProfile } from '../types';

export class UsersRepository {
  async getProfile(userId: string) {
    return supabaseClient
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single<DbProfile>();
  }

  async updateProfile(userId: string, updates: Partial<DbProfile>) {
    return supabaseClient
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .select()
      .single<DbProfile>();
  }

  async createProfile(profile: Omit<DbProfile, 'id' | 'created_at' | 'updated_at'>) {
    return supabaseClient
      .from('profiles')
      .insert(profile)
      .select()
      .single<DbProfile>();
  }
}

export const usersRepository = new UsersRepository();
