import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/shared/contexts/AuthContext'
import { LanguageContextProvider } from '@/shared/contexts/LanguageContext'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { AdminRoute } from '@/features/admin/components/AdminRoute'
import { AppLayout } from '@/shared/components/AppLayout'
import { AdminLayout } from '@/features/admin/components/AdminLayout'

// Auth pages
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { SignUpPage } from '@/features/auth/pages/SignUpPage'

// Onboarding
import { OnboardingPage } from '@/features/onboarding/pages/OnboardingPage'

// Student pages
import { DashboardPage } from '@/features/student/pages/DashboardPage'
import { CoursesPage } from '@/features/courses/pages/CoursesPage'
import { CourseDetailPage } from '@/features/courses/pages/CourseDetailPage'
import { TutorPage } from '@/features/tutors/pages/TutorPage'
import { LanguagePreferencesPage } from '@/features/language-settings/pages/LanguagePreferencesPage'

// Admin pages
import { AdminDashboardPage } from '@/features/admin/pages/AdminDashboardPage'
import { AdminCoursesPage } from '@/features/admin/pages/AdminCoursesPage'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Onboarding (authenticated but no language setup) */}
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            }
          />

          {/* Admin routes (separate layout, no language context needed) */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="courses" element={<AdminCoursesPage />} />
          </Route>

          {/* App routes (with language context) */}
          <Route
            element={
              <ProtectedRoute>
                <LanguageContextProvider>
                  <AppLayout />
                </LanguageContextProvider>
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
            <Route path="/tutor" element={<TutorPage />} />
            <Route path="/language-settings" element={<LanguagePreferencesPage />} />
            <Route path="/progress" element={<DashboardPage />} />
          </Route>

          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
