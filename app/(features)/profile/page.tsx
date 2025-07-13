'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { UserProfile, UserStats, RecentActivity } from '@/constants';
import ProfileHeader from '@/components/features/profile/ProfileHeader';
import ProfileForm from '@/components/features/profile/ProfileForm';
import ProfileStats from '@/components/features/profile/ProfileStats';
import RecentActivityList from '@/components/features/profile/RecentActivityList';
import ProfileLoading from '@/components/features/profile/ProfileLoading';
import ProfileError from '@/components/features/profile/ProfileError';
import ConfirmationDialog from '@/components/ui/ConfirmationDialog';
import Button from '@/components/ui/Button';
import { validateEmail, validateRequired, hasProfileChanges, formatMemberSince } from '@/lib/utils';
import toast from 'react-hot-toast';
import { FaUser, FaMapMarkedAlt, FaStar, FaCalendarAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({});
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'stats' | 'activity'>('profile');
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (user?.username) {
      fetchProfileData();
    }
  }, [user]);

  useEffect(() => {
    // Check if there are unsaved changes
    if (profile && editForm) {
      const changes = hasProfileChanges(profile, editForm, ['name', 'email', 'bio']);
      setHasChanges(changes);
    }
  }, [editForm, profile]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/profile?username=${user?.username}`);
      const data = await response.json();
      
      if (data.success) {
        setProfile(data.profile);
        setStats(data.stats);
        setRecentActivity(data.recentActivity);
        setEditForm(data.profile);
      } else {
        setError(data.message || 'Failed to load profile');
      }
    } catch (err) {
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!validateRequired(editForm.name || '')) {
      toast.error('Name is required');
      return false;
    }
    
    if (!validateRequired(editForm.email || '')) {
      toast.error('Email is required');
      return false;
    }
    
    if (!validateEmail(editForm.email || '')) {
      toast.error('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSaveClick = () => {
    if (!validateForm()) return;
    
    if (hasChanges) {
      setShowSaveConfirmation(true);
    } else {
      toast('No changes to save');
    }
  };

  const handleSaveConfirm = async () => {
    setShowSaveConfirmation(false);
    
    try {
      setSaving(true);
      setError(null);
      
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user?.username, ...editForm })
      });
      
      const data = await response.json();
      if (data.success) {
        setProfile(data.profile);
        setIsEditing(false);
        setHasChanges(false);
        toast.success('Profile updated successfully! 🎉');
      } else {
        setError(data.message || 'Failed to update profile');
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (err) {
      const errorMessage = 'Failed to update profile. Please check your connection and try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelClick = () => {
    if (hasChanges) {
      setShowCancelConfirmation(true);
    } else {
      handleCancelConfirm();
    }
  };

  const handleCancelConfirm = () => {
    setShowCancelConfirmation(false);
    setEditForm(profile || {});
    setIsEditing(false);
    setError(null);
    setHasChanges(false);
    toast('Changes discarded');
  };

  const handleFormChange = (field: keyof UserProfile, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return <ProfileLoading />;
  }

  if (error) {
    return <ProfileError error={error} onRetry={fetchProfileData} />;
  }

  // Show admin-specific message for booking-related content
  if (user?.role === 'admin' && (activeTab === 'stats' || activeTab === 'activity')) {
    let adminMessage: string = '';
    if (activeTab === 'stats') {
      adminMessage = 'Booking statistics are not available for admin accounts. Admins manage the platform rather than make bookings.';
    } else if (activeTab === 'activity') {
      adminMessage = 'Booking activity is not available for admin accounts. Admins manage the platform rather than make bookings.';
    }
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <FaUser className="w-12 h-12" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">{profile?.name || user?.username}</h1>
                <p className="text-blue-100 text-lg">Administrator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-sm mb-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'profile'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FaUser className="inline mr-2" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'stats'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FaStar className="inline mr-2" />
              Statistics
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'activity'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FaCalendarAlt className="inline mr-2" />
              Activity
            </button>
          </div>

          {/* Admin Restriction Message */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
            <div className="text-6xl mb-4">🚫</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Admin Access Restricted</h2>
            <p className="text-gray-600 text-lg mb-6">{adminMessage}</p>
            <p className="text-sm text-gray-500">
              Use the Profile tab to manage your admin account settings.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <FaUser className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{profile?.name || user?.username}</h1>
              <p className="text-blue-100 text-lg">Travel enthusiast & adventure seeker</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="flex items-center space-x-1">
                  <FaCalendarAlt className="w-4 h-4" />
                  <span>Member since {formatMemberSince(profile?.memberSince || '')}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <FaMapMarkedAlt className="w-4 h-4" />
                  <span>{stats?.totalDestinationsVisited || 0} destinations</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-sm mb-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'profile'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <FaUser className="inline mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'stats'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <FaStar className="inline mr-2" />
            Statistics
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'activity'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <FaCalendarAlt className="inline mr-2" />
            Activity
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Profile Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-green-50 px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                    <div className="flex space-x-2">
                      {isEditing ? (
                        <>
                          <Button
                            onClick={handleSaveClick}
                            loading={saving}
                            variant="success"
                            icon={<FaSave className="w-4 h-4" />}
                            disabled={!hasChanges}
                          >
                            Save Changes
                          </Button>
                          <Button
                            onClick={handleCancelClick}
                            variant="outline"
                            icon={<FaTimes className="w-4 h-4" />}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => setIsEditing(true)}
                          variant="primary"
                          icon={<FaEdit className="w-4 h-4" />}
                        >
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <ProfileForm
                    profile={profile}
                    isEditing={isEditing}
                    editForm={editForm}
                    onFormChange={handleFormChange}
                  />
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <ProfileStats stats={stats} />
              <RecentActivityList recentActivity={recentActivity} />
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Travel Journey</h2>
            <ProfileStats stats={stats} />
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Recent Adventures</h2>
            <RecentActivityList recentActivity={recentActivity} />
          </div>
        )}
      </div>

      {/* Confirmation Dialogs */}
      <ConfirmationDialog
        isOpen={showSaveConfirmation}
        onClose={() => setShowSaveConfirmation(false)}
        onConfirm={handleSaveConfirm}
        title="Save Changes"
        message="Are you sure you want to save your profile changes? This will update your information across the platform."
        confirmText="Save Changes"
        cancelText="Review"
        type="success"
        loading={saving}
      />

      <ConfirmationDialog
        isOpen={showCancelConfirmation}
        onClose={() => setShowCancelConfirmation(false)}
        onConfirm={handleCancelConfirm}
        title="Discard Changes"
        message="You have unsaved changes. Are you sure you want to discard them? This action cannot be undone."
        confirmText="Discard Changes"
        cancelText="Keep Editing"
        type="warning"
      />
    </div>
  );
} 