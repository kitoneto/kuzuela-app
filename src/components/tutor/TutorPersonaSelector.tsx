import type { TutorPersona } from '../../types';
import { TUTOR_PERSONAS } from '../../hooks/useTutor';

interface TutorPersonaSelectorProps {
  selected: TutorPersona;
  onSelect: (persona: TutorPersona) => void;
}

export function TutorPersonaSelector({ selected, onSelect }: TutorPersonaSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {TUTOR_PERSONAS.map(persona => (
        <button
          key={persona.id}
          onClick={() => onSelect(persona)}
          className={`flex-shrink-0 flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all
            ${selected.id === persona.id
              ? 'border-primary-400 bg-primary-50'
              : 'border-gray-100 hover:border-gray-200 bg-white'
            }`}
        >
          <span className="text-2xl">{persona.avatar_emoji}</span>
          <span className="text-xs font-medium text-gray-700">{persona.name}</span>
          <span className="text-xs text-gray-400">{persona.language_code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
