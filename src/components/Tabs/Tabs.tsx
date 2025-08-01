import React, { useState, createContext, useContext, ReactNode } from 'react';
import { cn } from '../../utils';

// Types
export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  children: ReactNode;
}

export interface TabsListProps {
  className?: string;
  children: ReactNode;
}

export interface TabsTriggerProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export interface TabsContentProps {
  value: string;
  className?: string;
  children: ReactNode;
}

// Context
interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs component');
  }
  return context;
};

// Main Tabs component
export const Tabs: React.FC<TabsProps> = ({
  defaultValue = '',
  value,
  onValueChange,
  orientation = 'horizontal',
  className,
  children,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  
  const currentValue = value !== undefined ? value : internalValue;
  const handleValueChange = onValueChange || setInternalValue;

  return (
    <TabsContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        orientation,
      }}
    >
      <div
        className={cn(
          'tabs-root',
          orientation === 'vertical' && 'flex',
          className
        )}
        data-orientation={orientation}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// TabsList component
export const TabsList: React.FC<TabsListProps> = ({ className, children }) => {
  const { orientation } = useTabsContext();

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        'inline-flex items-center justify-center rounded-lg bg-gray-100 p-1',
        orientation === 'horizontal' ? 'h-9 w-full' : 'flex-col h-auto w-48',
        className
      )}
    >
      {children}
    </div>
  );
};

// TabsTrigger component
export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  disabled = false,
  className,
  children,
}) => {
  const { value: selectedValue, onValueChange, orientation } = useTabsContext();
  const isSelected = selectedValue === value;

  return (
    <button
      role="tab"
      aria-selected={isSelected}
      aria-controls={`tabpanel-${value}`}
      disabled={disabled}
      onClick={() => !disabled && onValueChange(value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-white transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        orientation === 'horizontal' ? 'flex-1' : 'w-full mb-1',
        isSelected
          ? 'bg-white text-gray-900 shadow'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
        className
      )}
    >
      {children}
    </button>
  );
};

// TabsContent component
export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  className,
  children,
}) => {
  const { value: selectedValue } = useTabsContext();
  const isSelected = selectedValue === value;

  if (!isSelected) return null;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={cn(
        'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        className
      )}
    >
      {children}
    </div>
  );
};