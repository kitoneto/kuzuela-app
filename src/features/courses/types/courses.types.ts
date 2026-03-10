export interface Course {
  id: string;
  title: string;
  description: string;
  targetLanguage: string;
  sourceLanguage: string;
  level: string;
  imageUrl: string;
  totalLessons: number;
  completedLessons: number;
  isEnrolled: boolean;
  isPublished: boolean;
}

export interface CourseWithLessons extends Course {
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  unitNumber: number;
  lessonNumber: number;
  xpReward: number;
  isCompleted: boolean;
  isLocked: boolean;
}

export interface Unit {
  number: number;
  title: string;
  lessons: CourseLesson[];
}
