import Card from '@/components/ui/Card';
import { UserStats } from '@/constants';
import { formatMemberSince } from '@/lib/utils';
import { FaMapMarkedAlt, FaStar, FaCalendarAlt, FaBed, FaClock, FaTrophy } from 'react-icons/fa';

interface ProfileStatsProps {
  stats: UserStats | null;
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  if (!stats) return null;

  const statItems = [
    {
      icon: FaMapMarkedAlt,
      label: 'Destinations Visited',
      value: stats.totalDestinationsVisited,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Places you\'ve explored'
    },
    {
      icon: FaBed,
      label: 'Total Bookings',
      value: stats.totalBookings,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Adventures booked'
    },
    {
      icon: FaStar,
      label: 'Reviews Written',
      value: stats.totalReviews,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      description: 'Experiences shared'
    },
    {
      icon: FaClock,
      label: 'Total Nights',
      value: stats.totalNights,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Nights under the stars'
    },
    {
      icon: FaTrophy,
      label: 'Average Rating',
      value: stats.averageRating.toFixed(1),
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Your rating average'
    },
    {
      icon: FaCalendarAlt,
      label: 'Member Since',
      value: formatMemberSince(stats.memberSince),
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      description: 'Your journey started'
    }
  ];

  return (
    <Card>
      <div className="bg-gradient-to-r from-blue-50 to-green-50 px-6 py-4 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <FaTrophy className="w-5 h-5 mr-2 text-yellow-600" />
          Travel Statistics
        </h3>
        <p className="text-sm text-gray-600 mt-1">Your adventure highlights</p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4">
          {statItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-sm group"
            >
              <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">{item.label}</span>
                  <span className="text-lg font-bold text-gray-900">{item.value}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {stats.favoriteDestination && (
          <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
            <div className="flex items-center">
              <FaStar className="w-5 h-5 text-yellow-600 mr-3" />
              <div>
                <h4 className="font-semibold text-gray-900">Favorite Destination</h4>
                <p className="text-sm text-gray-600">{stats.favoriteDestination}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
} 