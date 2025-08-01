import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils';

// Types
export interface Toast {
  id: string;
  title?: string;
  description?: string;
  type?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastProps extends Omit<Toast, 'id'> {
  onDismiss?: () => void;
}

export interface ToasterProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  className?: string;
}

// Context
interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  removeAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast component
export const Toast: React.FC<ToastProps & { id: string; onDismiss: () => void }> = ({
  title,
  description,
  type = 'default',
  duration = 5000,
  dismissible = true,
  action,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onDismiss, 150); // Wait for animation to complete
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'pointer-events-auto relative flex w-full max-w-sm items-center space-x-3 rounded-lg border p-4 shadow-lg transition-all',
        'transform-gpu',
        isVisible ? 'animate-in slide-in-from-top-full' : 'animate-out slide-out-to-top-full',
        getTypeStyles()
      )}
    >
      {getIcon()}
      
      <div className="flex-1 space-y-1">
        {title && (
          <div className="text-sm font-semibold text-gray-900">{title}</div>
        )}
        {description && (
          <div className="text-sm text-gray-600">{description}</div>
        )}
        {action && (
          <div className="mt-2">
            <button
              onClick={action.onClick}
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              {action.label}
            </button>
          </div>
        )}
      </div>

      {dismissible && (
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onDismiss, 150);
          }}
          className="flex-shrink-0 rounded-md p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

// Toaster component
export const Toaster: React.FC<ToasterProps> = ({
  position = 'top-right',
  className,
}) => {
  const { toasts, removeToast } = useToast();

  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      default:
        return 'top-4 right-4';
    }
  };

  return createPortal(
    <div
      className={cn(
        'fixed z-50 flex flex-col space-y-2 pointer-events-none',
        getPositionStyles(),
        className
      )}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          description={toast.description}
          type={toast.type}
          duration={toast.duration}
          dismissible={toast.dismissible}
          action={toast.action}
          onDismiss={() => removeToast(toast.id)}
        />
      ))}
    </div>,
    document.body
  );
};

// ToastProvider component
export interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { ...toast, id };
    
    setToasts((prev) => [...prev, newToast]);
    return id;
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const removeAllToasts = () => {
    setToasts([]);
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        removeAllToasts,
      }}
    >
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
};

// Convenience hook for showing toasts
export const useToastActions = () => {
  const { addToast } = useToast();

  return {
    toast: (toast: Omit<Toast, 'id'>) => addToast(toast),
    success: (title: string, description?: string) =>
      addToast({ title, description, type: 'success' }),
    error: (title: string, description?: string) =>
      addToast({ title, description, type: 'error' }),
    warning: (title: string, description?: string) =>
      addToast({ title, description, type: 'warning' }),
    info: (title: string, description?: string) =>
      addToast({ title, description, type: 'info' }),
  };
};