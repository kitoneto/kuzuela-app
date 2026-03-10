import { Link } from 'react-router-dom';
import { CheckCircle, Lock, ChevronRight, Star } from 'lucide-react';
import type { Lesson } from '../../types';

interface LessonCardProps {
  lesson: Lesson;
  courseId: string;
  completed?: boolean;
  locked?: boolean;
  index: number;
}

export function LessonCard({ lesson, courseId, completed, locked, index }: LessonCardProps) {
  return (
    <div className={`bg-white rounded-2xl border p-5 transition-all ${locked ? 'border-gray-100 opacity-60' : 'border-gray-100 hover:border-primary-200 hover:shadow-sm'}`}>
      <div className="flex items-center gap-4">
        {/* Step indicator */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
          ${completed ? 'bg-primary-500 text-white' : locked ? 'bg-gray-100 text-gray-400' : 'bg-primary-50 text-primary-600'}`}
        >
          {completed ? <CheckCircle size={20} /> : locked ? <Lock size={16} /> : index + 1}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-semibold text-gray-900 truncate">{lesson.title}</h3>
            {lesson.is_premium && (
              <span className="flex-shrink-0 bg-yellow-100 text-yellow-700 text-xs font-medium px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                <Star size={9} className="fill-yellow-500 text-yellow-500" />
                PRO
              </span>
            )}
          </div>
          {lesson.description && (
            <p className="text-sm text-gray-500 truncate">{lesson.description}</p>
          )}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-yellow-600 font-medium">+{lesson.xp_reward} XP</span>
            {lesson.vocabulary && (
              <span className="text-xs text-gray-400">{lesson.vocabulary.length} words</span>
            )}
          </div>
        </div>

        {/* Arrow */}
        {!locked && (
          <Link
            to={`/courses/${courseId}/lessons/${lesson.id}`}
            className="flex-shrink-0 p-2 rounded-xl bg-primary-50 hover:bg-primary-100 text-primary-600 transition-colors"
          >
            <ChevronRight size={18} />
          </Link>
        )}
      </div>
    </div>
  );
}
