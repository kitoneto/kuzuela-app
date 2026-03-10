import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Home, RotateCcw } from 'lucide-react';

export function LessonResultPage() {
  const { courseId = '', lessonId = '' } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const score = parseInt(searchParams.get('score') ?? '0');
  const xp = parseInt(searchParams.get('xp') ?? '0');

  const emoji = score >= 80 ? '🎉' : score >= 50 ? '😊' : '💪';
  const message = score >= 80 ? 'Excellent work!' : score >= 50 ? 'Good job!' : 'Keep practicing!';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="text-7xl mb-4">{emoji}</div>
        <h1 className="text-3xl font-bold text-white mb-2">{message}</h1>
        <p className="text-purple-200 mb-8">Lesson completed!</p>
        <div className="flex gap-4 justify-center mb-8">
          <div className="bg-white/20 rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-white">{score}%</p>
            <p className="text-purple-200 text-sm">Score</p>
          </div>
          <div className="bg-white/20 rounded-2xl p-4 text-center">
            <div className="flex items-center gap-1 justify-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <p className="text-3xl font-bold text-white">+{xp}</p>
            </div>
            <p className="text-purple-200 text-sm">XP earned</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={() => navigate(`/courses/${courseId}`)}
            className="py-3 bg-white text-purple-700 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <Home className="h-5 w-5" /> Back to Course
          </button>
          <button
            onClick={() => navigate(`/courses/${courseId}/lessons/${lessonId}/active`)}
            className="py-3 border-2 border-white/40 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-5 w-5" /> Practice Again
          </button>
        </div>
      </motion.div>
    </div>
  );
}
