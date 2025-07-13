'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Icon from '@/components/ui/Icon';
import { useAuth } from '@/contexts/AuthContext';

interface BookingConfirmationProps {
  booking: {
    id: string;
    destinationName: string;
    destinationLocation?: string;
    startDate: string;
    endDate: string;
    numberOfPeople: number;
    totalPrice: number;
    userName: string;
  };
  onCancel?: () => void;
}

export default function BookingConfirmation({ booking, onCancel }: BookingConfirmationProps) {
  const [isCancelling, setIsCancelling] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  // Don't show booking confirmation for admins
  if (user?.role === 'admin') {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden animate-fade-in">
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-8 text-white text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-3xl font-bold mb-2">Admin Access Restricted</h1>
          <p className="text-red-100 text-lg">
            Admins cannot view or manage bookings. Please use a regular user account.
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const generateBookingId = (destinationName: string, userName: string, startDate: string) => {
    const destCode = destinationName.substring(0, 3).toUpperCase();
    const dateCode = new Date(startDate).getFullYear().toString().slice(-2);
    const monthCode = (new Date(startDate).getMonth() + 1).toString().padStart(2, '0');
    const userCode = userName.substring(0, 4).toUpperCase();
    return `${destCode}${monthCode}${dateCode}${userCode}`;
  };

  const handleCancelBooking = async () => {
    if (!confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      return;
    }

    setIsCancelling(true);
    try {
      const response = await fetch(`/api/bookings/${booking.id}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Booking cancelled successfully');
        onCancel?.();
        router.push('/profile');
      } else {
        toast.error(data.message || 'Failed to cancel booking');
      }
    } catch (error) {
      console.error('Cancel booking error:', error);
      toast.error('An error occurred while cancelling the booking');
    } finally {
      setIsCancelling(false);
    }
  };

  const bookingId = generateBookingId(booking.destinationName, booking.userName, booking.startDate);
  const guestText = booking.numberOfPeople === 1 ? 'guest' : 'guests';

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden animate-fade-in">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 p-8 text-white text-center">
        <div className="text-6xl mb-4">🏯</div>
        <h1 className="text-3xl font-bold mb-2">
          You're going to {booking.destinationName}, {booking.userName}!
        </h1>
        <p className="text-green-100 text-lg">
          We've confirmed your stay in {booking.destinationName}
          {booking.destinationLocation && `, ${booking.destinationLocation}`} from{' '}
          {formatDate(booking.startDate)} to {formatDate(booking.endDate)}, for{' '}
          {booking.numberOfPeople} {guestText}.
        </p>
      </div>

      {/* Booking Details */}
      <div className="p-8 space-y-6">
        {/* Booking ID */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">📌</div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Booking ID</p>
                <p className="text-xl font-bold text-gray-900 font-mono">{bookingId}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-green-600">${booking.totalPrice}</p>
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="text-xl">🗓️</div>
              <div>
                <p className="text-sm text-gray-600">Check-in</p>
                <p className="font-semibold text-gray-900">{formatDate(booking.startDate)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-xl">🏠</div>
              <div>
                <p className="text-sm text-gray-600">Check-out</p>
                <p className="font-semibold text-gray-900">{formatDate(booking.endDate)}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="text-xl">👥</div>
              <div>
                <p className="text-sm text-gray-600">Guests</p>
                <p className="font-semibold text-gray-900">{booking.numberOfPeople} {guestText}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-xl">📍</div>
              <div>
                <p className="text-sm text-gray-600">Destination</p>
                <p className="font-semibold text-gray-900">{booking.destinationName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="border-t pt-6">
          <div className="text-center space-y-4">
            <p className="text-gray-600 font-medium">Need to make changes?</p>
            <button
              onClick={handleCancelBooking}
              disabled={isCancelling}
              className="inline-flex items-center space-x-2 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {isCancelling ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Cancelling...</span>
                </>
              ) : (
                <>
                  <span>👉</span>
                  <span>Cancel Booking</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="text-blue-500 text-xl">ℹ️</div>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">What's next?</p>
              <p>You'll receive a confirmation email with all the details. Check your profile for booking updates and manage your reservations anytime.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 