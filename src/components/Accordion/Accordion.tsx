import React, { useState, createContext, useContext, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils';

// Types
export interface AccordionProps {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  className?: string;
  children: ReactNode;
}

export interface AccordionItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export interface AccordionTriggerProps {
  className?: string;
  children: ReactNode;
}

export interface AccordionContentProps {
  className?: string;
  children: ReactNode;
}

// Context
interface AccordionContextType {
  type: 'single' | 'multiple';
  value: string | string[];
  onValueChange: (itemValue: string) => void;
  collapsible: boolean;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

interface AccordionItemContextType {
  value: string;
  isOpen: boolean;
  disabled: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextType | undefined>(undefined);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion component');
  }
  return context;
};

const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('AccordionTrigger and AccordionContent must be used within an AccordionItem component');
  }
  return context;
};

// Main Accordion component
export const Accordion: React.FC<AccordionProps> = ({
  type = 'single',
  collapsible = false,
  defaultValue,
  value,
  onValueChange,
  className,
  children,
}) => {
  const [internalValue, setInternalValue] = useState<string | string[]>(
    defaultValue || (type === 'multiple' ? [] : '')
  );

  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = (itemValue: string) => {
    let newValue: string | string[];

    if (type === 'single') {
      const currentSingle = currentValue as string;
      newValue = currentSingle === itemValue && collapsible ? '' : itemValue;
    } else {
      const currentMultiple = currentValue as string[];
      newValue = currentMultiple.includes(itemValue)
        ? currentMultiple.filter(v => v !== itemValue)
        : [...currentMultiple, itemValue];
    }

    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <AccordionContext.Provider
      value={{
        type,
        value: currentValue,
        onValueChange: handleValueChange,
        collapsible,
      }}
    >
      <div className={cn('space-y-2', className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

// AccordionItem component
export const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  disabled = false,
  className,
  children,
}) => {
  const { value: accordionValue, type } = useAccordionContext();
  
  const isOpen = type === 'single' 
    ? accordionValue === value 
    : (accordionValue as string[]).includes(value);

  return (
    <AccordionItemContext.Provider
      value={{
        value,
        isOpen,
        disabled,
      }}
    >
      <div
        className={cn(
          'border border-gray-200 rounded-lg overflow-hidden',
          disabled && 'opacity-50',
          className
        )}
        data-state={isOpen ? 'open' : 'closed'}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

// AccordionTrigger component
export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  className,
  children,
}) => {
  const { onValueChange } = useAccordionContext();
  const { value, isOpen, disabled } = useAccordionItemContext();

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={`accordion-content-${value}`}
      disabled={disabled}
      onClick={() => !disabled && onValueChange(value)}
      className={cn(
        'flex w-full items-center justify-between px-4 py-3 text-left',
        'bg-gray-50 hover:bg-gray-100 transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
        'disabled:cursor-not-allowed disabled:hover:bg-gray-50',
        className
      )}
    >
      <span className="font-medium text-gray-900">{children}</span>
      <ChevronDown
        className={cn(
          'h-4 w-4 text-gray-500 transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
    </button>
  );
};

// AccordionContent component
export const AccordionContent: React.FC<AccordionContentProps> = ({
  className,
  children,
}) => {
  const { value, isOpen } = useAccordionItemContext();

  return (
    <div
      id={`accordion-content-${value}`}
      className={cn(
        'overflow-hidden transition-all duration-200',
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      )}
    >
      <div className={cn('px-4 py-3 text-gray-700', className)}>
        {children}
      </div>
    </div>
  );
};