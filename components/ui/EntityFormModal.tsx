import Modal from './Modal';
import { ReactNode } from 'react';

interface EntityFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function EntityFormModal({
  isOpen,
  onClose,
  title,
  children,
}: EntityFormModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {children}
    </Modal>
  );
} 