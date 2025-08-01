import React, { ReactNode } from 'react';
export interface TabItem {
    id: string;
    label: string;
    content: ReactNode;
    disabled?: boolean;
}
export interface TabsProps {
    tabs: TabItem[];
    defaultActiveTab?: string;
    onTabChange?: (tabId: string) => void;
    className?: string;
    variant?: 'default' | 'pills' | 'underline';
    size?: 'sm' | 'md' | 'lg';
}
/**
 * Tabs - Advanced tabbed navigation interface component
 *
 * Features:
 * - Multiple visual variants (default, pills, underline)
 * - Keyboard navigation support
 * - Disabled tabs support
 * - Controlled and uncontrolled modes
 * - Accessible with ARIA attributes
 */
export declare const Tabs: React.FC<TabsProps>;
