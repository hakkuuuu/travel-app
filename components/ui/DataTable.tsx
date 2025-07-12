import { useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Link from 'next/link';
import Pagination from '@/components/ui/Pagination';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
  className?: string;
}

export interface TableAction<T> {
  type: 'edit' | 'delete' | 'view' | 'custom';
  icon?: React.ReactNode;
  label: string;
  onClick?: (item: T) => void;
  href?: (item: T) => string;
  className?: string;
  color?: 'blue' | 'red' | 'green' | 'gray';
}

export interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  actions?: TableAction<T>[];
  title: string;
  isLoading?: boolean;
  loadingText?: string;
  itemsPerPage?: number;
  onSort?: (key: keyof T) => void;
  sortKey?: keyof T;
  sortDirection?: 'asc' | 'desc';
  emptyMessage?: string;
  className?: string;
}

export default function DataTable<T extends { id?: number | string }>({
  data,
  columns,
  actions = [],
  title,
  isLoading = false,
  loadingText = 'Loading...',
  itemsPerPage = 10,
  onSort,
  sortKey,
  sortDirection,
  emptyMessage = 'No data available',
  className = ''
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderSortIcon = (key: keyof T) => {
    if (!onSort) return null;
    if (sortKey !== key) return <span className="ml-1 text-gray-300">⇅</span>;
    return sortDirection === 'asc' ? <span className="ml-1">▲</span> : <span className="ml-1">▼</span>;
  };

  const getActionIcon = (action: TableAction<T>) => {
    if (action.icon) return action.icon;
    
    switch (action.type) {
      case 'edit':
        return <FaEdit />;
      case 'delete':
        return <FaTrash />;
      case 'view':
        return <FaEye />;
      default:
        return null;
    }
  };

  const getActionColor = (action: TableAction<T>) => {
    if (action.color) {
      const colors = {
        blue: 'text-blue-600 hover:bg-blue-50 hover:text-blue-700',
        red: 'text-red-600 hover:bg-red-50 hover:text-red-700',
        green: 'text-green-600 hover:bg-green-50 hover:text-green-700',
        gray: 'text-gray-600 hover:bg-gray-50 hover:text-gray-700'
      };
      return colors[action.color];
    }
    
    switch (action.type) {
      case 'edit':
        return 'text-blue-600 hover:bg-blue-50 hover:text-blue-700';
      case 'delete':
        return 'text-red-600 hover:bg-red-50 hover:text-red-700';
      case 'view':
        return 'text-green-600 hover:bg-green-50 hover:text-green-700';
      default:
        return 'text-gray-600 hover:bg-gray-50 hover:text-gray-700';
    }
  };

  const renderCell = (column: TableColumn<T>, item: T) => {
    const value = item[column.key];
    
    if (column.render) {
      return column.render(value, item);
    }
    
    // Default rendering for common data types
    if (value instanceof Date) {
      return value.toLocaleDateString();
    }
    
    if (typeof value === 'string' && value.includes('@')) {
      return value; // Email
    }
    
    if (typeof value === 'number' && column.key === 'rating') {
      return value.toFixed(1);
    }
    
    return String(value || 'N/A');
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-xl shadow p-6 border border-gray-100 ${className}`}>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">{title}</h2>
        <LoadingSpinner
          size="lg"
          color="blue"
          text={loadingText}
          className="py-12"
        />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`bg-white rounded-xl shadow p-6 border border-gray-100 ${className}`}>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">{title}</h2>
        <div className="text-center py-12 text-gray-500">
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow p-6 border border-gray-100 ${className}`}>
      <h2 className="text-2xl font-bold mb-4 text-gray-900">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow border border-gray-100">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-6 py-3 text-left text-xs font-semibold text-gray-700 align-middle ${
                    column.sortable && onSort ? 'cursor-pointer select-none' : ''
                  } ${column.className || ''}`}
                  onClick={column.sortable && onSort ? () => onSort(column.key) : undefined}
                >
                  {column.label} {column.sortable && renderSortIcon(column.key)}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 align-middle">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, idx) => (
              <tr key={item.id ?? idx} className="border-t border-gray-50">
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={`px-6 py-3 text-sm text-gray-900 align-middle ${column.className || ''}`}
                  >
                    {renderCell(column, item)}
                  </td>
                ))}
                {actions.length > 0 && (
                  <td className="px-6 py-3 align-middle">
                    <div className="flex justify-center items-center gap-3">
                      {actions.map((action, actionIdx) => {
                        const actionContent = (
                          <span
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ease-in-out ${getActionColor(action)} ${action.className || ''} hover:scale-105 active:scale-95`}
                            title={action.label}
                            aria-label={`${action.label} ${item.id}`}
                          >
                            {getActionIcon(action)}
                          </span>
                        );

                        if (action.type === 'view' && action.href) {
                          return (
                            <Link
                              key={actionIdx}
                              href={action.href(item)}
                              target="_blank"
                              className="transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
                            >
                              {actionContent}
                            </Link>
                          );
                        }

                        return (
                          <button
                            key={actionIdx}
                            onClick={() => action.onClick?.(item)}
                            className="transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            {actionContent}
                          </button>
                        );
                      })}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        variant="admin"
        showInfo={true}
        totalItems={data.length}
        startIndex={startIndex}
        endIndex={endIndex}
      />
    </div>
  );
} 