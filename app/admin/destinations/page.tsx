"use client";
import DestinationList from '@/components/admin/DestinationList';
import DestinationForm from '@/components/admin/DestinationForm';
import Modal from '@/components/ui/Modal';
import { useState, useEffect } from 'react';

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchDestinations = () => {
    setLoading(true);
    fetch('/api/destinations')
      .then(res => res.json())
      .then(data => setDestinations(data))
      .catch(() => setError('Failed to load destinations'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleAddDestination = async (formData: any) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch('/api/destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to add destination');
      setSuccess('Destination added!');
      setShowForm(false);
      fetchDestinations();
    } catch (e) {
      setError('Failed to add destination');
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 2500);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Destinations</h1>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
            onClick={() => setShowForm(true)}
          >
            + Add Destination
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
            onClick={fetchDestinations}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>
      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add Destination">
        <DestinationForm
          onSubmit={handleAddDestination}
          isLoading={loading}
          error={error}
          success={success}
        />
      </Modal>
      <DestinationList
        destinations={destinations}
        isLoading={loading}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </div>
  );
} 