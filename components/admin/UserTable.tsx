import DataTable, { TableColumn, TableAction } from '@/components/ui/DataTable';

export interface User {
  id: number;
  name?: string;
  username: string;
  email: string;
  role?: string;
  bio?: string;
  avatar?: string;
  createdAt?: string;
}

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  isLoading: boolean;
  onSort?: (key: keyof User) => void;
  sortKey?: keyof User;
  sortDirection?: 'asc' | 'desc';
}

export default function UserTable({ users, onEdit, onDelete, isLoading, onSort, sortKey, sortDirection }: UserTableProps) {
  const columns: TableColumn<User>[] = [
    {
      key: 'username',
      label: 'Username',
      sortable: true,
      className: 'font-medium'
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true
    },
    {
      key: 'role',
      label: 'Role',
      render: (value) => value || 'user'
    },
    {
      key: 'createdAt',
      label: 'Created At',
      sortable: true,
      render: (value) => value ? new Date(value).toLocaleDateString() : 'N/A',
      className: 'text-gray-500'
    }
  ];

  const actions: TableAction<User>[] = [
    {
      type: 'edit',
      label: 'Edit',
      onClick: (user) => {
        if (user.role === 'admin' || user.username === 'admin12345') return;
        onEdit(user);
      },
    },
    {
      type: 'delete',
      label: 'Delete',
      onClick: (user) => {
        if (user.role === 'admin' || user.username === 'admin12345') return;
        onDelete(user);
      }
    }
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      actions={actions}
      title="All Users"
      isLoading={isLoading}
      loadingText="Loading users..."
      onSort={onSort}
      sortKey={sortKey}
      sortDirection={sortDirection}
    />
  );
} 