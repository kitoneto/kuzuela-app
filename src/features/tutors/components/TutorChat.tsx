import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import type { ChatMessage } from '../types/chat.types';
export function TutorChat({ messages, loading, onSend }: { messages: ChatMessage[]; loading: boolean; onSend: (t:string)=>void }) {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({behavior:'smooth'}); }, [messages]);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!input.trim() || loading) return; onSend(input.trim()); setInput(''); };
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role==='user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${m.role==='user' ? 'bg-purple-600 text-white' : 'bg-white border border-gray-100 text-gray-800'}`}>{m.content}</div>
          </div>
        ))}
        {loading && <div className="flex justify-start"><div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl"><span className="flex gap-1">{[0,1,2].map(i=><span key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:`${i*0.15}s`}}/>)}</span></div></div>}
        <div ref={bottomRef}/>
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 flex gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask me anything..." className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"/>
        <button type="submit" disabled={!input.trim()||loading} className="w-10 h-10 bg-purple-600 text-white rounded-xl flex items-center justify-center disabled:opacity-50 flex-shrink-0">
          <Send className="h-4 w-4"/>
        </button>
      </form>
    </div>
  );
}
