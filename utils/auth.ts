// Authentication utility functions

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const username = localStorage.getItem('username');
  
  return isLoggedIn && !!username;
};

export const getCurrentUser = (): { username: string; name?: string; email?: string; role?: string } | null => {
  if (typeof window === 'undefined') return null;
  
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const username = localStorage.getItem('username');
  const name = localStorage.getItem('name') || undefined;
  const email = localStorage.getItem('email') || undefined;
  const role = localStorage.getItem('role') || undefined;
  
  if (isLoggedIn && username) {
    return { username, name, email, role };
  }
  
  return null;
};

export const setAuthData = (username: string, name?: string, email?: string, role?: string): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('loggedIn', 'true');
  localStorage.setItem('username', username);
  if (name) localStorage.setItem('name', name);
  if (email) localStorage.setItem('email', email);
  if (role) localStorage.setItem('role', role);
};

export const clearAuthData = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('username');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  localStorage.removeItem('role');
  localStorage.removeItem('redirectAfterLogin');
};

export const setRedirectPath = (path: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('redirectAfterLogin', path);
};

export const getRedirectPath = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('redirectAfterLogin');
};

export const clearRedirectPath = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('redirectAfterLogin');
}; 