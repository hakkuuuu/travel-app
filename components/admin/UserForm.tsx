import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { validateEmail, validateRequired } from '@/lib/utils';

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
  name?: string;
  username: string;
  email: string;
  role?: string;
  bio?: string;
  avatar?: string;
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
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name || '',
        username: editingUser.username,
        email: editingUser.email,
        password: '', // Don't prefill password
        role: editingUser.role || 'user',
        bio: editingUser.bio || '',
        avatar: editingUser.avatar || '/user.svg',
      });
    } else {
      setFormData({ ...defaultForm });
    }
    setValidationErrors({});
  }, [editingUser]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Required field validation
    if (!validateRequired(formData.name)) {
      errors.name = 'Full name is required';
    }

    if (!validateRequired(formData.username)) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters long';
    }

    if (!validateRequired(formData.email)) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation for new users
    if (!editingUser && !validateRequired(formData.password || '')) {
      errors.password = 'Password is required for new users';
    } else if (formData.password && formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    // URL validation for avatar
    if (formData.avatar && !formData.avatar.startsWith('/') && !formData.avatar.startsWith('http')) {
      errors.avatar = 'Please enter a valid URL or path starting with / or http://';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the validation errors before submitting');
      return;
    }

    try {
      const submitData = { ...formData };
      if (!submitData.password) delete submitData.password; // Don't send empty password
      await onSubmit(submitData);
      if (!editingUser) {
        setFormData({ ...defaultForm });
      }
      setValidationErrors({});
    } catch (error) {
      toast.error('Failed to save user. Please try again.');
    }
  };

  const getInputClassName = (fieldName: string) => {
    const baseClasses = "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-0 transition-all duration-200";
    const hasError = validationErrors[fieldName];
    
    return `${baseClasses} ${
      hasError 
        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
        : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
    }`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Basic Information */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className={getInputClassName('name')}
            placeholder="Enter full name"
            required 
          />
          {validationErrors.name && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            className={getInputClassName('username')}
            placeholder="Choose a username"
            required 
          />
          {validationErrors.username && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.username}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className={getInputClassName('email')}
            placeholder="user@example.com"
            required 
          />
          {validationErrors.email && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
          )}
        </div>
      </div>

      {/* Security & Role */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password {editingUser && <span className="text-xs text-gray-500">(leave blank to keep unchanged)</span>}
            {!editingUser && <span className="text-red-500">*</span>}
          </label>
          <input 
            type="password" 
            name="password" 
            value={formData.password || ''} 
            onChange={handleChange} 
            className={getInputClassName('password')}
            placeholder={editingUser ? "Enter new password" : "Create a password"}
            autoComplete="new-password"
          />
          {validationErrors.password && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
          )}
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
            className={getInputClassName('avatar')}
            placeholder="/user.svg or image URL"
          />
          {validationErrors.avatar && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.avatar}</p>
          )}
        </div>
      </div>

      {/* Status Messages */}
      {error && <div className="text-red-600 text-sm bg-red-50 p-2 rounded border border-red-200">{error}</div>}
      {success && <div className="text-green-600 text-sm bg-green-50 p-2 rounded border border-green-200">{success}</div>}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" loading={isLoading}>
          {editingUser ? "Update User" : "Add User"}
        </Button>
      </div>
    </form>
  );
} 