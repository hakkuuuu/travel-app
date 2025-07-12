import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeState {
  // State
  theme: Theme;
  systemTheme: 'light' | 'dark';
  isDark: boolean;
  
  // Actions
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setSystemTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      // Initial state
      theme: 'system',
      systemTheme: 'light',
      isDark: false,

      // Actions
      setTheme: (theme: Theme) => {
        const { systemTheme } = get();
        const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');
        
        set({ 
          theme, 
          isDark 
        });

        // Apply theme to document
        if (typeof document !== 'undefined') {
          const root = document.documentElement;
          if (isDark) {
            root.classList.add('dark');
          } else {
            root.classList.remove('dark');
          }
        }
      },

      toggleTheme: () => {
        const { theme } = get();
        const newTheme = theme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },

      setSystemTheme: (systemTheme: 'light' | 'dark') => {
        const { theme } = get();
        const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');
        
        set({ 
          systemTheme, 
          isDark 
        });

        // Apply theme to document if using system theme
        if (theme === 'system' && typeof document !== 'undefined') {
          const root = document.documentElement;
          if (isDark) {
            root.classList.add('dark');
          } else {
            root.classList.remove('dark');
          }
        }
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
    }
  )
); 