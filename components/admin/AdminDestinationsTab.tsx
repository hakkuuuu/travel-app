import { FaPlus } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import RefreshButton from '@/components/ui/RefreshButton';
import EntityFormModal from '@/components/ui/EntityFormModal';
import DestinationForm from '@/components/admin/DestinationForm';
import DestinationList from '@/components/admin/DestinationList';
import { AdminDestination } from '@/store/adminStore';

// Add Destination type (should match DestinationList)
interface Destination {
  id: number;
  name: string;
  location: string;
  price: string;
  image: string;
  description: string;
  amenities: string[];
  features: string[];
  rating?: number;
}

interface AdminDestinationsTabProps {
  destinations: AdminDestination[];
  isLoading: boolean;
  error: string | null;
  modal: { isOpen: boolean; type: string | null };
  editingDestination: AdminDestination | null;
  onAddDestination: () => void;
  onEditDestination: (destination: AdminDestination) => void;
  onDeleteDestination: (destination: AdminDestination) => void;
  onRefresh: () => void;
  onCloseModal: () => void;
  onSubmitDestination: (formData: any) => Promise<void>;
  onEditDestinationSubmit: (formData: any) => Promise<void>;
}

export default function AdminDestinationsTab({
  destinations,
  isLoading,
  error,
  modal,
  editingDestination,
  onAddDestination,
  onEditDestination,
  onDeleteDestination,
  onRefresh,
  onCloseModal,
  onSubmitDestination,
  onEditDestinationSubmit
}: AdminDestinationsTabProps) {
  // Adapter: AdminDestination -> Destination
  const toDestination = (admin: AdminDestination): Destination => ({
    id: admin.id,
    name: admin.name,
    location: admin.location,
    price: admin.price,
    image: admin.image,
    description: admin.description,
    amenities: admin.amenities,
    features: admin.features,
    rating: admin.rating,
  });
  // Adapter: Destination -> AdminDestination
  const findAdminDestination = (dest: Destination) => destinations.find(d => d.id === dest.id)!;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Destinations</h2>
        {/* Desktop buttons */}
        <div className="hidden md:flex gap-2">
          <Button
            onClick={onAddDestination}
            variant="success"
            icon={<FaPlus className="w-4 h-4" />}
          >
            Add Destination
          </Button>
          <RefreshButton onClick={onRefresh} loading={isLoading}>
            Refresh
          </RefreshButton>
        </div>
        {/* Mobile icon buttons */}
        <div className="flex md:hidden gap-2">
          <button
            onClick={onAddDestination}
            className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            title="Add Destination"
          >
            <FaPlus className="w-5 h-5" />
          </button>
          <RefreshButton onClick={onRefresh} loading={isLoading} iconOnly className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-400" />
        </div>
      </div>
      
      <EntityFormModal
        isOpen={modal.isOpen && modal.type === 'destination-form'} 
        onClose={onCloseModal} 
        title={editingDestination ? 'Edit Destination' : 'Add Destination'}
      >
        <DestinationForm
          onSubmit={editingDestination ? onEditDestinationSubmit : onSubmitDestination}
          isLoading={isLoading}
          error={error}
          success={null}
          initialData={editingDestination}
          onCancel={onCloseModal}
        />
      </EntityFormModal>
      
      <DestinationList 
        destinations={destinations.map(toDestination)}
        isLoading={isLoading}
        onEdit={d => onEditDestination(findAdminDestination(d))}
        onDelete={d => onDeleteDestination(findAdminDestination(d))}
      />
    </div>
  );
} 