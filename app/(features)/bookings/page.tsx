'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { UserBooking } from '@/constants';
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaDollarSign, FaClock, FaCheckCircle, FaTimesCircle, FaTrash } from 'react-icons/fa';

export default function BookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.username) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/bookings?username=${user?.username}`);
      const data = await response.json();
      
      if (data.success) {
        setBookings(data.data || []);
      } else {
        setError(data.message || 'Failed to load bookings');
      }
    } catch (err) {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <FaCheckCircle className="text-green-500" />;
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-500" />;
      case 'completed':
        return <FaCheckCircle className="text-blue-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? '-'
      : date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
  };

  // Helper to get nights, fallback to calculation if missing
  const getNights = (booking: UserBooking) => {
    if (typeof booking.nights === 'number' && !isNaN(booking.nights) && booking.nights > 0) {
      return booking.nights;
    }
    // Try to calculate from dates
    if (booking.startDate && booking.endDate) {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : '-';
      }
    }
    return '-';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Cancel booking handler (dummy for now)
  const handleCancelBooking = (bookingId: string) => {
    // TODO: Implement cancel booking logic
    alert('Cancel booking: ' + bookingId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <ErrorMessage message={error} onRetry={fetchBookings} />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">
            Manage and track all your travel reservations
          </p>
        </div>
        
        {/* Content */}
        {bookings.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCalendarAlt className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">No bookings yet</h3>
            <p className="text-gray-600 mb-8">Start exploring destinations and make your first booking!</p>
            <a
              href="/destinations"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              Browse Destinations
            </a>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
                <div className="col-span-3">Destination</div>
                <div className="col-span-2">Dates</div>
                <div className="col-span-1">Guests</div>
                <div className="col-span-1">Nights</div>
                <div className="col-span-2">Total</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Actions</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <div key={booking._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Destination */}
                    <div className="col-span-3">
                      <div className="flex items-center space-x-3">
                        {booking.destinationImage ? (
                          <img
                            src={booking.destinationImage}
                            alt={booking.destinationName || 'Unknown Destination'}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-xl font-bold">
                            ?
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-gray-900">{booking.destinationName || 'Unknown Destination'}</h3>
                          <p className="text-sm text-gray-500">
                            Ref: {booking.bookingReference || '-' }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="col-span-2">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{formatDate(booking.startDate)}</div>
                        <div className="text-gray-500">to {formatDate(booking.endDate)}</div>
                      </div>
                    </div>

                    {/* Guests */}
                    <div className="col-span-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <FaUsers className="w-4 h-4 mr-1 text-blue-500" />
                        {typeof booking.guests === 'number' && booking.guests > 0 ? booking.guests : '-'}
                      </div>
                    </div>

                    {/* Nights */}
                    <div className="col-span-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <FaMapMarkerAlt className="w-4 h-4 mr-1 text-red-500" />
                        {getNights(booking)}
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-2">
                      <div className="text-sm">
                        <div className="font-semibold text-gray-900">{typeof booking.totalPrice === 'number' ? formatCurrency(booking.totalPrice) : '-'}</div>
                        <div className="text-gray-500">Booked {formatDate(booking.createdAt)}</div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      {booking.status ? (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1 capitalize">{booking.status}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border bg-gray-100 text-gray-800 border-gray-200">-</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="col-span-1">
                      <div className="flex items-center space-x-2">
                        {(booking.status === 'confirmed' || booking.status === 'pending') && (
                          <button
                            className="p-2 text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition-colors border border-red-100"
                            title="Cancel Booking"
                            onClick={() => handleCancelBooking(booking._id as string)}
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Special Requests (if any) */}
                  {booking.specialRequests && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-600">
                        <strong className="text-gray-900">Special Requests:</strong> {booking.specialRequests}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
} 