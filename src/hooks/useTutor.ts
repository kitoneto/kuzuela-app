import { useState, useCallback } from 'react';
import type { TutorMessage, TutorPersona } from '../types';
import { supabase } from '../lib/supabase';
import { useAuthContext } from '../contexts/AuthContext';

export const TUTOR_PERSONAS: TutorPersona[] = [
  {
    id: 'luna',
    name: 'Luna',
    language_code: 'en',
    avatar_emoji: '🌙',
    description: 'Friendly English tutor with a calm, encouraging style',
    greeting: "Hi! I'm Luna, your English tutor. I'm here to help you learn and practice English. What would you like to work on today?",
  },
  {
    id: 'pedro',
    name: 'Pedro',
    language_code: 'pt',
    avatar_emoji: '🌴',
    description: 'Enthusiastic Portuguese tutor from Luanda',
    greeting: "Olá! Sou o Pedro, o teu tutor de Português. Estou aqui para te ajudar a aprender a língua. Por onde começamos?",
  },
  {
    id: 'sofia',
    name: 'Sofia',
    language_code: 'fr',
    avatar_emoji: '🌸',
    description: 'Elegant French tutor with a passion for culture',
    greeting: "Bonjour! Je suis Sofia, votre professeure de français. Je suis là pour vous aider à apprendre le français. Par où voulez-vous commencer?",
  },
  {
    id: 'carlos',
    name: 'Carlos',
    language_code: 'es',
    avatar_emoji: '☀️',
    description: 'Energetic Spanish tutor who loves conversation',
    greeting: "¡Hola! Soy Carlos, tu tutor de español. Estoy aquí para ayudarte a aprender el idioma. ¿Por dónde empezamos?",
  },
];

const MOCK_RESPONSES: Record<string, string[]> = {
  luna: [
    "Great question! Let me explain that for you. In English, we often use the present continuous to describe things happening right now.",
    "You're doing really well! Keep practicing and you'll get there.",
    "That's a common mistake. Remember, in English the adjective comes before the noun.",
    "Excellent! Your pronunciation is improving. Let's try a more complex sentence now.",
    "Let me give you an example: 'I am learning English every day.' Notice how 'am learning' shows an ongoing action.",
  ],
  pedro: [
    "Muito bem! Em Português, usamos o pretérito perfeito para ações concluídas no passado.",
    "Estás a aprender muito bem! Continua assim.",
    "Lembra-te: em Português, os adjetivos geralmente concordam com o substantivo em género e número.",
    "Excelente! A tua pronúncia está a melhorar. Vamos tentar uma frase mais complexa.",
    "Vou dar-te um exemplo: 'Eu estou a aprender Português todos os dias.' Nota como 'estou a aprender' indica uma ação contínua.",
  ],
};

export function useTutor() {
  const { user } = useAuthContext();
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<TutorPersona>(TUTOR_PERSONAS[0]);
  const [loading, setLoading] = useState(false);

  const loadMessages = useCallback(async (personaId: string) => {
    if (!user) return;
    try {
      const { data } = await supabase
        .from('tutor_messages')
        .select('*')
        .eq('user_id', user.id)
        .eq('persona', personaId)
        .order('created_at')
        .limit(50);
      if (data && data.length > 0) {
        setMessages(data as TutorMessage[]);
      } else {
        const persona = TUTOR_PERSONAS.find(p => p.id === personaId) ?? TUTOR_PERSONAS[0];
        setMessages([{
          id: 'greeting',
          user_id: user?.id ?? '',
          persona: personaId,
          role: 'assistant',
          content: persona.greeting,
          lesson_context: null,
          created_at: new Date().toISOString(),
        }]);
      }
    } catch {
      const persona = TUTOR_PERSONAS.find(p => p.id === personaId) ?? TUTOR_PERSONAS[0];
      setMessages([{
        id: 'greeting',
        user_id: user?.id ?? '',
        persona: personaId,
        role: 'assistant',
        content: persona.greeting,
        lesson_context: null,
        created_at: new Date().toISOString(),
      }]);
    }
  }, [user]);

  const sendMessage = async (content: string, lessonContext?: string) => {
    if (!user) return;
    setLoading(true);

    const userMessage: TutorMessage = {
      id: String(Date.now()),
      user_id: user.id,
      persona: selectedPersona.id,
      role: 'user',
      content,
      lesson_context: lessonContext ?? null,
      created_at: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      await supabase.from('tutor_messages').insert(userMessage);

      // Try to get AI response from edge function
      const { data: aiData, error: aiError } = await supabase.functions.invoke('tutor-chat', {
        body: { message: content, persona: selectedPersona.id, lessonContext },
      });

      let responseContent: string;
      if (aiError || !aiData?.response) {
        const responses = MOCK_RESPONSES[selectedPersona.id] ?? MOCK_RESPONSES['luna'];
        responseContent = responses[Math.floor(Math.random() * responses.length)];
      } else {
        responseContent = aiData.response;
      }

      const assistantMessage: TutorMessage = {
        id: String(Date.now() + 1),
        user_id: user.id,
        persona: selectedPersona.id,
        role: 'assistant',
        content: responseContent,
        lesson_context: lessonContext ?? null,
        created_at: new Date().toISOString(),
      };

      await supabase.from('tutor_messages').insert(assistantMessage);
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      const responses = MOCK_RESPONSES[selectedPersona.id] ?? MOCK_RESPONSES['luna'];
      const responseContent = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, {
        id: String(Date.now() + 1),
        user_id: user.id,
        persona: selectedPersona.id,
        role: 'assistant',
        content: responseContent,
        lesson_context: lessonContext ?? null,
        created_at: new Date().toISOString(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const selectPersona = (persona: TutorPersona) => {
    setSelectedPersona(persona);
    setMessages([]);
    loadMessages(persona.id);
  };

  return { messages, selectedPersona, loading, sendMessage, selectPersona, personas: TUTOR_PERSONAS, loadMessages };
}
