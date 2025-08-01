import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { Button } from '../Button/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'elevated', 'outlined'],
    },
    padding: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
    },
    hover: {
      control: 'boolean',
    },
    clickable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Card Title</h3>
        <p className="text-gray-600">This is a simple card with some content.</p>
      </div>
    ),
  },
};

export const WithSections: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <h3 className="text-lg font-semibold">Card with Sections</h3>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600 mb-4">
            This card uses the CardHeader, CardBody, and CardFooter components
            to create a structured layout.
          </p>
          <p className="text-gray-600">
            The sections are automatically styled with appropriate borders and spacing.
          </p>
        </CardBody>
        <CardFooter>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="small">Cancel</Button>
            <Button size="small">Save</Button>
          </div>
        </CardFooter>
      </>
    ),
  },
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Bordered Card</h3>
        <p className="text-gray-600">This card has a border instead of a shadow.</p>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Elevated Card</h3>
        <p className="text-gray-600">This card has a larger shadow for more prominence.</p>
      </div>
    ),
  },
};

export const Clickable: Story = {
  args: {
    clickable: true,
    hover: true,
    onClick: () => alert('Card clicked!'),
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Clickable Card</h3>
        <p className="text-gray-600">Click this card to see the interaction.</p>
      </div>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: (
      <div>
        <img 
          src="https://via.placeholder.com/400x200" 
          alt="Placeholder" 
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">Image Card</h3>
          <p className="text-gray-600">
            This card has no padding, allowing the image to extend to the edges.
          </p>
        </div>
      </div>
    ),
  },
};