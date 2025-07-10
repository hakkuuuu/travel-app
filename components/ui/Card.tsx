import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'elevated';
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
  variant = 'default'
}) => {
  const baseClasses = 'bg-white rounded-2xl border border-gray-100';
  
  const variants = {
    default: 'shadow-xl',
    elevated: 'shadow-2xl'
  };
  
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  return (
    <div
      className={cn(
        baseClasses,
        variants[variant],
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card; 