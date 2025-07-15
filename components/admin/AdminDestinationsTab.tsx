import { FaPlus } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import RefreshButton from '@/components/ui/RefreshButton';
import EntityFormModal from '@/components/ui/EntityFormModal';
import DestinationForm from '@/components/admin/DestinationForm';
import DestinationList from '@/components/admin/DestinationList';
import { AdminDestination } from '@/store/adminStore';

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
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Destinations</h2>
        <div className="flex gap-2">
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
        destinations={destinations}
        isLoading={isLoading}
        onEdit={onEditDestination}
        onDelete={onDeleteDestination}
      />
    </div>
  );
} 