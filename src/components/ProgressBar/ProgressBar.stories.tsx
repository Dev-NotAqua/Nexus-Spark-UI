import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar, CircularProgress } from './ProgressBar';
import { useState, useEffect } from 'react';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Visual progress indicators including linear progress bars and circular progress rings.',
      },
    },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: {
      control: 'radio',
      options: ['small', 'default', 'large'],
    },
    variant: {
      control: 'radio',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    showLabel: { control: 'boolean' },
    showPercentage: { control: 'boolean' },
    showValue: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    striped: { control: 'boolean' },
    animated: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const AnimatedDemo = ({ 
  duration = 3000,
  ...args 
}: { duration?: number } & Partial<React.ComponentProps<typeof ProgressBar>>) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, duration / 100);

    return () => clearInterval(interval);
  }, [duration]);

  return <ProgressBar {...args} value={value} />;
};

export const Default: Story = {
  args: {
    value: 65,
    size: 'default',
    variant: 'default',
    showLabel: false,
    showPercentage: false,
    showValue: false,
    indeterminate: false,
    striped: false,
    animated: false,
  },
  render: (args) => (
    <div className="w-80 p-4">
      <ProgressBar {...args} />
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div className="w-80 space-y-6 p-4">
      <div>
        <h3 className="text-sm font-medium mb-2">With Percentage</h3>
        <ProgressBar value={75} showPercentage />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">With Custom Label</h3>
        <ProgressBar value={60} label="Download Progress" showPercentage />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">With Value Display</h3>
        <ProgressBar value={45} max={80} showValue showPercentage />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="w-80 space-y-4 p-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Default</h3>
        <ProgressBar value={70} variant="default" showPercentage />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Success</h3>
        <ProgressBar value={100} variant="success" label="Complete" showPercentage />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Warning</h3>
        <ProgressBar value={85} variant="warning" label="Almost Full" showPercentage />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Error</h3>
        <ProgressBar value={30} variant="error" label="Failed" showPercentage />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Info</h3>
        <ProgressBar value={50} variant="info" label="In Progress" showPercentage />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-80 space-y-6 p-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Small</h3>
        <ProgressBar value={60} size="small" showPercentage />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Default</h3>
        <ProgressBar value={60} size="default" showPercentage />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Large</h3>
        <ProgressBar value={60} size="large" showPercentage />
      </div>
    </div>
  ),
};

export const Striped: Story = {
  render: () => (
    <div className="w-80 space-y-6 p-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Static Stripes</h3>
        <ProgressBar value={70} size="large" striped showPercentage />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Animated Stripes</h3>
        <ProgressBar value={70} size="large" striped animated showPercentage />
      </div>
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <div className="w-80 space-y-6 p-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Loading...</h3>
        <ProgressBar value={0} indeterminate label="Processing" />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Different Variant</h3>
        <ProgressBar value={0} indeterminate variant="info" label="Uploading files" />
      </div>
    </div>
  ),
};

export const AnimatedProgress: Story = {
  render: () => (
    <div className="w-80 space-y-6 p-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Auto-animating Progress</h3>
        <AnimatedDemo showPercentage label="Loading..." />
      </div>
    </div>
  ),
};

export const CircularProgressStory: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 p-4">
      <div className="text-center">
        <h3 className="text-sm font-medium mb-4">Default</h3>
        <CircularProgress value={75} />
      </div>
      
      <div className="text-center">
        <h3 className="text-sm font-medium mb-4">Success</h3>
        <CircularProgress value={100} variant="success" label="Complete" />
      </div>
      
      <div className="text-center">
        <h3 className="text-sm font-medium mb-4">Warning</h3>
        <CircularProgress value={85} variant="warning" label="Almost Full" />
      </div>
      
      <div className="text-center">
        <h3 className="text-sm font-medium mb-4">Small Size</h3>
        <CircularProgress value={60} size={80} strokeWidth={6} />
      </div>
      
      <div className="text-center">
        <h3 className="text-sm font-medium mb-4">Large Size</h3>
        <CircularProgress value={45} size={160} strokeWidth={12} />
      </div>
      
      <div className="text-center">
        <h3 className="text-sm font-medium mb-4">Indeterminate</h3>
        <CircularProgress value={0} indeterminate label="Loading" />
      </div>
    </div>
  ),
};

export const RealWorldExamples: Story = {
  render: () => (
    <div className="w-96 space-y-8 p-4">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">File Upload</h3>
        <div className="space-y-2">
          <ProgressBar 
            value={73} 
            label="uploading-document.pdf" 
            showPercentage 
            showValue 
            max={1024} 
            variant="info"
          />
          <div className="text-xs text-gray-500">
            Uploading... 745 KB of 1 MB
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Installation Progress</h3>
        <div className="space-y-3">
          <ProgressBar value={100} variant="success" label="✓ Download packages" size="small" />
          <ProgressBar value={100} variant="success" label="✓ Install dependencies" size="small" />
          <ProgressBar value={60} variant="info" label="Installing components..." showPercentage size="small" />
          <ProgressBar value={0} label="Configure settings" size="small" />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">System Status</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <CircularProgress value={67} size={100} label="CPU" />
          </div>
          <div className="text-center">
            <CircularProgress value={45} variant="success" size={100} label="Memory" />
          </div>
          <div className="text-center">
            <CircularProgress value={89} variant="warning" size={100} label="Disk" />
          </div>
          <div className="text-center">
            <CircularProgress value={12} variant="info" size={100} label="Network" />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Import React for useState and useEffect
import React from 'react';