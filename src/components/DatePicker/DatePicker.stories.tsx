import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import { useState } from 'react';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A date selection interface with calendar popup and optional time picker.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    showTime: { control: 'boolean' },
    clearable: { control: 'boolean' },
    size: {
      control: 'radio',
      options: ['small', 'default', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DatePickerDemo = ({ 
  value: initialValue,
  ...args 
}: { value?: Date } & Partial<React.ComponentProps<typeof DatePicker>>) => {
  const [value, setValue] = useState<Date | null>(initialValue || null);

  return (
    <div className="w-80 p-4">
      <DatePicker
        {...args}
        value={value || undefined}
        onChange={setValue}
      />
      <div className="mt-4 text-sm text-gray-600">
        Selected: {value ? value.toLocaleString() : 'None'}
      </div>
    </div>
  );
};

export const Default: Story = {
  args: {
    placeholder: 'Select a date',
    disabled: false,
    showTime: false,
    clearable: true,
    size: 'default',
  },
  render: (args) => <DatePickerDemo {...args} />,
};

export const WithTime: Story = {
  render: () => (
    <DatePickerDemo
      placeholder="Select date and time"
      showTime
    />
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <DatePickerDemo
      value={new Date()}
      placeholder="Select a date"
    />
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Small</h3>
        <DatePickerDemo size="small" placeholder="Small date picker" />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Default</h3>
        <DatePickerDemo size="default" placeholder="Default date picker" />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Large</h3>
        <DatePickerDemo size="large" placeholder="Large date picker" />
      </div>
    </div>
  ),
};

export const WithConstraints: Story = {
  render: () => {
    const today = new Date();
    const minDate = new Date();
    minDate.setDate(today.getDate() - 7); // 7 days ago
    
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30); // 30 days from now
    
    return (
      <div className="space-y-6 p-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Date Range Restricted</h3>
          <p className="text-xs text-gray-500 mb-2">
            Can only select dates from 7 days ago to 30 days from now
          </p>
          <DatePickerDemo
            minDate={minDate}
            maxDate={maxDate}
            placeholder="Select within range"
          />
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <DatePickerDemo
      disabled
      placeholder="Disabled date picker"
      value={new Date()}
    />
  ),
};

export const NotClearable: Story = {
  render: () => (
    <DatePickerDemo
      clearable={false}
      value={new Date()}
      placeholder="Cannot be cleared"
    />
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="w-96 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Event Details</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Name
          </label>
          <input
            type="text"
            placeholder="Enter event name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <DatePickerDemo placeholder="Select start date" showTime />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <DatePickerDemo placeholder="Select end date" showTime />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Registration Deadline
          </label>
          <DatePickerDemo placeholder="Select deadline" />
        </div>
        
        <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Create Event
        </button>
      </div>
    </div>
  ),
};

// Import React for useState
import React from 'react';