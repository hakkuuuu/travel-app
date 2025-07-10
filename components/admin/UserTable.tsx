import Button from '@/components/ui/Button';

interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
}

export default function UserTable({ users, onEdit, onDelete, isLoading }: UserTableProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">All Users</h2>
      {isLoading && <div>Loading...</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow border border-gray-100">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">ID</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Username</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Created At</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t border-gray-50">
                <td className="px-4 py-2 text-sm text-gray-900">{user.id}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{user.username}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{user.email}</td>
                <td className="px-4 py-2 text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Button type="button" variant="secondary" onClick={() => onEdit(user)}>
                    Edit
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => onDelete(user.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 