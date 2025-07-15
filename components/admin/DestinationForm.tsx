import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import FormField from '@/components/ui/FormField';

interface DestinationFormData {
  name: string;
  location: string;
  price: string;
  image: string;
  description: string;
  amenities: string;
  features: string;
  rating: number;
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
  rating: 4.5,
};

const schema = yup.object().shape({
  name: yup.string().required('Destination name is required'),
  location: yup.string().required('Location is required'),
  price: yup.string().required('Price is required'),
  image: yup.string().url('Please enter a valid URL starting with http:// or https://').required('Image URL is required'),
  description: yup.string().required('Description is required'),
  amenities: yup.string().required(),
  features: yup.string().required(),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be between 0 and 5')
    .max(5, 'Rating must be between 0 and 5')
    .required('Rating is required')
    .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
});

export default function DestinationForm({ onSubmit, isLoading, error, success, initialData, onCancel }: DestinationFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DestinationFormData>({
    resolver: yupResolver(schema),
    defaultValues: defaultForm,
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || '',
        location: initialData.location || '',
        price: initialData.price || '',
        image: initialData.image || '',
        description: initialData.description || '',
        amenities: Array.isArray(initialData.amenities) ? initialData.amenities.join(', ') : (initialData.amenities ?? ''),
        features: Array.isArray(initialData.features) ? initialData.features.join(', ') : (initialData.features ?? ''),
        rating: initialData.rating ? Number(initialData.rating) : 4.5,
      });
    } else {
      reset(defaultForm);
    }
  }, [initialData, reset]);

  const onFormSubmit = async (data: DestinationFormData) => {
    try {
      await onSubmit({
        ...data,
        rating: data.rating,
        reviews: [],
      });
      reset(defaultForm);
    } catch (error) {
      toast.error('Failed to save destination. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {/* Basic Information */}
      <div className="space-y-3">
        <FormField label="Destination Name" htmlFor="name" error={errors.name?.message} required>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-0 transition-all duration-200"
            placeholder="Enter destination name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
        </FormField>
        <FormField label="Location" htmlFor="location" error={errors.location?.message} required>
          <input
            id="location"
            type="text"
            {...register('location')}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-0 transition-all duration-200"
            placeholder="City, Country"
            aria-invalid={!!errors.location}
            aria-describedby={errors.location ? 'location-error' : undefined}
          />
        </FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Price" htmlFor="price" error={errors.price?.message} required>
            <input
              id="price"
              type="text"
              {...register('price')}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-0 transition-all duration-200"
              placeholder="$100/night"
              aria-invalid={!!errors.price}
              aria-describedby={errors.price ? 'price-error' : undefined}
            />
          </FormField>
          <FormField label="Rating" htmlFor="rating" error={errors.rating?.message}>
            <input
              id="rating"
              type="number"
              {...register('rating', { valueAsNumber: true })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-0 transition-all duration-200"
              min="0"
              max="5"
              step="0.1"
              placeholder="4.5"
              aria-invalid={!!errors.rating}
              aria-describedby={errors.rating ? 'rating-error' : undefined}
            />
          </FormField>
        </div>
      </div>

      {/* Media & Description */}
      <div className="space-y-3">
        <FormField label="Image URL" htmlFor="image" error={errors.image?.message} required>
          <input
            id="image"
            type="text"
            {...register('image')}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-0 transition-all duration-200"
            placeholder="https://example.com/image.jpg"
            aria-invalid={!!errors.image}
            aria-describedby={errors.image ? 'image-error' : undefined}
          />
        </FormField>
        <FormField label="Description" htmlFor="description" error={errors.description?.message} required>
          <textarea
            id="description"
            {...register('description')}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-0 transition-all duration-200"
            placeholder="Describe the destination..."
            rows={3}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? 'description-error' : undefined}
          />
        </FormField>
      </div>

      {/* Features */}
      <div className="space-y-3">
        <FormField label="Amenities" htmlFor="amenities">
          <input
            id="amenities"
            type="text"
            {...register('amenities')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="WiFi, Pool, Kitchen (comma separated)"
          />
        </FormField>
        <FormField label="Features" htmlFor="features">
          <input
            id="features"
            type="text"
            {...register('features')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Mountain View, Beach Access (comma separated)"
          />
        </FormField>
      </div>

      {/* Status Messages */}
      {error && <div className="text-red-600 text-sm bg-red-50 p-2 rounded border border-red-200">{error}</div>}
      {/* Removed success message to avoid duplicate feedback */}

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