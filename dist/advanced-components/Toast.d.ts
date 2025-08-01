import React, { ReactNode } from 'react';
export interface ToastProps {
    id: string;
    title?: string;
    message: ReactNode;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    dismissible?: boolean;
    onDismiss?: (id: string) => void;
    className?: string;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}
export interface ToastContainerProps {
    toasts: ToastProps[];
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
    className?: string;
}
/**
 * Toast - Individual toast notification component
 */
export declare const Toast: React.FC<ToastProps>;
/**
 * ToastContainer - Container component for managing multiple toast notifications
 *
 * Features:
 * - Multiple positioning options
 * - Auto-dismissal with configurable duration
 * - Manual dismissal support
 * - Different notification types (success, error, warning, info)
 * - Progress bars for duration indication
 * - Accessible with ARIA attributes
 * - Smooth animations
 */
export declare const ToastContainer: React.FC<ToastContainerProps>;
