"use client";

import Tabs from '@/components/ui/Tabs';
import DeleteConfirmationDialog from '@/components/ui/DeleteConfirmationDialog';
import AdminDashboardTab from '@/components/admin/AdminDashboardTab';
import AdminDestinationsTab from '@/components/admin/AdminDestinationsTab';
import AdminUsersTab from '@/components/admin/AdminUsersTab';
import AdminBookingsTab from '@/components/admin/AdminBookingsTab';
import { useAdminPage } from '@/hooks/useAdminPage';

export default function AdminPage() {
  const {
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
  } = useAdminPage();

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
          <Tabs
            tabs={[
              { value: 'dashboard', label: 'Dashboard' },
              { value: 'destinations', label: 'Destinations' },
              { value: 'users', label: 'Users' },
              { value: 'bookings', label: 'Bookings' },
            ]}
            currentTab={tab}
            onTabChange={(tab) => setTab(tab as 'dashboard' | 'destinations' | 'users' | 'bookings')}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {tab === 'dashboard' && (
          <AdminDashboardTab
              destinations={destinations}
              users={users}
              bookings={bookings}
            />
        )}

        {/* Destinations Tab */}
        {tab === 'destinations' && (
          <AdminDestinationsTab
            destinations={destinations}
                isLoading={isLoading}
                error={error}
            modal={modal}
            editingDestination={editingDestination}
            onAddDestination={() => openDestinationModal()}
            onEditDestination={openDestinationModal}
            onDeleteDestination={handleDestinationDeleteClick}
            onRefresh={handleRefreshDestinations}
            onCloseModal={closeModal}
            onSubmitDestination={handleDestinationSubmit}
            onEditDestinationSubmit={handleDestinationEdit}
            />
        )}

        {/* Users Tab */}
        {tab === 'users' && (
          <AdminUsersTab
            users={users}
                isLoading={isLoading}
                error={error}
            modal={modal}
                editingUser={editingUser}
            onAddUser={() => openUserModal()}
            onEditUser={openUserModal}
            onDeleteUser={handleUserDeleteClick}
            onRefresh={handleRefreshUsers}
            onCloseModal={closeModal}
            onSubmitUser={handleUserSubmit}
            onEditUserSubmit={handleUserEdit}
            />
        )}

        {/* Bookings Tab */}
        {tab === 'bookings' && (
          <AdminBookingsTab
              bookings={bookings}
              isLoading={isLoading}
            onRefresh={handleRefreshBookings}
            />
        )}
      </div>

      {/* Confirmation Dialogs */}
      <DeleteConfirmationDialog
        isOpen={showDestinationDeleteConfirmation}
        onClose={handleDestinationDeleteCancel}
        onConfirm={handleDestinationDeleteConfirm}
        entityName="Destination"
        itemName={destinationToDelete?.name}
        loading={isLoading}
      />

      <DeleteConfirmationDialog
        isOpen={showUserDeleteConfirmation}
        onClose={handleUserDeleteCancel}
        onConfirm={handleUserDeleteConfirm}
        entityName="User"
        itemName={userToDelete?.username}
        loading={isLoading}
      />
    </div>
  );
} 