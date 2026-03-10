import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCourseDetail } from '../hooks/useCourseDetail';
import { UnitList } from '../components/UnitList';
import { LevelBadge } from '../components/LevelBadge';
import { Loading } from '../../../shared/components/feedback/Loading';
import { getLanguageFlag } from '../../../shared/constants/languages';
import type { Unit } from '../types/courses.types';

export function CourseDetailPage() {
  const { courseId = '' } = useParams();
  const navigate = useNavigate();
  const { course, loading } = useCourseDetail(courseId);

  if (loading) return <Loading fullScreen />;
  if (!course) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-gray-500">Course not found</p>
      <button onClick={() => navigate('/courses')} className="text-purple-600">Back to courses</button>
    </div>
  );

  const units: Unit[] = course.lessons.reduce<Unit[]>((acc, lesson) => {
    const existing = acc.find(u => u.number === lesson.unitNumber);
    if (existing) {
      existing.lessons.push(lesson);
    } else {
      acc.push({ number: lesson.unitNumber, title: `Unit ${lesson.unitNumber}`, lessons: [lesson] });
    }
    return acc;
  }, []);

  const progress = course.totalLessons > 0 ? Math.round((course.completedLessons / course.totalLessons) * 100) : 0;
  const nextLesson = course.lessons.find(l => !l.isCompleted && !l.isLocked);

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="bg-gradient-to-br from-purple-700 to-indigo-700 px-4 pt-12 pb-8 text-white">
        <button onClick={() => navigate('/courses')} className="flex items-center gap-2 text-purple-200 mb-4">
          <ArrowLeft className="h-5 w-5" /> Back
        </button>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl flex-shrink-0">
            {getLanguageFlag(course.targetLanguage)}
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">{course.title}</h1>
            <p className="text-purple-200 text-sm mb-2">{course.description}</p>
            <LevelBadge level={course.level} showLabel />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-purple-200">Progress</span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-white rounded-full"
            />
          </div>
          <p className="text-purple-200 text-xs mt-1">{course.completedLessons} of {course.totalLessons} lessons completed</p>
        </div>
        {nextLesson && (
          <button
            onClick={() => navigate(`/courses/${courseId}/lessons/${nextLesson.id}`)}
            className="mt-4 w-full py-3 bg-white text-purple-700 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <Play className="h-5 w-5 fill-current" /> Continue Learning
          </button>
        )}
      </div>

      <div className="px-4 py-6">
        {units.length > 0 ? (
          <UnitList units={units} courseId={courseId} />
        ) : (
          <p className="text-center text-gray-500 py-8">No lessons available yet</p>
        )}
      </div>
    </div>
  );
}
