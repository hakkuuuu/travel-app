import Link from 'next/link';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

interface Destination {
  id: number;
  name: string;
  location: string;
  price: string;
  image: string;
  description: string;
  amenities: string[];
  features: string[];
  rating?: number;
}

interface DestinationListProps {
  destinations: Destination[];
  isLoading: boolean;
  onEdit: (destination: Destination) => void;
  onDelete: (destination: Destination) => void;
}

export default function DestinationList({ destinations, isLoading, onEdit, onDelete }: DestinationListProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">All Destinations</h2>
      {isLoading && <div>Loading...</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow border border-gray-100">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Location</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Price</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Rating</th>
              <th className="px-4 py-2 text-center text-xs font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map(dest => (
              <tr key={dest.id} className="border-t border-gray-50">
                <td className="px-4 py-2 text-sm text-gray-900 font-medium">{dest.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{dest.location}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{dest.price}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{typeof dest.rating === 'number' ? dest.rating.toFixed(1) : '-'}</td>
                <td className="px-4 py-2 align-middle">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/destinations/${dest.id}`}
                      target="_blank"
                      className="p-2 rounded hover:bg-green-100 text-green-600"
                      title="View"
                      aria-label={`View ${dest.name}`}
                    >
                      <FaEye />
                    </Link>
                    <button
                      className="p-2 rounded hover:bg-blue-100 text-blue-600"
                      onClick={() => onEdit(dest)}
                      title="Edit"
                      aria-label={`Edit ${dest.name}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="p-2 rounded hover:bg-red-100 text-red-600"
                      onClick={() => onDelete(dest)}
                      title="Delete"
                      aria-label={`Delete ${dest.name}`}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 