import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Form validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength;
};

// User feedback utilities
export const showSuccessToast = (message: string) => {
  // This will be handled by react-hot-toast in components
  return message;
};

export const showErrorToast = (message: string) => {
  // This will be handled by react-hot-toast in components
  return message;
};

export const showInfoToast = (message: string) => {
  // This will be handled by react-hot-toast in components
  return message;
};

// Profile specific utilities
export const formatMemberSince = (dateString: string): string => {
  if (!dateString) return 'Unknown';
  
  try {
    let date: Date;
    
    // Handle different date formats
    if (dateString.includes('T')) {
      // ISO string format (e.g., "2024-01-15T10:30:00.000Z")
      date = new Date(dateString);
    } else if (dateString.includes('-')) {
      // Date-only format (e.g., "2024-01-15")
      date = new Date(dateString + 'T00:00:00.000Z');
    } else {
      // Try parsing as is
      date = new Date(dateString);
    }
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Unknown';
    }
    
    // Format as "Month Day, Year" (e.g., "January 15, 2024")
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch (error) {
    console.warn('Error formatting date:', dateString, error);
    return 'Unknown';
  }
};

export const hasProfileChanges = (
  original: Partial<any>, 
  current: Partial<any>, 
  fields: string[]
): boolean => {
  return fields.some(field => original[field] !== current[field]);
}; 