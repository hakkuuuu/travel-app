import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { validateEmail, validateRequired } from '@/lib/utils';

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
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

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
    setValidationErrors({});
  }, [initialData]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Required field validation
    if (!validateRequired(formData.name)) {
      errors.name = 'Destination name is required';
    }

    if (!validateRequired(formData.location)) {
      errors.location = 'Location is required';
    }

    if (!validateRequired(formData.price)) {
      errors.price = 'Price is required';
    }

    if (!validateRequired(formData.image)) {
      errors.image = 'Image URL is required';
    }

    if (!validateRequired(formData.description)) {
      errors.description = 'Description is required';
    }

    // URL validation for image
    if (formData.image && !formData.image.startsWith('http')) {
      errors.image = 'Please enter a valid URL starting with http:// or https://';
    }

    // Rating validation
    const rating = parseFloat(formData.rating);
    if (isNaN(rating) || rating < 0 || rating > 5) {
      errors.rating = 'Rating must be between 0 and 5';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the validation errors before submitting');
      return;
    }

    try {
      await onSubmit({
        ...formData,
        rating: parseFloat(formData.rating),
        reviews: [],
      });
      setFormData({ ...defaultForm });
      setValidationErrors({});
    } catch (error) {
      toast.error('Failed to save destination. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const getInputClassName = (fieldName: string) => {
    const baseClasses = "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-0 transition-all duration-200";
    const hasError = validationErrors[fieldName];
    
    return `${baseClasses} ${
      hasError 
        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
        : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
    }`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Basic Information */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Destination Name <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={getInputClassName('name')}
            placeholder="Enter destination name"
            required 
          />
          {validationErrors.name && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={getInputClassName('location')}
            placeholder="City, Country"
            required 
          />
          {validationErrors.location && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.location}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={getInputClassName('price')}
              placeholder="$100/night"
              required 
            />
            {validationErrors.price && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.price}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <input 
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className={getInputClassName('rating')}
              min="0"
              max="5"
              step="0.1"
              placeholder="4.5"
            />
            {validationErrors.rating && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.rating}</p>
            )}
          </div>
        </div>
      </div>

      {/* Media & Description */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={getInputClassName('image')}
            placeholder="https://example.com/image.jpg"
            required 
          />
          {validationErrors.image && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.image}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={getInputClassName('description')}
            placeholder="Describe the destination..."
            rows={3}
            required 
          />
          {validationErrors.description && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>
          )}
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
      {error && <div className="text-red-600 text-sm bg-red-50 p-2 rounded border border-red-200">{error}</div>}
      {success && <div className="text-green-600 text-sm bg-green-50 p-2 rounded border border-green-200">{success}</div>}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" loading={isLoading}>
          {initialData ? "Update Destination" : "Add Destination"}
        </Button>
      </div>
    </form>
  );
} 