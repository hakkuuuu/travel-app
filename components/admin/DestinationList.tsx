interface Destination {
  id: number;
  name: string;
  location: string;
  price: string;
  image: string;
  description: string;
  amenities: string[];
  features: string[];
}

interface DestinationListProps {
  destinations: Destination[];
  isLoading: boolean;
}

export default function DestinationList({ destinations, isLoading }: DestinationListProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">All Destinations</h2>
      {isLoading && <div>Loading...</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {destinations.map(dest => (
          <div key={dest.id} className="bg-gray-50 rounded-xl p-6 flex flex-col gap-2 border border-gray-200">
            <div className="font-bold text-lg">{dest.name}</div>
            <div className="text-gray-600">{dest.location}</div>
            <div className="text-gray-500 text-sm">{dest.price}</div>
            <div className="text-xs text-gray-400 truncate">{dest.image}</div>
            <div className="text-gray-700 text-sm line-clamp-2">{dest.description}</div>
            <div className="flex flex-wrap gap-1 mt-2">
              {dest.amenities.map((a, i) => <span key={i} className="bg-green-100 text-green-800 text-xs rounded-full px-2 py-1">{a}</span>)}
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {dest.features.map((f, i) => <span key={i} className="bg-blue-100 text-blue-800 text-xs rounded-full px-2 py-1">{f}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 