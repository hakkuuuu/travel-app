import { FaPlus } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import RefreshButton from '@/components/ui/RefreshButton';
import EntityFormModal from '@/components/ui/EntityFormModal';
import UserForm from '@/components/admin/UserForm';
import UserTable from '@/components/admin/UserTable';
import { AdminUser } from '@/store/adminStore';

interface AdminUsersTabProps {
  users: AdminUser[];
  isLoading: boolean;
  error: string | null;
  modal: { isOpen: boolean; type: string | null };
  editingUser: AdminUser | null;
  onAddUser: () => void;
  onEditUser: (user: AdminUser) => void;
  onDeleteUser: (user: AdminUser) => void;
  onRefresh: () => void;
  onCloseModal: () => void;
  onSubmitUser: (formData: any) => Promise<void>;
  onEditUserSubmit: (formData: any) => Promise<void>;
}

export default function AdminUsersTab({
  users,
  isLoading,
  error,
  modal,
  editingUser,
  onAddUser,
  onEditUser,
  onDeleteUser,
  onRefresh,
  onCloseModal,
  onSubmitUser,
  onEditUserSubmit
}: AdminUsersTabProps) {
  // Type adapter: convert AdminUser to User for UserTable
  const adaptedUsers = users.map(user => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
    bio: undefined,
    avatar: undefined,
    createdAt: user.createdAt
  }));

  const handleEditUser = (user: any) => {
    // Find the original AdminUser and pass it to the handler
    const originalUser = users.find(u => u.id === user.id);
    if (originalUser) {
      onEditUser(originalUser);
    }
  };

  const handleDeleteUser = (user: any) => {
    // Find the original AdminUser and pass it to the handler
    const originalUser = users.find(u => u.id === user.id);
    if (originalUser) {
      onDeleteUser(originalUser);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Users</h2>
        {/* Desktop buttons */}
        <div className="hidden md:flex gap-2">
          <Button
            onClick={onAddUser}
            variant="success"
            icon={<FaPlus className="w-4 h-4" />}
          >
            Add User
          </Button>
          <RefreshButton onClick={onRefresh} loading={isLoading}>
            Refresh
          </RefreshButton>
        </div>
        {/* Mobile icon buttons */}
        <div className="flex md:hidden gap-2">
          <button
            onClick={onAddUser}
            className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            title="Add User"
          >
            <FaPlus className="w-5 h-5" />
          </button>
          <RefreshButton onClick={onRefresh} loading={isLoading} iconOnly className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-400" />
        </div>
      </div>
      
      <EntityFormModal
        isOpen={modal.isOpen && modal.type === 'user-form'} 
        onClose={onCloseModal} 
        title={editingUser ? 'Edit User' : 'Add User'}
      >
        <UserForm
          onSubmit={editingUser ? onEditUserSubmit : onSubmitUser}
          onCancel={onCloseModal}
          isLoading={isLoading}
          error={error}
          success={null}
          editingUser={editingUser}
        />
      </EntityFormModal>
      
      <UserTable
        users={adaptedUsers}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        isLoading={isLoading}
      />
    </div>
  );
} 