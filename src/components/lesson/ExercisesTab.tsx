import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

interface ExerciseItem {
  type: string;
  question: string;
  options?: string[];
  correct?: string;
  answer?: string;
}

interface ExercisesTabProps {
  exercises: ExerciseItem[];
}

export function ExercisesTab({ exercises }: ExercisesTabProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const handleAnswer = (index: number, answer: string) => {
    if (checked[index]) return;
    setAnswers(prev => ({ ...prev, [index]: answer }));
  };

  const checkAnswer = (index: number) => {
    if (!answers[index]) return;
    setChecked(prev => ({ ...prev, [index]: true }));
  };

  const isCorrect = (index: number) => {
    const exercise = exercises[index];
    const answer = answers[index];
    const correctAnswer = exercise.correct ?? exercise.answer ?? '';
    return answer?.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
  };

  if (!exercises.length) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-2">✏️</p>
        <p>No exercises for this lesson</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {exercises.map((exercise, i) => (
        <div key={i} className={`bg-white rounded-2xl border-2 p-5 transition-all
          ${checked[i]
            ? isCorrect(i) ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
            : 'border-gray-100'
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-4">
            <div>
              <span className="text-xs text-gray-400 uppercase font-medium tracking-wide mb-1 block">
                {exercise.type === 'multiple_choice' ? 'Multiple Choice' : exercise.type === 'fill_blank' ? 'Fill in the Blank' : 'Translation'}
              </span>
              <p className="font-semibold text-gray-900">{exercise.question}</p>
            </div>
            {checked[i] && (
              <div className={`flex-shrink-0 ${isCorrect(i) ? 'text-green-500' : 'text-red-500'}`}>
                {isCorrect(i) ? <CheckCircle size={22} /> : <XCircle size={22} />}
              </div>
            )}
          </div>

          {/* Multiple choice */}
          {exercise.type === 'multiple_choice' && exercise.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {exercise.options.map((opt, j) => {
                const isSelected = answers[i] === opt;
                const isRight = checked[i] && opt === (exercise.correct ?? exercise.answer);
                const isWrong = checked[i] && isSelected && !isRight;
                return (
                  <button
                    key={j}
                    onClick={() => handleAnswer(i, opt)}
                    className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all
                      ${isRight ? 'border-green-400 bg-green-100 text-green-800'
                        : isWrong ? 'border-red-400 bg-red-100 text-red-800'
                        : isSelected ? 'border-primary-400 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }
                    `}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {/* Fill blank / Translation */}
          {(exercise.type === 'fill_blank' || exercise.type === 'translation') && (
            <input
              type="text"
              value={answers[i] ?? ''}
              onChange={e => handleAnswer(i, e.target.value)}
              placeholder="Type your answer..."
              disabled={checked[i]}
              className={`w-full px-4 py-3 rounded-xl border-2 text-sm mb-4 focus:outline-none transition-all
                ${checked[i]
                  ? isCorrect(i) ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
                  : 'border-gray-200 focus:border-primary-400 bg-white'
                }
              `}
            />
          )}

          {/* Check / Result */}
          {!checked[i] ? (
            <button
              onClick={() => checkAnswer(i)}
              disabled={!answers[i]}
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              Check Answer
            </button>
          ) : (
            <AnimatePresence>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-sm font-medium ${isCorrect(i) ? 'text-green-700' : 'text-red-700'}`}
              >
                {isCorrect(i)
                  ? '✅ Correct!'
                  : `❌ The answer is: ${exercise.correct ?? exercise.answer}`
                }
              </motion.p>
            </AnimatePresence>
          )}
        </div>
      ))}
    </div>
  );
}
