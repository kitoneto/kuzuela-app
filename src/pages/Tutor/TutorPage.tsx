import { useState, useEffect, useRef, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { AppLayout } from '../../components/layout/AppLayout';
import { TutorMessageBubble } from '../../components/tutor/TutorMessage';
import { TutorPersonaSelector } from '../../components/tutor/TutorPersonaSelector';
import { useTutor } from '../../hooks/useTutor';
import { useAuth } from '../../hooks/useAuth';

export function TutorPage() {
  const { user } = useAuth();
  const { messages, selectedPersona, loading, sendMessage, selectPersona, loadMessages } = useTutor();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) loadMessages(selectedPersona.id);
  }, [user, selectedPersona.id, loadMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const text = input.trim();
    setInput('');
    await sendMessage(text);
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex flex-col h-[calc(100vh-5rem)]">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center text-2xl">
              {selectedPersona.avatar_emoji}
            </div>
            <div>
              <h1 className="font-bold text-gray-900">{selectedPersona.name}</h1>
              <p className="text-sm text-gray-500">{selectedPersona.description}</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-gray-500">Online</span>
            </div>
          </div>
          <TutorPersonaSelector selected={selectedPersona} onSelect={selectPersona} />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 py-4 min-h-0">
          {messages.length === 0 && !loading && (
            <div className="text-center py-10 text-gray-400">
              <p className="text-3xl mb-2">{selectedPersona.avatar_emoji}</p>
              <p className="text-sm">Start a conversation with {selectedPersona.name}</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id ?? i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <TutorMessageBubble message={msg} avatarEmoji={selectedPersona.avatar_emoji} />
            </motion.div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-lg">
                {selectedPersona.avatar_emoji}
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompts */}
        {messages.length <= 1 && (
          <div className="flex gap-2 flex-wrap mb-3">
            {['Help me practice vocabulary', 'Explain a grammar rule', 'Give me a quiz', 'Correct my sentences'].map(prompt => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="text-xs bg-gray-100 hover:bg-primary-50 hover:text-primary-700 text-gray-600 px-3 py-2 rounded-xl transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSend} className="flex gap-3 pt-3 border-t border-gray-100">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`Message ${selectedPersona.name}...`}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 focus:outline-none text-sm"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-200 text-white rounded-xl transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
