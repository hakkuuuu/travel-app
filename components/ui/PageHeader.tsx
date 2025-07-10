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
    <div className={cn('text-center mb-16', className)}>
      <h1 className="section-title">
        {title}
      </h1>
      {subtitle && (
        <p className="section-subtitle max-w-xl mx-auto text-center mt-4">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader; 