import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import FormField from '@/components/ui/FormField';
import { userFormSchema } from '@/lib/validation';
import * as yup from 'yup';

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
  const schema = userFormSchema(!!editingUser) as yup.ObjectSchema<UserFormData>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(schema),
    defaultValues: defaultForm,
  });

  useEffect(() => {
    if (editingUser) {
      reset({
        name: editingUser.name || '',
        username: editingUser.username,
        email: editingUser.email,
        password: '', // Don't prefill password
        role: editingUser.role || 'user',
        bio: editingUser.bio || '',
        avatar: editingUser.avatar || '/user.svg',
      });
    } else {
      reset(defaultForm);
    }
  }, [editingUser, reset]);

  const onFormSubmit = async (data: UserFormData) => {
    try {
      const submitData = { ...data };
      if (submitData.password === '') delete submitData.password;
      await onSubmit(submitData);
      if (!editingUser) {
        reset(defaultForm);
      }
    } catch (error) {
      toast.error('Failed to save user. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {/* Basic Information */}
      <div className="space-y-3">
        <FormField label="Full Name" htmlFor="user-name" error={errors.name?.message} required>
          <input
            id="user-name"
            type="text"
            {...register('name')}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-0 transition-all duration-200"
            placeholder="Enter full name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'user-name-error' : undefined}
          />
        </FormField>
        <FormField label="Username" htmlFor="user-username" error={errors.username?.message} required>
          <input
            id="user-username"
            type="text"
            {...register('username')}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-0 transition-all duration-200"
            placeholder="Choose a username"
            aria-invalid={!!errors.username}
            aria-describedby={errors.username ? 'user-username-error' : undefined}
          />
        </FormField>
        <FormField label="Email" htmlFor="user-email" error={errors.email?.message} required>
          <input
            id="user-email"
            type="email"
            {...register('email')}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-0 transition-all duration-200"
            placeholder="user@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'user-email-error' : undefined}
          />
        </FormField>
      </div>

      {/* Security & Role */}
      <div className="space-y-3">
        <FormField label="Password" htmlFor="user-password" error={errors.password?.message} required={!editingUser}>
          <input
            id="user-password"
            type="password"
            {...register('password')}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-0 transition-all duration-200"
            placeholder={editingUser ? "Enter new password" : "Create a password"}
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'user-password-error' : undefined}
          />
        </FormField>
        <FormField label="Role" htmlFor="user-role">
          <select
            id="user-role"
            {...register('role')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </FormField>
      </div>

      {/* Profile Information */}
      <div className="space-y-3">
        <FormField label="Bio" htmlFor="user-bio">
          <textarea
            id="user-bio"
            {...register('bio')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tell us about yourself..."
            rows={2}
          />
        </FormField>
        <FormField label="Avatar URL" htmlFor="user-avatar" error={errors.avatar?.message}>
          <input
            id="user-avatar"
            type="text"
            {...register('avatar')}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-0 transition-all duration-200"
            placeholder="/user.svg or image URL"
            aria-invalid={!!errors.avatar}
            aria-describedby={errors.avatar ? 'user-avatar-error' : undefined}
          />
        </FormField>
      </div>

      {/* Status Messages */}
      {error && <div className="text-red-600 text-sm bg-red-50 p-2 rounded border border-red-200" role="alert">{error}</div>}

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