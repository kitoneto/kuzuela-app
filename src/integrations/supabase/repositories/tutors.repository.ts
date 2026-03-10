import { supabaseClient } from '../client';
import type { DbTutorMessage } from '../types';

export class TutorsRepository {
  async getTutorPersonas() {
    return supabaseClient.from('tutor_personas').select('*');
  }

  async getTutorConfig(personaId: string) {
    return supabaseClient
      .from('tutor_personas')
      .select('*')
      .eq('id', personaId)
      .single();
  }

  async getMessages(userId: string, personaId: string) {
    return supabaseClient
      .from('tutor_messages')
      .select('*')
      .eq('user_id', userId)
      .eq('tutor_persona_id', personaId)
      .order('created_at', { ascending: true })
      .returns<DbTutorMessage[]>();
  }

  async saveMessage(message: Omit<DbTutorMessage, 'id' | 'created_at'>) {
    return supabaseClient
      .from('tutor_messages')
      .insert(message)
      .select()
      .single<DbTutorMessage>();
  }
}

export const tutorsRepository = new TutorsRepository();
