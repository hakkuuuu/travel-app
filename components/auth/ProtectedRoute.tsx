"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, fallback, adminOnly }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
      const username = localStorage.getItem('username');
      const role = localStorage.getItem('role');
      if (!isLoggedIn || !username) {
        setIsAuthenticated(false);
        setIsLoading(false);
        if (typeof window !== 'undefined') {
          localStorage.setItem('redirectAfterLogin', window.location.pathname);
        }
        router.push('/login');
        return;
      }
      setIsAuthenticated(true);
      setIsAdmin(role === 'admin');
      setIsLoading(false);
      if (adminOnly && role !== 'admin') {
        router.push('/');
      }
    };
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [router, adminOnly]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || null;
  }
  if (adminOnly && !isAdmin) {
    return fallback || null;
  }
  return <>{children}</>;
} 