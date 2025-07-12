interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: 'default' | 'admin';
  showInfo?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
  startIndex?: number;
  endIndex?: number;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'default',
  showInfo = false,
  totalItems,
  itemsPerPage,
  startIndex,
  endIndex,
  className = ''
}: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    
    if (variant === 'admin') {
      // Admin variant: show all pages (simpler for admin tables)
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Default variant: smart pagination with ellipsis
      const maxVisiblePages = 5;
      
      if (totalPages <= maxVisiblePages) {
        // Show all pages if total is small
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show smart pagination with ellipsis
        if (currentPage <= 3) {
          // Near start
          for (let i = 1; i <= 4; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          // Near end
          pages.push(1);
          pages.push('...');
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          // Middle
          pages.push(1);
          pages.push('...');
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        }
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  const isAdminVariant = variant === 'admin';
  const activeColor = isAdminVariant ? 'bg-blue-600' : 'bg-green-600';
  const hoverColor = isAdminVariant ? 'hover:bg-gray-100' : 'hover:bg-gray-50';

  return (
    <div className={`${isAdminVariant ? 'flex items-center justify-between mt-6' : 'flex items-center justify-center mb-16'} ${className}`}>
      {/* Info section (admin variant only) */}
      {showInfo && isAdminVariant && totalItems && startIndex !== undefined && endIndex !== undefined && (
        <div className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} items
        </div>
      )}
      
      {/* Pagination controls */}
      <div className={`flex items-center gap-2 ${isAdminVariant ? '' : 'w-full justify-center'}`}>
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${
            isAdminVariant 
              ? 'p-2 rounded hover:bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed'
              : 'px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          }`}
          title="Previous page"
        >
          {isAdminVariant ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          ) : (
            'Previous'
          )}
        </button>
        
        {/* Page Numbers */}
        <div className="flex gap-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' ? onPageChange(page) : null}
              disabled={page === '...'}
              className={`${
                isAdminVariant
                  ? `px-3 py-1 rounded text-sm font-medium ${
                      page === currentPage
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  : `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      page === currentPage
                        ? `${activeColor} text-white`
                        : page === '...'
                        ? 'text-gray-400 cursor-default'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        
        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${
            isAdminVariant 
              ? 'p-2 rounded hover:bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed'
              : 'px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          }`}
          title="Next page"
        >
          {isAdminVariant ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            'Next'
          )}
        </button>
      </div>
    </div>
  );
} 