import React from 'react';
export interface DatePickerProps {
    value?: Date;
    defaultValue?: Date;
    placeholder?: string;
    format?: string;
    disabled?: boolean;
    clearable?: boolean;
    showToday?: boolean;
    disabledDate?: (date: Date) => boolean;
    onChange?: (date: Date | null) => void;
    onOpenChange?: (open: boolean) => void;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    locale?: {
        months: string[];
        weekdays: string[];
        today: string;
        clear: string;
    };
}
/**
 * DatePicker - Advanced date selection interface component
 *
 * Features:
 * - Calendar popup with month/year navigation
 * - Date formatting and validation
 * - Disabled dates support
 * - Today button and clear functionality
 * - Keyboard navigation support
 * - Multiple size variants
 * - Customizable locale
 * - Accessible with ARIA attributes
 */
export declare const DatePicker: React.FC<DatePickerProps>;
