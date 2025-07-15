import RefreshButton from '@/components/ui/RefreshButton';
import BookingTable from '@/components/admin/BookingTable';
import { AdminBooking } from '@/store/adminStore';

interface AdminBookingsTabProps {
  bookings: AdminBooking[];
  isLoading: boolean;
  onRefresh: () => void;
}

export default function AdminBookingsTab({
  bookings,
  isLoading,
  onRefresh
}: AdminBookingsTabProps) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Bookings</h2>
        <div className="flex gap-2">
          <RefreshButton onClick={onRefresh} loading={isLoading}>
            Refresh
          </RefreshButton>
        </div>
      </div>
      
      <BookingTable
        bookings={bookings}
        isLoading={isLoading}
      />
    </div>
  );
} 