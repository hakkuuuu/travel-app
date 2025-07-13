"use client";
import { useEffect, useState } from "react";
import DashboardStats from '@/components/admin/DashboardStats';
import RecentActivity from '@/components/admin/RecentActivity';
import DestinationForm from '@/components/admin/DestinationForm';
import DestinationList from '@/components/admin/DestinationList';
import UserForm from '@/components/admin/UserForm';
import UserTable, { User } from '@/components/admin/UserTable';
import BookingTable from '@/components/admin/BookingTable';
import Modal from '@/components/ui/Modal';
import ConfirmationDialog from '@/components/ui/ConfirmationDialog';
import Button from '@/components/ui/Button';
import { useAdminStore } from '@/store';
import { useUIStore } from '@/store';
import toast from 'react-hot-toast';
import { FaPlus, FaSync } from 'react-icons/fa';

interface Destination {
  id: number;
  name: string;
  location: string;
  price: string;
  image: string;
  description: string;
  amenities: string[];
  features: string[];
  rating?: number;
  reviews?: any[];
}

export default function AdminPage() {
  // Tabs
  const [tab, setTab] = useState<'dashboard' | 'destinations' | 'users' | 'bookings'>('dashboard');

  // Admin store
  const {
    destinations,
    users,
    bookings,
    stats,
    isLoading,
    error,
    fetchDestinations,
    fetchUsers,
    fetchBookings,
    fetchStats,
    createDestination,
    updateDestination,
    deleteDestination,
    createUser,
    updateUser,
    deleteUser,
    clearError
  } = useAdminStore();

  // UI store
  const { modal, openModal, closeModal } = useUIStore();

  // Local state
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showDestinationDeleteConfirmation, setShowDestinationDeleteConfirmation] = useState(false);
  const [showUserDeleteConfirmation, setShowUserDeleteConfirmation] = useState(false);
  const [destinationToDelete, setDestinationToDelete] = useState<Destination | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Fetch data based on tab
  useEffect(() => {
    if (tab === 'destinations') {
      fetchDestinations();
    } else if (tab === 'users') {
      fetchUsers();
    } else if (tab === 'bookings') {
      fetchBookings();
    } else if (tab === 'dashboard') {
      fetchDestinations();
      fetchUsers();
      fetchBookings();
      fetchStats();
    }
  }, [tab, fetchDestinations, fetchUsers, fetchBookings, fetchStats]);

  // Destination handlers
  const handleDestinationSubmit = async (formData: any) => {
    const success = await createDestination({
      ...formData,
      amenities: formData.amenities.split(",").map((a: string) => a.trim()).filter(Boolean),
      features: formData.features.split(",").map((f: string) => f.trim()).filter(Boolean),
    });
    if (success) {
      closeModal();
      setEditingDestination(null);
    }
  };

  const handleDestinationEdit = async (formData: any) => {
    if (!editingDestination) return;
    
    const success = await updateDestination(editingDestination.id, {
      ...formData,
      amenities: formData.amenities.split(",").map((a: string) => a.trim()).filter(Boolean),
      features: formData.features.split(",").map((f: string) => f.trim()).filter(Boolean),
    });
    if (success) {
      closeModal();
      setEditingDestination(null);
    }
  };

  const handleDestinationDeleteClick = (destination: Destination) => {
    setDestinationToDelete(destination);
    setShowDestinationDeleteConfirmation(true);
  };

  const handleDestinationDeleteConfirm = async () => {
    if (!destinationToDelete) return;
    
    const success = await deleteDestination(destinationToDelete.id);
    if (success) {
      toast.success(`Destination "${destinationToDelete.name}" deleted successfully! 🗑️`);
    }
    
    setShowDestinationDeleteConfirmation(false);
    setDestinationToDelete(null);
  };

  const handleDestinationDeleteCancel = () => {
    setShowDestinationDeleteConfirmation(false);
    setDestinationToDelete(null);
  };

  // User handlers
  const handleUserSubmit = async (formData: any) => {
    const success = await createUser(formData);
    if (success) {
      closeModal();
      setEditingUser(null);
    }
  };

  const handleUserEdit = async (formData: any) => {
    if (!editingUser) return;
    
    const success = await updateUser(editingUser.id, formData);
    if (success) {
      closeModal();
      setEditingUser(null);
    }
  };

  const handleUserDeleteClick = (user: User) => {
    setUserToDelete(user);
    setShowUserDeleteConfirmation(true);
  };

  const handleUserDeleteConfirm = async () => {
    if (!userToDelete) return;
    
    const success = await deleteUser(userToDelete.id);
    if (success) {
      toast.success(`User "${userToDelete.username}" deleted successfully! 🗑️`);
    }
    
    setShowUserDeleteConfirmation(false);
    setUserToDelete(null);
  };

  const handleUserDeleteCancel = () => {
    setShowUserDeleteConfirmation(false);
    setUserToDelete(null);
  };

  // Modal handlers
  const openDestinationModal = (destination?: Destination) => {
    setEditingDestination(destination || null);
    openModal('destination-form');
  };

  const openUserModal = (user?: User) => {
    setEditingUser(user || null);
    openModal('user-form');
  };

  // Refresh handlers
  const handleRefreshDestinations = async () => {
    toast.loading('Refreshing destinations...');
    await fetchDestinations();
    toast.success('Destinations refreshed! 🔄');
  };

  const handleRefreshUsers = async () => {
    toast.loading('Refreshing users...');
    await fetchUsers();
    toast.success('Users refreshed! 🔄');
  };

  const handleRefreshBookings = async () => {
    toast.loading('Refreshing bookings...');
    await fetchBookings();
    toast.success('Bookings refreshed! 🔄');
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
            <button
              onClick={() => setTab('bookings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                tab === 'bookings'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Bookings
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
              destinations={destinations}
              users={users}
              bookings={bookings}
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
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Destinations</h2>
              <div className="flex gap-2">
                <Button
                  onClick={() => openDestinationModal()}
                  variant="success"
                  icon={<FaPlus className="w-4 h-4" />}
                >
                  Add Destination
                </Button>
                <Button
                  onClick={handleRefreshDestinations}
                  variant="outline"
                  icon={<FaSync className="w-4 h-4" />}
                  loading={isLoading}
                >
                  Refresh
                </Button>
              </div>
            </div>
            
            <Modal 
              isOpen={modal.isOpen && modal.type === 'destination-form'} 
              onClose={closeModal} 
              title={editingDestination ? 'Edit Destination' : 'Add Destination'}
            >
              <DestinationForm
                onSubmit={editingDestination ? handleDestinationEdit : handleDestinationSubmit}
                isLoading={isLoading}
                error={error}
                success={null}
                initialData={editingDestination}
                onCancel={closeModal}
              />
            </Modal>
            
            <DestinationList 
              destinations={destinations}
              isLoading={isLoading}
              onEdit={openDestinationModal}
              onDelete={handleDestinationDeleteClick}
            />
          </div>
        )}
        {/* Users Tab */}
        {tab === 'users' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Users</h2>
              <div className="flex gap-2">
                <Button
                  onClick={() => openUserModal()}
                  variant="success"
                  icon={<FaPlus className="w-4 h-4" />}
                >
                  Add User
                </Button>
                <Button
                  onClick={handleRefreshUsers}
                  variant="outline"
                  icon={<FaSync className="w-4 h-4" />}
                  loading={isLoading}
                >
                  Refresh
                </Button>
              </div>
            </div>
            
            <Modal 
              isOpen={modal.isOpen && modal.type === 'user-form'} 
              onClose={closeModal} 
              title={editingUser ? 'Edit User' : 'Add User'}
            >
              <UserForm
                onSubmit={editingUser ? handleUserEdit : handleUserSubmit}
                onCancel={closeModal}
                isLoading={isLoading}
                error={error}
                success={null}
                editingUser={editingUser}
              />
            </Modal>
            
            <UserTable
              users={users}
              onEdit={openUserModal}
              onDelete={handleUserDeleteClick}
              isLoading={isLoading}
            />
          </div>
        )}
        {/* Bookings Tab */}
        {tab === 'bookings' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Bookings</h2>
              <div className="flex gap-2">
                <Button
                  onClick={handleRefreshBookings}
                  variant="outline"
                  icon={<FaSync className="w-4 h-4" />}
                  loading={isLoading}
                >
                  Refresh
                </Button>
              </div>
            </div>
            
            <BookingTable
              bookings={bookings}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>

      {/* Confirmation Dialogs */}
      <ConfirmationDialog
        isOpen={showDestinationDeleteConfirmation}
        onClose={handleDestinationDeleteCancel}
        onConfirm={handleDestinationDeleteConfirm}
        title="Delete Destination"
        message={`Are you sure you want to delete "${destinationToDelete?.name}"? This action cannot be undone and will remove all associated data.`}
        confirmText="Delete Destination"
        cancelText="Cancel"
        type="danger"
        loading={isLoading}
      />

      <ConfirmationDialog
        isOpen={showUserDeleteConfirmation}
        onClose={handleUserDeleteCancel}
        onConfirm={handleUserDeleteConfirm}
        title="Delete User"
        message={`Are you sure you want to delete user "${userToDelete?.username}"? This action cannot be undone and will remove all associated data.`}
        confirmText="Delete User"
        cancelText="Cancel"
        type="danger"
        loading={isLoading}
      />
    </div>
  );
} 