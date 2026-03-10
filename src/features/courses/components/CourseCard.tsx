import { useNavigate } from 'react-router-dom';
import type { Course } from '../types/courses.types';
import { getLanguageFlag } from '../../../shared/constants/languages';
import { LEVEL_COLORS } from '../types/levels.types';
import type { LanguageLevel } from '../types/levels.types';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const navigate = useNavigate();
  const progress = course.totalLessons > 0 ? (course.completedLessons / course.totalLessons) * 100 : 0;

  return (
    <div
      onClick={() => navigate(`/courses/${course.id}`)}
      className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-3">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-2xl flex-shrink-0">
          {getLanguageFlag(course.targetLanguage)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-gray-900 truncate">{course.title}</h3>
          </div>
          <p className="text-xs text-gray-500 mb-2 line-clamp-2">{course.description}</p>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${LEVEL_COLORS[course.level as LanguageLevel] ?? 'bg-gray-100 text-gray-600'}`}>
              {course.level}
            </span>
            <span className="text-xs text-gray-400">{course.totalLessons} lessons</span>
          </div>
        </div>
      </div>
      {course.isEnrolled && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{course.completedLessons}/{course.totalLessons}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      {!course.isEnrolled && (
        <div className="mt-3 pt-3 border-t border-gray-50">
          <span className="text-xs font-semibold text-purple-600">Start learning →</span>
        </div>
      )}
    </div>
  );
}
