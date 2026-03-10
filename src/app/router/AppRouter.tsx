import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { type ReactNode } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { Loading } from '../../shared/components/feedback/Loading';
import { ProtectedRoute } from './guards/ProtectedRoute';

import { HomePage } from '../../features/landing/pages/HomePage';
import { LoginPage } from '../../features/auth/pages/LoginPage';
import { RegisterPage } from '../../features/auth/pages/RegisterPage';
import { ForgotPasswordPage } from '../../features/auth/pages/ForgotPasswordPage';
import { ResetPasswordPage } from '../../features/auth/pages/ResetPasswordPage';
import { CallbackPage } from '../../features/auth/pages/CallbackPage';
import { DashboardPage } from '../../features/dashboard/pages/DashboardPage';
import { CoursesPage } from '../../features/courses/pages/CoursesPage';
import { CourseDetailPage } from '../../features/courses/pages/CourseDetailPage';
import { LessonPage } from '../../features/lessons/pages/LessonPage';
import { LessonActivePage } from '../../features/lessons/pages/LessonActivePage';
import { TutorPage } from '../../features/tutors/pages/TutorPage';
import { LeaderboardPage } from '../../features/gamification/pages/LeaderboardPage';
import { AchievementsPage } from '../../features/progress/pages/AchievementsPage';
import { ProgressPage } from '../../features/progress/pages/ProgressPage';
import { PremiumPage } from '../../features/premium/pages/PremiumPage';
import { ProfilePage } from '../../features/profile/pages/ProfilePage';
import { SettingsPage } from '../../features/profile/pages/SettingsPage';
import { OnboardingPage } from '../../features/onboarding/pages/OnboardingPage';
import { AdminDashboardPage } from '../../features/admin/pages/AdminDashboardPage';
import { NotFoundPage } from '../../features/error/pages/NotFoundPage';

function PublicOnlyRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <Loading fullScreen />;
  if (user) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/callback" element={<CallbackPage />} />
        <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
        <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
        <Route path="/courses/:courseId" element={<ProtectedRoute><CourseDetailPage /></ProtectedRoute>} />
        <Route path="/courses/:courseId/lessons/:lessonId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
        <Route path="/courses/:courseId/lessons/:lessonId/active" element={<ProtectedRoute><LessonActivePage /></ProtectedRoute>} />
        <Route path="/tutor" element={<ProtectedRoute><TutorPage /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
        <Route path="/achievements" element={<ProtectedRoute><AchievementsPage /></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
        <Route path="/premium" element={<ProtectedRoute><PremiumPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
