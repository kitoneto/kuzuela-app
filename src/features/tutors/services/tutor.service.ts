import type { TutorPersona } from '../types/tutor.types';
import type { ChatMessage } from '../types/chat.types';
import { llmClient } from '../../../integrations/ai/llm.client';

const PERSONAS: TutorPersona[] = [
  {id:'1',name:'Kimbito',emoji:'🦁',description:'Your friendly Angolan Portuguese tutor',language:'pt-AO',style:'casual'},
  {id:'2',name:'Miss English',emoji:'🇬🇧',description:'Professional English language coach',language:'en',style:'formal'},
  {id:'3',name:'Monsieur François',emoji:'🇫🇷',description:'Charming French language teacher',language:'fr',style:'elegant'},
];

export class TutorService {
  getPersonas(): TutorPersona[] { return PERSONAS; }
  getPersonaById(id: string): TutorPersona | undefined { return PERSONAS.find(p=>p.id===id); }
  async sendMessage(messages: ChatMessage[], _personaId: string): Promise<string> {
    const history = messages.map(m=>({role:m.role,content:m.content}));
    const res = await llmClient.sendMessage(history);
    return res.message;
  }
}
export const tutorService = new TutorService();
