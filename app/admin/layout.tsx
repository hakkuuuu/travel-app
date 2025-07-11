"use client";
import ProfileDropdown from '@/components/layout/ProfileDropdown';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Topbar/Header */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-green-600">Admin Dashboard</span>
          {/* Add top nav links if needed */}
        </div>
        {user && <ProfileDropdown user={user} onLogout={logout} />}
      </header>
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
} 