import React, { useState, useMemo, ReactNode } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { cn } from '../../utils';

// Types
export interface Column<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => ReactNode;
  sorter?: boolean | ((a: T, b: T) => number);
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
}

export interface TableProps<T = any> {
  columns: Column<T>[];
  dataSource: T[];
  rowKey?: keyof T | ((record: T) => string);
  loading?: boolean;
  pagination?: boolean | PaginationConfig;
  size?: 'small' | 'middle' | 'large';
  bordered?: boolean;
  hoverable?: boolean;
  striped?: boolean;
  sticky?: boolean;
  scroll?: { x?: number | string; y?: number | string };
  emptyText?: ReactNode;
  onRow?: (record: T, index: number) => React.HTMLAttributes<HTMLTableRowElement>;
  className?: string;
}

export interface PaginationConfig {
  current?: number;
  pageSize?: number;
  total?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => ReactNode;
  onChange?: (page: number, pageSize: number) => void;
}

type SortOrder = 'ascend' | 'descend' | null;

interface SortState {
  columnKey: string | null;
  order: SortOrder;
}

// Table component
export const Table = <T extends Record<string, any>>({
  columns,
  dataSource,
  rowKey = 'id',
  loading = false,
  size = 'middle',
  bordered = false,
  hoverable = true,
  striped = false,
  sticky = false,
  scroll,
  emptyText = 'No data',
  onRow,
  className,
}: TableProps<T>) => {
  const [sortState, setSortState] = useState<SortState>({
    columnKey: null,
    order: null,
  });

  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] as string || index.toString();
  };

  // Handle sorting
  const handleSort = (column: Column<T>) => {
    if (!column.sorter) return;

    const { key } = column;
    let newOrder: SortOrder = 'ascend';

    if (sortState.columnKey === key) {
      if (sortState.order === 'ascend') {
        newOrder = 'descend';
      } else if (sortState.order === 'descend') {
        newOrder = null;
      }
    }

    setSortState({
      columnKey: newOrder ? key : null,
      order: newOrder,
    });
  };

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortState.columnKey || !sortState.order) {
      return dataSource;
    }

    const column = columns.find(col => col.key === sortState.columnKey);
    if (!column || !column.sorter) {
      return dataSource;
    }

    const sorted = [...dataSource].sort((a, b) => {
      if (typeof column.sorter === 'function') {
        return column.sorter(a, b);
      }

      // Default string/number sorting
      const aValue = column.dataIndex ? a[column.dataIndex] : '';
      const bValue = column.dataIndex ? b[column.dataIndex] : '';

      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    });

    return sortState.order === 'descend' ? sorted.reverse() : sorted;
  }, [dataSource, columns, sortState]);

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

  const getCellPadding = () => {
    switch (size) {
      case 'small':
        return 'px-2 py-1';
      case 'large':
        return 'px-4 py-3';
      default:
        return 'px-3 py-2';
    }
  };

  const renderSortIcon = (column: Column<T>) => {
    if (!column.sorter) return null;

    const isActive = sortState.columnKey === column.key;
    const order = isActive ? sortState.order : null;

    if (order === 'ascend') {
      return <ChevronUp className="w-4 h-4 text-blue-500" />;
    }
    if (order === 'descend') {
      return <ChevronDown className="w-4 h-4 text-blue-500" />;
    }
    return <ChevronsUpDown className="w-4 h-4 text-gray-400" />;
  };

  const renderCell = (column: Column<T>, record: T, index: number): React.ReactNode => {
    const { dataIndex, render } = column;
    const value = dataIndex ? record[dataIndex] : record;

    if (render) {
      return render(value, record, index);
    }

    return String(value);
  };

  const getAlignment = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={cn('table-container', className)}>
      <div
        className={cn(
          'overflow-auto',
          scroll?.x && 'overflow-x-auto',
          scroll?.y && 'overflow-y-auto'
        )}
        style={{
          maxHeight: scroll?.y,
          maxWidth: scroll?.x,
        }}
      >
        <table
          className={cn(
            'w-full table-auto',
            getSizeClasses(),
            bordered && 'border border-gray-300',
            sticky && 'sticky top-0'
          )}
        >
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'font-semibold text-gray-900 border-b border-gray-200',
                    getCellPadding(),
                    getAlignment(column.align),
                    bordered && 'border-r border-gray-300 last:border-r-0',
                    column.sorter && 'cursor-pointer hover:bg-gray-100',
                    sticky && 'sticky top-0 bg-gray-50 z-10'
                  )}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center justify-between">
                    <span>{column.title}</span>
                    {renderSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className={cn(
                    'text-center text-gray-500 py-8',
                    getCellPadding(),
                    bordered && 'border-r border-gray-300'
                  )}
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              sortedData.map((record, index) => {
                const rowProps = onRow ? onRow(record, index) : {};
                return (
                  <tr
                    key={getRowKey(record, index)}
                    className={cn(
                      'border-b border-gray-200 last:border-b-0',
                      hoverable && 'hover:bg-gray-50',
                      striped && index % 2 === 1 && 'bg-gray-50',
                      'transition-colors'
                    )}
                    {...rowProps}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          getCellPadding(),
                          getAlignment(column.align),
                          bordered && 'border-r border-gray-300 last:border-r-0'
                        )}
                        style={{ width: column.width }}
                      >
                        {renderCell(column, record, index)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};