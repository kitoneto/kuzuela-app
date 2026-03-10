import { useState, useEffect } from 'react';
import type { Lesson } from '../types/lessons.types';
import { lessonsService } from '../services/lessons.service';

export function useLesson(lessonId: string) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lessonId) return;
    lessonsService.getLessonById(lessonId)
      .then(setLesson)
      .catch(e => setError(e instanceof Error ? e.message : 'Failed to load lesson'))
      .finally(() => setLoading(false));
  }, [lessonId]);

  return { lesson, loading, error };
}
