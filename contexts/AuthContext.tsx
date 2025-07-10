"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getCurrentUser, setAuthData, clearAuthData, getRedirectPath, clearRedirectPath } from '@/utils/auth';
import toast from 'react-hot-toast';

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
  logout: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuthStatus = () => {
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
  };

  useEffect(() => {
    checkAuthStatus();
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        const { username, name, email, role } = data.user || {};
        setAuthData(username, name, email, role);
        setUser({ username, name, email, role });
        setIsAuthenticatedState(true);
        
        // Redirect to saved path or home
        const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
        localStorage.removeItem('redirectAfterLogin');
        router.push(redirectPath);
        
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      // Call logout API to clear cookies
      await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Logout API error:', error);
    }
    
    // Clear localStorage
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    setUser(null);
    setIsAuthenticatedState(false);
    toast.success('Signed out successfully!');
    router.push('/');
  };

  const value = {
    user,
    isAuthenticated: isAuthenticatedState,
    isLoading,
    login,
    logout,
    checkAuth: checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 