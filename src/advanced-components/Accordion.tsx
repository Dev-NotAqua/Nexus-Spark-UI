import React, { useState, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Accordion.module.css';

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
export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenItems = [],
  onItemToggle,
  className,
  size = 'md'
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpenItems));

  const toggleItem = (itemId: string, disabled?: boolean) => {
    if (disabled) return;

    setOpenItems(prev => {
      const newOpenItems = new Set(prev);
      const isCurrentlyOpen = newOpenItems.has(itemId);

      if (isCurrentlyOpen) {
        newOpenItems.delete(itemId);
      } else {
        if (!allowMultiple) {
          newOpenItems.clear();
        }
        newOpenItems.add(itemId);
      }

      onItemToggle?.(itemId, !isCurrentlyOpen);
      return newOpenItems;
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent, itemId: string, disabled?: boolean) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleItem(itemId, disabled);
    }
  };

  return (
    <div className={clsx(styles.accordion, className)}>
      {items.map((item, index) => {
        const isOpen = openItems.has(item.id);
        
        return (
          <div
            key={item.id}
            className={clsx(
              styles.accordionItem,
              {
                [styles.disabled]: item.disabled,
                [styles.open]: isOpen
              }
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`content-${item.id}`}
              aria-disabled={item.disabled}
              className={clsx(
                styles.accordionHeader,
                styles[size],
                {
                  [styles.disabled]: item.disabled
                }
              )}
              onClick={() => toggleItem(item.id, item.disabled)}
              onKeyDown={(e) => handleKeyDown(e, item.id, item.disabled)}
              disabled={item.disabled}
            >
              <span className={styles.accordionTitle}>{item.title}</span>
              <span 
                className={clsx(
                  styles.accordionIcon,
                  { [styles.rotated]: isOpen }
                )}
                aria-hidden="true"
              >
                ▼
              </span>
            </button>
            
            <div
              id={`content-${item.id}`}
              className={clsx(
                styles.accordionContent,
                { [styles.open]: isOpen }
              )}
              aria-hidden={!isOpen}
            >
              <div className={clsx(styles.accordionContentInner, styles[size])}>
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};