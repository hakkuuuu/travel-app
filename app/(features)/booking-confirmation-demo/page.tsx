'use client';

import BookingConfirmation from '@/components/features/destinations/BookingConfirmation';
import SimpleBookingConfirmation from '@/components/features/destinations/SimpleBookingConfirmation';

export default function BookingConfirmationDemo() {
  // Sample booking data matching the user's example
  const sampleBooking = {
    id: 'booking-123',
    destinationName: 'Kyoto',
    destinationLocation: 'Japan',
    startDate: '2025-10-10',
    endDate: '2025-10-15',
    numberOfPeople: 1,
    totalPrice: 750,
    userName: 'Raul'
  };

  const handleCancel = () => {
    console.log('Booking cancelled');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Booking Confirmation Components
          </h1>
          <p className="text-gray-600 text-lg">
            Personalized booking confirmation messages with destination details, dates, and cancellation options
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Simple Version */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Simple Version (Exact Format)
            </h2>
            <SimpleBookingConfirmation 
              destination="Kyoto"
              location="Japan"
              startDate="2025-10-10"
              endDate="2025-10-15"
              guests={1}
              userName="Raul"
              onCancel={handleCancel}
            />
          </div>

          {/* Detailed Version */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Detailed Version
            </h2>
            <BookingConfirmation 
              booking={sampleBooking} 
              onCancel={handleCancel}
            />
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            These are demos of the booking confirmation components. In a real application, these would be displayed after a successful booking.
          </p>
        </div>
      </div>
    </div>
  );
} 