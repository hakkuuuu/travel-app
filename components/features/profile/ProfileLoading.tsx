import Card from '@/components/ui/Card';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

export default function ProfileLoading() {
  return (
    <>
      <div className="animate-pulse">
        <LoadingSkeleton type="title" className="w-1/4 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card padding="lg">
              <LoadingSkeleton type="title" className="w-1/3 mb-6" />
              <div className="space-y-4">
                <LoadingSkeleton type="text" />
                <LoadingSkeleton type="text" className="w-5/6" />
                <LoadingSkeleton type="text" className="w-4/6" />
                <LoadingSkeleton type="text" className="w-3/6" />
              </div>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <LoadingSkeleton type="title" className="w-1/2 mb-4" />
              <div className="space-y-3">
                <LoadingSkeleton type="text" />
                <LoadingSkeleton type="text" />
                <LoadingSkeleton type="text" />
              </div>
            </Card>
            <Card>
              <LoadingSkeleton type="title" className="w-1/2 mb-4" />
              <div className="space-y-3">
                <LoadingSkeleton type="text" />
                <LoadingSkeleton type="text" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
} 