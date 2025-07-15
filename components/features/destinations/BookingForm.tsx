'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { bookingFormSchema } from '@/lib/validation';
import React from 'react';
import FormField from '@/components/ui/FormField';

interface BookingFormProps {
  destination: {
    id: number;
    name: string;
    image: string;
    price: string;
  };
  onBookingSuccess?: () => void;
}

interface BookingFormData {
  selectedDate: string;
  nights: number;
  guests: number;
  specialRequests: string;
}

export default function BookingForm({ destination, onBookingSuccess }: BookingFormProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [isBooking, setIsBooking] = React.useState(false);

  const basePrice = parseInt(destination.price.replace('$', '').replace('/night', '') || '0');
  const serviceFee = 5;

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<BookingFormData>({
    resolver: yupResolver(bookingFormSchema),
    defaultValues: {
      selectedDate: '',
      nights: 1,
      guests: 1,
      specialRequests: '',
    },
  });

  const selectedDate = watch('selectedDate');
  const nights = watch('nights');
  const guests = watch('guests');
  const specialRequests = watch('specialRequests');

  const totalPrice = basePrice * nights;
  const finalTotal = totalPrice + serviceFee;

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const onFormSubmit = async (data: BookingFormData) => {
    if (!user?.username) {
      toast.error('Please log in to make a booking');
      return;
    }
    setIsBooking(true);
    try {
      const checkOut = new Date(data.selectedDate);
      checkOut.setDate(checkOut.getDate() + data.nights);
      const bookingData = {
        username: user.username,
        destinationId: destination.id.toString(),
        destinationName: destination.name,
        destinationImage: destination.image,
        startDate: data.selectedDate,
        endDate: checkOut.toISOString().split('T')[0],
        numberOfPeople: data.guests,
        totalPrice: finalTotal,
        specialRequests: data.specialRequests ? data.specialRequests.trim() : '',
        paymentMethod: 'credit_card',
      };
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      const resData = await response.json();
      if (resData.success) {
        toast.success('Booking confirmed! Check your bookings for details.');
        onBookingSuccess?.();
        router.push('/bookings');
      } else {
        toast.error(resData.message || 'Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsBooking(false);
    }
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
      ) : !user ? (
        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <FormField label="Check-in Date" htmlFor="booking-date" required>
            <input
              id="booking-date"
              type="date"
              value={selectedDate}
              onChange={() => {}}
              min={getMinDate()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed"
              disabled
            />
          </FormField>
          <FormField label="Number of Nights" htmlFor="booking-nights" required>
            <select
              id="booking-nights"
              value={nights}
              onChange={() => {}}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed"
              disabled
            >
              {[1,2,3,4,5,6,7,8,9,10].map(n => (
                <option key={n} value={n}>{n} night{n !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Number of Guests" htmlFor="booking-guests" required>
            <select
              id="booking-guests"
              value={guests}
              onChange={() => {}}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed"
              disabled
            >
              {[1,2,3,4,5,6,7,8,9,10].map(g => (
                <option key={g} value={g}>{g} guest{g !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Special Requests (Optional)" htmlFor="booking-special">
            <textarea
              id="booking-special"
              value={specialRequests}
              onChange={() => {}}
              placeholder="Any special requests or notes..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed resize-none"
              disabled
            />
          </FormField>
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                ${basePrice} × {nights} nights
              </span>
              <span className="text-gray-900">${basePrice * nights}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service fee</span>
              <span className="text-gray-900">${serviceFee}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t pt-2">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">${basePrice * nights + serviceFee}</span>
            </div>
          </div>
          <button
            type="button"
            className="w-full bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg cursor-not-allowed mt-2"
            title="Please sign in to book this destination"
            disabled
            onClick={() => toast('Please sign in to book this destination')}
          >
            Book Now
          </button>
          <p className="text-xs text-gray-500 text-center">
            Please sign in to book this destination.
          </p>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <FormField label="Check-in Date" htmlFor="booking-date" error={errors.selectedDate?.message} required>
            <input
              id="booking-date"
              type="date"
              {...register('selectedDate')}
              min={getMinDate()}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 transition-colors ${errors.selectedDate ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
              aria-invalid={!!errors.selectedDate}
              aria-describedby={errors.selectedDate ? 'booking-date-error' : undefined}
              required
            />
          </FormField>
          <FormField label="Number of Nights" htmlFor="booking-nights" error={errors.nights?.message} required>
            <select
              id="booking-nights"
              {...register('nights', { valueAsNumber: true })}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 transition-colors ${errors.nights ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
              aria-invalid={!!errors.nights}
              aria-describedby={errors.nights ? 'booking-nights-error' : undefined}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                <option key={n} value={n}>{n} night{n !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Number of Guests" htmlFor="booking-guests" error={errors.guests?.message} required>
            <select
              id="booking-guests"
              {...register('guests', { valueAsNumber: true })}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 transition-colors ${errors.guests ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
              aria-invalid={!!errors.guests}
              aria-describedby={errors.guests ? 'booking-guests-error' : undefined}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(g => (
                <option key={g} value={g}>{g} guest{g !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Special Requests (Optional)" htmlFor="booking-special" error={errors.specialRequests?.message}>
            <textarea
              id="booking-special"
              {...register('specialRequests')}
              placeholder="Any special requests or notes..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 transition-colors resize-none"
              aria-invalid={!!errors.specialRequests}
              aria-describedby={errors.specialRequests ? 'booking-special-error' : undefined}
            />
          </FormField>
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
            className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition mt-2"
            disabled={isBooking}
          >
            {isBooking ? 'Booking...' : 'Book Now'}
          </button>
        </form>
      )}
    </div>
  );
} 