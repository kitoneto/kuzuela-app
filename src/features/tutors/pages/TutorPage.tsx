import { useState } from 'react';
import { BottomNav } from '../../../shared/components/navigation/BottomNav';
import { useTutor } from '../hooks/useTutor';
import { useTutorChat } from '../hooks/useTutorChat';
import { TutorCard } from '../components/TutorCard';
import { TutorChat } from '../components/TutorChat';
export function TutorPage() {
  const { personas, selectedId, setSelectedId } = useTutor();
  const [showChat, setShowChat] = useState(false);
  const { messages, loading, sendMessage } = useTutorChat(selectedId);
  if (showChat) return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white px-4 pt-12 pb-3 border-b border-gray-100 flex items-center gap-3">
        <button onClick={()=>setShowChat(false)} className="text-purple-600 font-semibold">← Back</button>
        <span className="text-xl">{personas.find(p=>p.id===selectedId)?.emoji}</span>
        <span className="font-bold text-gray-800">{personas.find(p=>p.id===selectedId)?.name}</span>
      </div>
      <div className="flex-1 overflow-hidden"><TutorChat messages={messages} loading={loading} onSend={sendMessage}/></div>
      <div className="h-16"/>
      <BottomNav/>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">AI Tutor</h1>
        <p className="text-sm text-gray-500">Choose your tutor and start chatting</p>
      </div>
      <div className="px-4 py-4 space-y-3">
        {personas.map(p=><TutorCard key={p.id} persona={p} selected={p.id===selectedId} onSelect={()=>setSelectedId(p.id)}/>)}
        <button onClick={()=>setShowChat(true)} className="w-full py-4 bg-purple-600 text-white rounded-2xl font-bold text-lg mt-4">
          Start Chatting 💬
        </button>
      </div>
      <BottomNav/>
    </div>
  );
}
