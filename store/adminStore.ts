import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { apiCall, showErrorToast, showSuccessToast } from './utils';
import { ApiResponse } from './types';

// Types
export interface AdminUser {
  id: number;
  username: string;
  email: string;
  name?: string;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminDestination {
  id: number;
  name: string;
  location: string;
  price: string;
  image: string;
  description: string;
  amenities: string[];
  features: string[];
  rating?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface AdminStats {
  totalUsers: number;
  totalDestinations: number;
  totalBookings: number;
  recentActivity: Array<{
    id: string;
    type: 'user' | 'destination' | 'booking';
    action: 'created' | 'updated' | 'deleted';
    description: string;
    timestamp: string;
  }>;
}

export interface AdminState {
  // State
  users: AdminUser[];
  destinations: AdminDestination[];
  stats: AdminStats | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  // User management
  fetchUsers: () => Promise<void>;
  createUser: (userData: Omit<AdminUser, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
  updateUser: (id: number, updates: Partial<AdminUser>) => Promise<boolean>;
  deleteUser: (id: number) => Promise<boolean>;
  
  // Destination management
  fetchDestinations: () => Promise<void>;
  createDestination: (destinationData: Omit<AdminDestination, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
  updateDestination: (id: number, updates: Partial<AdminDestination>) => Promise<boolean>;
  deleteDestination: (id: number) => Promise<boolean>;
  
  // Stats
  fetchStats: () => Promise<void>;
  
  // Utility
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAdminStore = create<AdminState>()(
  devtools(
    (set, get) => ({
      // Initial state
      users: [],
      destinations: [],
      stats: null,
      isLoading: false,
      error: null,

      // User management actions
      fetchUsers: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiCall<AdminUser[]>('/api/users');
          set({ users: response, isLoading: false });
        } catch (error) {
          const errorMessage = 'Failed to fetch users';
          set({ error: errorMessage, isLoading: false });
          showErrorToast(errorMessage);
        }
      },

      createUser: async (userData) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiCall<AdminUser>('/api/users', {
            method: 'POST',
            body: JSON.stringify(userData),
          });
          
          const { users } = get();
          set({ 
            users: [...users, response],
            isLoading: false 
          });
          
          showSuccessToast('User created successfully!');
          return true;
        } catch (error) {
          const errorMessage = 'Failed to create user';
          set({ error: errorMessage, isLoading: false });
          showErrorToast(errorMessage);
          return false;
        }
      },

      updateUser: async (id, updates) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiCall<AdminUser>(`/api/users?id=${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
          });
          
          const { users } = get();
          const updatedUsers = users.map(user => 
            user.id === id ? { ...user, ...updates } : user
          );
          
          set({ 
            users: updatedUsers,
            isLoading: false 
          });
          
          showSuccessToast('User updated successfully!');
          return true;
        } catch (error) {
          const errorMessage = 'Failed to update user';
          set({ error: errorMessage, isLoading: false });
          showErrorToast(errorMessage);
          return false;
        }
      },

      deleteUser: async (id) => {
        set({ isLoading: true, error: null });
        
        try {
          await apiCall(`/api/users?id=${id}`, {
            method: 'DELETE',
          });
          
          const { users } = get();
          set({ 
            users: users.filter(user => user.id !== id),
            isLoading: false 
          });
          
          showSuccessToast('User deleted successfully!');
          return true;
        } catch (error) {
          const errorMessage = 'Failed to delete user';
          set({ error: errorMessage, isLoading: false });
          showErrorToast(errorMessage);
          return false;
        }
      },

      // Destination management actions
      fetchDestinations: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiCall<AdminDestination[]>('/api/destinations');
          set({ destinations: response, isLoading: false });
        } catch (error) {
          const errorMessage = 'Failed to fetch destinations';
          set({ error: errorMessage, isLoading: false });
          showErrorToast(errorMessage);
        }
      },

      createDestination: async (destinationData) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiCall<AdminDestination>('/api/destinations', {
            method: 'POST',
            body: JSON.stringify(destinationData),
          });
          
          const { destinations } = get();
          set({ 
            destinations: [...destinations, response],
            isLoading: false 
          });
          
          showSuccessToast('Destination created successfully!');
          return true;
        } catch (error) {
          const errorMessage = 'Failed to create destination';
          set({ error: errorMessage, isLoading: false });
          showErrorToast(errorMessage);
          return false;
        }
      },

      updateDestination: async (id, updates) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiCall<AdminDestination>(`/api/destinations/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
          });
          
          const { destinations } = get();
          const updatedDestinations = destinations.map(dest => 
            dest.id === id ? { ...dest, ...updates } : dest
          );
          
          set({ 
            destinations: updatedDestinations,
            isLoading: false 
          });
          
          showSuccessToast('Destination updated successfully!');
          return true;
        } catch (error) {
          const errorMessage = 'Failed to update destination';
          set({ error: errorMessage, isLoading: false });
          showErrorToast(errorMessage);
          return false;
        }
      },

      deleteDestination: async (id) => {
        set({ isLoading: true, error: null });
        
        try {
          await apiCall(`/api/destinations/${id}`, {
            method: 'DELETE',
          });
          
          const { destinations } = get();
          set({ 
            destinations: destinations.filter(dest => dest.id !== id),
            isLoading: false 
          });
          
          showSuccessToast('Destination deleted successfully!');
          return true;
        } catch (error) {
          const errorMessage = 'Failed to delete destination';
          set({ error: errorMessage, isLoading: false });
          showErrorToast(errorMessage);
          return false;
        }
      },

      // Stats actions
      fetchStats: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiCall<AdminStats>('/api/admin/stats');
          set({ stats: response, isLoading: false });
        } catch (error) {
          const errorMessage = 'Failed to fetch admin stats';
          set({ error: errorMessage, isLoading: false });
          showErrorToast(errorMessage);
        }
      },

      // Utility actions
      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'admin-store',
    }
  )
); 