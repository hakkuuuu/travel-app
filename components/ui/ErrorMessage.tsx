import React from 'react';
import Button from './Button';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  variant?: 'default' | 'form' | 'page';
  className?: string;
}

export default function ErrorMessage({
  title = 'Something went wrong',
  message,
  onRetry,
  variant = 'default',
  className = ''
}: ErrorMessageProps) {
  const variants = {
    default: 'text-center py-12',
    form: 'mb-6 p-4 bg-red-50 border border-red-200 rounded-lg',
    page: 'text-center py-24'
  };

  const iconClasses = {
    default: 'w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4',
    form: 'w-6 h-6 text-red-600 mr-2',
    page: 'w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'
  };

  const titleClasses = {
    default: 'text-xl font-semibold text-red-800 mb-2',
    form: 'text-red-800 font-medium',
    page: 'text-xl font-semibold text-red-800 mb-2'
  };

  const messageClasses = {
    default: 'text-red-600 mb-6',
    form: 'text-red-800',
    page: 'text-red-600 mb-6'
  };

  return (
    <div className={`${variants[variant]} ${className}`}>
      <div className={iconClasses[variant]}>
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      
      <h2 className={titleClasses[variant]}>{title}</h2>
      <p className={messageClasses[variant]}>{message}</p>
      
      {onRetry && variant !== 'form' && (
        <Button
          variant="primary"
          onClick={onRetry}
          className="mt-4"
        >
          Try Again
        </Button>
      )}
    </div>
  );
} 