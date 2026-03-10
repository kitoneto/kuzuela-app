import { motion } from 'framer-motion';

interface DialogueItem {
  speaker: string;
  text: string;
}

interface DialogueTabProps {
  dialogue: DialogueItem[];
}

const speakerColors = [
  'bg-blue-100 text-blue-800',
  'bg-purple-100 text-purple-800',
  'bg-green-100 text-green-800',
  'bg-orange-100 text-orange-800',
];

export function DialogueTab({ dialogue }: DialogueTabProps) {
  if (!dialogue.length) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-2">💬</p>
        <p>No dialogue for this lesson</p>
      </div>
    );
  }

  const speakers = [...new Set(dialogue.map(d => d.speaker))];

  return (
    <div className="space-y-4">
      {/* Speaker legend */}
      <div className="flex flex-wrap gap-2 mb-4">
        {speakers.map((speaker, i) => (
          <span key={speaker} className={`text-xs font-medium px-2.5 py-1 rounded-full ${speakerColors[i % speakerColors.length]}`}>
            {speaker}
          </span>
        ))}
      </div>

      {/* Dialogue bubbles */}
      {dialogue.map((item, i) => {
        const speakerIndex = speakers.indexOf(item.speaker);
        const isRight = speakerIndex % 2 === 1;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: isRight ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex gap-3 ${isRight ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${speakerColors[speakerIndex % speakerColors.length]}`}>
              {item.speaker[0]}
            </div>
            <div className={`max-w-[80%] ${isRight ? 'items-end' : 'items-start'} flex flex-col`}>
              <span className="text-xs text-gray-400 mb-1 font-medium">{item.speaker}</span>
              <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed
                ${isRight
                  ? 'bg-primary-500 text-white rounded-tr-sm'
                  : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                }`}
              >
                {item.text}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
