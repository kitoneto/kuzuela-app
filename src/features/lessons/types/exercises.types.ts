export type ExerciseType = 'multiple_choice' | 'fill_gap' | 'match' | 'speaking' | 'listening';

export interface BaseExercise {
  id: string;
  lessonId: string;
  type: ExerciseType;
  question: string;
  orderIndex: number;
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple_choice';
  options: string[];
  correctAnswer: string;
}

export interface FillGapExercise extends BaseExercise {
  type: 'fill_gap';
  textWithGap: string;
  correctAnswer: string;
  hint?: string;
}

export interface MatchExercise extends BaseExercise {
  type: 'match';
  pairs: { left: string; right: string }[];
}

export interface SpeakingExercise extends BaseExercise {
  type: 'speaking';
  targetPhrase: string;
  phonetic?: string;
}

export interface ListeningExercise extends BaseExercise {
  type: 'listening';
  audioText: string;
  options: string[];
  correctAnswer: string;
}

export type Exercise =
  | MultipleChoiceExercise
  | FillGapExercise
  | MatchExercise
  | SpeakingExercise
  | ListeningExercise;
