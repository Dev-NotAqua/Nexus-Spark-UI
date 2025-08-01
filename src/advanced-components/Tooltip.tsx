import React, { useState, useRef, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Tooltip.module.css';

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
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  trigger = 'hover',
  delay = 500,
  className,
  size = 'md',
  variant = 'dark'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsVisible(false);
  };

  const toggleTooltip = () => {
    if (isVisible) {
      hideTooltip();
    } else {
      showTooltip();
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      showTooltip();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      hideTooltip();
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      toggleTooltip();
    }
  };

  const handleFocus = () => {
    if (trigger === 'focus') {
      showTooltip();
    }
  };

  const handleBlur = () => {
    if (trigger === 'focus') {
      hideTooltip();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isVisible) {
      hideTooltip();
    }
  };

  return (
    <div 
      className={clsx(styles.tooltipContainer, className)}
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <div
        role="button"
        aria-describedby={isVisible ? 'tooltip' : undefined}
        aria-expanded={trigger === 'click' ? isVisible : undefined}
        tabIndex={trigger !== 'hover' ? 0 : undefined}
        className={styles.tooltipTrigger}
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          id="tooltip"
          role="tooltip"
          className={clsx(
            styles.tooltip,
            styles[position],
            styles[size],
            styles[variant]
          )}
          aria-hidden={!isVisible}
        >
          <div className={styles.tooltipContent}>
            {content}
          </div>
          <div 
            className={clsx(
              styles.tooltipArrow,
              styles[position],
              styles[variant]
            )}
          />
        </div>
      )}
    </div>
  );
};