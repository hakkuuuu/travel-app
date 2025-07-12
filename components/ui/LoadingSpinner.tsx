interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'green' | 'blue' | 'white' | 'gray';
  text?: string;
  className?: string;
  showText?: boolean;
}

export default function LoadingSpinner({
  size = 'md',
  color = 'green',
  text = 'Loading...',
  className = '',
  showText = true
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const colorClasses = {
    green: 'border-green-600',
    blue: 'border-blue-600',
    white: 'border-white',
    gray: 'border-gray-600'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-2 border-gray-200 border-t-2 ${sizeClasses[size]} ${colorClasses[color]}`}
      />
      {showText && text && (
        <p className="mt-3 text-sm text-gray-600">{text}</p>
      )}
    </div>
  );
} 