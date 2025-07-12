import DestinationCard from './DestinationCard';
import { Destination } from '@/types/destination';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EmptyState from '@/components/ui/EmptyState';

interface DestinationsGridProps {
  destinations: Destination[];
  loading: boolean;
  error: string | null;
  startIndex: number;
  endIndex: number;
  totalCount: number;
}

export default function DestinationsGrid({
  destinations,
  loading,
  error,
  startIndex,
  endIndex,
  totalCount
}: DestinationsGridProps) {
  if (loading) {
    return (
      <LoadingSpinner
        size="lg"
        color="green"
        text="Loading destinations..."
        className="py-12"
      />
    );
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load destinations"
        message={error}
        onRetry={() => window.location.reload()}
        variant="page"
      />
    );
  }

  if (destinations.length === 0) {
    return (
      <EmptyState
        icon="🏕️"
        title="No destinations found"
        description="Try adjusting your search criteria or filters."
        action={{
          label: "Clear Filters",
          onClick: () => window.location.reload(),
          variant: "primary"
        }}
      />
    );
  }

  return (
    <>
      {/* Results Count */}
      <div className="mb-8">
        <p className="text-gray-700 text-center">
          Showing {startIndex + 1}-{Math.min(endIndex, totalCount)} of {totalCount} destinations
        </p>
      </div>
      
      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {destinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </>
  );
} 