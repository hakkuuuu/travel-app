import React from 'react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
}

export default function FormField({
  label,
  htmlFor,
  error,
  description,
  required,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-red-500" role="alert">{error}</p>
      ) : description ? (
        <p className="text-xs text-gray-500">{description}</p>
      ) : null}
    </div>
  );
} 