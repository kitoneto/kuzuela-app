import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import { lessonsService } from '../services/lessons.service';
import { useLessonSession } from '../hooks/useLessonSession';
import type { Exercise } from '../types/exercises.types';
import { Loading } from '../../../shared/components/feedback/Loading';

function MultipleChoice({ exercise, onAnswer }: { exercise: Extract<Exercise, { type: 'multiple_choice' }>; onAnswer: (a: string) => boolean | undefined }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleSelect = (option: string) => {
    if (feedback) return;
    setSelected(option);
    const isCorrect = onAnswer(option);
    setFeedback(isCorrect ? 'correct' : 'wrong');
  };

  return (
    <div className="space-y-3">
      <p className="text-lg font-semibold text-gray-800 mb-6">{exercise.question}</p>
      {exercise.options.map(option => (
        <button
          key={option}
          onClick={() => handleSelect(option)}
          className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
            !selected ? 'border-gray-200 bg-white hover:border-purple-300' :
            option === exercise.correctAnswer ? 'border-green-500 bg-green-50 text-green-700' :
            option === selected && feedback === 'wrong' ? 'border-red-400 bg-red-50 text-red-700' :
            'border-gray-200 bg-gray-50 text-gray-400'
          }`}
        >
          {option}
        </button>
      ))}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl mt-2 ${feedback === 'correct' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
        >
          <p className={`font-bold ${feedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
            {feedback === 'correct' ? '✓ Correct!' : `✗ Correct answer: ${exercise.correctAnswer}`}
          </p>
        </motion.div>
      )}
    </div>
  );
}

function FillGap({ exercise, onAnswer }: { exercise: Extract<Exercise, { type: 'fill_gap' }>; onAnswer: (a: string) => boolean | undefined }) {
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || feedback) return;
    const isCorrect = onAnswer(input.trim());
    setFeedback(isCorrect ? 'correct' : 'wrong');
  };

  const parts = exercise.textWithGap.split('___');

  return (
    <div>
      <p className="text-lg font-semibold text-gray-800 mb-6">{exercise.question}</p>
      <div className="bg-gray-50 rounded-xl p-4 mb-4 text-center text-lg">
        <span>{parts[0]}</span>
        <span className={`inline-block mx-1 min-w-16 border-b-2 px-2 ${feedback === 'correct' ? 'border-green-500 text-green-700' : feedback === 'wrong' ? 'border-red-500 text-red-700' : 'border-purple-500'}`}>
          {input || '\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0'}
        </span>
        <span>{parts[1]}</span>
      </div>
      {exercise.hint && <p className="text-xs text-gray-400 mb-3">💡 Hint: {exercise.hint}</p>}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={!!feedback}
          className="flex-1 py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Type your answer..."
          autoFocus
        />
        <button type="submit" disabled={!!feedback || !input.trim()} className="px-5 py-3 bg-purple-600 text-white rounded-xl font-semibold disabled:opacity-50">
          Check
        </button>
      </form>
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl mt-3 ${feedback === 'correct' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
        >
          <p className={`font-bold ${feedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
            {feedback === 'correct' ? '✓ Correct!' : `✗ Correct answer: ${exercise.correctAnswer}`}
          </p>
        </motion.div>
      )}
    </div>
  );
}

export function LessonActivePage() {
  const { courseId = '', lessonId = '' } = useParams();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loadingExercises, setLoadingExercises] = useState(true);
  const [waitingNext, setWaitingNext] = useState(false);

  useEffect(() => {
    lessonsService.getExercisesForLesson(lessonId).then(ex => {
      setExercises(ex);
      setLoadingExercises(false);
    });
  }, [lessonId]);

  const { session, currentExercise, isCompleted, score, submitAnswer } = useLessonSession(lessonId, exercises);

  const handleAnswer = (answer: string) => {
    const result = submitAnswer(answer);
    setWaitingNext(true);
    setTimeout(() => setWaitingNext(false), 1200);
    return result;
  };

  if (loadingExercises) return <Loading fullScreen />;

  if (isCompleted) {
    navigate(`/courses/${courseId}/lessons/${lessonId}?result=complete&score=${score}&xp=${session.xpEarned}`, { replace: true });
    return null;
  }

  const progress = exercises.length > 0 ? (session.currentIndex / exercises.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(`/courses/${courseId}/lessons/${lessonId}`)} className="text-gray-400">
            <X className="h-6 w-6" />
          </button>
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              className="h-full bg-purple-600 rounded-full"
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Heart
                key={i}
                className={`h-5 w-5 ${i < session.hearts ? 'text-red-500 fill-current' : 'text-gray-200 fill-current'}`}
              />
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-400">{session.currentIndex + 1} / {exercises.length}</p>
      </div>

      <div className="flex-1 px-4 py-6">
        <AnimatePresence mode="wait">
          {currentExercise && !waitingNext && (
            <motion.div
              key={currentExercise.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
            >
              {currentExercise.type === 'multiple_choice' && (
                <MultipleChoice exercise={currentExercise} onAnswer={handleAnswer} />
              )}
              {currentExercise.type === 'fill_gap' && (
                <FillGap exercise={currentExercise} onAnswer={handleAnswer} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
