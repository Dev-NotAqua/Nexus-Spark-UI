import React from 'react';
export interface SliderProps {
    min?: number;
    max?: number;
    step?: number;
    value?: number | [number, number];
    defaultValue?: number | [number, number];
    range?: boolean;
    disabled?: boolean;
    vertical?: boolean;
    marks?: Record<number, React.ReactNode> | number[];
    included?: boolean;
    tooltipVisible?: boolean;
    tooltipFormatter?: (value: number) => React.ReactNode;
    onChange?: (value: number | [number, number]) => void;
    onAfterChange?: (value: number | [number, number]) => void;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}
/**
 * Slider - Advanced value selection within range component
 *
 * Features:
 * - Single and range selection modes
 * - Vertical and horizontal orientations
 * - Custom step values and marks
 * - Tooltip display with custom formatting
 * - Keyboard navigation support
 * - Touch/mobile support
 * - Accessible with ARIA attributes
 * - Multiple size variants
 */
export declare const Slider: React.FC<SliderProps>;
