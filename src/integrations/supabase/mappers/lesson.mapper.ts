import type { DbLesson } from '../types';

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  unitNumber: number;
  lessonNumber: number;
  xpReward: number;
  isPublished: boolean;
  createdAt: string;
}

export function mapDbLessonToLesson(db: DbLesson): Lesson {
  return {
    id: db.id,
    courseId: db.course_id,
    title: db.title,
    description: db.description ?? '',
    unitNumber: db.unit_number,
    lessonNumber: db.lesson_number,
    xpReward: db.xp_reward,
    isPublished: db.is_published,
    createdAt: db.created_at,
  };
}
