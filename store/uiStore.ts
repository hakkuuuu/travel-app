import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Types
export interface ModalState {
  isOpen: boolean;
  type: string | null;
  data?: any;
}

export interface SidebarState {
  isOpen: boolean;
  type: 'mobile' | 'desktop' | null;
}

export interface UIState {
  // State
  modal: ModalState;
  sidebar: SidebarState;
  isLoading: boolean;
  isScrolled: boolean;
  activeTab: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  
  // Actions
  openModal: (type: string, data?: any) => void;
  closeModal: () => void;
  openSidebar: (type: 'mobile' | 'desktop') => void;
  closeSidebar: () => void;
  setLoading: (loading: boolean) => void;
  setScrolled: (scrolled: boolean) => void;
  setActiveTab: (tab: string) => void;
  setBreadcrumbs: (breadcrumbs: Array<{ label: string; href?: string }>) => void;
  clearBreadcrumbs: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      // Initial state
      modal: {
        isOpen: false,
        type: null,
        data: undefined,
      },
      sidebar: {
        isOpen: false,
        type: null,
      },
      isLoading: false,
      isScrolled: false,
      activeTab: '',
      breadcrumbs: [],

      // Actions
      openModal: (type: string, data?: any) => {
        set({
          modal: {
            isOpen: true,
            type,
            data,
          },
        });
      },

      closeModal: () => {
        set({
          modal: {
            isOpen: false,
            type: null,
            data: undefined,
          },
        });
      },

      openSidebar: (type: 'mobile' | 'desktop') => {
        set({
          sidebar: {
            isOpen: true,
            type,
          },
        });
      },

      closeSidebar: () => {
        set({
          sidebar: {
            isOpen: false,
            type: null,
          },
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setScrolled: (scrolled: boolean) => {
        set({ isScrolled: scrolled });
      },

      setActiveTab: (tab: string) => {
        set({ activeTab: tab });
      },

      setBreadcrumbs: (breadcrumbs: Array<{ label: string; href?: string }>) => {
        set({ breadcrumbs });
      },

      clearBreadcrumbs: () => {
        set({ breadcrumbs: [] });
      },
    }),
    {
      name: 'ui-store',
    }
  )
); 