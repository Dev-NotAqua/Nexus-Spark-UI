import React, { ReactNode, useState } from 'react';
import clsx from 'clsx';
import styles from './Table.module.css';

export interface TableColumn<T = any> {
  key: string;
  title: ReactNode;
  dataIndex?: string;
  render?: (value: any, record: T, index: number) => ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey?: string | ((record: T, index: number) => string);
  loading?: boolean;
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onRowClick?: (record: T, index: number) => void;
  className?: string;
  emptyText?: ReactNode;
}

type SortDirection = 'asc' | 'desc' | null;

interface SortState {
  key: string | null;
  direction: SortDirection;
}

/**
 * Table - Advanced data display table component
 * 
 * Features:
 * - Column sorting functionality
 * - Custom cell rendering
 * - Row selection support
 * - Loading states
 * - Responsive design
 * - Multiple size variants
 * - Accessible with ARIA attributes
 * - Row hover and striping options
 */
export const Table = <T extends Record<string, any>>({
  columns,
  data,
  rowKey = 'id',
  loading = false,
  striped = false,
  bordered = false,
  hover = false,
  size = 'md',
  onRowClick,
  className,
  emptyText = 'No data available'
}: TableProps<T>) => {
  const [sortState, setSortState] = useState<SortState>({ key: null, direction: null });

  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record, index);
    }
    return record[rowKey] || index.toString();
  };

  const handleSort = (columnKey: string) => {
    setSortState(prev => {
      if (prev.key === columnKey) {
        // Cycle through: asc -> desc -> null
        const direction = prev.direction === 'asc' ? 'desc' : prev.direction === 'desc' ? null : 'asc';
        return { key: direction ? columnKey : null, direction };
      }
      return { key: columnKey, direction: 'asc' };
    });
  };

  const sortedData = React.useMemo(() => {
    if (!sortState.key || !sortState.direction) return data;

    const column = columns.find(col => col.key === sortState.key);
    if (!column || !column.sortable) return data;

    return [...data].sort((a, b) => {
      const aValue = column.dataIndex ? a[column.dataIndex] : a[column.key];
      const bValue = column.dataIndex ? b[column.dataIndex] : b[column.key];

      if (aValue < bValue) return sortState.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortState.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortState, columns]);

  const renderCell = (column: TableColumn<T>, record: T, index: number) => {
    if (column.render) {
      return column.render(
        column.dataIndex ? record[column.dataIndex] : record[column.key],
        record,
        index
      );
    }
    return column.dataIndex ? record[column.dataIndex] : record[column.key];
  };

  const getSortIcon = (columnKey: string) => {
    if (sortState.key !== columnKey) return '⇅';
    return sortState.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className={clsx(styles.tableContainer, className)}>
      <table 
        className={clsx(
          styles.table,
          styles[size],
          {
            [styles.striped]: striped,
            [styles.bordered]: bordered,
            [styles.hover]: hover,
            [styles.loading]: loading
          }
        )}
        role="table"
      >
        <thead className={styles.tableHead}>
          <tr role="row">
            {columns.map((column) => (
              <th
                key={column.key}
                role="columnheader"
                className={clsx(
                  styles.tableHeader,
                  styles[size],
                  styles[column.align || 'left'],
                  {
                    [styles.sortable]: column.sortable
                  }
                )}
                style={{ width: column.width }}
                onClick={() => column.sortable && handleSort(column.key)}
                onKeyDown={(e) => {
                  if (column.sortable && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    handleSort(column.key);
                  }
                }}
                tabIndex={column.sortable ? 0 : -1}
                aria-sort={
                  sortState.key === column.key 
                    ? sortState.direction === 'asc' ? 'ascending' : 'descending'
                    : column.sortable ? 'none' : undefined
                }
              >
                <div className={styles.headerContent}>
                  <span>{column.title}</span>
                  {column.sortable && (
                    <span className={styles.sortIcon} aria-hidden="true">
                      {getSortIcon(column.key)}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody className={styles.tableBody}>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className={styles.loadingCell}>
                <div className={styles.loadingSpinner} aria-label="Loading...">
                  Loading...
                </div>
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.emptyCell}>
                {emptyText}
              </td>
            </tr>
          ) : (
            sortedData.map((record, index) => (
              <tr
                key={getRowKey(record, index)}
                role="row"
                className={clsx(
                  styles.tableRow,
                  {
                    [styles.clickable]: !!onRowClick
                  }
                )}
                onClick={() => onRowClick?.(record, index)}
                onKeyDown={(e) => {
                  if (onRowClick && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onRowClick(record, index);
                  }
                }}
                tabIndex={onRowClick ? 0 : -1}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    role="cell"
                    className={clsx(
                      styles.tableCell,
                      styles[size],
                      styles[column.align || 'left']
                    )}
                  >
                    {renderCell(column, record, index)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};