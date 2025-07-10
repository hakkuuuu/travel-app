interface DashboardStatsProps {
  destinationsCount: number;
  usersCount: number;
}

// Simple Chart Component
function SimpleChart({ data, title, color }: { data: number; title: string; color: string }) {
  const percentage = Math.min((data / 100) * 100, 100);
  
  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <span className="text-2xl font-bold" style={{ color }}>{data}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="h-2 rounded-full transition-all duration-500" 
          style={{ 
            width: `${percentage}%`, 
            backgroundColor: color 
          }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-2">Total {title.toLowerCase()}</p>
    </div>
  );
}

export default function DashboardStats({ destinationsCount, usersCount }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SimpleChart data={destinationsCount} title="Destinations" color="#10B981" />
      <SimpleChart data={usersCount} title="Users" color="#3B82F6" />
      <SimpleChart data={destinationsCount + usersCount} title="Total Items" color="#8B5CF6" />
    </div>
  );
} 