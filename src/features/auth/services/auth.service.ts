import { authRepository } from '../../../integrations/supabase/repositories/auth.repository';

export class AuthService {
  async signIn(email: string, password: string) {
    const { error } = await authRepository.signIn(email, password);
    if (error) throw error;
  }

  async signUp(email: string, password: string, name: string) {
    const { error } = await authRepository.signUp(email, password, name);
    if (error) throw error;
  }

  async signOut() {
    const { error } = await authRepository.signOut();
    if (error) throw error;
  }

  async resetPassword(email: string) {
    const { error } = await authRepository.resetPassword(email);
    if (error) throw error;
  }

  async signInWithGoogle() {
    const { error } = await authRepository.signInWithGoogle();
    if (error) throw error;
  }
}

export const authService = new AuthService();
