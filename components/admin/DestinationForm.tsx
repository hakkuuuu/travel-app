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
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Basic Information */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Destination Name *</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter destination name"
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
          <input 
            type="text" 
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="City, Country"
            required 
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
            <input 
              type="text" 
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="$100/night"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <input 
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              max="5"
              step="0.1"
              placeholder="4.5"
            />
          </div>
        </div>
      </div>

      {/* Media & Description */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
          <input 
            type="text" 
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe the destination..."
            rows={3}
            required 
          />
        </div>
      </div>

      {/* Features */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
          <input 
            type="text" 
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="WiFi, Pool, Kitchen (comma separated)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
          <input 
            type="text" 
            name="features"
            value={formData.features}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Mountain View, Beach Access (comma separated)"
          />
        </div>
      </div>

      {/* Status Messages */}
      {error && <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</div>}
      {success && <div className="text-green-600 text-sm bg-green-50 p-2 rounded">{success}</div>}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        {initialData && onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? "Saving..." : (initialData ? "Update Destination" : "Add Destination")}
        </Button>
      </div>
    </form>
  );
} 