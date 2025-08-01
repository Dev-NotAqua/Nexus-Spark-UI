import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils';

// Types
export interface TooltipProps {
  content: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  delayDuration?: number;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

// Tooltip component
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  side = 'top',
  align = 'center',
  delayDuration = 500,
  disabled = false,
  className,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    let x = 0;
    let y = 0;

    // Calculate base position based on side
    switch (side) {
      case 'top':
        x = triggerRect.left + triggerRect.width / 2;
        y = triggerRect.top - tooltipRect.height - 8;
        break;
      case 'bottom':
        x = triggerRect.left + triggerRect.width / 2;
        y = triggerRect.bottom + 8;
        break;
      case 'left':
        x = triggerRect.left - tooltipRect.width - 8;
        y = triggerRect.top + triggerRect.height / 2;
        break;
      case 'right':
        x = triggerRect.right + 8;
        y = triggerRect.top + triggerRect.height / 2;
        break;
    }

    // Adjust position based on alignment
    if (side === 'top' || side === 'bottom') {
      switch (align) {
        case 'start':
          x = triggerRect.left;
          break;
        case 'end':
          x = triggerRect.right - tooltipRect.width;
          break;
        case 'center':
        default:
          x = x - tooltipRect.width / 2;
          break;
      }
    } else {
      switch (align) {
        case 'start':
          y = triggerRect.top;
          break;
        case 'end':
          y = triggerRect.bottom - tooltipRect.height;
          break;
        case 'center':
        default:
          y = y - tooltipRect.height / 2;
          break;
      }
    }

    // Add scroll offset
    x += scrollX;
    y += scrollY;

    // Ensure tooltip stays within viewport
    const padding = 8;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    x = Math.max(padding, Math.min(x, viewportWidth - tooltipRect.width - padding));
    y = Math.max(padding, Math.min(y, viewportHeight - tooltipRect.height - padding));

    setPosition({ x, y });
  };

  const showTooltip = () => {
    if (disabled) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delayDuration);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
    }
  }, [isVisible, content]);

  useEffect(() => {
    const handleResize = () => {
      if (isVisible) {
        calculatePosition();
      }
    };

    const handleScroll = () => {
      if (isVisible) {
        calculatePosition();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible]);

  const tooltipElement = isVisible ? (
    <div
      ref={tooltipRef}
      role="tooltip"
      className={cn(
        'absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-md shadow-lg',
        'animate-in fade-in-0 zoom-in-95',
        'pointer-events-none select-none',
        className
      )}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {content}
      {/* Arrow */}
      <div
        className={cn(
          'absolute w-2 h-2 bg-gray-900 rotate-45',
          side === 'top' && 'bottom-[-4px] left-1/2 transform -translate-x-1/2',
          side === 'bottom' && 'top-[-4px] left-1/2 transform -translate-x-1/2',
          side === 'left' && 'right-[-4px] top-1/2 transform -translate-y-1/2',
          side === 'right' && 'left-[-4px] top-1/2 transform -translate-y-1/2'
        )}
      />
    </div>
  ) : null;

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>
      {tooltipElement && createPortal(tooltipElement, document.body)}
    </>
  );
};

// TooltipProvider component for managing global tooltip settings
export interface TooltipProviderProps {
  delayDuration?: number;
  children: ReactNode;
}

export const TooltipProvider: React.FC<TooltipProviderProps> = ({
  delayDuration = 500,
  children,
}) => {
  // This could be expanded to provide global tooltip context
  return <div data-tooltip-delay={delayDuration}>{children}</div>;
};