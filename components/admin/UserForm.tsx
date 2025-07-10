import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

interface UserFormData {
  username: string;
  email: string;
}

interface User {
  id: number;
  username: string;
  email: string;
}

interface UserFormProps {
  onSubmit: (formData: UserFormData) => Promise<void>;
  onCancel?: () => void;
  isLoading: boolean;
  error: string | null;
  success: string | null;
  editingUser?: User | null;
}

const defaultForm = {
  username: "",
  email: "",
};

export default function UserForm({ onSubmit, onCancel, isLoading, error, success, editingUser }: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({ ...defaultForm });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        username: editingUser.username,
        email: editingUser.email
      });
    } else {
      setFormData({ ...defaultForm });
    }
  }, [editingUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    if (!editingUser) {
      setFormData({ ...defaultForm });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 space-y-6 border border-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
        {editingUser ? 'Edit User' : 'Add New User'}
        <span className="inline-block px-2 py-0.5 rounded bg-blue-500 text-white text-xs font-semibold ml-2">Admin Only</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
      </div>
      {error && <div className="text-red-600 font-medium">{error}</div>}
      {success && <div className="text-green-600 font-medium">{success}</div>}
      <div className="flex gap-4">
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? (editingUser ? "Saving..." : "Adding...") : (editingUser ? "Save Changes" : "Add User")}
        </Button>
        {editingUser && onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
} 