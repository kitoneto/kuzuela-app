import { useState, useCallback } from 'react';
import type { Exercise } from '../types/exercises.types';
import type { Answer, LessonSession } from '../types/answer.types';

export function useLessonSession(lessonId: string, exercises: Exercise[]) {
  const [session, setSession] = useState<LessonSession>({
    lessonId,
    exercises,
    currentIndex: 0,
    answers: [],
    hearts: 5,
    xpEarned: 0,
    startedAt: new Date(),
  });

  const submitAnswer = useCallback((answer: string) => {
    const exercise = session.exercises[session.currentIndex];
    if (!exercise) return;

    const correctAnswer = 'correctAnswer' in exercise ? exercise.correctAnswer : '';
    const isCorrect = answer.trim().toLowerCase() === correctAnswer.toLowerCase();
    const xpForExercise = isCorrect ? 2 : 0;

    const newAnswer: Answer = {
      exerciseId: exercise.id,
      userAnswer: answer,
      isCorrect,
      timeMs: Date.now() - session.startedAt.getTime(),
    };

    setSession(prev => ({
      ...prev,
      answers: [...prev.answers, newAnswer],
      hearts: isCorrect ? prev.hearts : Math.max(0, prev.hearts - 1),
      xpEarned: prev.xpEarned + xpForExercise,
      currentIndex: prev.currentIndex + 1,
      completedAt: prev.currentIndex + 1 >= prev.exercises.length ? new Date() : undefined,
    }));

    return isCorrect;
  }, [session]);

  const isCompleted = session.currentIndex >= session.exercises.length;
  const currentExercise = session.exercises[session.currentIndex];
  const score = session.answers.length > 0
    ? Math.round((session.answers.filter(a => a.isCorrect).length / session.answers.length) * 100)
    : 0;

  return { session, currentExercise, isCompleted, score, submitAnswer };
}
