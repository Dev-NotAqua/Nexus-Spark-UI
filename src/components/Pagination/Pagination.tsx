import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '../../utils';

// Types
export interface PaginationProps {
  current: number;
  total: number;
  pageSize?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: boolean | ((total: number, range: [number, number]) => React.ReactNode);
  hideOnSinglePage?: boolean;
  disabled?: boolean;
  size?: 'small' | 'default' | 'large';
  simple?: boolean;
  pageSizeOptions?: string[];
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  className?: string;
}

// Pagination component
export const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
  pageSize = 10,
  showSizeChanger = false,
  showQuickJumper = false,
  showTotal = false,
  hideOnSinglePage = false,
  disabled = false,
  size = 'default',
  simple = false,
  pageSizeOptions = ['10', '20', '50', '100'],
  onChange,
  onShowSizeChange,
  className,
}) => {
  const totalPages = Math.ceil(total / pageSize);
  const startItem = (current - 1) * pageSize + 1;
  const endItem = Math.min(current * pageSize, total);

  // Hide pagination if only one page and hideOnSinglePage is true
  if (hideOnSinglePage && totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page: number) => {
    if (disabled || page === current || page < 1 || page > totalPages) {
      return;
    }
    onChange?.(page, pageSize);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    if (disabled) return;
    
    const newCurrent = Math.min(current, Math.ceil(total / newPageSize));
    onShowSizeChange?.(newCurrent, newPageSize);
    onChange?.(newCurrent, newPageSize);
  };

  const handleQuickJump = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const page = parseInt((event.target as HTMLInputElement).value, 10);
      if (page >= 1 && page <= totalPages) {
        handlePageChange(page);
        (event.target as HTMLInputElement).value = '';
      }
    }
  };

  // Generate page numbers to display
  const getPageNumbers = useMemo(() => {
    const pages: (number | 'ellipsis')[] = [];
    const showPages = simple ? 0 : 5; // Number of page buttons to show

    if (simple || totalPages <= showPages + 2) {
      // Show all pages if simple or few pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Complex pagination with ellipsis
      pages.push(1);

      const startPage = Math.max(2, current - Math.floor(showPages / 2));
      const endPage = Math.min(totalPages - 1, startPage + showPages - 1);

      if (startPage > 2) {
        pages.push('ellipsis');
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push('ellipsis');
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  }, [current, totalPages, simple]);

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'text-xs';
      case 'large':
        return 'text-base';
      default:
        return 'text-sm';
    }
  };

  const getButtonPadding = () => {
    switch (size) {
      case 'small':
        return 'px-2 py-1';
      case 'large':
        return 'px-4 py-3';
      default:
        return 'px-3 py-2';
    }
  };

  const renderTotal = () => {
    if (!showTotal) return null;

    if (typeof showTotal === 'function') {
      return (
        <div className="text-gray-600 mr-4">
          {showTotal(total, [startItem, endItem])}
        </div>
      );
    }

    return (
      <div className="text-gray-600 mr-4">
        Showing {startItem}-{endItem} of {total} items
      </div>
    );
  };

  const renderSizeChanger = () => {
    if (!showSizeChanger) return null;

    return (
      <div className="flex items-center mr-4">
        <span className="text-gray-600 mr-2">Show</span>
        <select
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          disabled={disabled}
          className={cn(
            'border border-gray-300 rounded px-2 py-1 text-sm bg-white',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="text-gray-600 ml-2">per page</span>
      </div>
    );
  };

  const renderQuickJumper = () => {
    if (!showQuickJumper) return null;

    return (
      <div className="flex items-center ml-4">
        <span className="text-gray-600 mr-2">Go to</span>
        <input
          type="number"
          min={1}
          max={totalPages}
          placeholder="Page"
          onKeyDown={handleQuickJump}
          disabled={disabled}
          className={cn(
            'border border-gray-300 rounded px-2 py-1 w-16 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        />
      </div>
    );
  };

  if (simple) {
    return (
      <div className={cn('flex items-center justify-center space-x-2', getSizeClasses(), className)}>
        <button
          onClick={() => handlePageChange(current - 1)}
          disabled={disabled || current <= 1}
          className={cn(
            'flex items-center border border-gray-300 rounded',
            getButtonPadding(),
            'hover:border-blue-500 hover:text-blue-500 transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-400'
          )}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>
        
        <span className="px-4 text-gray-600">
          {current} / {totalPages}
        </span>
        
        <button
          onClick={() => handlePageChange(current + 1)}
          disabled={disabled || current >= totalPages}
          className={cn(
            'flex items-center border border-gray-300 rounded',
            getButtonPadding(),
            'hover:border-blue-500 hover:text-blue-500 transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-400'
          )}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-between flex-wrap gap-4', className)}>
      <div className="flex items-center">
        {renderTotal()}
        {renderSizeChanger()}
      </div>

      <div className="flex items-center space-x-1">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(current - 1)}
          disabled={disabled || current <= 1}
          className={cn(
            'flex items-center border border-gray-300 rounded',
            getButtonPadding(),
            getSizeClasses(),
            'hover:border-blue-500 hover:text-blue-500 transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-400'
          )}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page numbers */}
        {getPageNumbers.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className={cn('flex items-center justify-center', getButtonPadding(), getSizeClasses())}
              >
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </span>
            );
          }

          const isActive = page === current;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={disabled}
              className={cn(
                'border rounded transition-colors',
                getButtonPadding(),
                getSizeClasses(),
                isActive
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300 hover:border-blue-500 hover:text-blue-500',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {page}
            </button>
          );
        })}

        {/* Next button */}
        <button
          onClick={() => handlePageChange(current + 1)}
          disabled={disabled || current >= totalPages}
          className={cn(
            'flex items-center border border-gray-300 rounded',
            getButtonPadding(),
            getSizeClasses(),
            'hover:border-blue-500 hover:text-blue-500 transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-400'
          )}
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {renderQuickJumper()}
      </div>
    </div>
  );
};