'use client';
import { useState, useEffect } from 'react';
import UserTable from '@/components/admin/UserTable';
import UserForm from '@/components/admin/UserForm';
import Modal from '@/components/ui/Modal';
import ConfirmationDialog from '@/components/ui/ConfirmationDialog';
import Button from '@/components/ui/Button';
import { useAdminStore } from '@/store';
import { useUIStore } from '@/store';
import toast from 'react-hot-toast';
import { FaPlus, FaSync, FaEdit, FaTrash } from 'react-icons/fa';
import type { User } from '@/components/admin/UserTable';

export default function AdminUsersPage() {
  const {
    users,
    isLoading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    clearError
  } = useAdminStore();
  
  const { modal, openModal, closeModal } = useUIStore();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAdd = () => {
    setEditingUser(null);
    openModal('user-form');
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    openModal('user-form');
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    
    const success = await deleteUser(userToDelete.id);
    if (success) {
      toast.success(`User "${userToDelete.username}" deleted successfully! 🗑️`);
    }
    
    setShowDeleteConfirmation(false);
    setUserToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
    setUserToDelete(null);
  };

  const handleFormSubmit = async (formData: any) => {
    if (editingUser) {
      console.log('Updating user with ID:', editingUser.id, editingUser);
      const success = await updateUser(editingUser.id, formData);
      if (success) {
        closeModal();
        setEditingUser(null);
      }
    } else {
      const success = await createUser(formData);
      if (success) {
        closeModal();
        setEditingUser(null);
      }
    }
  };

  const handleRefresh = async () => {
    toast.loading('Refreshing users...');
    await fetchUsers();
    toast.success('Users refreshed! 🔄');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <div className="flex gap-2">
          <Button
            onClick={handleAdd}
            variant="success"
            icon={<FaPlus className="w-4 h-4" />}
          >
            Add User
          </Button>
          <Button
            onClick={handleRefresh}
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
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
          error={error}
          success={null}
          editingUser={editingUser}
          onCancel={closeModal}
        />
      </Modal>
      
      <div className="overflow-x-auto relative">
        {isLoading && <div>Loading...</div>}
        {error && <div className="text-red-500">Failed to load users</div>}
        <UserTable
          users={users}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showDeleteConfirmation}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
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