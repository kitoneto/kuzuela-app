import { useState, useEffect } from 'react';
import type { Course } from '../types/courses.types';
import { coursesService } from '../services/courses.service';

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    coursesService.getCourses()
      .then(setCourses)
      .catch(e => setError(e instanceof Error ? e.message : 'Failed to load courses'))
      .finally(() => setLoading(false));
  }, []);

  return { courses, loading, error };
}
