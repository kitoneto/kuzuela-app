import { useState, useEffect } from 'react';
import type { CourseWithLessons } from '../types/courses.types';
import { coursesService } from '../services/courses.service';

export function useCourseDetail(courseId: string) {
  const [course, setCourse] = useState<CourseWithLessons | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;
    coursesService.getCourseWithLessons(courseId)
      .then(setCourse)
      .catch(e => setError(e instanceof Error ? e.message : 'Failed to load course'))
      .finally(() => setLoading(false));
  }, [courseId]);

  return { course, loading, error };
}
