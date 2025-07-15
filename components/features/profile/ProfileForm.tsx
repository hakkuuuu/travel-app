import { UserProfile } from '@/constants';
import { formatMemberSince } from '@/lib/utils';
import { FaUser, FaEdit, FaEnvelope, FaIdCard, FaCalendarAlt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileFormSchema as _profileFormSchema } from '@/lib/validation';
import React from 'react';
import FormField from '@/components/ui/FormField';
import * as yup from 'yup';

const profileFormSchema = _profileFormSchema as yup.ObjectSchema<{ name: string; email: string; bio: string }>;

interface ProfileFormProps {
  profile: UserProfile | null;
  isEditing: boolean;
  editForm: Partial<UserProfile>;
  onFormChange: (field: keyof UserProfile, value: string) => void;
}

export default function ProfileForm({
  profile,
  isEditing,
  editForm,
  onFormChange
}: ProfileFormProps) {
  if (!profile) return null;

  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FaUser className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          {isEditing && (
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Editing</span>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Full Name" htmlFor="profile-name" required>
            {isEditing ? (
              <input
                id="profile-name"
                type="text"
                value={editForm.name || ''}
                onChange={(e) => onFormChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
              />
            ) : (
              <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-900 font-medium">{profile.name || 'Not provided'}</p>
              </div>
            )}
          </FormField>
          
          <FormField label="Email Address" htmlFor="profile-email" required>
            {isEditing ? (
              <input
                id="profile-email"
                type="email"
                value={editForm.email || ''}
                onChange={(e) => onFormChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email address"
              />
            ) : (
              <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-900 font-medium">{profile.email || 'Not provided'}</p>
              </div>
            )}
          </FormField>
        </div>
      </div>

      {/* About You */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FaEdit className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">About You</h3>
        </div>
        
        <FormField label="Bio" htmlFor="profile-bio">
          {isEditing ? (
            <textarea
              id="profile-bio"
              value={editForm.bio || ''}
              onChange={(e) => onFormChange('bio', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Tell us about yourself, your travel interests, and what adventures you're looking for..."
            />
          ) : (
            <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-900 leading-relaxed">
                {profile.bio || 'No bio provided yet. Click edit to share your story!'}
              </p>
            </div>
          )}
        </FormField>
      </div>

      {/* Account Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FaIdCard className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-900 font-medium">{profile.username}</p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
            <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-900 font-medium">{formatMemberSince(profile.memberSince)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 