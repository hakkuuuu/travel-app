'use client';
import { useState } from 'react';
import useSWR from 'swr';
import UserTable from '@/components/admin/UserTable';
import UserForm from '@/components/admin/UserForm';
import Modal from '@/components/ui/Modal';
import type { User } from '@/components/admin/UserTable';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function AdminUsersPage() {
  const { data: users = [], error, isLoading, mutate } = useSWR<User[]>('/api/users', fetcher);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formError, setFormError] = useState<string|null>(null);
  const [formSuccess, setFormSuccess] = useState<string|null>(null);

  const handleAdd = () => {
    setEditingUser(null);
    setShowForm(true);
    setFormError(null);
    setFormSuccess(null);
  };
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
    setFormError(null);
    setFormSuccess(null);
  };
  const handleDelete = async (user: User) => {
    if (!window.confirm(`Delete user ${user.username}?`)) return;
    try {
      const res = await fetch(`/api/users?id=${user.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete user');
      setFormSuccess('User deleted');
      mutate();
    } catch (e) {
      setFormError('Failed to delete user');
    }
  };
  const handleFormSubmit = async (formData: any) => {
    try {
      const res = await fetch('/api/users' + (editingUser ? `?id=${editingUser.id}` : ''), {
        method: editingUser ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to save user');
      setFormSuccess(editingUser ? 'User updated' : 'User added');
      setShowForm(false);
      mutate();
    } catch (e) {
      setFormError('Failed to save user');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold" onClick={handleAdd}>+ Add User</button>
      </div>
      <Modal isOpen={showForm} onClose={()=>setShowForm(false)} title={editingUser ? 'Edit User' : 'Add User'}>
        <UserForm
          onSubmit={handleFormSubmit}
          isLoading={false}
          error={formError}
          success={formSuccess}
          editingUser={editingUser}
          onCancel={()=>setShowForm(false)}
        />
      </Modal>
      <div className="overflow-x-auto relative">
        {isLoading && <div>Loading...</div>}
        {error && <div className="text-red-500">Failed to load users</div>}
        <UserTable
          users={users}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
} 