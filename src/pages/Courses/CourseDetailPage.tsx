import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Star, Users, Clock } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { LessonCard } from '../../components/lesson/LessonCard';
import { useCourses } from '../../hooks/useCourses';
import { useLessons } from '../../hooks/useLessons';
import { useProgress } from '../../hooks/useProgress';
import { Loading } from '../../components/common/Loading';

export function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { courses } = useCourses();
  const { lessons, loading } = useLessons(courseId);
  const { isLessonCompleted } = useProgress();

  const course = courses.find(c => c.id === courseId);

  if (!course) return <Loading fullScreen />;

  const completedCount = lessons.filter(l => isLessonCompleted(l.id)).length;
  const progressPercent = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0;

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors">
          <ArrowLeft size={16} />
          Back to Courses
        </Link>

        {/* Hero */}
        <div className={`rounded-2xl overflow-hidden mb-8 ${course.is_premium
          ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
          : 'bg-gradient-to-r from-primary-400 to-teal-500'
        }`}>
          <div className="px-8 py-10 flex items-center gap-6">
            <span className="text-6xl">{course.flag_emoji ?? '🌐'}</span>
            <div className="text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium uppercase tracking-wide opacity-80 capitalize">{course.level}</span>
                {course.is_premium && (
                  <span className="bg-white/20 text-white text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star size={10} /> PRO
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{course.title}</h1>
              {course.description && (
                <p className="text-sm opacity-90 max-w-xl">{course.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: <BookOpen size={16} className="text-primary-500" />, label: 'Lessons', value: lessons.length },
            { icon: <Users size={16} className="text-blue-500" />, label: 'Learners', value: '2.4K' },
            { icon: <Clock size={16} className="text-orange-500" />, label: 'Est. Time', value: `${Math.ceil(lessons.length * 0.3)}h` },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
              <div className="flex justify-center mb-1">{stat.icon}</div>
              <p className="font-bold text-gray-900 text-lg">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Progress */}
        {completedCount > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm text-gray-700">Your progress</span>
              <span className="text-sm font-bold text-primary-600">{completedCount}/{lessons.length}</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Lessons */}
        <div>
          <h2 className="font-bold text-gray-900 text-lg mb-4">Lessons</h2>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 h-20 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {lessons.map((lesson, i) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  courseId={courseId!}
                  completed={isLessonCompleted(lesson.id)}
                  locked={false}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
