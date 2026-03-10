import { useState, useCallback } from 'react';
import type { ChatMessage } from '../types/chat.types';
import { tutorService } from '../services/tutor.service';
export function useTutorChat(personaId: string) {
  const persona = tutorService.getPersonaById(personaId);
  const welcome: ChatMessage = { id:'w0', role:'assistant', content:`Hi! I'm ${persona?.name ?? 'your tutor'}. How can I help you today?`, timestamp: new Date() };
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const [loading, setLoading] = useState(false);
  const sendMessage = useCallback(async (text: string) => {
    const userMsg: ChatMessage = { id: Date.now().toString(), role:'user', content:text, timestamp:new Date() };
    setMessages(prev=>[...prev, userMsg]);
    setLoading(true);
    try {
      const reply = await tutorService.sendMessage([...messages, userMsg], personaId);
      setMessages(prev=>[...prev, { id:(Date.now()+1).toString(), role:'assistant', content:reply, timestamp:new Date() }]);
    } finally { setLoading(false); }
  }, [messages, personaId]);
  return { messages, loading, sendMessage };
}
