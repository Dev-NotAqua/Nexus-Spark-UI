import React from 'react';
export interface ProgressBarProps {
    percent: number;
    status?: 'normal' | 'success' | 'error' | 'warning';
    size?: 'sm' | 'md' | 'lg';
    strokeWidth?: number;
    showInfo?: boolean;
    format?: (percent: number) => React.ReactNode;
    strokeColor?: string | {
        from: string;
        to: string;
    };
    trailColor?: string;
    type?: 'line' | 'circle' | 'dashboard';
    width?: number;
    gapDegree?: number;
    gapPosition?: 'top' | 'bottom' | 'left' | 'right';
    animated?: boolean;
    className?: string;
}
/**
 * ProgressBar - Advanced visual progress representation component
 *
 * Features:
 * - Multiple types (line, circle, dashboard)
 * - Different status states (normal, success, error, warning)
 * - Customizable colors and gradients
 * - Progress text with custom formatting
 * - Animation support
 * - Multiple sizes
 * - Accessible with ARIA attributes
 */
export declare const ProgressBar: React.FC<ProgressBarProps>;
