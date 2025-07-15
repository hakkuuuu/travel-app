import DataTable, { TableColumn, TableAction } from '@/components/ui/DataTable';

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
  const columns: TableColumn<Destination>[] = [
    {
      key: 'name',
      label: 'Name',
      className: 'font-medium'
    },
    {
      key: 'location',
      label: 'Location'
    },
    {
      key: 'price',
      label: 'Price'
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (value) => typeof value === 'number' ? value.toFixed(1) : '-'
    }
  ];

  const actions: TableAction<Destination>[] = [
    {
      type: 'view',
      label: 'View',
      href: (item) => `/destinations/${item.id}`
    },
    {
      type: 'edit',
      label: 'Edit',
      onClick: onEdit
    },
    {
      type: 'delete',
      label: 'Delete',
      onClick: onDelete
    }
  ];

  return (
    <>
      {/* Table layout for md+ screens */}
      <div className="hidden md:block">
        <DataTable
          data={destinations}
          columns={columns}
          actions={actions}
          title="All Destinations"
          isLoading={isLoading}
          loadingText="Loading destinations..."
        />
      </div>
      {/* Card layout for mobile screens */}
      <div className="block md:hidden space-y-4">
        {isLoading ? (
          <div className="bg-white rounded-xl shadow p-4 border border-gray-100 text-center text-gray-500">
            Loading destinations...
          </div>
        ) : destinations.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-4 border border-gray-100 text-center text-gray-500">
            No destinations available
          </div>
        ) : (
          destinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-xl shadow p-4 border border-gray-100">
              <div className="flex items-center space-x-3 mb-2">
                {dest.image ? (
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-2xl font-bold">
                    ?
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">{dest.name}</h3>
                  <p className="text-xs text-gray-500">{dest.location}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-gray-700 mb-2">
                <span className="font-semibold text-gray-900">{dest.price}</span>
                {typeof dest.rating === 'number' && (
                  <span className="text-yellow-600">★ {dest.rating.toFixed(1)}</span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <a
                  href={`/destinations/${dest.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-green-600 hover:text-white hover:bg-green-600 rounded-lg transition-colors border border-green-100 text-xs"
                  title="View"
                >
                  View
                </a>
                <button
                  onClick={() => onEdit(dest)}
                  className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-colors border border-blue-100 text-xs"
                  title="Edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(dest)}
                  className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-colors border border-red-100 text-xs"
                  title="Delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
} 