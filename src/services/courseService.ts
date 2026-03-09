import { supabase } from '../lib/supabase';
import type { Course, Lesson } from '../types';

export const courseService = {
  async getCourses(): Promise<Course[]> {
    const { data, error } = await supabase.from('courses').select('*').order('created_at');
    if (error) throw error;
    return (data ?? []) as Course[];
  },

  async getCourse(courseId: string): Promise<Course | null> {
    const { data, error } = await supabase.from('courses').select('*').eq('id', courseId).single();
    if (error) return null;
    return data as Course;
  },

  async getLessons(courseId: string): Promise<Lesson[]> {
    const { data, error } = await supabase.from('lessons').select('*').eq('course_id', courseId).order('order_index');
    if (error) throw error;
    return (data ?? []) as Lesson[];
  },

  async getLesson(lessonId: string): Promise<Lesson | null> {
    const { data, error } = await supabase.from('lessons').select('*').eq('id', lessonId).single();
    if (error) return null;
    return data as Lesson;
  },
};
