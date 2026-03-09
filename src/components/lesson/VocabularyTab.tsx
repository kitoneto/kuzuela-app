import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';

interface VocabItem {
  word: string;
  translation: string;
  pronunciation?: string;
  example?: string;
}

interface VocabularyTabProps {
  vocabulary: VocabItem[];
}

export function VocabularyTab({ vocabulary }: VocabularyTabProps) {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  const toggleFlip = (index: number) => {
    setFlipped(prev => ({ ...prev, [index]: !prev[index] }));
  };

  if (!vocabulary.length) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-2">📝</p>
        <p>No vocabulary for this lesson</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 mb-4">Click cards to reveal translation</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {vocabulary.map((item, i) => (
          <motion.div
            key={i}
            onClick={() => toggleFlip(i)}
            className="cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`relative bg-white rounded-2xl border-2 p-5 transition-all min-h-[100px] flex flex-col justify-between
              ${flipped[i] ? 'border-primary-300 bg-primary-50' : 'border-gray-100 hover:border-gray-200'}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-lg text-gray-900">{item.word}</p>
                  {item.pronunciation && (
                    <p className="text-sm text-gray-400 font-mono">{item.pronunciation}</p>
                  )}
                </div>
                <button
                  className="p-1.5 text-gray-400 hover:text-primary-500 transition-colors"
                  onClick={e => { e.stopPropagation(); }}
                >
                  <Volume2 size={16} />
                </button>
              </div>
              {flipped[i] && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 pt-3 border-t border-primary-200"
                >
                  <p className="text-primary-700 font-semibold">{item.translation}</p>
                  {item.example && (
                    <p className="text-sm text-gray-500 italic mt-1">"{item.example}"</p>
                  )}
                </motion.div>
              )}
              {!flipped[i] && (
                <p className="text-xs text-gray-400 mt-2">Tap to see translation</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
