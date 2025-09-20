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
    console.log(`[AUTH MOCK] Verifying auth for ${user.username}`);
    
    // SECURITY NOTE (as per Pi Platform Docs):
    // The accessToken received on the client is NOT the source of truth.
    // It MUST be sent to your application's backend server.
    // Your server then makes a secure API call to the Pi `/me` endpoint
    // using this token in the Authorization header: `Authorization: Bearer ${accessToken}`.
    // If the Pi server returns a valid user, only then should you create a session.
    // This mock simulates that server-side verification.
    
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
        id: `user_${user.uid}`,
        piUid: user.uid,
        username: user.username,
    };
}