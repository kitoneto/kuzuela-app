import { Navigate } from 'react-router-dom'
import { useAuthContext } from '@/shared/contexts/AuthContext'

interface AdminRouteProps {
  children: React.ReactNode
}

// In production, check for admin role from user metadata or a separate table
const isAdmin = (email?: string): boolean => {
  if (!email) return false
  const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS ?? '').split(',').map((e: string) => e.trim())
  return adminEmails.includes(email)
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuthContext()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!isAdmin(user?.email)) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
