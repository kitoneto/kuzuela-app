import { supabase } from '../lib/supabase';
import type { Exercise } from '../types';

export const exerciseService = {
  async getLessonExercises(lessonId: string): Promise<Exercise[]> {
    const { data, error } = await supabase.from('exercises').select('*').eq('lesson_id', lessonId).order('order_index');
    if (error) throw error;
    return (data ?? []) as Exercise[];
  },
};
