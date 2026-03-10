import { supabaseClient } from '../client';
import type { DbProgress } from '../types';

export class ProgressRepository {
  async getUserProgress(userId: string) {
    return supabaseClient
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .returns<DbProgress[]>();
  }

  async updateProgress(data: Omit<DbProgress, 'id' | 'created_at' | 'updated_at'>) {
    return supabaseClient
      .from('progress')
      .upsert({ ...data, updated_at: new Date().toISOString() })
      .select()
      .single<DbProgress>();
  }

  async getStats(userId: string) {
    return supabaseClient
      .from('progress')
      .select('xp_earned, completed')
      .eq('user_id', userId)
      .eq('completed', true);
  }
}

export const progressRepository = new ProgressRepository();
