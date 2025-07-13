import { StateCreator, StoreMutatorIdentifier } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

// Type for middleware
type Logger = <
  T extends unknown,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>;

// Logger middleware
export const logger: Logger = (f, name) => (set, get, store) => {
  const loggedSet = (partial: any, replace?: any, action?: any) => {
    set(partial, replace, action);
          // Store state logged
  };
  return f(loggedSet as any, get, store);
};

// Error boundary middleware
export const errorBoundary = <T extends unknown>(
  f: StateCreator<T>,
  name?: string
) => (set: any, get: any, store: any) => {
  const wrappedSet = (partial: any, replace?: any, action?: any) => {
    try {
      set(partial, replace, action);
    } catch (error) {
      // Error in store set
      // You could dispatch to an error store here
    }
  };

  return f(wrappedSet as any, get, store);
};

// Analytics middleware
export const analytics = <T extends unknown>(
  f: StateCreator<T>,
  name?: string
) => (set: any, get: any, store: any) => {
  const trackedSet = (partial: any, replace?: any, action?: any) => {
    // Track state changes for analytics
    const prevState = get();
    set(partial, replace, action);
    const newState = get();
    
    // You could send analytics events here
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'state_change', {
        store_name: name,
        event_category: 'state_management',
      });
    }
  };

  return f(trackedSet as any, get, store);
};

// Performance monitoring middleware
export const performance = <T extends unknown>(
  f: StateCreator<T>,
  name?: string
) => (set: any, get: any, store: any) => {
  const performanceSet = (partial: any, replace?: any, action?: any) => {
    const start = (globalThis as any).performance?.now?.() || Date.now();
    set(partial, replace, action);
    const end = (globalThis as any).performance?.now?.() || Date.now();
    
    if (end - start > 16) { // Longer than one frame
              // Slow state update detected
    }
  };

  return f(performanceSet as any, get, store);
};

// Validation middleware
export const validate = <T extends unknown>(
  f: StateCreator<T>,
  validator: (state: T) => boolean | string,
  name?: string
) => (set: any, get: any, store: any) => {
  const validatedSet = (partial: any, replace?: any, action?: any) => {
    set(partial, replace, action);
    const state = get();
    const validation = validator(state);
    
    if (validation !== true) {
      console.error(`Validation failed in ${name || 'store'}:`, validation);
    }
  };

  return f(validatedSet as any, get, store);
};

// Optimistic updates middleware
export const optimistic = <T extends unknown>(
  f: StateCreator<T>,
  name?: string
) => (set: any, get: any, store: any) => {
  const optimisticSet = (partial: any, replace?: any, action?: any) => {
    // Store previous state for rollback
    const prevState = get();
    
    try {
      set(partial, replace, action);
    } catch (error) {
      // Rollback on error
      set(prevState);
      console.error(`Optimistic update failed in ${name || 'store'}:`, error);
    }
  };

  return f(optimisticSet as any, get, store);
};

// Throttle middleware
export const throttle = <T extends unknown>(
  f: StateCreator<T>,
  delay: number = 100,
  name?: string
) => (set: any, get: any, store: any) => {
  let timeoutId: NodeJS.Timeout;
  
  const throttledSet = (partial: any, replace?: any, action?: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      set(partial, replace, action);
    }, delay);
  };

  return f(throttledSet as any, get, store);
};

// Debounce middleware
export const debounce = <T extends unknown>(
  f: StateCreator<T>,
  delay: number = 300,
  name?: string
) => (set: any, get: any, store: any) => {
  let timeoutId: NodeJS.Timeout;
  
  const debouncedSet = (partial: any, replace?: any, action?: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      set(partial, replace, action);
    }, delay);
  };

  return f(debouncedSet as any, get, store);
};

// Combine multiple middlewares
export const compose = <T extends unknown>(
  f: StateCreator<T>,
  ...middlewares: Array<(f: StateCreator<T>, name?: string) => StateCreator<T>>
) => {
  return middlewares.reduce((acc, middleware) => middleware(acc), f);
};

// Enhanced store creator with common middlewares
export const createStore = <T extends unknown>(
  f: StateCreator<T>,
  options: {
    name?: string;
    persist?: boolean;
    persistKey?: string;
    devtools?: boolean;
    logger?: boolean;
    analytics?: boolean;
    performance?: boolean;
    validation?: (state: T) => boolean | string;
  } = {}
) => {
  let store: any = f;

  // Add validation if provided
  if (options.validation) {
    store = validate(store, options.validation, options.name);
  }

  // Add performance monitoring
  if (options.performance) {
    store = performance(store, options.name);
  }

  // Add analytics
  if (options.analytics) {
    store = analytics(store, options.name);
  }

  // Add logger in development
  if (options.logger && process.env.NODE_ENV === 'development') {
    store = logger(store, options.name);
  }

  // Add devtools in development
  if (options.devtools && process.env.NODE_ENV === 'development') {
    store = devtools(store, { name: options.name || 'store' });
  }

  // Add persistence
  if (options.persist) {
    store = persist(store, {
      name: options.persistKey || options.name || 'store',
      partialize: (state) => state,
    });
  }

  return store;
};

// Store enhancer for cross-store communication
export const createStoreEnhancer = () => {
  const stores = new Map();
  
  return <T extends unknown>(
    f: StateCreator<T>,
    name?: string
  ) => (set: any, get: any, store: any) => {
    if (name) {
      stores.set(name, { set, get, store });
    }
    
    const enhancedSet = (partial: any, replace?: any, action?: any) => {
      set(partial, replace, action);
      
      // Notify other stores if needed
      stores.forEach((otherStore, storeName) => {
        if (storeName !== name && otherStore.store.notify) {
          otherStore.store.notify(name, get());
        }
      });
    };
    
    return f(enhancedSet as any, get, store);
  };
};

// Store synchronization middleware
export const sync = <T extends unknown>(
  f: StateCreator<T>,
  syncKeys: string[],
  name?: string
) => (set: any, get: any, store: any) => {
  const syncedSet = (partial: any, replace?: any, action?: any) => {
    set(partial, replace, action);
    
    // Sync to localStorage or other storage
    if (typeof window !== 'undefined') {
      const state = get();
      const syncData = syncKeys.reduce((acc, key) => {
        if (key in state) {
          acc[key] = (state as any)[key];
        }
        return acc;
      }, {} as Record<string, any>);
      
      localStorage.setItem(`${name || 'store'}_sync`, JSON.stringify(syncData));
    }
  };

  return f(syncedSet as any, get, store);
}; 