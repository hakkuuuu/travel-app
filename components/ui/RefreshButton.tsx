import Button from './Button';
import { FaSync } from 'react-icons/fa';
import { ReactNode } from 'react';

interface RefreshButtonProps {
  onClick: () => void;
  loading?: boolean;
  children?: ReactNode;
  iconOnly?: boolean;
  className?: string;
}

export default function RefreshButton({ onClick, loading, children, iconOnly, className }: RefreshButtonProps) {
  if (iconOnly) {
    return (
      <Button
        onClick={onClick}
        variant="outline"
        icon={<FaSync className="w-5 h-5" />}
        loading={loading}
        className={className}
        aria-label="Refresh"
      />
    );
  }
  return (
    <Button
      onClick={onClick}
      variant="outline"
      icon={<FaSync className="w-4 h-4" />}
      loading={loading}
      className={className}
    >
      {children}
    </Button>
  );
} 