"use client";
import DestinationList from '@/components/admin/DestinationList';
import DestinationForm from '@/components/admin/DestinationForm';
import { useState, useEffect } from 'react';

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/destinations')
      .then(res => res.json())
      .then(data => setDestinations(data))
      .catch(() => setError('Failed to load destinations'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Destinations</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
          onClick={() => {
            setLoading(true);
            fetch('/api/destinations')
              .then(res => res.json())
              .then(data => setDestinations(data))
              .catch(() => setError('Failed to load destinations'))
              .finally(() => setLoading(false));
          }}
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      <DestinationForm
        onSubmit={async () => {}}
        isLoading={false}
        error={error}
        success={success}
      />
      <DestinationList
        destinations={destinations}
        isLoading={loading}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </div>
  );
} 