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
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4 border border-gray-100 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        {editingUser ? 'Edit User' : 'Add User'}
        <span className="inline-block px-2 py-0.5 rounded bg-blue-500 text-white text-xs font-semibold">Admin</span>
      </h2>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="input-field w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field w-full"
            required
          />
        </div>
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}
      <div className="flex justify-end gap-2 pt-2">
        {editingUser && onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? (editingUser ? "Saving..." : "Adding...") : (editingUser ? "Save" : "Add")}
        </Button>
      </div>
    </form>
  );
} 