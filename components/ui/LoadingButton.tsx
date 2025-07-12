import React from 'react';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  className?: string;
}

export default function LoadingButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingText,
  children,
  className,
  disabled,
  ...props
}: LoadingButtonProps) {
  const displayText = loading ? (loadingText || children) : children;
  
  return (
    <Button
      variant={variant}
      size={size}
      disabled={loading || disabled}
      className={className}
      {...props}
    >
      {loading && (
        <LoadingSpinner
          size="sm"
          color="white"
          showText={false}
          className="mr-2"
        />
      )}
      {displayText}
    </Button>
  );
} 