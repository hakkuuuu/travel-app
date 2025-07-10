"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  username: string;
  name?: string;
  email?: string;
}

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => boolean;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const username = localStorage.getItem('username');
    
    if (isLoggedIn && username) {
      setUser({ username });
      setIsAuthenticated(true);
      return true;
    } else {
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  }, []);

  useEffect(() => {
    checkAuth();
    setIsLoading(false);
  }, [checkAuth]);

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    console.log('useAuth login called with:', { username, password });
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      console.log('Login response status:', response.status);
      const data = await response.json();
      console.log('Login response data:', data);

      if (data.success) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', username);
        setUser({ username });
        setIsAuthenticated(true);
        
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
  }, [router]);

  const register = useCallback(async (username: string, email: string, password: string): Promise<boolean> => {
    console.log('useAuth register called with:', { username, email });
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      console.log('Register response status:', response.status);
      const data = await response.json();
      console.log('Register response data:', data);

      if (data.success) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', username);
        setUser({ username, email });
        setIsAuthenticated(true);
        
        // Redirect to saved path or home
        const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
        localStorage.removeItem('redirectAfterLogin');
        router.push(redirectPath);
        
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    setUser(null);
    setIsAuthenticated(false);
    router.push('/');
  }, [router]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    checkAuth,
  };
} 