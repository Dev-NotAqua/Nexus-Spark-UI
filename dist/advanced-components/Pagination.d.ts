import React from 'react';
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
export declare const Pagination: React.FC<PaginationProps>;
