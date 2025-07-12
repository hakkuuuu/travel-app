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
  const loggedSet: typeof set = (...a) => {
    set(...a);
    console.log(`${name || 'store'}`, get());
  };
  return f(loggedSet, get, store);
};

// Error boundary middleware
export const errorBoundary = <T extends unknown>(
  f: StateCreator<T>,
  name?: string
) => (set, get, store) => {
  const wrappedSet: typeof set = (...args) => {
    try {
      set(...args);
    } catch (error) {
      console.error(`Error in ${name || 'store'} set:`, error);
      // You could dispatch to an error store here
    }
  };

  return f(wrappedSet, get, store);
};

// Analytics middleware
export const analytics = <T extends unknown>(
  f: StateCreator<T>,
  name?: string
) => (set, get, store) => {
  const trackedSet: typeof set = (...args) => {
    // Track state changes for analytics
    const prevState = get();
    set(...args);
    const newState = get();
    
    // You could send analytics events here
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'state_change', {
        store_name: name,
        event_category: 'state_management',
      });
    }
  };

  return f(trackedSet, get, store);
};

// Performance monitoring middleware
export const performance = <T extends unknown>(
  f: StateCreator<T>,
  name?: string
) => (set, get, store) => {
  const performanceSet: typeof set = (...args) => {
    const start = performance.now();
    set(...args);
    const end = performance.now();
    
    if (end - start > 16) { // Longer than one frame
      console.warn(`Slow state update in ${name || 'store'}: ${end - start}ms`);
    }
  };

  return f(performanceSet, get, store);
};

// Validation middleware
export const validate = <T extends unknown>(
  f: StateCreator<T>,
  validator: (state: T) => boolean | string,
  name?: string
) => (set, get, store) => {
  const validatedSet: typeof set = (...args) => {
    set(...args);
    const state = get();
    const validation = validator(state);
    
    if (validation !== true) {
      console.error(`Validation failed in ${name || 'store'}:`, validation);
    }
  };

  return f(validatedSet, get, store);
};

// Optimistic updates middleware
export const optimistic = <T extends unknown>(
  f: StateCreator<T>,
  name?: string
) => (set, get, store) => {
  const optimisticSet: typeof set = (...args) => {
    // Store previous state for rollback
    const prevState = get();
    
    try {
      set(...args);
    } catch (error) {
      // Rollback on error
      set(prevState);
      console.error(`Optimistic update failed in ${name || 'store'}:`, error);
    }
  };

  return f(optimisticSet, get, store);
};

// Throttle middleware
export const throttle = <T extends unknown>(
  f: StateCreator<T>,
  delay: number = 100,
  name?: string
) => (set, get, store) => {
  let timeoutId: NodeJS.Timeout;
  
  const throttledSet: typeof set = (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      set(...args);
    }, delay);
  };

  return f(throttledSet, get, store);
};

// Debounce middleware
export const debounce = <T extends unknown>(
  f: StateCreator<T>,
  delay: number = 300,
  name?: string
) => (set, get, store) => {
  let timeoutId: NodeJS.Timeout;
  
  const debouncedSet: typeof set = (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      set(...args);
    }, delay);
  };

  return f(debouncedSet, get, store);
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
  let store = f;

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
    store = devtools(store, { name: options.name });
  }

  // Add persistence
  if (options.persist) {
    store = persist(store, {
      name: options.persistKey || options.name,
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
  ) => (set, get, store) => {
    if (name) {
      stores.set(name, { set, get, store });
    }
    
    const enhancedSet: typeof set = (...args) => {
      set(...args);
      
      // Notify other stores if needed
      stores.forEach((otherStore, storeName) => {
        if (storeName !== name && otherStore.store.notify) {
          otherStore.store.notify(name, get());
        }
      });
    };
    
    return f(enhancedSet, get, store);
  };
};

// Store synchronization middleware
export const sync = <T extends unknown>(
  f: StateCreator<T>,
  syncKeys: string[],
  name?: string
) => (set, get, store) => {
  const syncedSet: typeof set = (...args) => {
    set(...args);
    
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

  return f(syncedSet, get, store);
}; 