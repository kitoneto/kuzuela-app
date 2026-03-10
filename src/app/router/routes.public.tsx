import { Route } from 'react-router-dom';
import { PublicOnlyRoute } from './guards/ProtectedRoute';
import { HomePage } from '../../pages/Landing/HomePage';
import { LoginPage } from '../../pages/Auth/LoginPage';
import { RegisterPage } from '../../pages/Auth/RegisterPage';
import { ResetPasswordPage } from '../../pages/Auth/ResetPasswordPage';
import { CallbackPage } from '../../pages/Auth/CallbackPage';

/**
 * Public route definitions. Use the exported Route elements in AppRouter
 * by spreading or rendering them inside a <Routes> block.
 */
export function PublicRoutes() {
  return (
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/callback" element={<CallbackPage />} />
      <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
      <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </>
  );
}
