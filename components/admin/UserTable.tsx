import { useState } from 'react';
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
            {currentUsers.map((user, idx) => (
              <tr key={user.id ?? idx} className="border-t border-gray-50">
                <td className="px-6 py-3 text-sm text-gray-900 font-medium align-middle">{user.username}</td>
                <td className="px-6 py-3 text-sm text-gray-700 align-middle">{user.email}</td>
                <td className="px-6 py-3 text-sm text-gray-700 align-middle">{user.role || 'user'}</td>
                <td className="px-6 py-3 text-sm text-gray-500 align-middle">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
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
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, users.length)} of {users.length} users
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded hover:bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Previous page"
            >
              <FaChevronLeft />
            </button>
            
            {/* Page numbers */}
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded hover:bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Next page"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 