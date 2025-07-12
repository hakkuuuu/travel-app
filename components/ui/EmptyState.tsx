import React from 'react';
import Button from './Button';

interface EmptyStateProps {
  icon?: string | React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  };
  variant?: 'default' | 'compact';
  className?: string;
}

export default function EmptyState({
  icon = '📭',
  title,
  description,
  action,
  variant = 'default',
  className = ''
}: EmptyStateProps) {
  const variants = {
    default: 'text-center py-24',
    compact: 'text-center py-12'
  };

  const iconClasses = {
    default: 'text-6xl mb-4',
    compact: 'text-4xl mb-3'
  };

  const titleClasses = {
    default: 'text-xl font-semibold text-gray-900 mb-2',
    compact: 'text-lg font-semibold text-gray-900 mb-1'
  };

  const descriptionClasses = {
    default: 'text-gray-600 mb-6',
    compact: 'text-gray-600 mb-4'
  };

  return (
    <div className={`${variants[variant]} ${className}`}>
      <div className={iconClasses[variant]}>
        {typeof icon === 'string' ? icon : icon}
      </div>
      
      <h3 className={titleClasses[variant]}>{title}</h3>
      
      {description && (
        <p className={descriptionClasses[variant]}>{description}</p>
      )}
      
      {action && (
        <Button
          variant={action.variant || 'primary'}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
} 