'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { FaCog, FaBell, FaShieldAlt, FaPalette, FaTrash, FaSave, FaEye, FaEyeSlash, FaLock, FaUnlock } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');
  const [profileVisibility, setProfileVisibility] = useState<'public' | 'private' | 'friends'>('public');
  const [showEmail, setShowEmail] = useState(true);
  const [showActivity, setShowActivity] = useState(true);
  const [saving, setSaving] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [activeTab, setActiveTab] = useState<'account' | 'notifications' | 'privacy' | 'security' | 'danger'>('account');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save settings logic here
      const settings = {
        emailNotifications,
        pushNotifications,
        smsNotifications,
        theme,
        profileVisibility,
        showEmail,
        showActivity
      };
      
      console.log('Saving settings:', settings);
      toast.success('Settings saved successfully! 🎉');
    } catch (error) {
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword) {
      toast.error('Please enter your current password');
      return;
    }
    
    if (password.length < 8) {
      toast.error('New password must be at least 8 characters long');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    try {
      setSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Password change logic here
      console.log('Changing password...');
      toast.success('Password updated successfully! 🔐');
      
      // Reset form
      setCurrentPassword('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error('Failed to update password. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }
    
    try {
      setSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Delete account logic here
      console.log('Deleting account...');
      toast.success('Account deleted successfully. Goodbye! 👋');
      
      // Redirect to home page or logout
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      toast.error('Failed to delete account. Please try again.');
      setShowDeleteConfirm(false);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: FaCog },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'privacy', label: 'Privacy', icon: FaShieldAlt },
    { id: 'security', label: 'Security', icon: FaLock },
    { id: 'danger', label: 'Danger Zone', icon: FaTrash }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value="traveler123"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value="user@example.com"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <FaBell className="w-5 h-5 mr-2 text-blue-600" />
                Notification Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900">Email Notifications</span>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                  <button
                    type="button"
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    onClick={() => setEmailNotifications(!emailNotifications)}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                        emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900">Push Notifications</span>
                    <p className="text-sm text-gray-600">Get instant alerts on your device</p>
                  </div>
                  <button
                    type="button"
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      pushNotifications ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    onClick={() => setPushNotifications(!pushNotifications)}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                        pushNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900">SMS Notifications</span>
                    <p className="text-sm text-gray-600">Receive text message alerts</p>
                  </div>
                  <button
                    type="button"
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      smsNotifications ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    onClick={() => setSmsNotifications(!smsNotifications)}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                        smsNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <FaShieldAlt className="w-5 h-5 mr-2 text-green-600" />
                Privacy Settings
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                  <select
                    value={profileVisibility}
                    onChange={(e) => setProfileVisibility(e.target.value as any)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="public">Public - Anyone can see your profile</option>
                    <option value="friends">Friends - Only friends can see your profile</option>
                    <option value="private">Private - Only you can see your profile</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900">Show Email Address</span>
                    <p className="text-sm text-gray-600">Display your email on your profile</p>
                  </div>
                  <button
                    type="button"
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                      showEmail ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                    onClick={() => setShowEmail(!showEmail)}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                        showEmail ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900">Show Activity</span>
                    <p className="text-sm text-gray-600">Display your recent activity</p>
                  </div>
                  <button
                    type="button"
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                      showActivity ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                    onClick={() => setShowActivity(!showActivity)}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                        showActivity ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <FaLock className="w-5 h-5 mr-2 text-red-600" />
                Security Settings
              </h3>
                             <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPasswords ? 'text' : 'password'}
                      className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPasswords(!showPasswords)}
                    >
                      {showPasswords ? <FaEyeSlash className="w-4 h-4 text-gray-400" /> : <FaEye className="w-4 h-4 text-gray-400" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" variant="primary" disabled={saving} className="w-full">
                  {saving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    <>
                      <FaLock className="w-4 h-4 mr-2" />
                      Update Password
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        );

             case 'danger':
         return (
           <div className="space-y-6">
             <div className="bg-red-50 border border-red-200 rounded-xl p-6">
               <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                 <FaTrash className="w-5 h-5 mr-2" />
                 Danger Zone
               </h3>
               <p className="text-red-700 mb-4">
                 Permanently delete your account and all associated data. This action cannot be undone.
               </p>
               {showDeleteConfirm && (
                 <div className="mb-4 p-4 bg-red-100 border border-red-300 rounded-lg">
                   <p className="text-red-800 font-medium mb-2">⚠️ Final Confirmation</p>
                   <p className="text-red-700 text-sm">
                     Are you absolutely sure? This will permanently delete your account, all your data, 
                     bookings, and reviews. This action cannot be undone.
                   </p>
                 </div>
               )}
               <Button 
                 variant="secondary" 
                 className="w-full text-red-600 border-red-200 hover:bg-red-50"
                 onClick={handleDeleteAccount}
                 disabled={saving}
               >
                 {saving ? (
                   <>
                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     <span>Deleting Account...</span>
                   </>
                 ) : (
                   <>
                     <FaTrash className="w-4 h-4 mr-2" />
                     <span>{showDeleteConfirm ? 'Yes, Delete My Account' : 'Delete Account'}</span>
                   </>
                 )}
               </Button>
               {showDeleteConfirm && (
                 <Button 
                   variant="secondary" 
                   className="w-full mt-2 text-gray-600 border-gray-300 hover:bg-gray-50"
                   onClick={() => setShowDeleteConfirm(false)}
                 >
                   Cancel
                 </Button>
               )}
             </div>
           </div>
         );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <FaCog className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Settings</h1>
              <p className="text-blue-100 text-lg">Manage your account preferences and security</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-sm mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h2>
              {activeTab !== 'danger' && (
                <Button
                  variant="primary"
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center space-x-2"
                >
                  <FaSave className="w-4 h-4" />
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </Button>
              )}
            </div>
          </div>
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
} 