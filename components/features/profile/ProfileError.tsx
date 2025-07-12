import ErrorMessage from '@/components/ui/ErrorMessage';

interface ProfileErrorProps {
  error: string;
  onRetry: () => void;
}

export default function ProfileError({ error, onRetry }: ProfileErrorProps) {
  return (
    <ErrorMessage
      title="Error Loading Profile"
      message={error}
      onRetry={onRetry}
      variant="page"
    />
  );
} 