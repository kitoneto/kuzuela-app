import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute, PublicOnlyRoute } from './guards/ProtectedRoute';

// Public pages
import { HomePage } from '../../pages/Landing/HomePage';
import { LoginPage } from '../../pages/Auth/LoginPage';
import { RegisterPage } from '../../pages/Auth/RegisterPage';
import { ResetPasswordPage } from '../../pages/Auth/ResetPasswordPage';
import { CallbackPage } from '../../pages/Auth/CallbackPage';

// Student pages
import { OnboardingPage } from '../../pages/Onboarding/OnboardingPage';
import { DashboardPage } from '../../pages/Dashboard/DashboardPage';
import { CoursesPage } from '../../pages/Courses/CoursesPage';
import { CourseDetailPage } from '../../pages/Courses/CourseDetailPage';
import { LessonDetailPage } from '../../pages/Learning/LessonDetailPage';
import { LessonActivePage } from '../../pages/Learning/LessonActivePage';
import { TutorPage } from '../../pages/Tutor/TutorPage';
import { LeaderboardPage } from '../../pages/Gamification/LeaderboardPage';
import { AchievementsPage } from '../../pages/Gamification/AchievementsPage';
import { ProgressPage } from '../../pages/Gamification/ProgressPage';
import { PremiumPage } from '../../pages/Premium/PremiumPage';
import { ProfilePage } from '../../pages/Profile/ProfilePage';
import { SettingsPage } from '../../pages/Profile/SettingsPage';
import { NotFoundPage } from '../../pages/NotFoundPage';

// Feature pages
import { LanguagePreferencesPage } from '../../features/language-settings/pages/LanguagePreferencesPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/callback" element={<CallbackPage />} />
        <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
        <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Student routes */}
        <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
        <Route path="/courses/:courseId" element={<ProtectedRoute><CourseDetailPage /></ProtectedRoute>} />
        <Route path="/courses/:courseId/lessons/:lessonId" element={<ProtectedRoute><LessonDetailPage /></ProtectedRoute>} />
        <Route path="/courses/:courseId/lessons/:lessonId/active" element={<ProtectedRoute><LessonActivePage /></ProtectedRoute>} />
        <Route path="/tutor" element={<ProtectedRoute><TutorPage /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
        <Route path="/achievements" element={<ProtectedRoute><AchievementsPage /></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
        <Route path="/premium" element={<ProtectedRoute><PremiumPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/language-settings" element={<ProtectedRoute><LanguagePreferencesPage /></ProtectedRoute>} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
