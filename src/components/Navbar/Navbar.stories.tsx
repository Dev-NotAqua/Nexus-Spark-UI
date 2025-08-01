import type { Meta, StoryObj } from '@storybook/react';
import { Navbar, NavItem } from './Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dark', 'transparent'],
    },
    position: {
      control: 'select',
      options: ['static', 'fixed', 'sticky'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleNavItems: NavItem[] = [
  { label: 'Home', href: '/', active: true },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

const moreNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', active: true },
  { label: 'Projects', href: '/projects' },
  { label: 'Team', href: '/team' },
  { label: 'Settings', href: '/settings' },
  { label: 'Help', href: '/help' },
  { label: 'Disabled', href: '/disabled', disabled: true },
];

export const Default: Story = {
  args: {
    brand: (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded"></div>
        <span className="text-xl font-bold text-gray-900">Brand</span>
      </div>
    ),
    items: sampleNavItems,
  },
};

export const WithClickHandlers: Story = {
  args: {
    brand: (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded"></div>
        <span className="text-xl font-bold text-gray-900">MyApp</span>
      </div>
    ),
    items: [
      { label: 'Dashboard', onClick: () => alert('Dashboard clicked'), active: true },
      { label: 'Analytics', onClick: () => alert('Analytics clicked') },
      { label: 'Reports', onClick: () => alert('Reports clicked') },
      { label: 'Settings', onClick: () => alert('Settings clicked') },
    ],
    onBrandClick: () => alert('Brand clicked'),
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    brand: (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-500 rounded"></div>
        <span className="text-xl font-bold text-white">DarkApp</span>
      </div>
    ),
    items: sampleNavItems,
  },
};

export const Transparent: Story = {
  args: {
    variant: 'transparent',
    brand: (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded"></div>
        <span className="text-xl font-bold text-gray-900">TransparentNav</span>
      </div>
    ),
    items: sampleNavItems,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '100vh',
          padding: 0,
        }}
      >
        <Story />
        <div className="p-8 text-white">
          <h1 className="text-3xl font-bold mb-4">Content below navbar</h1>
          <p>This demonstrates how the transparent navbar looks over content.</p>
        </div>
      </div>
    ),
  ],
};

export const ManyItems: Story = {
  args: {
    brand: (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-green-600 rounded"></div>
        <span className="text-xl font-bold text-gray-900">BigNav</span>
      </div>
    ),
    items: moreNavItems,
  },
};

export const BrandOnly: Story = {
  args: {
    brand: (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-purple-600 rounded"></div>
        <span className="text-xl font-bold text-gray-900">SimpleBrand</span>
      </div>
    ),
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    brand: (
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-blue-600 rounded"></div>
        <span className="text-lg font-bold text-gray-900">Small</span>
      </div>
    ),
    items: sampleNavItems,
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    brand: (
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-blue-600 rounded"></div>
        <span className="text-2xl font-bold text-gray-900">Large</span>
      </div>
    ),
    items: sampleNavItems,
  },
};