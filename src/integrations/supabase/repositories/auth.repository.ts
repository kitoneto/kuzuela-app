import { supabaseClient } from '../client';

export class AuthRepository {
  async signIn(email: string, password: string) {
    return supabaseClient.auth.signInWithPassword({ email, password });
  }

  async signUp(email: string, password: string, name: string) {
    return supabaseClient.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
  }

  async signOut() {
    return supabaseClient.auth.signOut();
  }

  async resetPassword(email: string) {
    return supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback`,
    });
  }

  async signInWithGoogle() {
    return supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  async getSession() {
    return supabaseClient.auth.getSession();
  }

  onAuthStateChange(callback: Parameters<typeof supabaseClient.auth.onAuthStateChange>[0]) {
    return supabaseClient.auth.onAuthStateChange(callback);
  }
}

export const authRepository = new AuthRepository();
