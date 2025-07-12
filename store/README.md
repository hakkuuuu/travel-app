# Zustand Store Implementation

This directory contains a comprehensive Zustand-based state management solution for the travel app.

## 🏗️ Architecture

The store implementation follows a modular architecture with the following structure:

```
store/
├── index.ts              # Main exports and initialization
├── types.ts              # Shared TypeScript types
├── utils.ts              # Utility functions and helpers
├── hooks.ts              # Custom React hooks
├── middleware.ts         # Zustand middleware
├── authStore.ts          # Authentication state
├── destinationStore.ts   # Destination management
├── bookingStore.ts       # Booking management
├── uiStore.ts            # UI state management
├── themeStore.ts         # Theme management
├── notificationStore.ts  # Notification system
└── README.md            # This documentation
```

## 🚀 Features

### Core Features
- **TypeScript Support**: Full type safety with comprehensive interfaces
- **Persistence**: Automatic state persistence with localStorage
- **DevTools Integration**: Redux DevTools support for debugging
- **Error Handling**: Centralized error handling with toast notifications
- **Performance Optimization**: Debounced and throttled operations
- **Cross-Store Communication**: Inter-store communication capabilities

### Store Features
- **Authentication Store**: User management with automatic redirects
- **Destination Store**: CRUD operations with filtering and search
- **Booking Store**: Booking management with status tracking
- **UI Store**: Modal, sidebar, and general UI state
- **Theme Store**: Dark/light mode with system preference detection
- **Notification Store**: Toast notifications with auto-dismiss

## 📦 Installation & Setup

### 1. Install Dependencies
```bash
npm install zustand
```

### 2. Initialize Stores
```typescript
// In your app root
import { initializeStores } from '@/store';

// Initialize stores on app mount
useEffect(() => {
  initializeStores();
}, []);
```

### 3. Use Stores in Components
```typescript
import { useAuthStore, useDestinationStore } from '@/store';

function MyComponent() {
  const { user, login } = useAuthStore();
  const { destinations, fetchDestinations } = useDestinationStore();
  
  // Your component logic
}
```

## 🔧 Store Usage

### Authentication Store
```typescript
import { useAuthStore } from '@/store';

function LoginComponent() {
  const { login, user, isAuthenticated, isLoading } = useAuthStore();
  
  const handleLogin = async () => {
    const success = await login(username, password);
    if (success) {
      // Redirect or show success message
    }
  };
}
```

### Destination Store
```typescript
import { useDestinationStore } from '@/store';

function DestinationsPage() {
  const { 
    destinations, 
    fetchDestinations, 
    setFilters,
    isLoading 
  } = useDestinationStore();
  
  useEffect(() => {
    fetchDestinations();
  }, []);
  
  const handleSearch = (search: string) => {
    setFilters({ search });
  };
}
```

### UI Store
```typescript
import { useUIStore } from '@/store';

function App() {
  const { modal, openModal, closeModal } = useUIStore();
  
  const showAuthModal = () => {
    openModal('auth', { redirectTo: '/dashboard' });
  };
}
```

## 🎣 Custom Hooks

### useAuthWithRedirect
Enhanced authentication hook with automatic redirects:
```typescript
import { useAuthWithRedirect } from '@/store';

function ProtectedComponent() {
  const { requireAuth, user } = useAuthWithRedirect();
  
  useEffect(() => {
    if (!requireAuth('/login')) {
      return; // User will be redirected
    }
  }, []);
}
```

### useDestinationManager
Comprehensive destination management:
```typescript
import { useDestinationManager } from '@/store';

function DestinationsManager() {
  const { 
    destinations,
    debouncedSearch,
    createDestination,
    updateDestination 
  } = useDestinationManager();
  
  // Auto-fetches destinations and provides debounced search
}
```

### useUIManager
UI state management with keyboard shortcuts:
```typescript
import { useUIManager } from '@/store';

function AppLayout() {
  const { 
    modal, 
    sidebar, 
    openModal, 
    closeModal 
  } = useUIManager();
  
  // Automatically handles escape key and window resize
}
```

## 🛠️ Utilities

### API Utilities
```typescript
import { apiCall, showErrorToast, showSuccessToast } from '@/store';

// Make API calls with error handling
const data = await apiCall('/api/destinations');

// Show toast notifications
showSuccessToast('Operation successful!');
showErrorToast('Something went wrong');
```

