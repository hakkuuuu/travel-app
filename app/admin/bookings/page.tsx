"use client";
import { useEffect } from "react";
import BookingTable from '@/components/admin/BookingTable';
import { useAdminStore } from '@/store';

export default function AdminBookingsPage() {
  const { bookings, isLoading, fetchBookings } = useAdminStore();

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Bookings</h1>
      <p className="text-gray-600 mb-8">Manage and monitor user bookings</p>
      <BookingTable bookings={bookings} isLoading={isLoading} />
    </div>
  );
} 