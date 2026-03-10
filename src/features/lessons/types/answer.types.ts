import type { Exercise } from './exercises.types';

export interface Answer {
  exerciseId: string;
  userAnswer: string;
  isCorrect: boolean;
  timeMs: number;
}

export interface LessonSession {
  lessonId: string;
  exercises: Exercise[];
  currentIndex: number;
  answers: Answer[];
  hearts: number;
  xpEarned: number;
  startedAt: Date;
  completedAt?: Date;
}

export type LessonSessionStatus = 'idle' | 'active' | 'completed' | 'failed';