### State Utilities
```typescript
import { 
  createLoadingState, 
  setLoading, 
  setError 
} from '@/store';

// Create loading states
const loadingState = createLoadingState();
const updatedState = setLoading(loadingState, true);
```

### Validation Utilities
```typescript
import { validateRequired } from '@/store';

// Validate required fields
const errors = validateRequired(formData, ['name', 'email']);
```

## 🔄 Middleware

### Built-in Middleware
- **Logger**: Logs state changes in development
- **Error Boundary**: Catches and handles errors
- **Analytics**: Tracks state changes for analytics
- **Performance**: Monitors slow state updates
- **Validation**: Validates state changes
- **Optimistic Updates**: Handles optimistic UI updates
- **Throttle/Debounce**: Prevents excessive updates

### Custom Middleware
```typescript
import { createStore } from '@/store/middleware';

const store = createStore(
  (set, get) => ({
    // Your store logic
  }),
  {
    name: 'my-store',
    persist: true,
    devtools: true,
    logger: true,
    performance: true,
    validation: (state) => {
      // Custom validation logic
      return true;
    }
  }
);
```

## 🎨 Theme Management

### Automatic Theme Detection
```typescript
import { useThemeManager } from '@/store';

function ThemeProvider() {
  const { theme, setTheme, isDark } = useThemeManager();
  
  // Automatically detects system theme
  // Applies theme to document
  // Persists theme preference
}
```

## 📱 Notification System

### Toast Notifications
```typescript
import { useNotificationManager } from '@/store';

function NotificationExample() {
  const { 
    showSuccess, 
    showError, 
    showWarning, 
    showInfo 
  } = useNotificationManager();
  
  const handleSuccess = () => {
    showSuccess('Success', 'Operation completed successfully');
  };
}
```

## 🔒 Security Features

### Authentication Persistence
- Secure token storage
- Automatic session validation
- Role-based access control
- Automatic logout on token expiry

### Data Validation
- Input sanitization
- Type checking
- Required field validation
- API response validation

## 🚀 Performance Optimizations

### Debounced Operations
```typescript
// Search is automatically debounced
const { debouncedSearch } = useDestinationManager();
debouncedSearch('search term');
```

### Selective Re-renders
```typescript
// Only subscribe to specific state slices
const user = useAuthStore(state => state.user);
const isLoading = useAuthStore(state => state.isLoading);
```

### Optimistic Updates
```typescript
// UI updates immediately, rolls back on error
const { updateDestination } = useDestinationStore();
await updateDestination(id, updates);
```

## 🧪 Testing

### Store Testing
```typescript
import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '@/store';

test('login updates user state', () => {
  const { result } = renderHook(() => useAuthStore());
  
  act(() => {
    result.current.login('user', 'pass');
  });
  
  expect(result.current.isAuthenticated).toBe(true);
});
```

## 📊 Monitoring & Debugging

### DevTools Integration
- Redux DevTools support
- State inspection
- Action replay
- Time-travel debugging

### Performance Monitoring
- State update timing
- Memory usage tracking
- Slow operation warnings
- Bundle size analysis

## 🔧 Configuration

### Environment Variables
```env
# Enable/disable features
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_LOGGING=true
NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING=true
```

### Store Configuration
```typescript
// Customize store behavior
const storeConfig = {
  persist: true,
  devtools: process.env.NODE_ENV === 'development',
  logger: process.env.NODE_ENV === 'development',
  analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
};
```

## 🤝 Contributing

### Adding New Stores
1. Create store file in `store/` directory
2. Export types and store from `store/index.ts`
3. Add custom hooks if needed
4. Update documentation

### Store Guidelines
- Use TypeScript for all stores
- Implement proper error handling
- Add loading states
- Include validation
- Write tests
- Document the API

## 📚 Additional Resources

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Hooks Documentation](https://react.dev/reference/react/hooks)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)

## 🐛 Troubleshooting

### Common Issues

**Store not updating**
- Check if you're using the correct selector
- Verify the store is properly initialized
- Check for middleware conflicts

**Persistence not working**
- Verify localStorage is available
- Check storage key conflicts
- Ensure proper serialization

**Performance issues**
- Use selective subscriptions
- Implement debouncing/throttling
- Monitor state size

**TypeScript errors**
- Check type definitions
- Verify import paths
- Update TypeScript version

For more help, check the [Issues](../../issues) section or create a new one. 