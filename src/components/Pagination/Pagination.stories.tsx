import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A pagination control for navigating through pages of content with various customization options.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'default', 'large'],
    },
    showSizeChanger: {
      control: 'boolean',
    },
    showQuickJumper: {
      control: 'boolean',
    },
    showTotal: {
      control: 'boolean',
    },
    hideOnSinglePage: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    simple: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const PaginationDemo = ({ 
  total = 100,
  defaultPageSize = 10,
  ...args 
}: { total?: number; defaultPageSize?: number } & Partial<React.ComponentProps<typeof Pagination>>) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const handleChange = (page: number, size: number) => {
    setCurrent(page);
    setPageSize(size);
  };

  const handleShowSizeChange = (current: number, size: number) => {
    setCurrent(current);
    setPageSize(size);
  };

  return (
    <div className="p-4">
      <Pagination
        {...args}
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={handleChange}
        onShowSizeChange={handleShowSizeChange}
      />
      <div className="mt-4 text-sm text-gray-600">
        Current page: {current}, Page size: {pageSize}, Total: {total}
      </div>
    </div>
  );
};

export const Default: Story = {
  args: {
    showSizeChanger: false,
    showQuickJumper: false,
    showTotal: false,
    hideOnSinglePage: false,
    disabled: false,
    simple: false,
    size: 'default',
  },
  render: (args) => <PaginationDemo {...args} total={100} />,
};

export const WithSizeChanger: Story = {
  render: () => (
    <PaginationDemo
      total={200}
      showSizeChanger
      showTotal
      pageSizeOptions={['10', '20', '50', '100']}
    />
  ),
};

export const WithQuickJumper: Story = {
  render: () => (
    <PaginationDemo
      total={500}
      showQuickJumper
      showTotal
    />
  ),
};

export const FullFeatured: Story = {
  render: () => (
    <PaginationDemo
      total={1000}
      showSizeChanger
      showQuickJumper
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      pageSizeOptions={['10', '20', '50', '100']}
    />
  ),
};

export const Simple: Story = {
  render: () => (
    <PaginationDemo
      total={100}
      simple
    />
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Small</h3>
        <PaginationDemo total={50} size="small" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Default</h3>
        <PaginationDemo total={50} size="default" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Large</h3>
        <PaginationDemo total={50} size="large" />
      </div>
    </div>
  ),
};

export const WithCustomTotal: Story = {
  render: () => (
    <PaginationDemo
      total={150}
      showTotal={(total, range) => (
        <span className="font-medium text-blue-600">
          📊 Displaying {range[0]}-{range[1]} of {total} records
        </span>
      )}
    />
  ),
};

export const LargeDataset: Story = {
  render: () => (
    <PaginationDemo
      total={10000}
      defaultPageSize={50}
      showSizeChanger
      showQuickJumper
      showTotal
      pageSizeOptions={['25', '50', '100', '200']}
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <PaginationDemo
      total={100}
      disabled
      showSizeChanger
      showQuickJumper
      showTotal
    />
  ),
};

export const HideOnSinglePage: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Multiple Pages (Visible)</h3>
        <PaginationDemo total={50} hideOnSinglePage />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Single Page (Hidden)</h3>
        <PaginationDemo total={5} hideOnSinglePage />
        <p className="text-sm text-gray-500 mt-2">
          Pagination is hidden when there's only one page
        </p>
      </div>
    </div>
  ),
};

export const ResponsiveDemo: Story = {
  render: () => (
    <div className="w-full max-w-4xl p-4">
      <h3 className="text-lg font-semibold mb-4">Responsive Pagination</h3>
      <p className="text-sm text-gray-600 mb-4">
        Resize the window to see how pagination adapts to different screen sizes.
      </p>
      <PaginationDemo
        total={500}
        showSizeChanger
        showQuickJumper
        showTotal
      />
    </div>
  ),
};

// Import React for useState
import React from 'react';