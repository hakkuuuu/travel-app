import DashboardStats from '@/components/admin/DashboardStats';
import RecentActivity from '@/components/admin/RecentActivity';
import { AdminDestination, AdminUser, AdminBooking } from '@/store/adminStore';

interface AdminDashboardTabProps {
  destinations: AdminDestination[];
  users: AdminUser[];
  bookings: AdminBooking[];
}

export default function AdminDashboardTab({ destinations, users, bookings }: AdminDashboardTabProps) {
  return (
    <div className="space-y-8">
      <DashboardStats 
        destinations={destinations}
        users={users}
        bookings={bookings}
      />
      <RecentActivity 
        destinations={destinations}
        users={users}
      />
    </div>
  );
} 