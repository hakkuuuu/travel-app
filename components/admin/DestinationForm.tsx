import { useState } from 'react';
import Button from '@/components/ui/Button';

interface DestinationFormData {
  name: string;
  location: string;
  price: string;
  image: string;
  description: string;
  amenities: string;
  features: string;
}

interface DestinationFormProps {
  onSubmit: (formData: DestinationFormData) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  success: string | null;
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

export default function DestinationForm({ onSubmit, isLoading, error, success }: DestinationFormProps) {
  const [formData, setFormData] = useState<DestinationFormData>({ ...defaultForm });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({ ...defaultForm });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 space-y-6 border border-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
        Add New Destination
        <span className="inline-block px-2 py-0.5 rounded bg-green-500 text-white text-xs font-semibold ml-2">Admin Only</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input 
            type="text" 
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input-field" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price (e.g. $100/night)</label>
          <input 
            type="text" 
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="input-field" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
          <input 
            type="text" 
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="input-field" 
            required 
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-field" 
            required 
            rows={3} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amenities (comma separated)</label>
          <input 
            type="text" 
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            className="input-field" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Features (comma separated)</label>
          <input 
            type="text" 
            name="features"
            value={formData.features}
            onChange={handleChange}
            className="input-field" 
          />
        </div>
      </div>
      {error && <div className="text-red-600 font-medium">{error}</div>}
      {success && <div className="text-green-600 font-medium">{success}</div>}
      <Button type="submit" variant="primary" disabled={isLoading}>
        {isLoading ? "Saving..." : "Add Destination"}
      </Button>
    </form>
  );
} 