import { lessonsService } from './lessons.service';
import type { Exercise } from '../types/exercises.types';

export class ExercisesService {
  async getExercises(lessonId: string): Promise<Exercise[]> {
    return lessonsService.getExercisesForLesson(lessonId);
  }
}

export const exercisesService = new ExercisesService();
