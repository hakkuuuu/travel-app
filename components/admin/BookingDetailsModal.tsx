import { FaUser, FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaUsers, FaEnvelope, FaIdCard } from 'react-icons/fa';
import Modal from '@/components/ui/Modal';
import { AdminBooking } from '@/store/adminStore';

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: AdminBooking | null;
}

export default function BookingDetailsModal({ isOpen, onClose, booking }: BookingDetailsModalProps) {
  if (!booking) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { color: 'bg-green-100 text-green-800', label: 'Confirmed' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
      completed: { color: 'bg-blue-100 text-blue-800', label: 'Completed' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.confirmed;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Booking Details">
      <div className="space-y-6">
        {/* Booking Image and Basic Info */}
        <div className="flex items-start space-x-4">
          <img
            src={booking.destinationImage}
            alt={booking.destinationName}
            className="w-24 h-24 rounded-lg object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/logo.png';
            }}
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {booking.destinationName}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
              <FaMapMarkerAlt className="w-4 h-4" />
              <span>{booking.destinationLocation}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FaIdCard className="w-4 h-4" />
              <span>Booking ID: {booking.bookingId}</span>
            </div>
          </div>
          <div className="text-right">
            {getStatusBadge(booking.status)}
          </div>
        </div>

        {/* User Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <FaUser className="w-4 h-4 mr-2" />
            Guest Information
          </h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FaUser className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium">{booking.userName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{booking.userEmail}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaUsers className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {booking.guests} guest{booking.guests !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Booking Dates */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <FaCalendarAlt className="w-4 h-4 mr-2" />
            Stay Details
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Check-in</p>
              <p className="text-sm font-medium">{formatDate(booking.checkIn)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Check-out</p>
              <p className="text-sm font-medium">{formatDate(booking.checkOut)}</p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <FaDollarSign className="w-4 h-4 mr-2" />
            Pricing
          </h4>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Amount</span>
            <span className="text-lg font-bold text-gray-900">{formatPrice(booking.totalPrice)}</span>
          </div>
        </div>

        {/* Timestamps */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Timeline</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Created</span>
              <span className="font-medium">{formatDate(booking.createdAt)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Last Updated</span>
              <span className="font-medium">{formatDate(booking.updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
} 