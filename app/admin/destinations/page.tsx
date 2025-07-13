"use client";
import DestinationList from '@/components/admin/DestinationList';
import DestinationForm from '@/components/admin/DestinationForm';
import Modal from '@/components/ui/Modal';
import ConfirmationDialog from '@/components/ui/ConfirmationDialog';
import Button from '@/components/ui/Button';
import { useState, useEffect } from 'react';
import { useAdminStore } from '@/store';
import { useUIStore } from '@/store';
import toast from 'react-hot-toast';
import { FaPlus, FaSync, FaEdit, FaTrash } from 'react-icons/fa';

export default function AdminDestinationsPage() {
  const {
    destinations,
    isLoading,
    error,
    fetchDestinations,
    createDestination,
    updateDestination,
    deleteDestination,
    clearError
  } = useAdminStore();
  
  const { modal, openModal, closeModal } = useUIStore();
  const [editingDestination, setEditingDestination] = useState<any>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [destinationToDelete, setDestinationToDelete] = useState<any>(null);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  const handleAddDestination = async (formData: any) => {
    const success = await createDestination(formData);
    if (success) {
      closeModal();
      setEditingDestination(null);
    }
  };

  const handleEditDestination = async (formData: any) => {
    if (!editingDestination) return;
    
    const success = await updateDestination(editingDestination.id, formData);
    if (success) {
      closeModal();
      setEditingDestination(null);
    }
  };

  const handleDeleteClick = (destination: any) => {
    setDestinationToDelete(destination);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    if (!destinationToDelete) return;
    
    const success = await deleteDestination(destinationToDelete.id);
    if (success) {
      toast.success(`Destination "${destinationToDelete.name}" deleted successfully! 🗑️`);
    }
    
    setShowDeleteConfirmation(false);
    setDestinationToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
    setDestinationToDelete(null);
  };

  const handleRefresh = async () => {
    toast.loading('Refreshing destinations...');
    await fetchDestinations();
    toast.success('Destinations refreshed! 🔄');
  };

  const openAddModal = () => {
    setEditingDestination(null);
    openModal('destination-form');
  };

  const openEditModal = (destination: any) => {
    setEditingDestination(destination);
    openModal('destination-form');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Destinations</h1>
        <div className="flex gap-2">
          <Button
            onClick={openAddModal}
            variant="success"
            icon={<FaPlus className="w-4 h-4" />}
          >
            Add Destination
          </Button>
          <Button
            onClick={handleRefresh}
            variant="outline"
            icon={<FaSync className="w-4 h-4" />}
            loading={isLoading}
          >
            Refresh
          </Button>
        </div>
      </div>
      
      <Modal 
        isOpen={modal.isOpen && modal.type === 'destination-form'} 
        onClose={closeModal} 
        title={editingDestination ? 'Edit Destination' : 'Add Destination'}
      >
        <DestinationForm
          onSubmit={editingDestination ? handleEditDestination : handleAddDestination}
          isLoading={isLoading}
          error={error}
          success={null}
          initialData={editingDestination}
          onCancel={closeModal}
        />
      </Modal>
      
      <DestinationList
        destinations={destinations}
        isLoading={isLoading}
        onEdit={openEditModal}
        onDelete={handleDeleteClick}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showDeleteConfirmation}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Destination"
        message={`Are you sure you want to delete "${destinationToDelete?.name}"? This action cannot be undone and will remove all associated data.`}
        confirmText="Delete Destination"
        cancelText="Cancel"
        type="danger"
        loading={isLoading}
      />
    </div>
  );
} 