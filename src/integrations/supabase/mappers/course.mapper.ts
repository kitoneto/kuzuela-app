import type { DbCourse } from '../types';

export interface Course {
  id: string;
  title: string;
  description: string;
  targetLanguage: string;
  sourceLanguage: string;
  level: string;
  imageUrl: string;
  totalLessons: number;
  isPublished: boolean;
  createdAt: string;
}

export function mapDbCourseToCourse(db: DbCourse): Course {
  return {
    id: db.id,
    title: db.title,
    description: db.description ?? '',
    targetLanguage: db.target_language,
    sourceLanguage: db.source_language,
    level: db.level,
    imageUrl: db.image_url ?? '',
    totalLessons: db.total_lessons,
    isPublished: db.is_published,
    createdAt: db.created_at,
  };
}
