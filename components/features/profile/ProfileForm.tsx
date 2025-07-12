import Card from '@/components/ui/Card';
import { UserProfile } from '@/constants';
import { formatMemberSince } from '@/lib/utils';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaEye, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

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
      icon: FaUser,
      label: 'Full Name',
      field: 'name' as keyof UserProfile,
      type: 'text',
      placeholder: 'Enter your full name',
      value: editForm.name || profile.name || '',
      description: 'Your display name for the community',
      required: true
    },
    {
      icon: FaEnvelope,
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
        <label className="flex items-center text-sm font-medium text-gray-700">
          <field.icon className="w-4 h-4 mr-2 text-blue-600" />
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {isEditing ? (
          <div className="space-y-1">
            <div className="relative">
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
              {hasValue && !hasError && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <FaCheck className="w-4 h-4 text-green-500" />
                </div>
              )}
              {hasError && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <FaExclamationTriangle className="w-4 h-4 text-red-500" />
                </div>
              )}
            </div>
            {hasError ? (
              <p className="text-xs text-red-500 flex items-center">
                <FaExclamationTriangle className="w-3 h-3 mr-1" />
                {error}
              </p>
            ) : (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
          </div>
        ) : (
          <div className="group">
            <div className={`flex items-center justify-between p-3 rounded-lg border transition-colors duration-200 ${
              hasValue 
                ? 'bg-green-50 border-green-200 group-hover:border-green-300' 
                : 'bg-gray-50 border-gray-200 group-hover:border-gray-300'
            }`}>
              <span className={`font-medium ${
                hasValue ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {field.value || 'Not provided'}
              </span>
              <FaEye className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
            </div>
            <p className="text-xs text-gray-500 mt-1">{field.description}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <FaUser className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          {isEditing && (
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
              Editing
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formFields.map(renderField)}
        </div>
      </div>

      {/* Bio Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <FaEdit className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">About You</h3>
        </div>
        
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <FaEdit className="w-4 h-4 mr-2 text-green-600" />
            Bio
          </label>
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
            <div className="group">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 group-hover:border-gray-300 transition-colors duration-200">
                <p className="text-gray-900 leading-relaxed">
                  {profile.bio || 'No bio provided yet. Click edit to share your story!'}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-1">Share your story with the travel community</p>
            </div>
          )}
        </div>
      </div>

      {/* Member Info */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center space-x-2 mb-3">
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
      </div>
    </div>
  );
} 