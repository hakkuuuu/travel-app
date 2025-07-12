import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'textarea' | 'select';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  className?: string;
  disabled?: boolean;
}

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  options = [],
  rows = 4,
  className = '',
  disabled = false
}: FormFieldProps) {
  const baseInputClasses = "w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200";
  const errorClasses = error ? "border-red-300 focus:ring-red-500" : "";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  const renderInput = () => {
    const commonProps = {
      name,
      value,
      onChange,
      placeholder,
      required,
      disabled,
      className: `${baseInputClasses} ${errorClasses} ${disabledClasses} ${className}`
    };

    switch (type) {
      case 'textarea':
        return <textarea {...commonProps} rows={rows} />;
      
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      default:
        return <input {...commonProps} type={type} />;
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {renderInput()}
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
} 