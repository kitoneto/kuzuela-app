import type { Lesson } from '../types/lessons.types';
import type { Exercise } from '../types/exercises.types';

const MOCK_LESSONS: Record<string, Lesson> = {
  l1: {
    id: 'l1', courseId: '1', title: 'Greetings', description: 'Basic greetings and introductions',
    unitNumber: 1, lessonNumber: 1, xpReward: 10,
    vocabulary: [
      { id: 'v1', word: 'Hello', translation: 'Olá', example: 'Hello, how are you?', phonetic: '/həˈloʊ/' },
      { id: 'v2', word: 'Goodbye', translation: 'Adeus', example: 'Goodbye, see you tomorrow!' },
      { id: 'v3', word: 'Please', translation: 'Por favor', example: 'Can you help me, please?' },
      { id: 'v4', word: 'Thank you', translation: 'Obrigado/a', example: 'Thank you very much!' },
      { id: 'v5', word: 'Sorry', translation: 'Desculpe', example: 'Sorry, I am late.' },
    ],
    dialogue: [
      { id: 'd1', speaker: 'Ana', text: 'Good morning! My name is Ana.', translation: 'Bom dia! O meu nome é Ana.' },
      { id: 'd2', speaker: 'João', text: 'Good morning, Ana! Nice to meet you.', translation: 'Bom dia, Ana! Prazer em conhecê-la.' },
      { id: 'd3', speaker: 'Ana', text: 'Nice to meet you too. Where are you from?', translation: 'Prazer também. De onde você é?' },
      { id: 'd4', speaker: 'João', text: 'I am from Luanda. And you?', translation: 'Sou de Luanda. E você?' },
    ],
  },
  l4: {
    id: 'l4', courseId: '1', title: 'Family Members', description: 'Words for family relationships',
    unitNumber: 1, lessonNumber: 4, xpReward: 10,
    vocabulary: [
      { id: 'v1', word: 'Mother', translation: 'Mãe', example: 'My mother is a doctor.' },
      { id: 'v2', word: 'Father', translation: 'Pai', example: 'My father works at home.' },
      { id: 'v3', word: 'Brother', translation: 'Irmão', example: 'I have two brothers.' },
      { id: 'v4', word: 'Sister', translation: 'Irmã', example: 'My sister is younger than me.' },
    ],
    dialogue: [
      { id: 'd1', speaker: 'Kimbito', text: 'Tell me about your family.', translation: 'Fale-me sobre a sua família.' },
      { id: 'd2', speaker: 'Student', text: 'I have a mother, father, and one sister.', translation: 'Tenho mãe, pai e uma irmã.' },
    ],
  },
};

const MOCK_EXERCISES: Record<string, Exercise[]> = {
  l1: [
    { id: 'e1', lessonId: 'l1', type: 'multiple_choice', question: 'How do you say "Olá" in English?', options: ['Hello', 'Goodbye', 'Please', 'Sorry'], correctAnswer: 'Hello', orderIndex: 0 },
    { id: 'e2', lessonId: 'l1', type: 'multiple_choice', question: 'What does "Thank you" mean?', options: ['Desculpe', 'Por favor', 'Obrigado', 'Adeus'], correctAnswer: 'Obrigado', orderIndex: 1 },
    { id: 'e3', lessonId: 'l1', type: 'fill_gap', question: 'Complete the sentence', textWithGap: '___, how are you?', correctAnswer: 'Hello', hint: 'A common greeting', orderIndex: 2 },
    { id: 'e4', lessonId: 'l1', type: 'multiple_choice', question: 'Which word means "Adeus"?', options: ['Hello', 'Goodbye', 'Thank you', 'Please'], correctAnswer: 'Goodbye', orderIndex: 3 },
    { id: 'e5', lessonId: 'l1', type: 'fill_gap', question: 'Fill in the blank', textWithGap: '___ you very much!', correctAnswer: 'Thank', hint: 'Expression of gratitude', orderIndex: 4 },
  ],
};

export class LessonsService {
  async getLessonById(id: string): Promise<Lesson | null> {
    await new Promise(r => setTimeout(r, 200));
    return MOCK_LESSONS[id] ?? {
      id, courseId: '1', title: 'Lesson', description: 'Lesson description',
      unitNumber: 1, lessonNumber: 1, xpReward: 10, vocabulary: [], dialogue: [],
    };
  }

  async getExercisesForLesson(lessonId: string): Promise<Exercise[]> {
    await new Promise(r => setTimeout(r, 200));
    return MOCK_EXERCISES[lessonId] ?? MOCK_EXERCISES['l1'];
  }
}

export const lessonsService = new LessonsService();
