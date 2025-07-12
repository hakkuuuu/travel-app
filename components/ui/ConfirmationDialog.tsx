import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { FaExclamationTriangle, FaCheckCircle, FaTimes } from 'react-icons/fa';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'success' | 'danger';
  loading?: boolean;
}

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning',
  loading = false
}: ConfirmationDialogProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="w-6 h-6 text-green-600" />;
      case 'danger':
        return <FaExclamationTriangle className="w-6 h-6 text-red-600" />;
      default:
        return <FaExclamationTriangle className="w-6 h-6 text-yellow-600" />;
    }
  };

  const getConfirmButtonVariant = () => {
    switch (type) {
      case 'success':
        return 'primary';
      case 'danger':
        return 'secondary';
      default:
        return 'primary';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <div className="flex justify-center mb-4">
          {getIcon()}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        <div className="flex space-x-3 justify-center">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="min-w-[100px]"
          >
            <FaTimes className="w-4 h-4 mr-2" />
            {cancelText}
          </Button>
          
          <Button
            variant={getConfirmButtonVariant()}
            onClick={onConfirm}
            disabled={loading}
            className="min-w-[100px]"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              confirmText
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
} 