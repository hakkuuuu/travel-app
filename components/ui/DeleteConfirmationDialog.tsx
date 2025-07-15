import ConfirmationDialog from './ConfirmationDialog';

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  entityName: string;
  itemName?: string | null;
  loading?: boolean;
}

export default function DeleteConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  entityName,
  itemName,
  loading,
}: DeleteConfirmationDialogProps) {
  return (
    <ConfirmationDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={`Delete ${entityName}`}
      message={`Are you sure you want to delete ${entityName.toLowerCase()} "${itemName ?? ''}"? This action cannot be undone and will remove all associated data.`}
      confirmText={`Delete ${entityName}`}
      cancelText="Cancel"
      type="danger"
      loading={loading}
    />
  );
} 