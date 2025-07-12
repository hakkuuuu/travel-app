// Main store exports
export { useAuthStore } from './authStore';
export { useDestinationStore } from './destinationStore';
export { useBookingStore } from './bookingStore';
export { useUIStore } from './uiStore';
export { useThemeStore } from './themeStore';
export { useNotificationStore } from './notificationStore';
export { useAdminStore } from './adminStore';

// Store types
export type { User, AuthState } from './authStore';
export type { Destination, DestinationState } from './destinationStore';
export type { Booking, BookingState } from './bookingStore';
export type { UIState } from './uiStore';
export type { ThemeState } from './themeStore';
export type { Notification, NotificationState } from './notificationStore';
export type { AdminUser, AdminDestination, AdminStats, AdminState } from './adminStore';

// Utility exports
export * from './types';
export * from './utils';
export * from './hooks';

// Middleware exports (with aliases to avoid conflicts)
export { 
  logger,
  errorBoundary,
  analytics,
  performance,
  validate,
  optimistic,
  throttle as throttleMiddleware,
  debounce as debounceMiddleware,
  compose,
  createStore,
  createStoreEnhancer,
  sync
} from './middleware';

// Store initialization
export const initializeStores = () => {
  // Initialize theme on client side
  if (typeof window !== 'undefined') {
    const { useThemeStore } = require('./themeStore');
    const { useSystemTheme } = require('./hooks');
    
    // This will be called when the app mounts
    useSystemTheme();
  }
}; 