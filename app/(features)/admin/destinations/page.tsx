"use client";
import { useEffect, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import ProtectedRoute from '@/components/auth/ProtectedRoute';

interface Destination {
  id: number;
  name: string;
  location: string;
  price: string;
  image: string;
  description: string;
  amenities: string[];
  features: string[];
}

const defaultForm = {
  name: "",
  location: "",
  price: "",
  image: "",
  description: "",
  amenities: "",
  features: "",
};

function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
  return (
    <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition-all animate-fade-in ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>{message}</div>
  );
}

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [form, setForm] = useState({ ...defaultForm });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Fetch all destinations
  useEffect(() => {
    fetchDestinations();
  }, []);

  async function fetchDestinations() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/destinations");
      const data = await res.json();
      setDestinations(data);
    } catch (e) {
      setError("Failed to fetch destinations");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/destinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amenities: form.amenities.split(",").map((a) => a.trim()).filter(Boolean),
          features: form.features.split(",").map((f) => f.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error("Failed to add destination");
      setForm({ ...defaultForm });
      setSuccess("Destination added!");
      setShowToast({ message: "Destination added!", type: "success" });
      fetchDestinations();
    } catch (e) {
      setError("Failed to add destination");
      setShowToast({ message: "Failed to add destination", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setShowToast(null), 2500);
    }
  }

  return (
    <ProtectedRoute adminOnly>
      <div className="py-16 min-h-screen bg-white">
        {showToast && <Toast message={showToast.message} type={showToast.type} />}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <PageHeader title="Admin: Destinations" subtitle="Add and manage destinations." />
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-300 shadow-sm ml-2">ADMIN</span>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 mb-12 space-y-6 border border-green-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
              Add New Destination
              <span className="inline-block px-2 py-0.5 rounded bg-green-500 text-white text-xs font-semibold ml-2">Admin Only</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input type="text" className="input-field" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input type="text" className="input-field" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (e.g. $100/night)</label>
                <input type="text" className="input-field" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input type="text" className="input-field" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea className="input-field" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amenities (comma separated)</label>
                <input type="text" className="input-field" value={form.amenities} onChange={e => setForm(f => ({ ...f, amenities: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Features (comma separated)</label>
                <input type="text" className="input-field" value={form.features} onChange={e => setForm(f => ({ ...f, features: e.target.value }))} />
              </div>
            </div>
            {error && <div className="text-red-600 font-medium">{error}</div>}
            {success && <div className="text-green-600 font-medium">{success}</div>}
            <Button type="submit" variant="primary" disabled={loading}>{loading ? "Saving..." : "Add Destination"}</Button>
          </form>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">All Destinations</h2>
          {loading && <div>Loading...</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destinations.map(dest => (
              <div key={dest.id} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-green-100">
                <div className="font-bold text-lg">{dest.name}</div>
                <div className="text-gray-600">{dest.location}</div>
                <div className="text-gray-500 text-sm">{dest.price}</div>
                <div className="text-xs text-gray-400 truncate">{dest.image}</div>
                <div className="text-gray-700 text-sm line-clamp-2">{dest.description}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {dest.amenities.map((a, i) => <span key={i} className="bg-green-100 text-green-800 text-xs rounded-full px-2 py-1">{a}</span>)}
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {dest.features.map((f, i) => <span key={i} className="bg-blue-100 text-blue-800 text-xs rounded-full px-2 py-1">{f}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 