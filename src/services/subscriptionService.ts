import { supabase } from '../lib/supabase';
import type { Subscription } from '../types';

export const subscriptionService = {
  async getSubscription(userId: string): Promise<Subscription | null> {
    const { data, error } = await supabase.from('subscriptions').select('*').eq('user_id', userId).eq('status', 'active').single();
    if (error) return null;
    return data as Subscription;
  },
};
