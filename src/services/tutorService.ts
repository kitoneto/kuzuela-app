import { supabase } from '../lib/supabase';
import type { TutorMessage } from '../types';

export const tutorService = {
  async getMessages(userId: string, persona: string): Promise<TutorMessage[]> {
    const { data, error } = await supabase
      .from('tutor_messages')
      .select('*')
      .eq('user_id', userId)
      .eq('persona', persona)
      .order('created_at')
      .limit(50);
    if (error) throw error;
    return (data ?? []) as TutorMessage[];
  },

  async sendMessage(message: Omit<TutorMessage, 'id'>) {
    const { error } = await supabase.from('tutor_messages').insert(message);
    if (error) throw error;
  },
};
