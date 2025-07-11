"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// Types
interface User {
  username: string;
  name?: string;
  email?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => boolean;
}

// Auth utilities
const AUTH_KEYS = {
  LOGGED_IN: 'loggedIn',
  USERNAME: 'username',
  NAME: 'name',
  EMAIL: 'email',
  ROLE: 'role',
  REDIRECT_PATH: 'redirectAfterLogin',
} as const;

const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const isLoggedIn = localStorage.getItem(AUTH_KEYS.LOGGED_IN) === 'true';
  const username = localStorage.getItem(AUTH_KEYS.USERNAME);
  
  return isLoggedIn && !!username;
};

const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  const isLoggedIn = localStorage.getItem(AUTH_KEYS.LOGGED_IN) === 'true';
  const username = localStorage.getItem(AUTH_KEYS.USERNAME);
  const name = localStorage.getItem(AUTH_KEYS.NAME) || undefined;
  const email = localStorage.getItem(AUTH_KEYS.EMAIL) || undefined;
  const role = localStorage.getItem(AUTH_KEYS.ROLE) || undefined;
  
  if (isLoggedIn && username) {
    return { username, name, email, role };
  }
  
  return null;
};

const setAuthData = (username: string, name?: string, email?: string, role?: string): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(AUTH_KEYS.LOGGED_IN, 'true');
  localStorage.setItem(AUTH_KEYS.USERNAME, username);
  if (name) localStorage.setItem(AUTH_KEYS.NAME, name);
  if (email) localStorage.setItem(AUTH_KEYS.EMAIL, email);
  if (role) localStorage.setItem(AUTH_KEYS.ROLE, role);
};

const clearAuthData = (): void => {
  if (typeof window === 'undefined') return;
  
  Object.values(AUTH_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

const getRedirectPath = (): string => {
  if (typeof window === 'undefined') return '/';
  return localStorage.getItem(AUTH_KEYS.REDIRECT_PATH) || '/';
};

const clearRedirectPath = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_KEYS.REDIRECT_PATH);
};

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuthStatus = useCallback(() => {
    if (isAuthenticated()) {
      const currentUser = getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticatedState(true);
        return true;
      }
    }
    
    setUser(null);
    setIsAuthenticatedState(false);
    return false;
  }, []);

  useEffect(() => {
    checkAuthStatus();
    setIsLoading(false);
  }, [checkAuthStatus]);

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const { username, name, email, role } = data.user || {};
        setAuthData(username, name, email, role);
        setUser({ username, name, email, role });
        setIsAuthenticatedState(true);
        
        // Redirect admin to admin panel
        if (role === 'admin') {
          router.push('/admin');
          return true;
        }
        
        // Redirect to saved path or home
        const redirectPath = getRedirectPath();
        clearRedirectPath();
        router.push(redirectPath);
        
        toast.success('Welcome back!');
        return true;
      } else {
        toast.error(data.message || 'Login failed');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
      return false;
    }
  }, [router]);

  const register = useCallback(async (username: string, email: string, password: string, name: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, name }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const { username, name, email, role } = data.user || {};
        setAuthData(username, name, email, role);
        setUser({ username, name, email, role });
        setIsAuthenticatedState(true);
        
        // Redirect to saved path or home
        const redirectPath = getRedirectPath();
        clearRedirectPath();
        router.push(redirectPath);
        
        toast.success('Account created successfully!');
        return true;
      } else {
        toast.error(data.message || 'Registration failed');
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration');
      return false;
    }
  }, [router]);

  const logout = useCallback(async (): Promise<void> => {
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
    
    // Clear client-side data
    clearAuthData();
    setUser(null);
    setIsAuthenticatedState(false);
    
    toast.success('Signed out successfully!');
    router.push('/');
  }, [router]);

  const value: AuthContextType = {
    user,
    isAuthenticated: isAuthenticatedState,
    isLoading,
    login,
    register,
    logout,
    checkAuth: checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 