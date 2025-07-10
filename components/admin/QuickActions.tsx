interface QuickActionsProps {
  onNavigateToDestinations: () => void;
  onNavigateToUsers: () => void;
}

export default function QuickActions({ onNavigateToDestinations, onNavigateToUsers }: QuickActionsProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={onNavigateToDestinations}
          className="w-full px-6 py-3 bg-green-600 text-white rounded-xl font-semibold shadow hover:bg-green-700 transition"
        >
          Add New Destination
        </button>
        <button 
          onClick={onNavigateToUsers}
          className="w-full px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold shadow hover:bg-gray-700 transition"
        >
          Manage Users
        </button>
      </div>
    </div>
  );
} 