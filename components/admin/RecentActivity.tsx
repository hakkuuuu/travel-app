interface Destination {
  id: number;
  name: string;
  location: string;
  price: string;
}

interface User {
  id: number;
  name?: string;
  username: string;
  email: string;
  role?: string;
  bio?: string;
  avatar?: string;
  createdAt?: string;
}

interface RecentActivityProps {
  destinations: Destination[];
  users: User[];
}

export default function RecentActivity({ destinations, users }: RecentActivityProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Destinations */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Destinations</h3>
        {destinations.slice(0, 5).map((dest, idx) => (
          <div key={dest.id ?? `dest-${idx}`} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
            <div>
              <p className="font-medium text-gray-900">{dest.name}</p>
              <p className="text-sm text-gray-600">{dest.location}</p>
            </div>
            <span className="text-sm text-gray-500">{dest.price}</span>
          </div>
        ))}
      </div>

      {/* Recent Users */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Users</h3>
        {users.slice(0, 5).map((user, idx) => (
          <div key={user.id ?? `user-${idx}`} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
            <div>
              <p className="font-medium text-gray-900">{user.username}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <span className="text-sm text-gray-500">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 