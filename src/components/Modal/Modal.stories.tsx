import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'fullscreen'],
    },
    showCloseButton: {
      control: 'boolean',
    },
    closeOnBackdropClick: {
      control: 'boolean',
    },
    closeOnEscape: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {args.children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: ModalWrapper,
  args: {
    title: 'Modal Title',
    children: (
      <div>
        <p className="mb-4">This is the modal content. You can put any content here.</p>
        <p>The modal can be closed by clicking the X button, pressing Escape, or clicking outside the modal.</p>
      </div>
    ),
  },
};

export const WithoutTitle: Story = {
  render: ModalWrapper,
  args: {
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-4">Custom Content</h3>
        <p>This modal doesn't have a title prop, so it only shows the close button.</p>
      </div>
    ),
  },
};

export const Small: Story = {
  render: ModalWrapper,
  args: {
    title: 'Small Modal',
    size: 'small',
    children: <p>This is a small modal with limited width.</p>,
  },
};

export const Large: Story = {
  render: ModalWrapper,
  args: {
    title: 'Large Modal',
    size: 'large',
    children: (
      <div>
        <p className="mb-4">This is a large modal with more width for larger content.</p>
        <p className="mb-4">You can use this for forms, detailed information, or any content that needs more space.</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded">Column 1</div>
          <div className="bg-gray-100 p-4 rounded">Column 2</div>
        </div>
      </div>
    ),
  },
};

export const NoCloseButton: Story = {
  render: ModalWrapper,
  args: {
    title: 'No Close Button',
    showCloseButton: false,
    children: (
      <div>
        <p className="mb-4">This modal doesn't have a close button.</p>
        <p>It can only be closed by clicking outside or pressing Escape.</p>
      </div>
    ),
  },
};