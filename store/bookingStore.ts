import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import toast from 'react-hot-toast';

// Types
export interface Booking {
  id: string;
  userId: string;
  destinationId: string;
  destinationName: string;
  destinationImage: string;
  startDate: string;
  endDate: string;
  numberOfPeople: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod?: string;
  bookingReference: string;
}

export interface BookingFilters {
  status: string[];
  dateRange: [string, string];
  search: string;
  sortBy: 'date' | 'price' | 'status' | 'destination';
  sortOrder: 'asc' | 'desc';
}

export interface BookingState {
  // State
  bookings: Booking[];
  currentBooking: Booking | null;
  filters: BookingFilters;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchBookings: (filters?: Partial<BookingFilters>) => Promise<void>;
  fetchBookingById: (id: string) => Promise<Booking | null>;
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'bookingReference'>) => Promise<boolean>;
  updateBooking: (id: string, updates: Partial<Booking>) => Promise<boolean>;
  cancelBooking: (id: string) => Promise<boolean>;
  setFilters: (filters: Partial<BookingFilters>) => void;
  clearFilters: () => void;
  setCurrentBooking: (booking: Booking | null) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

// Default filters
const defaultFilters: BookingFilters = {
  status: [],
  dateRange: ['', ''],
  search: '',
  sortBy: 'date',
  sortOrder: 'desc',
};

export const useBookingStore = create<BookingState>()(
  devtools(
    (set, get) => ({
      // Initial state
      bookings: [],
      currentBooking: null,
      filters: defaultFilters,
      isLoading: false,
      error: null,

      // Actions
      fetchBookings: async (filters?: Partial<BookingFilters>) => {
        set({ isLoading: true, error: null });
        
        try {
          const currentFilters = get().filters;
          const newFilters = { ...currentFilters, ...filters };
          
          const queryParams = new URLSearchParams();
          if (newFilters.status.length) queryParams.append('status', newFilters.status.join(','));
          if (newFilters.dateRange[0]) queryParams.append('startDate', newFilters.dateRange[0]);
          if (newFilters.dateRange[1]) queryParams.append('endDate', newFilters.dateRange[1]);
          if (newFilters.search) queryParams.append('search', newFilters.search);
          queryParams.append('sortBy', newFilters.sortBy);
          queryParams.append('sortOrder', newFilters.sortOrder);

          const response = await fetch(`/api/bookings?${queryParams}`);
          const data = await response.json();

          if (data.success) {
            set({ 
              bookings: data.bookings || [], 
              filters: newFilters,
              isLoading: false 
            });
          } else {
            set({ 
              error: data.message || 'Failed to fetch bookings', 
              isLoading: false 
            });
          }
        } catch (error) {
          set({ 
            error: 'An error occurred while fetching bookings', 
            isLoading: false 
          });
        }
      },

      fetchBookingById: async (id: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch(`/api/bookings/${id}`);
          const data = await response.json();

          if (data.success) {
            set({ 
              currentBooking: data.booking, 
              isLoading: false 
            });
            return data.booking;
          } else {
            set({ 
              error: data.message || 'Booking not found', 
              isLoading: false 
            });
            return null;
          }
        } catch (error) {
          set({ 
            error: 'An error occurred while fetching booking', 
            isLoading: false 
          });
          return null;
        }
      },

      createBooking: async (booking) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking),
          });

          const data = await response.json();

          if (data.success) {
            const { bookings } = get();
            set({ 
              bookings: [...bookings, data.booking],
              isLoading: false 
            });
            toast.success('Booking created successfully!');
            return true;
          } else {
            set({ 
              error: data.message || 'Failed to create booking', 
              isLoading: false 
            });
            toast.error(data.message || 'Failed to create booking');
            return false;
          }
        } catch (error) {
          set({ 
            error: 'An error occurred while creating booking', 
            isLoading: false 
          });
          toast.error('An error occurred while creating booking');
          return false;
        }
      },

      updateBooking: async (id: string, updates: Partial<Booking>) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch(`/api/bookings/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
          });

          const data = await response.json();

          if (data.success) {
            const { bookings } = get();
            const updatedBookings = bookings.map(booking => 
              booking.id === id ? { ...booking, ...updates } : booking
            );
            
            set({ 
              bookings: updatedBookings,
              currentBooking: get().currentBooking?.id === id 
                ? { ...get().currentBooking!, ...updates }
                : get().currentBooking,
              isLoading: false 
            });
            toast.success('Booking updated successfully!');
            return true;
          } else {
            set({ 
              error: data.message || 'Failed to update booking', 
              isLoading: false 
            });
            toast.error(data.message || 'Failed to update booking');
            return false;
          }
        } catch (error) {
          set({ 
            error: 'An error occurred while updating booking', 
            isLoading: false 
          });
          toast.error('An error occurred while updating booking');
          return false;
        }
      },

      cancelBooking: async (id: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch(`/api/bookings/${id}/cancel`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
          });

          const data = await response.json();

          if (data.success) {
            const { bookings } = get();
            const updatedBookings = bookings.map(booking => 
              booking.id === id ? { ...booking, status: 'cancelled' as const } : booking
            );
            
            set({ 
              bookings: updatedBookings,
              currentBooking: get().currentBooking?.id === id 
                ? { ...get().currentBooking!, status: 'cancelled' }
                : get().currentBooking,
              isLoading: false 
            });
            toast.success('Booking cancelled successfully!');
            return true;
          } else {
            set({ 
              error: data.message || 'Failed to cancel booking', 
              isLoading: false 
            });
            toast.error(data.message || 'Failed to cancel booking');
            return false;
          }
        } catch (error) {
          set({ 
            error: 'An error occurred while cancelling booking', 
            isLoading: false 
          });
          toast.error('An error occurred while cancelling booking');
          return false;
        }
      },

      setFilters: (filters: Partial<BookingFilters>) => {
        const currentFilters = get().filters;
        set({ filters: { ...currentFilters, ...filters } });
      },

      clearFilters: () => {
        set({ filters: defaultFilters });
      },

      setCurrentBooking: (booking: Booking | null) => {
        set({ currentBooking: booking });
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'booking-store',
    }
  )
); 