import React, { useState, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Tabs.module.css';

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
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActiveTab,
  onTabChange,
  className,
  variant = 'default',
  size = 'md'
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (disabled) return;
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const handleKeyDown = (event: React.KeyboardEvent, tabId: string, disabled?: boolean) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTabClick(tabId, disabled);
    }
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={clsx(styles.tabsContainer, className)}>
      {/* Tab Navigation */}
      <div 
        className={clsx(
          styles.tabList,
          styles[variant],
          styles[size]
        )}
        role="tablist"
        aria-orientation="horizontal"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            aria-disabled={tab.disabled}
            tabIndex={activeTab === tab.id ? 0 : -1}
            className={clsx(
              styles.tab,
              styles[variant],
              styles[size],
              {
                [styles.active]: activeTab === tab.id,
                [styles.disabled]: tab.disabled
              }
            )}
            onClick={() => handleTabClick(tab.id, tab.disabled)}
            onKeyDown={(e) => handleKeyDown(e, tab.id, tab.disabled)}
            disabled={tab.disabled}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className={styles.tabPanel}
      >
        {activeTabContent}
      </div>
    </div>
  );
};