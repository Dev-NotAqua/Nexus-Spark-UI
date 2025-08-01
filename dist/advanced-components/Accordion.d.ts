import React, { ReactNode } from 'react';
export interface AccordionItem {
    id: string;
    title: string;
    content: ReactNode;
    disabled?: boolean;
}
export interface AccordionProps {
    items: AccordionItem[];
    allowMultiple?: boolean;
    defaultOpenItems?: string[];
    onItemToggle?: (itemId: string, isOpen: boolean) => void;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}
/**
 * Accordion - Advanced collapsible section interface component
 *
 * Features:
 * - Single or multiple item expansion
 * - Keyboard navigation support
 * - Disabled items support
 * - Controlled and uncontrolled modes
 * - Accessible with ARIA attributes
 * - Smooth animations
 */
export declare const Accordion: React.FC<AccordionProps>;
