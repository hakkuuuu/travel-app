'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

interface BookingFormProps {
  destination: {
    id: number;
    name: string;
    image: string;
    price: string;
  };
  onBookingSuccess?: () => void;
}

export default function BookingForm({ destination, onBookingSuccess }: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [nights, setNights] = useState(1);
  const [guests, setGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const basePrice = parseInt(destination.price.replace('$', '').replace('/night', '') || '0');
  const totalPrice = basePrice * nights;
  const serviceFee = 5;
  const finalTotal = totalPrice + serviceFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) {
      toast.error('Please select a check-in date');
      return;
    }

    if (!user?.username) {
      toast.error('Please log in to make a booking');
      return;
    }

    setIsBooking(true);

    try {
      const checkOut = new Date(selectedDate);
      checkOut.setDate(checkOut.getDate() + nights);
      
      const bookingData = {
        username: user.username,
        destinationId: destination.id.toString(),
        destinationName: destination.name,
        destinationImage: destination.image,
        startDate: selectedDate,
        endDate: checkOut.toISOString().split('T')[0],
        numberOfPeople: guests,
        totalPrice: finalTotal,
        specialRequests: specialRequests.trim(),
        paymentMethod: 'credit_card'
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Booking confirmed! Check your bookings for details.');
        onBookingSuccess?.();
        router.push('/bookings');
      } else {
        toast.error(data.message || 'Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-lg sticky top-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {destination.price}
        </h3>
        <p className="text-gray-600">per night</p>
      </div>

      {user?.role === 'admin' ? (
        <div className="text-center text-gray-500 py-8">
          <div className="text-lg font-medium mb-2">Admin Access</div>
          <p className="text-sm">Admins cannot book destinations.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check-in Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={getMinDate()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Nights
            </label>
            <select
              value={nights}
              onChange={(e) => setNights(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 transition-colors"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                <option key={n} value={n}>{n} night{n !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 transition-colors"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(g => (
                <option key={g} value={g}>{g} guest{g !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requests (Optional)
            </label>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Any special requests or notes..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 transition-colors resize-none"
            />
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                ${basePrice} × {nights} nights
              </span>
              <span className="text-gray-900">${totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service fee</span>
              <span className="text-gray-900">${serviceFee}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t pt-2">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">${finalTotal}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isBooking || !selectedDate}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
          >
            {isBooking ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              'Book Now'
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            By booking, you agree to our terms and conditions
          </p>
        </form>
      )}
    </div>
  );
} 