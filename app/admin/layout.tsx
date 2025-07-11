"use client";
import { useAuth } from '@/contexts/AuthContext';
import ProfileDropdown from '@/components/layout/ProfileDropdown';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // const { user, logout } = useAuth(); // Not needed if header is removed
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
} 