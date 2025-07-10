'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [saving, setSaving] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000); // Simulate save
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="section-title">Settings</h1>
          <p className="section-subtitle mb-0">Manage your account settings and preferences</p>
        </div>
        <Button
          variant="primary"
          className="mt-4 sm:mt-0"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card padding="lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  className="input-field"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  className="input-field"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" variant="primary" disabled={saving}>
                {saving ? 'Saving...' : 'Update Password'}
              </Button>
            </form>
          </Card>

          <Card padding="lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Notification Preferences</h2>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Email Notifications</span>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${emailNotifications ? 'bg-green-500' : 'bg-gray-300'}`}
                onClick={() => setEmailNotifications(v => !v)}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${emailNotifications ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </button>
            </div>
          </Card>
        </div>

        {/* Danger Zone */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h2>
            <p className="text-gray-600 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
            <Button variant="secondary" className="w-full text-red-600 border-red-200 hover:bg-red-50">Delete Account</Button>
          </Card>
        </div>
      </div>
    </>
  );
} 