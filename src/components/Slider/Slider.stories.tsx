import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';
import { useState } from 'react';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A slider component for selecting values within a range, supporting both single and range selection.',
      },
    },
  },
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    range: { control: 'boolean' },
    disabled: { control: 'boolean' },
    vertical: { control: 'boolean' },
    reverse: { control: 'boolean' },
    included: { control: 'boolean' },
    tooltip: { 
      control: 'select',
      options: [false, true, 'always']
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SliderDemo = ({ 
  value: initialValue,
  ...args 
}: { value?: number | [number, number] } & Partial<React.ComponentProps<typeof Slider>>) => {
  const [value, setValue] = useState<number | [number, number]>(initialValue || (args.range ? [20, 60] : 40));

  return (
    <div className="w-80 p-8">
      <Slider
        {...args}
        value={value}
        onChange={setValue}
      />
      <div className="mt-4 text-sm text-gray-600">
        Current value: {Array.isArray(value) ? `[${value.join(', ')}]` : value}
      </div>
    </div>
  );
};

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    range: false,
    disabled: false,
    vertical: false,
    reverse: false,
    included: true,
    tooltip: false,
  },
  render: (args) => <SliderDemo {...args} />,
};

export const Range: Story = {
  render: () => (
    <SliderDemo
      min={0}
      max={100}
      range
      tooltip
    />
  ),
};

export const WithMarks: Story = {
  render: () => (
    <SliderDemo
      min={0}
      max={100}
      marks={{ 0: '0°C', 25: '25°C', 50: '50°C', 75: '75°C', 100: '100°C' }}
      tooltip
    />
  ),
};

export const WithSteps: Story = {
  render: () => (
    <SliderDemo
      min={0}
      max={100}
      step={10}
      marks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
      tooltip
    />
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="h-80 flex justify-center items-center">
      <SliderDemo
        min={0}
        max={100}
        vertical
        tooltip
      />
    </div>
  ),
};

export const VerticalRange: Story = {
  render: () => (
    <div className="h-80 flex justify-center items-center">
      <SliderDemo
        min={0}
        max={100}
        range
        vertical
        tooltip
      />
    </div>
  ),
};

export const WithTooltipAlways: Story = {
  render: () => (
    <SliderDemo
      min={0}
      max={100}
      range
      tooltip="always"
      formatTooltip={(value) => `${value}%`}
    />
  ),
};

export const CustomFormatting: Story = {
  render: () => (
    <div className="space-y-8 w-80 p-8">
      <div>
        <h3 className="text-sm font-medium mb-4">Price Range</h3>
        <SliderDemo
          min={0}
          max={1000}
          range
          value={[100, 500]}
          tooltip
          formatTooltip={(value) => `$${value}`}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-4">Volume</h3>
        <SliderDemo
          min={0}
          max={100}
          value={75}
          tooltip
          formatTooltip={(value) => `${value}%`}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-4">Temperature</h3>
        <SliderDemo
          min={-20}
          max={40}
          value={22}
          marks={{ '-20': '-20°C', 0: '0°C', 20: '20°C', 40: '40°C' }}
          tooltip
          formatTooltip={(value) => `${value}°C`}
        />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-8 w-80 p-8">
      <div>
        <h3 className="text-sm font-medium mb-4">Single Value (Disabled)</h3>
        <SliderDemo
          min={0}
          max={100}
          value={60}
          disabled
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-4">Range (Disabled)</h3>
        <SliderDemo
          min={0}
          max={100}
          range
          value={[30, 70]}
          disabled
        />
      </div>
    </div>
  ),
};

export const Reverse: Story = {
  render: () => (
    <div className="space-y-8 w-80 p-8">
      <div>
        <h3 className="text-sm font-medium mb-4">Normal Direction</h3>
        <SliderDemo
          min={0}
          max={100}
          range
          tooltip
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-4">Reverse Direction</h3>
        <SliderDemo
          min={0}
          max={100}
          range
          reverse
          tooltip
        />
      </div>
    </div>
  ),
};

export const DifferentRanges: Story = {
  render: () => (
    <div className="space-y-8 w-80 p-8">
      <div>
        <h3 className="text-sm font-medium mb-4">0-100</h3>
        <SliderDemo min={0} max={100} tooltip />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-4">-50 to 50</h3>
        <SliderDemo min={-50} max={50} value={0} tooltip />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-4">1000-5000 (step 100)</h3>
        <SliderDemo 
          min={1000} 
          max={5000} 
          step={100} 
          value={2500}
          tooltip 
          formatTooltip={(value) => value.toLocaleString()}
        />
      </div>
    </div>
  ),
};

// Import React for useState
import React from 'react';