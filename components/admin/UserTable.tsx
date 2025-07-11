import { FaEdit, FaTrash } from 'react-icons/fa';

export interface User {
  id: number;
  username: string;
  email: string;
  role?: string;
  createdAt: string;
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
  const renderSortIcon = (key: keyof User) => {
    if (!onSort) return null;
    if (sortKey !== key) return <span className="ml-1 text-gray-300">⇅</span>;
    return sortDirection === 'asc' ? <span className="ml-1">▲</span> : <span className="ml-1">▼</span>;
  };
  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">All Users</h2>
      {isLoading && <div>Loading...</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow border border-gray-100">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 align-middle cursor-pointer select-none" onClick={onSort ? () => onSort('username') : undefined}>
                Username {renderSortIcon('username')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 align-middle cursor-pointer select-none" onClick={onSort ? () => onSort('email') : undefined}>
                Email {renderSortIcon('email')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 align-middle">Role</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 align-middle cursor-pointer select-none" onClick={onSort ? () => onSort('createdAt') : undefined}>
                Created At {renderSortIcon('createdAt')}
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 align-middle">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id ?? idx} className="border-t border-gray-50">
                <td className="px-6 py-3 text-sm text-gray-900 font-medium align-middle">{user.username}</td>
                <td className="px-6 py-3 text-sm text-gray-700 align-middle">{user.email}</td>
                <td className="px-6 py-3 text-sm text-gray-700 align-middle">{user.role || 'user'}</td>
                <td className="px-6 py-3 text-sm text-gray-500 align-middle">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-3 align-middle">
                  <div className="flex justify-center gap-2">
                    <button
                      className="p-2 rounded hover:bg-blue-100 text-blue-600"
                      onClick={() => onEdit(user)}
                      title="Edit"
                      aria-label={`Edit ${user.username}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="p-2 rounded hover:bg-red-100 text-red-600"
                      onClick={() => onDelete(user)}
                      title="Delete"
                      aria-label={`Delete ${user.username}`}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 