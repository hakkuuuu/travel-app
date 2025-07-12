interface LoadingSkeletonProps {
  type?: 'text' | 'title' | 'card' | 'avatar' | 'button' | 'table';
  lines?: number;
  className?: string;
}

export default function LoadingSkeleton({
  type = 'text',
  lines = 1,
  className = ''
}: LoadingSkeletonProps) {
  const skeletonClasses = {
    text: 'h-4 bg-gray-200 rounded',
    title: 'h-8 bg-gray-200 rounded',
    card: 'h-32 bg-gray-200 rounded-xl',
    avatar: 'h-12 w-12 bg-gray-200 rounded-full',
    button: 'h-10 bg-gray-200 rounded-lg',
    table: 'h-12 bg-gray-200 rounded'
  };

  if (type === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={`${skeletonClasses.text} ${i === lines - 1 ? 'w-3/4' : ''}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`animate-pulse ${skeletonClasses[type]} ${className}`} />
  );
} 