import { useEffect, useCallback, useRef } from 'react';
import { useAuthStore } from './authStore';
import { useDestinationStore } from './destinationStore';
import { useBookingStore } from './bookingStore';
import { useUIStore } from './uiStore';
import { useThemeStore } from './themeStore';
import { useNotificationStore } from './notificationStore';
import { debounce, throttle } from './utils';

// Custom hook for handling scroll events
export const useScrollHandler = (callback: (isScrolled: boolean) => void, threshold = 10) => {
  const setScrolled = useUIStore(state => state.setScrolled);
  
  useEffect(() => {
    const handleScroll = throttle(() => {
      const isScrolled = window.scrollY > threshold;
      setScrolled(isScrolled);
      callback?.(isScrolled);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback, setScrolled, threshold]);
};

// Custom hook for handling window resize events
export const useResizeHandler = (callback?: (width: number, height: number) => void) => {
  useEffect(() => {
    const handleResize = debounce(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      callback?.(width, height);
    }, 250);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [callback]);
};

// Custom hook for handling system theme changes
export const useSystemTheme = () => {
  const setSystemTheme = useThemeStore(state => state.setSystemTheme);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Set initial theme
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setSystemTheme]);
};

// Custom hook for authentication with automatic redirect
export const useAuthWithRedirect = () => {
  const { user, isAuthenticated, login, register, logout } = useAuthStore();
  const { openModal } = useUIStore();
  
  const handleLogin = useCallback(async (username: string, password: string) => {
    const success = await login(username, password);
    if (success && user?.role === 'admin') {
      window.location.href = '/admin';
    }
    return success;
  }, [login, user?.role]);

  const handleRegister = useCallback(async (username: string, email: string, password: string, name: string) => {
    const success = await register(username, email, password, name);
    if (success) {
      window.location.href = '/';
    }
    return success;
  }, [register]);

  const handleLogout = useCallback(async () => {
    await logout();
    window.location.href = '/';
  }, [logout]);

  const requireAuth = useCallback((redirectTo = '/login') => {
    if (!isAuthenticated) {
      openModal('auth', { redirectTo });
      return false;
    }
    return true;
  }, [isAuthenticated, openModal]);

  return {
    user,
    isAuthenticated,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    requireAuth,
  };
};

// Custom hook for destination management
export const useDestinationManager = () => {
  const {
    destinations,
    featuredDestinations,
    popularDestinations,
    currentDestination,
    filters,
    isLoading,
    error,
    fetchDestinations,
    fetchDestinationById,
    fetchFeaturedDestinations,
    fetchPopularDestinations,
    createDestination,
    updateDestination,
    deleteDestination,
    setFilters,
    clearFilters,
    setCurrentDestination,
    clearError,
  } = useDestinationStore();

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((search: string) => {
      setFilters({ search });
    }, 300),
    [setFilters]
  );

  // Auto-fetch destinations when filters change
  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  // Auto-fetch featured and popular destinations
  useEffect(() => {
    fetchFeaturedDestinations();
    fetchPopularDestinations();
  }, [fetchFeaturedDestinations, fetchPopularDestinations]);

  return {
    destinations,
    featuredDestinations,
    popularDestinations,
    currentDestination,
    filters,
    isLoading,
    error,
    fetchDestinations,
    fetchDestinationById,
    createDestination,
    updateDestination,
    deleteDestination,
    setFilters,
    clearFilters,
    setCurrentDestination,
    clearError,
    debouncedSearch,
  };
};

// Custom hook for booking management
export const useBookingManager = () => {
  const {
    bookings,
    currentBooking,
    filters,
    isLoading,
    error,
    fetchBookings,
    fetchBookingById,
    createBooking,
    updateBooking,
    cancelBooking,
    setFilters,
    clearFilters,
    setCurrentBooking,
    clearError,
  } = useBookingStore();

  // Auto-fetch bookings when filters change
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return {
    bookings,
    currentBooking,
    filters,
    isLoading,
    error,
    fetchBookings,
    fetchBookingById,
    createBooking,
    updateBooking,
    cancelBooking,
    setFilters,
    clearFilters,
    setCurrentBooking,
    clearError,
  };
};

