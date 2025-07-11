import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

interface DestinationFormData {
  name: string;
  location: string;
  price: string;
  image: string;
  description: string;
  amenities: string;
  features: string;
  rating: string; // keep as string for input, convert to number on submit
}

interface DestinationFormProps {
  onSubmit: (formData: any) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  success: string | null;
  initialData?: any;
  onCancel?: () => void;
}

const defaultForm = {
  name: "",
  location: "",
  price: "",
  image: "",
  description: "",
  amenities: "",
  features: "",
  rating: "4.5",
};

export default function DestinationForm({ onSubmit, isLoading, error, success, initialData, onCancel }: DestinationFormProps) {
  const [formData, setFormData] = useState<DestinationFormData>({ ...defaultForm });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        location: initialData.location || '',
        price: initialData.price || '',
        image: initialData.image || '',
        description: initialData.description || '',
        amenities: Array.isArray(initialData.amenities) ? initialData.amenities.join(', ') : (initialData.amenities || ''),
        features: Array.isArray(initialData.features) ? initialData.features.join(', ') : (initialData.features || ''),
        rating: initialData.rating ? String(initialData.rating) : '4.5',
      });
    } else {
      setFormData({ ...defaultForm });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      rating: parseFloat(formData.rating),
      reviews: [],
    });
    setFormData({ ...defaultForm });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        {initialData ? 'Edit Destination' : 'Add Destination'}
      </h2>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field w-full"
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input 
            type="text" 
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input-field w-full"
            required 
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input 
              type="text" 
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input-field w-full"
              required 
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <input 
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="input-field w-full"
              min="0"
              max="5"
              step="0.1"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input 
            type="text" 
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="input-field w-full"
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-field w-full"
            required 
            rows={2} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amenities (comma separated)</label>
          <input 
            type="text" 
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            className="input-field w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
          <input 
            type="text" 
            name="features"
            value={formData.features}
            onChange={handleChange}
            className="input-field w-full"
          />
        </div>
      </div>
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
      <div className="flex justify-end gap-2 pt-4">
        {initialData && onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? (initialData ? "Saving..." : "Saving...") : (initialData ? "Update" : "Add")}
        </Button>
      </div>
    </form>
  );
} 