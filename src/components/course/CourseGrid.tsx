import type { Course } from '../../types';
import { CourseCard } from './CourseCard';
import { CardSkeleton } from '../common/CardSkeleton';

interface CourseGridProps {
  courses: Course[];
  loading?: boolean;
  progressMap?: Record<string, number>;
}

export function CourseGrid({ courses, loading, progressMap = {} }: CourseGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-3">📚</p>
        <h3 className="font-semibold text-gray-800 mb-1">No courses available</h3>
        <p className="text-gray-500 text-sm">Check back soon for new content!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map(course => (
        <CourseCard key={course.id} course={course} progress={progressMap[course.id]} />
      ))}
    </div>
  );
}
