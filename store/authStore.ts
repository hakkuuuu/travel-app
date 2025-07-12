import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { apiCall, showErrorToast, showSuccessToast, handleApiError } from './utils';
import { ApiResponse } from './types';

// Types
export interface User {
  id?: string;
  username: string;
  name?: string;
  email?: string;
  role?: string;
  avatar?: string;
  createdAt?: string;
  lastLogin?: string;
}

export interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

// Auth utilities
const AUTH_KEYS = {
  REDIRECT_PATH: 'redirectAfterLogin',
} as const;

const getRedirectPath = (): string => {
  if (typeof window === 'undefined') return '/';
  return localStorage.getItem(AUTH_KEYS.REDIRECT_PATH) || '/';
};

const clearRedirectPath = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_KEYS.REDIRECT_PATH);
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (username: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          });

          const data = await response.json();

          if (data.success) {
            const user = data.user;
            set({ 
              user, 
              isAuthenticated: true, 
              isLoading: false, 
              error: null 
            });
            
            showSuccessToast('Welcome back!');
            return true;
          } else {
            set({ 
              isLoading: false, 
              error: data.message || 'Login failed' 
            });
            showErrorToast(data.message || 'Login failed');
            return false;
          }
        } catch (error) {
          const errorMessage = 'An error occurred during login';
          set({ isLoading: false, error: errorMessage });
          showErrorToast(errorMessage);
          return false;
        }
      },

      register: async (username: string, email: string, password: string, name: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, name }),
          });

          const data = await response.json();

          if (data.success) {
            const user = data.user;
            set({ 
              user, 
              isAuthenticated: true, 
              isLoading: false, 
              error: null 
            });
            
            showSuccessToast('Account created successfully!');
            return true;
          } else {
            set({ 
              isLoading: false, 
              error: data.message || 'Registration failed' 
            });
            showErrorToast(data.message || 'Registration failed');
            return false;
          }
        } catch (error) {
          const errorMessage = 'An error occurred during registration';
          set({ isLoading: false, error: errorMessage });
          showErrorToast(errorMessage);
          return false;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        
        try {
          // Call logout API to clear server-side session
          await fetch('/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (error) {
          console.error('Logout API error:', error);
          // Continue with client-side logout even if API fails
        }
        
        set({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false, 
          error: null 
        });
        
        showSuccessToast('Signed out successfully!');
      },

      checkAuth: async () => {
        const { user, isAuthenticated } = get();
        
        if (isAuthenticated && user) {
          return true;
        }
        
        // Could add an API call here to verify token validity
        return false;
      },

      updateUser: (userData: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...userData } });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
); 