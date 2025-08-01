import { ReactNode } from 'react';
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
export declare const Table: <T extends Record<string, any>>({ columns, data, rowKey, loading, striped, bordered, hover, size, onRowClick, className, emptyText }: TableProps<T>) => import("react/jsx-runtime").JSX.Element;
