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
    <>
      {/* Table layout for md+ screens */}
      <div className="hidden md:block">
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
      </div>
      {/* Card layout for mobile screens */}
      <div className="block md:hidden space-y-4">
        {isLoading ? (
          <div className="bg-white rounded-xl shadow p-4 border border-gray-100 text-center text-gray-500">
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-4 border border-gray-100 text-center text-gray-500">
            No users available
          </div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="bg-white rounded-xl shadow p-4 border border-gray-100">
              <div className="flex items-center space-x-3 mb-2">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xl font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">{user.username}</h3>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-gray-700 mb-2">
                <span className="font-semibold text-gray-900">{user.role || 'user'}</span>
                <span className="text-gray-500">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {user.role !== 'admin' && user.username !== 'admin12345' && (
                  <>
                    <button
                      onClick={() => onEdit(user)}
                      className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-colors border border-blue-100 text-xs"
                      title="Edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(user)}
                      className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-colors border border-red-100 text-xs"
                      title="Delete"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
} 