import { useState, useMemo } from 'react';
import { AdminBooking } from '@/store/adminStore';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import EmptyState from '@/components/ui/EmptyState';
import { FaSearch, FaFilter, FaEye, FaCalendarAlt, FaUser, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
import BookingDetailsModal from '@/components/admin/BookingDetailsModal';

interface BookingTableProps {
  bookings: AdminBooking[];
  isLoading: boolean;
}

export default function BookingTable({ bookings, isLoading }: BookingTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'createdAt' | 'checkIn' | 'totalPrice'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter and sort bookings
  const filteredAndSortedBookings = useMemo(() => {
    const safeBookings = Array.isArray(bookings) ? bookings : [];
    let filtered = safeBookings.filter(booking => {
      const matchesSearch = 
        booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.destinationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sort bookings
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case 'checkIn':
          aValue = new Date(a.checkIn);
          bValue = new Date(b.checkIn);
          break;
        case 'totalPrice':
          aValue = a.totalPrice;
          bValue = b.totalPrice;
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [bookings, searchTerm, statusFilter, sortBy, sortOrder]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handleSort = (field: 'createdAt' | 'checkIn' | 'totalPrice') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleViewBooking = (booking: AdminBooking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  if (isLoading) {
    return (
      <Card>
        <div className="p-6">
          <LoadingSkeleton className="h-8 w-48 mb-4" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <LoadingSkeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <EmptyState
          icon="📋"
          title="No bookings found"
          description="There are no bookings in the system yet."
          variant="compact"
        />
      </Card>
    );
  }

  return (
    <>
      {/* Table layout for md+ screens */}
      <div className="hidden md:block">
        <Card>
          <div className="p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">All Bookings</h2>
                <p className="text-gray-600">Manage and monitor user bookings</p>
              </div>
              <div className="text-sm text-gray-500">
                {filteredAndSortedBookings.length} of {bookings.length} bookings
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by user, destination, or booking ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Bookings Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort('checkIn')}
                        className="flex items-center space-x-1 hover:text-gray-700"
                      >
                        <FaCalendarAlt className="w-3 h-3" />
                        <span>Check-in</span>
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort('totalPrice')}
                        className="flex items-center space-x-1 hover:text-gray-700"
                      >
                        <FaDollarSign className="w-3 h-3" />
                        <span>Total</span>
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort('createdAt')}
                        className="flex items-center space-x-1 hover:text-gray-700"
                      >
                        <FaCalendarAlt className="w-3 h-3" />
                        <span>Created</span>
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAndSortedBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={booking.destinationImage}
                            alt={booking.destinationName}
                            className="w-12 h-12 rounded-lg object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/logo.png';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <FaUser className="w-3 h-3 text-gray-400" />
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {booking.userName}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2 mb-1">
                              <FaMapMarkerAlt className="w-3 h-3 text-gray-400" />
                              <p className="text-sm text-gray-600 truncate">
                                {booking.destinationName}
                              </p>
                            </div>
                            <p className="text-xs text-gray-500">
                              ID: {booking.bookingId} • {booking.guests} guest{booking.guests !== 1 ? 's' : ''}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {booking.userEmail}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div className="font-medium">{formatDate(booking.checkIn)}</div>
                          <div className="text-gray-500">to {formatDate(booking.checkOut)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="font-medium">{formatPrice(booking.totalPrice)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(booking.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Button size="sm" variant="outline" onClick={() => handleViewBooking(booking)}>
                          <FaEye className="inline mr-1" /> View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty state for filtered results */}
            {filteredAndSortedBookings.length === 0 && bookings.length > 0 && (
              <div className="text-center py-8">
                <FaSearch className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
      {/* Card layout for mobile screens */}
      <div className="block md:hidden space-y-4">
        {isLoading ? (
          <div className="bg-white rounded-xl shadow p-4 border border-gray-100 text-center text-gray-500">
            Loading bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-4 border border-gray-100 text-center text-gray-500">
            No bookings available
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl shadow p-4 border border-gray-100">
              <div className="flex flex-col gap-1 mb-2">
                <span className="text-xs text-gray-500">Ref: {booking.bookingId || booking.id}</span>
                <span className="font-semibold text-gray-900 text-base">{booking.destinationName}</span>
                <span className="text-xs text-gray-500">{booking.userName || booking.userEmail}</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-gray-700 mb-2">
                <span>{booking.checkIn} to {booking.checkOut}</span>
                <span className="font-semibold text-gray-900">{typeof booking.totalPrice === 'number' ? `$${booking.totalPrice}` : '-'}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800 border-green-200' : booking.status === 'cancelled' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                  {booking.status}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <a
                  href={`/admin/bookings/${booking.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-green-600 hover:text-white hover:bg-green-600 rounded-lg transition-colors border border-green-100 text-xs"
                  title="View"
                >
                  View
                </a>
                <button
                  onClick={() => {/* handle edit */}}
                  className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-colors border border-blue-100 text-xs"
                  title="Edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => {/* handle delete/cancel */}}
                  className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-colors border border-red-100 text-xs"
                  title="Delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Booking Details Modal */}
      <BookingDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        booking={selectedBooking}
      />
    </>
  );
} 