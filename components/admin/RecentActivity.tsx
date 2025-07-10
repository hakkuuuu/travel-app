interface Destination {
  id: number;
  name: string;
  location: string;
  price: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
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
        {destinations.slice(0, 5).map((dest) => (
          <div key={dest.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
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
        {users.slice(0, 5).map((user) => (
          <div key={user.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
            <div>
              <p className="font-medium text-gray-900">{user.username}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 