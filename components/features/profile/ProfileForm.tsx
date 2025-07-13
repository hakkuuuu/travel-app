import Card from '@/components/ui/Card';
import { UserProfile } from '@/constants';
import { formatMemberSince } from '@/lib/utils';
import { FaUser, FaEdit } from 'react-icons/fa';

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

  const formFields = [
    {
      label: 'Full Name',
      field: 'name' as keyof UserProfile,
      type: 'text',
      placeholder: 'Enter your full name',
      value: editForm.name || profile.name || '',
      description: 'Your display name for the community',
      required: true
    },
    {
      label: 'Email Address',
      field: 'email' as keyof UserProfile,
      type: 'email',
      placeholder: 'Enter your email address',
      value: editForm.email || profile.email || '',
      description: 'We\'ll use this for important updates',
      required: true
    }
  ];

  const validateField = (field: typeof formFields[0]) => {
    if (!field.required) return null;
    const value = field.value.trim();
    if (!value) return 'This field is required';
    if (field.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'Please enter a valid email address';
    }
    return null;
  };

  const renderField = (field: typeof formFields[0]) => {
    const error = validateField(field);
    const hasError = error !== null;
    const hasValue = field.value.trim().length > 0;
    return (
      <div key={field.field} className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {isEditing ? (
          <div className="space-y-1">
            <input
              type={field.type}
              value={field.value}
              onChange={(e) => onFormChange(field.field, e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-offset-0 transition-all duration-200 hover:border-gray-300 ${
                hasError 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                  : hasValue 
                  ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                  : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder={field.placeholder}
            />
            {hasError ? (
              <p className="text-xs text-red-500">{error}</p>
            ) : (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
          </div>
        ) : (
          <div className={`flex items-center p-3 rounded-lg border ${
            hasValue 
              ? 'bg-green-50 border-green-200' 
              : 'bg-gray-50 border-gray-200'
          }`}>
            <span className={`font-medium ${
              hasValue ? 'text-gray-900' : 'text-gray-500'
            }`}>
              {field.value || 'Not provided'}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 space-y-10">
      {/* Personal Information */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <FaUser className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          {isEditing && (
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Editing</span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formFields.map(renderField)}
        </div>
      </section>

      <hr />

      {/* Bio Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <FaEdit className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">About You</h3>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Bio</label>
          {isEditing ? (
            <div className="space-y-1">
              <textarea
                value={editForm.bio || profile.bio || ''}
                onChange={(e) => onFormChange('bio', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 resize-none"
                placeholder="Tell us about yourself, your travel interests, and what adventures you're looking for..."
              />
              <p className="text-xs text-gray-500">Share your story with the travel community</p>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-900 leading-relaxed">
                {profile.bio || 'No bio provided yet. Click edit to share your story!'}
              </p>
            </div>
          )}
        </div>
      </section>

      <hr />

      {/* Member Info */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <FaUser className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Member Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm font-medium text-gray-600">Username</span>
            <p className="text-gray-900 font-semibold">{profile.username}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600">Member Since</span>
            <p className="text-gray-900 font-semibold">{formatMemberSince(profile.memberSince)}</p>
          </div>
        </div>
      </section>
    </div>
  );
} 