// Custom hook for UI management
export const useUIManager = () => {
  const {
    modal,
    sidebar,
    isLoading,
    isScrolled,
    activeTab,
    breadcrumbs,
    openModal,
    closeModal,
    openSidebar,
    closeSidebar,
    setLoading,
    setScrolled,
    setActiveTab,
    setBreadcrumbs,
    clearBreadcrumbs,
  } = useUIStore();

  // Auto-close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (modal.isOpen) {
          closeModal();
        }
        if (sidebar.isOpen) {
          closeSidebar();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [modal.isOpen, sidebar.isOpen, closeModal, closeSidebar]);

  // Auto-close sidebar on window resize (mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && sidebar.isOpen && sidebar.type === 'mobile') {
        closeSidebar();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebar.isOpen, sidebar.type, closeSidebar]);

  return {
    modal,
    sidebar,
    isLoading,
    isScrolled,
    activeTab,
    breadcrumbs,
    openModal,
    closeModal,
    openSidebar,
    closeSidebar,
    setLoading,
    setScrolled,
    setActiveTab,
    setBreadcrumbs,
    clearBreadcrumbs,
  };
};

// Custom hook for theme management
export const useThemeManager = () => {
  const { theme, systemTheme, isDark, setTheme, toggleTheme, setSystemTheme } = useThemeStore();
  
  // Apply theme to document on mount and theme change
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return {
    theme,
    systemTheme,
    isDark,
    setTheme,
    toggleTheme,
    setSystemTheme,
  };
};

// Custom hook for notification management
export const useNotificationManager = () => {
  const {
    notifications,
    unreadCount,
    addNotification,
    removeNotification,
    clearNotifications,
    markAsRead,
    markAllAsRead,
    updateUnreadCount,
  } = useNotificationStore();

  // Auto-update unread count when notifications change
  useEffect(() => {
    updateUnreadCount();
  }, [notifications, updateUnreadCount]);

  // Convenience methods for different notification types
  const showSuccess = useCallback((title: string, message: string, duration = 5000) => {
    addNotification({
      type: 'success',
      title,
      message,
      duration,
    });
  }, [addNotification]);

  const showError = useCallback((title: string, message: string, duration = 0) => {
    addNotification({
      type: 'error',
      title,
      message,
      duration,
    });
  }, [addNotification]);

  const showWarning = useCallback((title: string, message: string, duration = 5000) => {
    addNotification({
      type: 'warning',
      title,
      message,
      duration,
    });
  }, [addNotification]);

  const showInfo = useCallback((title: string, message: string, duration = 5000) => {
    addNotification({
      type: 'info',
      title,
      message,
      duration,
    });
  }, [addNotification]);

  return {
    notifications,
    unreadCount,
    addNotification,
    removeNotification,
    clearNotifications,
    markAsRead,
    markAllAsRead,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};

// Custom hook for handling API calls with loading states
export const useApiCall = <T, P extends any[]>(
  apiFunction: (...args: P) => Promise<T>,
  options: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    showToast?: boolean;
    successMessage?: string;
    errorMessage?: string;
  } = {}
) => {
  const { setLoading } = useUIStore();
  const { showSuccess, showError } = useNotificationManager();
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const execute = useCallback(async (...args: P): Promise<T | null> => {
    setLoading(true);
    
    try {
      const result = await apiFunction(...args);
      
      if (isMounted.current) {
        if (options.showToast && options.successMessage) {
          showSuccess('Success', options.successMessage);
        }
        options.onSuccess?.(result);
      }
      
      return result;
    } catch (error) {
      if (isMounted.current) {
        const errorMessage = options.errorMessage || 'An error occurred';
        if (options.showToast) {
          showError('Error', errorMessage);
        }
        options.onError?.(error as Error);
      }
      return null;
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [apiFunction, setLoading, showSuccess, showError, options]);

  return { execute };
}; 