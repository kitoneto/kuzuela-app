import { Route } from 'react-router-dom';
import { ProtectedRoute } from './guards/ProtectedRoute';
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
import { LanguagePreferencesPage } from '../../features/language-settings/pages/LanguagePreferencesPage';

/**
 * Student (authenticated) route definitions. Use the exported Route elements
 * in AppRouter by spreading or rendering them inside a <Routes> block.
 */
export function StudentRoutes() {
  return (
    <>
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
    </>
  );
}
