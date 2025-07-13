'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';

interface SimpleBookingConfirmationProps {
  destination: string;
  location?: string;
  startDate: string;
  endDate: string;
  guests: number;
  userName: string;
  onCancel?: () => void;
}

export default function SimpleBookingConfirmation({
  destination,
  location,
  startDate,
  endDate,
  guests,
  userName,
  onCancel
}: SimpleBookingConfirmationProps) {
  const [isCancelling, setIsCancelling] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  // Don't show booking confirmation for admins
  if (user?.role === 'admin') {
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <div className="text-4xl">🚫</div>
            <h2 className="text-2xl font-bold text-gray-900">
              Admin Access Restricted
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Admins cannot view or manage bookings. Please use a regular user account.
            </p>
          </div>
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Booking cancelled successfully');
      onCancel?.();
      router.push('/profile');
    } catch (error) {
      console.error('Cancel booking error:', error);
      toast.error('An error occurred while cancelling the booking');
    } finally {
      setIsCancelling(false);
    }
  };

  const bookingId = generateBookingId(destination, userName, startDate);
  const guestText = guests === 1 ? 'guest' : 'guests';
  const locationText = location ? `, ${location}` : '';

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8 animate-fade-in">
      <div className="text-center space-y-4">
        {/* Main Message */}
        <div className="space-y-2">
          <div className="text-4xl">🏯</div>
          <h2 className="text-2xl font-bold text-gray-900">
            You're going to {destination}, {userName}!
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We've confirmed your stay in {destination}{locationText} from {formatDate(startDate)} to {formatDate(endDate)}, for {guests} {guestText}.
          </p>
        </div>

        {/* Booking ID */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-xl">📌</span>
            <span className="text-sm text-gray-600">Booking ID:</span>
            <span className="font-mono font-bold text-gray-900">{bookingId}</span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="space-y-3">
          <p className="text-gray-600 font-medium">Need to make changes?</p>
          <button
            onClick={handleCancelBooking}
            disabled={isCancelling}
            className="inline-flex items-center space-x-2 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
          >
            {isCancelling ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
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
    </div>
  );
} 