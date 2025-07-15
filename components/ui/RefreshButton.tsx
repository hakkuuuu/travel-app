import Button from './Button';
import { FaSync } from 'react-icons/fa';
import { ReactNode } from 'react';

interface RefreshButtonProps {
  onClick: () => void;
  loading?: boolean;
  children: ReactNode;
}

export default function RefreshButton({ onClick, loading, children }: RefreshButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      icon={<FaSync className="w-4 h-4" />}
      loading={loading}
    >
      {children}
    </Button>
  );
} 