import { supabaseClient } from '../client';
import type { DbCourse, DbLesson } from '../types';

export class CoursesRepository {
  async getCourses() {
    return supabaseClient
      .from('courses')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: true })
      .returns<DbCourse[]>();
  }

  async getCourseById(id: string) {
    return supabaseClient
      .from('courses')
      .select('*')
      .eq('id', id)
      .single<DbCourse>();
  }

  async getCourseWithLessons(id: string) {
    return supabaseClient
      .from('courses')
      .select(`*, lessons(*)`)
      .eq('id', id)
      .single<DbCourse & { lessons: DbLesson[] }>();
  }
}

export const coursesRepository = new CoursesRepository();
