import type { Meta, StoryObj } from '@storybook/react';
import { Table, type Column } from './Table';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A table component for displaying structured data with sorting, pagination, and customization options.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'middle', 'large'],
    },
    bordered: {
      control: 'boolean',
    },
    hoverable: {
      control: 'boolean',
    },
    striped: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastLogin: string;
}

const sampleData: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-01',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'active',
    joinDate: '2023-03-20',
    lastLogin: '2023-12-28',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Moderator',
    status: 'inactive',
    joinDate: '2023-02-10',
    lastLogin: '2023-11-15',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'User',
    status: 'pending',
    joinDate: '2023-12-01',
    lastLogin: 'Never',
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2022-11-05',
    lastLogin: '2024-01-02',
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

const basicColumns: Column<User>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sorter: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    sorter: true,
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    render: (status) => <StatusBadge status={status} />,
    sorter: true,
  },
  {
    key: 'joinDate',
    title: 'Join Date',
    dataIndex: 'joinDate',
    sorter: (a, b) => new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime(),
  },
];

export const Default: Story = {
  args: {
    size: 'middle',
    bordered: false,
    hoverable: true,
    striped: false,
    loading: false,
  },
  render: (args) => (
    <div className="w-full max-w-4xl">
      <Table
        {...args}
        columns={basicColumns}
        dataSource={sampleData}
        rowKey="id"
      />
    </div>
  ),
};

export const WithActions: Story = {
  render: () => {
    const columnsWithActions: Column<User>[] = [
      ...basicColumns,
      {
        key: 'actions',
        title: 'Actions',
        render: (_) => (
          <div className="space-x-2">
            <button className="text-blue-600 hover:text-blue-800 text-sm">
              Edit
            </button>
            <button className="text-red-600 hover:text-red-800 text-sm">
              Delete
            </button>
          </div>
        ),
        align: 'right',
      },
    ];

    return (
      <div className="w-full max-w-5xl">
        <Table
          columns={columnsWithActions}
          dataSource={sampleData}
          rowKey="id"
          hoverable
        />
      </div>
    );
  },
};

export const Bordered: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Table
        columns={basicColumns}
        dataSource={sampleData}
        rowKey="id"
        bordered
        hoverable
      />
    </div>
  ),
};

export const Striped: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Table
        columns={basicColumns}
        dataSource={sampleData}
        rowKey="id"
        striped
        hoverable
      />
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold mb-2">Small</h3>
        <Table
          columns={basicColumns}
          dataSource={sampleData.slice(0, 3)}
          rowKey="id"
          size="small"
          bordered
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Middle (Default)</h3>
        <Table
          columns={basicColumns}
          dataSource={sampleData.slice(0, 3)}
          rowKey="id"
          size="middle"
          bordered
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Large</h3>
        <Table
          columns={basicColumns}
          dataSource={sampleData.slice(0, 3)}
          rowKey="id"
          size="large"
          bordered
        />
      </div>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Table
        columns={basicColumns}
        dataSource={[]}
        rowKey="id"
        loading
      />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Table
        columns={basicColumns}
        dataSource={[]}
        rowKey="id"
        emptyText={
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">📭</div>
            <div className="text-gray-500">No users found</div>
            <div className="text-gray-400 text-sm">Try adjusting your search criteria</div>
          </div>
        }
      />
    </div>
  ),
};

export const CustomRowProps: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Table
        columns={basicColumns}
        dataSource={sampleData}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => alert(`Clicked on ${record.name}`),
          className: record.status === 'inactive' ? 'opacity-60' : '',
          style: { cursor: 'pointer' },
        })}
        hoverable
      />
    </div>
  ),
};