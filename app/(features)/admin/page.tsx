"use client";
import { useEffect, useState } from "react";
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardStats from '@/components/admin/DashboardStats';
import QuickActions from '@/components/admin/QuickActions';
import RecentActivity from '@/components/admin/RecentActivity';
import DestinationForm from '@/components/admin/DestinationForm';
import DestinationList from '@/components/admin/DestinationList';
import UserForm from '@/components/admin/UserForm';
import UserTable from '@/components/admin/UserTable';

// Destination types
interface Destination {
  id: number;
  name: string;
  location: string;
  price: string;
  image: string;
  description: string;
  amenities: string[];
  features: string[];
}

// User types
interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
  return (
    <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition-all animate-fade-in ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>{message}</div>
  );
}

export default function AdminPage() {
  // Tabs
  const [tab, setTab] = useState<'dashboard' | 'destinations' | 'users'>('dashboard');

  // Destinations state
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [destinationLoading, setDestinationLoading] = useState(false);
  const [destinationError, setDestinationError] = useState<string | null>(null);
  const [destinationSuccess, setDestinationSuccess] = useState<string | null>(null);

  // Users state
  const [users, setUsers] = useState<User[]>([]);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);
  const [userSuccess, setUserSuccess] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Toast
  const [showToast, setShowToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Fetch data based on tab
  useEffect(() => {
    if (tab === 'destinations') fetchDestinations();
    if (tab === 'users') fetchUsers();
    if (tab === 'dashboard') {
      fetchDestinations();
      fetchUsers();
    }
    // eslint-disable-next-line
  }, [tab]);

  async function fetchDestinations() {
    setDestinationLoading(true);
    setDestinationError(null);
    try {
      const res = await fetch("/api/destinations");
      const data = await res.json();
      setDestinations(data);
    } catch (e) {
      setDestinationError("Failed to fetch destinations");
    } finally {
      setDestinationLoading(false);
    }
  }

  async function handleDestinationSubmit(formData: any) {
    setDestinationLoading(true);
    setDestinationError(null);
    setDestinationSuccess(null);
    try {
      const res = await fetch("/api/destinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          amenities: formData.amenities.split(",").map((a: string) => a.trim()).filter(Boolean),
          features: formData.features.split(",").map((f: string) => f.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error("Failed to add destination");
      setDestinationSuccess("Destination added!");
      setShowToast({ message: "Destination added!", type: "success" });
      fetchDestinations();
    } catch (e) {
      setDestinationError("Failed to add destination");
      setShowToast({ message: "Failed to add destination", type: "error" });
    } finally {
      setDestinationLoading(false);
      setTimeout(() => setShowToast(null), 2500);
    }
  }

  // USERS CRUD
  async function fetchUsers() {
    setUserLoading(true);
    setUserError(null);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      setUserError("Failed to fetch users");
    } finally {
      setUserLoading(false);
    }
  }

  async function handleUserSubmit(formData: any) {
    setUserLoading(true);
    setUserError(null);
    setUserSuccess(null);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to add user");
      setUserSuccess("User added!");
      setShowToast({ message: "User added!", type: "success" });
      fetchUsers();
    } catch (e) {
      setUserError("Failed to add user");
      setShowToast({ message: "Failed to add user", type: "error" });
    } finally {
      setUserLoading(false);
      setTimeout(() => setShowToast(null), 2500);
    }
  }

  async function handleUserEdit(user: User) {
    setEditingUserId(user.id);
    setEditingUser(user);
  }

  async function handleUserUpdate(formData: any) {
    if (editingUserId === null) return;
    setUserLoading(true);
    setUserError(null);
    try {
      const res = await fetch(`/api/users?id=${editingUserId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to update user");
      setShowToast({ message: "User updated!", type: "success" });
      setEditingUserId(null);
      setEditingUser(null);
      fetchUsers();
    } catch (e) {
      setUserError("Failed to update user");
      setShowToast({ message: "Failed to update user", type: "error" });
    } finally {
      setUserLoading(false);
      setTimeout(() => setShowToast(null), 2500);
    }
  }

  async function handleUserDelete(id: number) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setUserLoading(true);
    setUserError(null);
    try {
      const res = await fetch(`/api/users?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");
      setShowToast({ message: "User deleted!", type: "success" });
      fetchUsers();
    } catch (e) {
      setUserError("Failed to delete user");
      setShowToast({ message: "Failed to delete user", type: "error" });
    } finally {
      setUserLoading(false);
      setTimeout(() => setShowToast(null), 2500);
    }
  }

  const handleUserCancel = () => {
    setEditingUserId(null);
    setEditingUser(null);
  };

  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen bg-gray-50">
        {showToast && <Toast message={showToast.message} type={showToast.type} />}
        
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div>
                <h1 className="section-title text-2xl md:text-3xl mb-0">Admin Dashboard</h1>
                <p className="section-subtitle text-sm mb-0">Manage your Travelis platform</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Admin
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              <button
                onClick={() => setTab('dashboard')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  tab === 'dashboard'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setTab('destinations')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  tab === 'destinations'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Destinations
              </button>
              <button
                onClick={() => setTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  tab === 'users'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Users
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Dashboard Tab */}
          {tab === 'dashboard' && (
            <div className="space-y-8">
              <DashboardStats 
                destinationsCount={destinations.length} 
                usersCount={users.length} 
              />
              
              <QuickActions 
                onNavigateToDestinations={() => setTab('destinations')}
                onNavigateToUsers={() => setTab('users')}
              />
              
              <RecentActivity 
                destinations={destinations}
                users={users}
              />
            </div>
          )}

          {/* Destinations Tab */}
          {tab === 'destinations' && (
            <div className="space-y-8">
              <DestinationForm 
                onSubmit={handleDestinationSubmit}
                isLoading={destinationLoading}
                error={destinationError}
                success={destinationSuccess}
              />
              
              <DestinationList 
                destinations={destinations}
                isLoading={destinationLoading}
              />
            </div>
          )}

          {/* Users Tab */}
          {tab === 'users' && (
            <div className="space-y-8">
              <UserForm 
                onSubmit={editingUserId ? handleUserUpdate : handleUserSubmit}
                onCancel={handleUserCancel}
                isLoading={userLoading}
                error={userError}
                success={userSuccess}
                editingUser={editingUser}
              />
              
              <UserTable 
                users={users}
                onEdit={handleUserEdit}
                onDelete={handleUserDelete}
                isLoading={userLoading}
              />
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
} 