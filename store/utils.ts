import { ApiResponse, PaginatedResponse, LoadingState } from './types';
import toast from 'react-hot-toast';

// API utility functions
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const apiCall = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.message || `HTTP error! status: ${response.status}`,
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      'Network error occurred',
      0,
      { originalError: error }
    );
  }
};

// Error handling utilities
export const handleApiError = (error: unknown, defaultMessage = 'An error occurred'): string => {
  if (error instanceof ApiError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return defaultMessage;
};

export const showErrorToast = (error: unknown, defaultMessage = 'An error occurred') => {
  const message = handleApiError(error, defaultMessage);
  toast.error(message);
};

export const showSuccessToast = (message: string) => {
  toast.success(message);
};

// State management utilities
export const createLoadingState = (): LoadingState => ({
  isLoading: false,
  error: null,
});

export const setLoading = (state: LoadingState, loading: boolean): LoadingState => ({
  ...state,
  isLoading: loading,
  error: loading ? null : state.error,
});

export const setError = (state: LoadingState, error: string | null): LoadingState => ({
  ...state,
  error,
  isLoading: false,
});

// Query parameter utilities
export const buildQueryParams = (params: Record<string, any>): URLSearchParams => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          searchParams.append(key, value.join(','));
        }
      } else {
        searchParams.append(key, String(value));
      }
    }
  });
  
  return searchParams;
};

// Validation utilities
export const validateRequired = (obj: Record<string, any>, requiredFields: string[]): string[] => {
  const errors: string[] = [];
  
  requiredFields.forEach(field => {
    if (!obj[field] || (typeof obj[field] === 'string' && obj[field].trim() === '')) {
      errors.push(`${field} is required`);
    }
  });
  
  return errors;
};

// Date utilities
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Storage utilities
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    if (typeof window === 'undefined') return defaultValue || null;
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch {
      return defaultValue || null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Failed to save to localStorage
    }
  },
  
  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
  
  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  },
};

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}; 