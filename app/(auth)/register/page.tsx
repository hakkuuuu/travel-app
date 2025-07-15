'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Icon from '@/components/ui/Icon';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerFormSchema } from '@/lib/validation';
import FormField from '@/components/ui/FormField';

interface RegisterFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  bio: string;
  avatar: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, isAuthenticated, isLoading: authLoading } = useAuth();
  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: yupResolver(registerFormSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      bio: '',
      avatar: '',
    },
  });

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  const onFormSubmit = async (data: RegisterFormData) => {
    try {
      const success = await registerUser(data.username, data.email, data.password, data.name);
      if (!success) {
        setError('username', { type: 'manual', message: 'Registration failed. Username or email might already exist.' });
      }
    } catch (err) {
      setError('username', { type: 'manual', message: 'An error occurred. Please try again.' });
      console.error('Registration error:', err);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="w-full max-w-md mt-16">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto w-20 h-20 flex items-center justify-center mb-6">
              <img
                src="/logo.png"
                alt="Travelis Logo"
                className="h-16 w-auto rounded-xl"
                style={{ maxHeight: 64 }}
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Travelis</h2>
            <p className="text-gray-600">Create your account and start exploring</p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-soft p-8 border border-gray-100 mt-8">
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                {errors.username && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4" role="alert">
                    <p className="text-red-600 text-sm">{errors.username.message}</p>
                  </div>
                )}
                <FormField label="Name" htmlFor="register-name" error={errors.name?.message} required>
                  <input
                    id="register-name"
                    {...register('name')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your full name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'register-name-error' : undefined}
                  />
                </FormField>
                <FormField label="Username" htmlFor="register-username" error={errors.username?.message} required>
                  <input
                    id="register-username"
                    {...register('username')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="Choose a username"
                    aria-invalid={!!errors.username}
                    aria-describedby={errors.username ? 'register-username-error' : undefined}
                  />
                </FormField>
                <FormField label="Email" htmlFor="register-email" error={errors.email?.message} required>
                  <input
                    id="register-email"
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'register-email-error' : undefined}
                  />
                </FormField>
                <FormField label="Password" htmlFor="register-password" error={errors.password?.message} required>
                  <input
                    id="register-password"
                    {...register('password')}
                    type="password"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="Create a password"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'register-password-error' : undefined}
                  />
                </FormField>
                <FormField label="Confirm Password" htmlFor="register-confirm-password" error={errors.confirmPassword?.message} required>
                  <input
                    id="register-confirm-password"
                    {...register('confirmPassword')}
                    type="password"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="Confirm your password"
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={errors.confirmPassword ? 'register-confirm-password-error' : undefined}
                  />
                </FormField>
                <FormField label="Bio (optional)" htmlFor="register-bio" error={errors.bio?.message}>
                  <input
                    id="register-bio"
                    {...register('bio')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="Tell us about yourself"
                    aria-invalid={!!errors.bio}
                    aria-describedby={errors.bio ? 'register-bio-error' : undefined}
                  />
                </FormField>
                <FormField label="Avatar URL (optional)" htmlFor="register-avatar" error={errors.avatar?.message}>
                  <input
                    id="register-avatar"
                    {...register('avatar')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="/user.svg or image URL"
                    aria-invalid={!!errors.avatar}
                    aria-describedby={errors.avatar ? 'register-avatar-error' : undefined}
                  />
                </FormField>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-blue-700 focus:ring-4 focus:ring-green-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-green-600 hover:text-green-700 font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
    </>
  );
} 