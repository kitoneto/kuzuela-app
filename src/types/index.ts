export interface User {
  id: string
  email: string
  displayName: string
  avatarUrl?: string
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface Course {
  id: string
  title: string
  description: string
  languageCode: string
  targetLanguageCode: string
  level: string
  thumbnailUrl?: string
  totalLessons: number
  estimatedHours: number
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface Lesson {
  id: string
  courseId: string
  title: string
  description: string
  content: LessonContent
  languageCode: string
  targetLanguageCode: string
  orderIndex: number
  xpReward: number
  durationMinutes: number
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export type LessonContentType =
  | 'vocabulary'
  | 'grammar'
  | 'listening'
  | 'speaking'
  | 'reading'
  | 'writing'
  | 'quiz'

export interface LessonContent {
  type: LessonContentType
  data: Record<string, unknown>
}

export interface Progress {
  id: string
  userId: string
  courseId: string
  lessonId?: string
  languageCode: string
  status: 'not_started' | 'in_progress' | 'completed'
  score?: number
  xpEarned: number
  completedAt?: string
  createdAt: string
  updatedAt: string
}

export interface GamificationData {
  userId: string
  languageCode: string
  xp: number
  level: number
  streak: number
  longestStreak: number
  totalLessonsCompleted: number
  badges: Badge[]
  achievements: Achievement[]
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedAt: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  progress: number
  maxProgress: number
  isCompleted: boolean
  completedAt?: string
}

export interface Tutor {
  id: string
  name: string
  personality: TutorPersonality
  supportedLanguages: string[]
  avatarUrl: string
  description: string
  isActive: boolean
}

export type TutorPersonality =
  | 'friendly'
  | 'strict'
  | 'playful'
  | 'professional'
  | 'encouraging'

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  body: string
  data?: Record<string, unknown>
  isRead: boolean
  createdAt: string
}

export type NotificationType =
  | 'lesson_reminder'
  | 'streak_alert'
  | 'achievement_unlocked'
  | 'level_up'
  | 'new_course'
  | 'premium_expiring'

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  currency: string
  interval: 'monthly' | 'annual'
  features: string[]
  isPopular: boolean
}

export interface UserSubscription {
  id: string
  userId: string
  planId: string
  status: 'active' | 'cancelled' | 'expired' | 'trial'
  startDate: string
  endDate: string
  autoRenew: boolean
}
