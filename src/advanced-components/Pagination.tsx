import React from 'react';
import clsx from 'clsx';
import styles from './Pagination.module.css';

export interface PaginationProps {
  current: number;
  total: number;
  pageSize?: number;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
  showQuickJumper?: boolean;
  showTotal?: boolean | ((total: number, range: [number, number]) => React.ReactNode);
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  className?: string;
}

/**
 * Pagination - Advanced page navigation control component
 * 
 * Features:
 * - Configurable page size with options
 * - Quick jumper for direct page navigation
 * - Total count display with customizable format
 * - Keyboard navigation support
 * - Multiple size variants
 * - Accessible with ARIA attributes
 * - Responsive design with ellipsis for large page counts
 */
export const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
  pageSize = 10,
  showSizeChanger = false,
  pageSizeOptions = [10, 20, 50, 100],
  showQuickJumper = false,
  showTotal = false,
  disabled = false,
  size = 'md',
  onChange,
  onShowSizeChange,
  className
}) => {
  const totalPages = Math.ceil(total / pageSize);
  const startItem = (current - 1) * pageSize + 1;
  const endItem = Math.min(current * pageSize, total);

  const handlePageChange = (page: number) => {
    if (page !== current && page >= 1 && page <= totalPages && !disabled) {
      onChange?.(page, pageSize);
    }
  };

  const handleSizeChange = (newSize: number) => {
    if (newSize !== pageSize && !disabled) {
      const newPage = Math.ceil((current - 1) * pageSize / newSize) + 1;
      onShowSizeChange?.(Math.min(newPage, Math.ceil(total / newSize)), newSize);
    }
  };

  const handleQuickJump = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const page = parseInt(formData.get('page') as string, 10);
    if (!isNaN(page)) {
      handlePageChange(page);
      (event.currentTarget.elements.namedItem('page') as HTMLInputElement).value = '';
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, page: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handlePageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (current <= 4) {
        // Show 1-5 and ellipsis and last
        for (let i = 2; i <= Math.min(5, totalPages - 1); i++) {
          pages.push(i);
        }
        if (totalPages > 5) {
          pages.push('ellipsis1');
          pages.push(totalPages);
        }
      } else if (current >= totalPages - 3) {
        // Show 1, ellipsis, and last 5
        if (totalPages > 5) {
          pages.push('ellipsis1');
          for (let i = Math.max(totalPages - 4, 2); i <= totalPages; i++) {
            pages.push(i);
          }
        }
      } else {
        // Show 1, ellipsis, current-1, current, current+1, ellipsis, last
        pages.push('ellipsis1');
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis2');
        pages.push(totalPages);
      }
    }

    return pages.map((page, index) => {
      if (typeof page === 'string') {
        return (
          <span
            key={page}
            className={clsx(styles.ellipsis, styles[size])}
            aria-hidden="true"
          >
            ...
          </span>
        );
      }

      return (
        <button
          key={page}
          type="button"
          className={clsx(
            styles.pageButton,
            styles[size],
            {
              [styles.active]: page === current,
              [styles.disabled]: disabled
            }
          )}
          onClick={() => handlePageChange(page)}
          onKeyDown={(e) => handleKeyDown(e, page)}
          disabled={disabled}
          aria-label={`Go to page ${page}`}
          aria-current={page === current ? 'page' : undefined}
        >
          {page}
        </button>
      );
    });
  };

  const renderTotal = () => {
    if (!showTotal) return null;

    if (typeof showTotal === 'function') {
      return (
        <div className={clsx(styles.totalInfo, styles[size])}>
          {showTotal(total, [startItem, endItem])}
        </div>
      );
    }

    return (
      <div className={clsx(styles.totalInfo, styles[size])}>
        {total > 0 ? `${startItem}-${endItem} of ${total} items` : '0 items'}
      </div>
    );
  };

  if (totalPages <= 1 && !showTotal) {
    return null;
  }

  return (
    <div 
      className={clsx(
        styles.pagination,
        { [styles.disabled]: disabled },
        className
      )}
      role="navigation"
      aria-label="Pagination"
    >
      {renderTotal()}
      
      <div className={styles.paginationControls}>
        {/* Previous button */}
        <button
          type="button"
          className={clsx(
            styles.navButton,
            styles[size],
            { [styles.disabled]: current <= 1 || disabled }
          )}
          onClick={() => handlePageChange(current - 1)}
          disabled={current <= 1 || disabled}
          aria-label="Go to previous page"
        >
          ‹ Prev
        </button>

        {/* Page numbers */}
        <div className={styles.pageNumbers}>
          {renderPageNumbers()}
        </div>

        {/* Next button */}
        <button
          type="button"
          className={clsx(
            styles.navButton,
            styles[size],
            { [styles.disabled]: current >= totalPages || disabled }
          )}
          onClick={() => handlePageChange(current + 1)}
          disabled={current >= totalPages || disabled}
          aria-label="Go to next page"
        >
          Next ›
        </button>
      </div>

      {/* Page size changer */}
      {showSizeChanger && (
        <div className={clsx(styles.sizeChanger, styles[size])}>
          <label htmlFor="pageSize">Show:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => handleSizeChange(parseInt(e.target.value, 10))}
            disabled={disabled}
            className={clsx(styles.sizeSelect, styles[size])}
          >
            {pageSizeOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Quick jumper */}
      {showQuickJumper && (
        <form
          onSubmit={handleQuickJump}
          className={clsx(styles.quickJumper, styles[size])}
        >
          <label htmlFor="quickPage">Go to:</label>
          <input
            id="quickPage"
            name="page"
            type="number"
            min="1"
            max={totalPages}
            disabled={disabled}
            className={clsx(styles.quickInput, styles[size])}
            placeholder={totalPages.toString()}
          />
        </form>
      )}
    </div>
  );
};