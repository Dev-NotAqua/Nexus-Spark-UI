import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A tabbed navigation interface for organizing content into separate views.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    defaultValue: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'tab1',
    orientation: 'horizontal',
  },
  render: (args) => (
    <Tabs {...args} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
        <TabsTrigger value="tab3">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="space-y-2">
        <h3 className="text-lg font-semibold">Account</h3>
        <p className="text-sm text-gray-600">
          Make changes to your account here. Click save when you're done.
        </p>
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Your name"
          />
        </div>
      </TabsContent>
      <TabsContent value="tab2" className="space-y-2">
        <h3 className="text-lg font-semibold">Password</h3>
        <p className="text-sm text-gray-600">
          Change your password here. After saving, you'll be logged out.
        </p>
        <div className="space-y-2">
          <label className="text-sm font-medium">Current password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Current password"
          />
        </div>
      </TabsContent>
      <TabsContent value="tab3" className="space-y-2">
        <h3 className="text-lg font-semibold">Settings</h3>
        <p className="text-sm text-gray-600">
          Configure your preferences and settings here.
        </p>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm">Enable notifications</span>
          </label>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const Vertical: Story = {
  args: {
    defaultValue: 'overview',
    orientation: 'vertical',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="flex-1 ml-4">
        <h3 className="text-lg font-semibold mb-2">Overview</h3>
        <p className="text-sm text-gray-600">
          Get a quick overview of your dashboard and key metrics.
        </p>
      </TabsContent>
      <TabsContent value="analytics" className="flex-1 ml-4">
        <h3 className="text-lg font-semibold mb-2">Analytics</h3>
        <p className="text-sm text-gray-600">
          View detailed analytics and performance data.
        </p>
      </TabsContent>
      <TabsContent value="reports" className="flex-1 ml-4">
        <h3 className="text-lg font-semibold mb-2">Reports</h3>
        <p className="text-sm text-gray-600">
          Generate and download various reports.
        </p>
      </TabsContent>
      <TabsContent value="notifications" className="flex-1 ml-4">
        <h3 className="text-lg font-semibold mb-2">Notifications</h3>
        <p className="text-sm text-gray-600">
          Manage your notification preferences.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  args: {
    defaultValue: 'active',
  },
  render: (args) => (
    <Tabs {...args} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="enabled">Enabled</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <p className="text-sm text-gray-600">This tab is active and clickable.</p>
      </TabsContent>
      <TabsContent value="disabled">
        <p className="text-sm text-gray-600">This content is for disabled tab.</p>
      </TabsContent>
      <TabsContent value="enabled">
        <p className="text-sm text-gray-600">This tab is enabled and clickable.</p>
      </TabsContent>
    </Tabs>
  ),
};