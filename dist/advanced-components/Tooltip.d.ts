import React, { ReactNode } from 'react';
export interface TooltipProps {
    content: ReactNode;
    children: ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    trigger?: 'hover' | 'click' | 'focus';
    delay?: number;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'dark' | 'light';
}
/**
 * Tooltip - Advanced hoverable popup component for additional information
 *
 * Features:
 * - Multiple positioning options
 * - Multiple trigger types (hover, click, focus)
 * - Configurable delay
 * - Dark and light variants
 * - Accessible with ARIA attributes
 * - Responsive positioning
 */
export declare const Tooltip: React.FC<TooltipProps>;
