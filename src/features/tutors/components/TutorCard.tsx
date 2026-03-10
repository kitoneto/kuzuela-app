import type { TutorPersona } from '../types/tutor.types';
export function TutorCard({ persona, selected, onSelect }: { persona: TutorPersona; selected: boolean; onSelect: ()=>void }) {
  return (
    <button onClick={onSelect} className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${selected ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white hover:border-purple-300'}`}>
      <div className="flex items-center gap-3">
        <span className="text-3xl">{persona.emoji}</span>
        <div>
          <p className="font-bold text-gray-800">{persona.name}</p>
          <p className="text-xs text-gray-500">{persona.description}</p>
        </div>
        {selected && <span className="ml-auto text-purple-600 font-bold">✓</span>}
      </div>
    </button>
  );
}
