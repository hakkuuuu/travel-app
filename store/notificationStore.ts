import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  createdAt: Date;
}

export interface NotificationState {
  // State
  notifications: Notification[];
  unreadCount: number;
  
  // Actions
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  updateUnreadCount: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  devtools(
    (set, get) => ({
      // Initial state
      notifications: [],
      unreadCount: 0,

      // Actions
      addNotification: (notification) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newNotification: Notification = {
          ...notification,
          id,
          createdAt: new Date(),
        };

        set((state) => ({
          notifications: [...state.notifications, newNotification],
          unreadCount: state.unreadCount + 1,
        }));

        // Auto-remove notification after duration
        if (notification.duration !== 0) {
          const duration = notification.duration || 5000;
          setTimeout(() => {
            get().removeNotification(id);
          }, duration);
        }
      },

      removeNotification: (id: string) => {
        set((state) => {
          const notification = state.notifications.find(n => n.id === id);
          const wasUnread = notification && !notification.createdAt;
          
          return {
            notifications: state.notifications.filter(n => n.id !== id),
            unreadCount: wasUnread ? Math.max(0, state.unreadCount - 1) : state.unreadCount,
          };
        });
      },

      clearNotifications: () => {
        set({ notifications: [], unreadCount: 0 });
      },

      markAsRead: (id: string) => {
        set((state) => ({
          notifications: state.notifications.map(n => 
            n.id === id ? { ...n, createdAt: new Date() } : n
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        }));
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map(n => ({ ...n, createdAt: new Date() })),
          unreadCount: 0,
        }));
      },

      updateUnreadCount: () => {
        set((state) => ({
          unreadCount: state.notifications.filter(n => !n.createdAt).length,
        }));
      },
    }),
    {
      name: 'notification-store',
    }
  )
); 