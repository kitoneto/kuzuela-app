import type { Course, CourseWithLessons } from '../types/courses.types';

const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'English for Beginners',
    description: 'Learn English from scratch with practical everyday situations',
    targetLanguage: 'en',
    sourceLanguage: 'pt',
    level: 'A1',
    imageUrl: '',
    totalLessons: 30,
    completedLessons: 5,
    isEnrolled: true,
    isPublished: true,
  },
  {
    id: '2',
    title: 'French Essentials',
    description: 'Master basic French communication for travel and work',
    targetLanguage: 'fr',
    sourceLanguage: 'pt',
    level: 'A1',
    imageUrl: '',
    totalLessons: 25,
    completedLessons: 0,
    isEnrolled: false,
    isPublished: true,
  },
  {
    id: '3',
    title: 'English Intermediate',
    description: 'Take your English to the next level with advanced topics',
    targetLanguage: 'en',
    sourceLanguage: 'pt',
    level: 'B1',
    imageUrl: '',
    totalLessons: 40,
    completedLessons: 0,
    isEnrolled: false,
    isPublished: true,
  },
];

const MOCK_COURSE_WITH_LESSONS: CourseWithLessons = {
  ...MOCK_COURSES[0],
  lessons: [
    { id: 'l1', courseId: '1', title: 'Greetings', description: 'Basic greetings and introductions', unitNumber: 1, lessonNumber: 1, xpReward: 10, isCompleted: true, isLocked: false },
    { id: 'l2', courseId: '1', title: 'Numbers 1-10', description: 'Learn to count from 1 to 10', unitNumber: 1, lessonNumber: 2, xpReward: 10, isCompleted: true, isLocked: false },
    { id: 'l3', courseId: '1', title: 'Colors', description: 'Basic colors vocabulary', unitNumber: 1, lessonNumber: 3, xpReward: 10, isCompleted: true, isLocked: false },
    { id: 'l4', courseId: '1', title: 'Family Members', description: 'Words for family relationships', unitNumber: 1, lessonNumber: 4, xpReward: 10, isCompleted: false, isLocked: false },
    { id: 'l5', courseId: '1', title: 'Days of the Week', description: 'Days, months and time expressions', unitNumber: 1, lessonNumber: 5, xpReward: 10, isCompleted: false, isLocked: false },
    { id: 'l6', courseId: '1', title: 'At the Restaurant', description: 'Order food and drinks', unitNumber: 2, lessonNumber: 1, xpReward: 15, isCompleted: false, isLocked: false },
    { id: 'l7', courseId: '1', title: 'Shopping', description: 'Buy things and ask for prices', unitNumber: 2, lessonNumber: 2, xpReward: 15, isCompleted: false, isLocked: true },
    { id: 'l8', courseId: '1', title: 'Directions', description: 'Ask for and give directions', unitNumber: 2, lessonNumber: 3, xpReward: 15, isCompleted: false, isLocked: true },
  ],
};

export class CoursesService {
  async getCourses(): Promise<Course[]> {
    await new Promise(r => setTimeout(r, 300));
    return MOCK_COURSES;
  }

  async getCourseById(id: string): Promise<Course | null> {
    await new Promise(r => setTimeout(r, 200));
    return MOCK_COURSES.find(c => c.id === id) ?? null;
  }

  async getCourseWithLessons(id: string): Promise<CourseWithLessons | null> {
    await new Promise(r => setTimeout(r, 300));
    if (id === '1') return MOCK_COURSE_WITH_LESSONS;
    const course = MOCK_COURSES.find(c => c.id === id);
    if (!course) return null;
    return { ...course, lessons: [] };
  }

  async enrollCourse(_courseId: string): Promise<void> {
    await new Promise(r => setTimeout(r, 300));
  }
}

export const coursesService = new CoursesService();
