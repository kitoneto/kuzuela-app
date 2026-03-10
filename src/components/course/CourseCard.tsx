import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, BookOpen, Star } from 'lucide-react';
import type { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  progress?: number;
}

export function CourseCard({ course, progress = 0 }: CourseCardProps) {
  const levelColors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      {/* Card header with gradient */}
      <div className={`h-32 flex items-center justify-center text-6xl
        ${course.is_premium
          ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
          : 'bg-gradient-to-br from-primary-400 to-teal-500'
        }`}
      >
        <span>{course.flag_emoji ?? '🌐'}</span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-gray-900 leading-tight">{course.title}</h3>
          {course.is_premium && (
            <span className="flex-shrink-0 bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Star size={10} className="fill-yellow-500 text-yellow-500" />
              PRO
            </span>
          )}
        </div>

        {course.description && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.description}</p>
        )}

        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${levelColors[course.level] ?? 'bg-gray-100 text-gray-700'}`}>
            {course.level}
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <BookOpen size={12} />
            {course.total_lessons} lessons
          </span>
        </div>

        {/* Progress bar */}
        {progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Progress</span>
              <span className="text-xs font-medium text-primary-600">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {course.is_premium ? (
          <Link
            to={`/courses/${course.id}`}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-semibold text-sm transition-colors"
          >
            <Lock size={14} />
            View Course
          </Link>
        ) : (
          <Link
            to={`/courses/${course.id}`}
            className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm transition-colors"
          >
            {progress > 0 ? 'Continue' : 'Start Learning'}
          </Link>
        )}
      </div>
    </motion.div>
  );
}
