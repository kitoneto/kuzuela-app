import { useState, useEffect } from 'react';
import type { Lesson } from '../types';
import { supabase } from '../lib/supabase';

const MOCK_LESSONS: Record<string, Lesson[]> = {
  '1': [
    {
      id: 'l1',
      course_id: '1',
      title: 'Greetings & Introductions',
      description: 'Learn basic greetings and how to introduce yourself',
      order_index: 1,
      xp_reward: 50,
      vocabulary: [
        { word: 'Hello', translation: 'Olá', pronunciation: '/həˈloʊ/' },
        { word: 'Good morning', translation: 'Bom dia', pronunciation: '/ɡʊd ˈmɔːrnɪŋ/' },
        { word: 'Good night', translation: 'Boa noite', pronunciation: '/ɡʊd naɪt/' },
        { word: 'Thank you', translation: 'Obrigado', pronunciation: '/θæŋk juː/' },
        { word: 'Please', translation: 'Por favor', pronunciation: '/pliːz/' },
      ],
      dialogue: [
        { speaker: 'Ana', text: 'Hello! My name is Ana. What is your name?' },
        { speaker: 'John', text: 'Hi Ana! My name is John. Nice to meet you!' },
        { speaker: 'Ana', text: 'Nice to meet you too, John. How are you?' },
        { speaker: 'John', text: 'I am fine, thank you. And you?' },
        { speaker: 'Ana', text: 'I am great! Have a nice day!' },
      ],
      exercises: [
        { type: 'multiple_choice', question: 'How do you say "Hello" in English?', options: ['Goodbye', 'Hello', 'Thank you', 'Please'], correct: 'Hello' },
        { type: 'fill_blank', question: 'Good ___ (manhã)', answer: 'morning' },
        { type: 'translation', question: 'Translate: "Nice to meet you"', answer: 'Prazer em conhecê-lo' },
      ],
      grammar_focus: 'Subject pronouns: I, you, he, she, we, they',
      speaking_task: { prompt: 'Introduce yourself in English', hints: ['Say your name', 'Say where you are from', 'Say how you are'] },
      is_premium: false,
      created_at: new Date().toISOString(),
    },
    {
      id: 'l2',
      course_id: '1',
      title: 'Numbers 1-20',
      description: 'Learn to count from 1 to 20 in English',
      order_index: 2,
      xp_reward: 40,
      vocabulary: [
        { word: 'One', translation: 'Um', pronunciation: '/wʌn/' },
        { word: 'Two', translation: 'Dois', pronunciation: '/tuː/' },
        { word: 'Three', translation: 'Três', pronunciation: '/θriː/' },
        { word: 'Ten', translation: 'Dez', pronunciation: '/ten/' },
        { word: 'Twenty', translation: 'Vinte', pronunciation: '/ˈtwenti/' },
      ],
      dialogue: [
        { speaker: 'Teacher', text: 'How old are you?' },
        { speaker: 'Student', text: 'I am twenty years old.' },
        { speaker: 'Teacher', text: 'And how many brothers do you have?' },
        { speaker: 'Student', text: 'I have two brothers.' },
      ],
      exercises: [],
      grammar_focus: 'Cardinal numbers and age expressions',
      speaking_task: null,
      is_premium: false,
      created_at: new Date().toISOString(),
    },
    {
      id: 'l3',
      course_id: '1',
      title: 'Colors & Shapes',
      description: 'Describe the world around you with colors and shapes',
      order_index: 3,
      xp_reward: 45,
      vocabulary: [
        { word: 'Red', translation: 'Vermelho', pronunciation: '/red/' },
        { word: 'Blue', translation: 'Azul', pronunciation: '/bluː/' },
        { word: 'Green', translation: 'Verde', pronunciation: '/ɡriːn/' },
        { word: 'Circle', translation: 'Círculo', pronunciation: '/ˈsɜːrkl/' },
        { word: 'Square', translation: 'Quadrado', pronunciation: '/skwer/' },
      ],
      dialogue: [],
      exercises: [],
      grammar_focus: 'Adjectives placement in English',
      speaking_task: null,
      is_premium: false,
      created_at: new Date().toISOString(),
    },
  ],
};

export function useLessons(courseId: string | undefined) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;
    const fetchLessons = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('lessons')
          .select('*')
          .eq('course_id', courseId)
          .order('order_index');

        if (error || !data || data.length === 0) {
          setLessons(MOCK_LESSONS[courseId] ?? MOCK_LESSONS['1']);
        } else {
          setLessons(data as Lesson[]);
        }
      } catch {
        setLessons(MOCK_LESSONS[courseId] ?? MOCK_LESSONS['1']);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [courseId]);

  return { lessons, loading, error };
}
