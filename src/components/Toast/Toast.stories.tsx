import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToastActions } from './Toast';

const meta: Meta = {
  title: 'Components/Toast',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Temporary messages that appear and disappear automatically to provide feedback to users.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Demo component to trigger toasts
const ToastDemo = () => {
  const { success, error, warning, info, toast } = useToastActions();

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Toast Notifications Demo</h2>
      
      <div className="grid grid-cols-2 gap-4 max-w-2xl">
        <button
          onClick={() => success('Success!', 'Your action was completed successfully.')}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Show Success Toast
        </button>
        
        <button
          onClick={() => error('Error!', 'Something went wrong. Please try again.')}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Show Error Toast
        </button>
        
        <button
          onClick={() => warning('Warning!', 'Please check your input before proceeding.')}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
        >
          Show Warning Toast
        </button>
        
        <button
          onClick={() => info('Info', 'Here is some helpful information.')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Show Info Toast
        </button>
        
        <button
          onClick={() => toast({
            title: 'Custom Toast',
            description: 'This is a custom toast with an action.',
            action: {
              label: 'Undo',
              onClick: () => success('Undone!', 'Action was successfully undone.')
            }
          })}
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
        >
          Toast with Action
        </button>
        
        <button
          onClick={() => toast({
            title: 'Persistent Toast',
            description: 'This toast won\'t auto-dismiss.',
            duration: 0,
          })}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Persistent Toast
        </button>
        
        <button
          onClick={() => toast({
            title: 'Quick Toast',
            description: 'This toast disappears quickly.',
            duration: 2000,
          })}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          Quick Toast (2s)
        </button>
        
        <button
          onClick={() => toast({
            title: 'Non-dismissible',
            description: 'You cannot close this toast manually.',
            dismissible: false,
            duration: 3000,
          })}
          className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
        >
          Non-dismissible Toast
        </button>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Multiple Toasts</h3>
        <button
          onClick={() => {
            success('First toast', 'This is the first toast.');
            setTimeout(() => info('Second toast', 'This is the second toast.'), 500);
            setTimeout(() => warning('Third toast', 'This is the third toast.'), 1000);
          }}
          className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
        >
          Show Multiple Toasts
        </button>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};

export const SuccessToast: Story = {
  render: () => {
    const Demo = () => {
      const { success } = useToastActions();
      
      // Auto-trigger toast on mount for demonstration
      React.useEffect(() => {
        success('Operation Successful', 'Your changes have been saved successfully.');
      }, [success]);
      
      return (
        <div className="p-8">
          <p className="text-gray-600">A success toast should appear in the top-right corner.</p>
        </div>
      );
    };
    
    return (
      <ToastProvider>
        <Demo />
      </ToastProvider>
    );
  },
};

export const ErrorToast: Story = {
  render: () => {
    const Demo = () => {
      const { error } = useToastActions();
      
      React.useEffect(() => {
        error('Operation Failed', 'There was an error processing your request. Please try again.');
      }, [error]);
      
      return (
        <div className="p-8">
          <p className="text-gray-600">An error toast should appear in the top-right corner.</p>
        </div>
      );
    };
    
    return (
      <ToastProvider>
        <Demo />
      </ToastProvider>
    );
  },
};

export const ToastWithAction: Story = {
  render: () => {
    const Demo = () => {
      const { toast, success } = useToastActions();
      
      React.useEffect(() => {
        toast({
          title: 'File Deleted',
          description: 'Your file has been moved to trash.',
          action: {
            label: 'Undo',
            onClick: () => success('Restored', 'File has been restored successfully.')
          }
        });
      }, [toast, success]);
      
      return (
        <div className="p-8">
          <p className="text-gray-600">A toast with an action button should appear. Click "Undo" to see another toast.</p>
        </div>
      );
    };
    
    return (
      <ToastProvider>
        <Demo />
      </ToastProvider>
    );
  },
};

// Import React for useEffect
import React from 'react';