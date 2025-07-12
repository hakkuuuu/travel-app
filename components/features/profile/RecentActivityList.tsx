import Card from '@/components/ui/Card';
import { RecentActivity } from '@/constants';
import EmptyState from '@/components/ui/EmptyState';

interface RecentActivityListProps {
  recentActivity: RecentActivity[];
}

export default function RecentActivityList({ recentActivity }: RecentActivityListProps) {
  if (!recentActivity || recentActivity.length === 0) {
    return (
      <Card>
        <EmptyState
          icon="📊"
          title="No recent activity"
          description="Start exploring to see your activity here"
          variant="compact"
        />
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {recentActivity.slice(0, 5).map((activity, index) => (
          <div key={activity._id || `activity-${index}`} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm">{activity.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.description}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.date}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
} 