import { USER_ROLES } from '../../../shared/constants/roles';

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  role: UserRole | null;
}
