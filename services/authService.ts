import { User } from '../types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// This service mocks a user session.
// In a real app, this would be managed with secure, HttpOnly cookies set by the server.

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'daily-pi-mart-auth',
    }
  )
);

export const verifyPiAuth = async (accessToken: string, user: { uid: string; username: string }): Promise<User> => {
    console.log(`[AUTH MOCK] Verifying auth for ${user.username} with token ${accessToken}`);
    // In a real app, you would send the accessToken to your server, which verifies it with Pi's /me endpoint.
    // For this mock, we'll just accept it and create a user session.
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
        id: `user_${user.uid}`,
        piUid: user.uid,
        username: user.username,
    };
}