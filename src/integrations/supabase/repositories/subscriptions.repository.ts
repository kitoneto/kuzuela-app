import { supabaseClient } from '../client';
import type { DbSubscription } from '../types';

export class SubscriptionsRepository {
  async getUserSubscription(userId: string) {
    return supabaseClient
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single<DbSubscription>();
  }

  async getPlans() {
    return supabaseClient.from('plans').select('*');
  }

  async updateSubscription(id: string, updates: Partial<DbSubscription>) {
    return supabaseClient
      .from('subscriptions')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single<DbSubscription>();
  }
}

export const subscriptionsRepository = new SubscriptionsRepository();
