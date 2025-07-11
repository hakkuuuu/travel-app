import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

interface UserFormData {
  name: string;
  username: string;
  email: string;
  password?: string;
  role: string;
  bio: string;
  avatar: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  bio: string;
  avatar: string;
}

interface UserFormProps {
  onSubmit: (formData: UserFormData) => Promise<void>;
  onCancel?: () => void;
  isLoading: boolean;
  error: string | null;
  success: string | null;
  editingUser?: User | null;
}

const defaultForm: UserFormData = {
  name: '',
  username: '',
  email: '',
  password: '',
  role: 'user',
  bio: '',
  avatar: '/user.svg',
};

export default function UserForm({ onSubmit, onCancel, isLoading, error, success, editingUser }: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({ ...defaultForm });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        ...editingUser,
        password: '', // Don't prefill password
      });
    } else {
      setFormData({ ...defaultForm });
    }
  }, [editingUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = { ...formData };
    if (!submitData.password) delete submitData.password; // Don't send empty password
    await onSubmit(submitData);
    if (!editingUser) {
      setFormData({ ...defaultForm });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Basic Information */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter full name"
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Choose a username"
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="user@example.com"
            required 
          />
        </div>
      </div>

      {/* Security & Role */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password {editingUser && <span className="text-xs text-gray-500">(leave blank to keep unchanged)</span>}
          </label>
          <input 
            type="password" 
            name="password" 
            value={formData.password || ''} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={editingUser ? "Enter new password" : "Create a password"}
            autoComplete="new-password"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select 
            name="role" 
            value={formData.role} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Profile Information */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea 
            name="bio" 
            value={formData.bio} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tell us about yourself..."
            rows={2}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
          <input 
            type="text" 
            name="avatar" 
            value={formData.avatar} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="/user.svg or image URL"
          />
        </div>
      </div>

      {/* Status Messages */}
      {error && <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</div>}
      {success && <div className="text-green-600 text-sm bg-green-50 p-2 rounded">{success}</div>}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        {editingUser && onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? "Saving..." : (editingUser ? "Update User" : "Add User")}
        </Button>
      </div>
    </form>
  );
} 