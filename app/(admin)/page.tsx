'use client';
// Requires: npm install swr
import DashboardStats from '@/components/admin/DashboardStats';
import RecentActivity from '@/components/admin/RecentActivity';
import Link from 'next/link';

export default function AdminDashboard() {
  // Dummy data for now; replace with real data fetching as needed
  const destinations: any[] = [];
  const users: any[] = [];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
      <DashboardStats 
        destinationsCount={destinations.length}
        usersCount={users.length}
        reviewsCount={0}
      />
      <RecentActivity 
        destinations={destinations}
        users={users}
      />
      <div className="flex gap-4 mt-8">
        <Link href="/admin/users" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold">Manage Users</Link>
        <Link href="/admin/destinations" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold">Manage Destinations</Link>
      </div>
    </div>
  );
} 