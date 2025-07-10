import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  className
}) => {
  return (
    <div className={cn('text-center mb-8', className)}>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-green-600 mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader; 