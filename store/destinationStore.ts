import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { apiCall, showErrorToast, showSuccessToast, handleApiError, buildQueryParams } from './utils';
import { ApiResponse, PaginatedResponse } from './types';
import toast from 'react-hot-toast';

// Types
export interface Destination {
  id: string;
  name: string;
  description: string;
  location: string;
  country: string;
  continent: string;
  image: string;
  images: string[];
  price: number;
  rating: number;
  reviews: number;
  duration: string;
  difficulty: 'easy' | 'moderate' | 'hard';
  category: string[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
    activities: string[];
  }>;
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  popular?: boolean;
}

export interface DestinationFilters {
  search: string;
  category: string[];
  priceRange: [number, number];
  duration: string[];
  difficulty: string[];
  rating: number;
  continent: string[];
  sortBy: 'name' | 'price' | 'rating' | 'popularity' | 'newest';
  sortOrder: 'asc' | 'desc';
}

export interface DestinationState {
  // State
  destinations: Destination[];
  featuredDestinations: Destination[];
  popularDestinations: Destination[];
  currentDestination: Destination | null;
  filters: DestinationFilters;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchDestinations: (filters?: Partial<DestinationFilters>) => Promise<void>;
  fetchDestinationById: (id: string) => Promise<Destination | null>;
  fetchFeaturedDestinations: () => Promise<void>;
  fetchPopularDestinations: () => Promise<void>;
  createDestination: (destination: Omit<Destination, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
  updateDestination: (id: string, updates: Partial<Destination>) => Promise<boolean>;
  deleteDestination: (id: string) => Promise<boolean>;
  setFilters: (filters: Partial<DestinationFilters>) => void;
  clearFilters: () => void;
  setCurrentDestination: (destination: Destination | null) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

// Default filters
const defaultFilters: DestinationFilters = {
  search: '',
  category: [],
  priceRange: [0, 10000],
  duration: [],
  difficulty: [],
  rating: 0,
  continent: [],
  sortBy: 'name',
  sortOrder: 'asc',
};

export const useDestinationStore = create<DestinationState>()(
  devtools(
    (set, get) => ({
      // Initial state
      destinations: [],
      featuredDestinations: [],
      popularDestinations: [],
      currentDestination: null,
      filters: defaultFilters,
      isLoading: false,
      error: null,

      // Actions
      fetchDestinations: async (filters?: Partial<DestinationFilters>) => {
        set({ isLoading: true, error: null });
        
        try {
          const currentFilters = get().filters;
          const newFilters = { ...currentFilters, ...filters };
          
          const queryParams = new URLSearchParams();
          if (newFilters.search) queryParams.append('search', newFilters.search);
          if (newFilters.category.length) queryParams.append('category', newFilters.category.join(','));
          if (newFilters.priceRange[0] !== 0 || newFilters.priceRange[1] !== 10000) {
            queryParams.append('minPrice', newFilters.priceRange[0].toString());
            queryParams.append('maxPrice', newFilters.priceRange[1].toString());
          }
          if (newFilters.duration.length) queryParams.append('duration', newFilters.duration.join(','));
          if (newFilters.difficulty.length) queryParams.append('difficulty', newFilters.difficulty.join(','));
          if (newFilters.rating > 0) queryParams.append('rating', newFilters.rating.toString());
          if (newFilters.continent.length) queryParams.append('continent', newFilters.continent.join(','));
          queryParams.append('sortBy', newFilters.sortBy);
          queryParams.append('sortOrder', newFilters.sortOrder);

          const response = await fetch(`/api/destinations?${queryParams}`);
          const data = await response.json();

          if (data.success) {
            set({ 
              destinations: data.destinations || [], 
              filters: newFilters,
              isLoading: false 
            });
          } else {
            set({ 
              error: data.message || 'Failed to fetch destinations', 
              isLoading: false 
            });
          }
        } catch (error) {
          set({ 
            error: 'An error occurred while fetching destinations', 
            isLoading: false 
          });
        }
      },

      fetchDestinationById: async (id: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch(`/api/destinations/${id}`);
          const data = await response.json();

          if (data.success) {
            set({ 
              currentDestination: data.destination, 
              isLoading: false 
            });
            return data.destination;
          } else {
            set({ 
              error: data.message || 'Destination not found', 
              isLoading: false 
            });
            return null;
          }
        } catch (error) {
          set({ 
            error: 'An error occurred while fetching destination', 
            isLoading: false 
          });
          return null;
        }
      },

      fetchFeaturedDestinations: async () => {
        try {
          const response = await fetch('/api/destinations?featured=true');
          const data = await response.json();

          if (data.success) {
            set({ featuredDestinations: data.destinations || [] });
          }
        } catch (error) {
          console.error('Error fetching featured destinations:', error);
        }
      },

      fetchPopularDestinations: async () => {
        try {
          const response = await fetch('/api/destinations?popular=true');
          const data = await response.json();

          if (data.success) {
            set({ popularDestinations: data.destinations || [] });
          }
        } catch (error) {
          console.error('Error fetching popular destinations:', error);
        }
      },

      createDestination: async (destination) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch('/api/destinations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(destination),
          });

          const data = await response.json();

          if (data.success) {
            const { destinations } = get();
            set({ 
              destinations: [...destinations, data.destination],
              isLoading: false 
            });
            showSuccessToast('Destination created successfully!');
            return true;
          } else {
            set({ 
              error: data.message || 'Failed to create destination', 
              isLoading: false 
            });
            toast.error(data.message || 'Failed to create destination');
            return false;
          }
        } catch (error) {
          set({ 
            error: 'An error occurred while creating destination', 
            isLoading: false 
          });
          toast.error('An error occurred while creating destination');
          return false;
        }
      },

      updateDestination: async (id: string, updates: Partial<Destination>) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch(`/api/destinations/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
          });

          const data = await response.json();

          if (data.success) {
            const { destinations } = get();
            const updatedDestinations = destinations.map(dest => 
              dest.id === id ? { ...dest, ...updates } : dest
            );
            
                         set({ 
               destinations: updatedDestinations,
               currentDestination: get().currentDestination?.id === id 
                 ? { ...get().currentDestination!, ...updates }
                 : get().currentDestination,
               isLoading: false 
             });
            toast.success('Destination updated successfully!');
            return true;
          } else {
            set({ 
              error: data.message || 'Failed to update destination', 
              isLoading: false 
            });
            toast.error(data.message || 'Failed to update destination');
            return false;
          }
        } catch (error) {
          set({ 
            error: 'An error occurred while updating destination', 
            isLoading: false 
          });
          toast.error('An error occurred while updating destination');
          return false;
        }
      },

      deleteDestination: async (id: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch(`/api/destinations/${id}`, {
            method: 'DELETE',
          });

          const data = await response.json();

          if (data.success) {
            const { destinations } = get();
            set({ 
              destinations: destinations.filter(dest => dest.id !== id),
              currentDestination: get().currentDestination?.id === id ? null : get().currentDestination,
              isLoading: false 
            });
            toast.success('Destination deleted successfully!');
            return true;
          } else {
            set({ 
              error: data.message || 'Failed to delete destination', 
              isLoading: false 
            });
            toast.error(data.message || 'Failed to delete destination');
            return false;
          }
        } catch (error) {
          set({ 
            error: 'An error occurred while deleting destination', 
            isLoading: false 
          });
          toast.error('An error occurred while deleting destination');
          return false;
        }
      },

      setFilters: (filters: Partial<DestinationFilters>) => {
        const currentFilters = get().filters;
        set({ filters: { ...currentFilters, ...filters } });
      },

      clearFilters: () => {
        set({ filters: defaultFilters });
      },

      setCurrentDestination: (destination: Destination | null) => {
        set({ currentDestination: destination });
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'destination-store',
    }
  )
); 