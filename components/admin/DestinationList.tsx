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
    <DataTable
      data={destinations}
      columns={columns}
      actions={actions}
      title="All Destinations"
      isLoading={isLoading}
      loadingText="Loading destinations..."
    />
  );
} 