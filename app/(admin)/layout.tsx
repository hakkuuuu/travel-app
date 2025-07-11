import { useAuth } from '@/contexts/AuthContext';
import ProfileDropdown from '@/components/layout/ProfileDropdown';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="h-16 flex items-center justify-center border-b">
          <span className="text-xl font-bold text-green-600">Admin</span>
        </div>
        <nav className="flex-1 py-4 px-2 space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded hover:bg-green-100 text-gray-800 font-medium">Dashboard</Link>
          <Link href="/admin/users" className="block px-4 py-2 rounded hover:bg-green-100 text-gray-800 font-medium">Users</Link>
          <Link href="/admin/destinations" className="block px-4 py-2 rounded hover:bg-green-100 text-gray-800 font-medium">Destinations</Link>
          {/* <Link href="/admin/bookings" className="block px-4 py-2 rounded hover:bg-green-100 text-gray-800 font-medium">Bookings</Link> */}
        </nav>
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center justify-end px-6">
          {user && <ProfileDropdown user={user} onLogout={logout} />}
        </header>
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
} 