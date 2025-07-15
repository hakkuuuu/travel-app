import { useState, useEffect } from 'react';
import { useAdminStore, AdminDestination, AdminUser } from '@/store';
import { useUIStore } from '@/store';
import toast from 'react-hot-toast';

export function useAdminPage() {
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
  const [editingDestination, setEditingDestination] = useState<AdminDestination | null>(null);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [showDestinationDeleteConfirmation, setShowDestinationDeleteConfirmation] = useState(false);
  const [showUserDeleteConfirmation, setShowUserDeleteConfirmation] = useState(false);
  const [destinationToDelete, setDestinationToDelete] = useState<AdminDestination | null>(null);
  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);

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

  const handleDestinationDeleteClick = (destination: AdminDestination) => {
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

  const handleUserDeleteClick = (user: AdminUser) => {
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
  const openDestinationModal = (destination?: AdminDestination) => {
    setEditingDestination(destination || null);
    openModal('destination-form');
  };

  const openUserModal = (user?: AdminUser) => {
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

  return {
    // State
    tab,
    destinations,
    users,
    bookings,
    isLoading,
    error,
    modal,
    editingDestination,
    editingUser,
    showDestinationDeleteConfirmation,
    showUserDeleteConfirmation,
    destinationToDelete,
    userToDelete,

    // Actions
    setTab,
    openDestinationModal,
    openUserModal,
    closeModal,
    handleDestinationSubmit,
    handleDestinationEdit,
    handleDestinationDeleteClick,
    handleDestinationDeleteConfirm,
    handleDestinationDeleteCancel,
    handleUserSubmit,
    handleUserEdit,
    handleUserDeleteClick,
    handleUserDeleteConfirm,
    handleUserDeleteCancel,
    handleRefreshDestinations,
    handleRefreshUsers,
    handleRefreshBookings,
  };
} 