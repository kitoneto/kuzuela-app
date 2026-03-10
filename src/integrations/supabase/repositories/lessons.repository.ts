import { supabaseClient } from '../client';
import type { DbLesson, DbExercise } from '../types';

export class LessonsRepository {
  async getLessonById(id: string) {
    return supabaseClient
      .from('lessons')
      .select('*')
      .eq('id', id)
      .single<DbLesson>();
  }

  async getLessonsForCourse(courseId: string) {
    return supabaseClient
      .from('lessons')
      .select('*')
      .eq('course_id', courseId)
      .eq('is_published', true)
      .order('unit_number', { ascending: true })
      .order('lesson_number', { ascending: true })
      .returns<DbLesson[]>();
  }

  async getExercisesForLesson(lessonId: string) {
    return supabaseClient
      .from('exercises')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('order_index', { ascending: true })
      .returns<DbExercise[]>();
  }
}

export const lessonsRepository = new LessonsRepository();
