import React, { useState, useEffect, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Toast.module.css';

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
export const Toast: React.FC<ToastProps> = ({
  id,
  title,
  message,
  type = 'info',
  duration = 5000,
  dismissible = true,
  onDismiss,
  className
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onDismiss?.(id), 300); // Wait for animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, id, onDismiss]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss?.(id), 300); // Wait for animation
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && dismissible) {
      handleDismiss();
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={clsx(
        styles.toast,
        styles[type],
        { [styles.visible]: isVisible },
        className
      )}
      onKeyDown={handleKeyDown}
      tabIndex={dismissible ? 0 : -1}
    >
      <div className={styles.toastContent}>
        <div className={styles.toastIcon} aria-hidden="true">
          {getIcon()}
        </div>
        
        <div className={styles.toastText}>
          {title && <div className={styles.toastTitle}>{title}</div>}
          <div className={styles.toastMessage}>{message}</div>
        </div>
        
        {dismissible && (
          <button
            type="button"
            className={styles.dismissButton}
            onClick={handleDismiss}
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        )}
      </div>
      
      {duration > 0 && (
        <div 
          className={clsx(styles.progressBar, styles[type])}
          style={{
            animationDuration: `${duration}ms`
          }}
        />
      )}
    </div>
  );
};

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
export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  position = 'top-right',
  className
}) => {
  return (
    <div 
      className={clsx(
        styles.toastContainer,
        styles[position],
        className
      )}
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
        />
      ))}
    </div>
  );
};