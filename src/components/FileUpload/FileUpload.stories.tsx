import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload, type FileItem } from './FileUpload';
import { useState } from 'react';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A file input component with drag and drop support, progress tracking, and file validation.',
      },
    },
  },
  argTypes: {
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showProgress: { control: 'boolean' },
    showPreview: { control: 'boolean' },
    maxFiles: { control: 'number' },
    maxSize: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const FileUploadDemo = ({ 
  value: initialValue = [],
  ...args 
}: { value?: FileItem[] } & Partial<React.ComponentProps<typeof FileUpload>>) => {
  const [files, setFiles] = useState<FileItem[]>(initialValue);

  const handleUpload = async (uploadFiles: File[]) => {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Files uploaded:', uploadFiles.map(f => f.name));
  };

  return (
    <div className="w-96 p-4">
      <FileUpload
        {...args}
        value={files}
        onChange={setFiles}
        onUpload={handleUpload}
      />
      
      {files.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded border text-sm">
          <strong>File State:</strong>
          <pre className="mt-2 text-xs overflow-auto">
            {JSON.stringify(files.map(f => ({
              name: f.file.name,
              status: f.status,
              progress: f.progress,
              error: f.error
            })), null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export const Default: Story = {
  args: {
    multiple: false,
    disabled: false,
    showProgress: true,
    showPreview: true,
    maxFiles: 10,
    maxSize: 10 * 1024 * 1024, // 10MB
  },
  render: (args) => <FileUploadDemo {...args} />,
};

export const Multiple: Story = {
  render: () => (
    <FileUploadDemo
      multiple
      maxFiles={5}
      accept="image/*,.pdf,.doc,.docx"
    />
  ),
};

export const ImageOnly: Story = {
  render: () => (
    <FileUploadDemo
      multiple
      accept="image/*"
      maxSize={5 * 1024 * 1024} // 5MB
      maxFiles={3}
    />
  ),
};

export const DocumentsOnly: Story = {
  render: () => (
    <FileUploadDemo
      multiple
      accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
      maxSize={20 * 1024 * 1024} // 20MB
      showPreview={false}
    />
  ),
};

export const SingleFile: Story = {
  render: () => (
    <FileUploadDemo
      multiple={false}
      accept="image/*"
      maxSize={2 * 1024 * 1024} // 2MB
    />
  ),
};

export const WithoutProgress: Story = {
  render: () => (
    <FileUploadDemo
      multiple
      showProgress={false}
    />
  ),
};

export const WithoutPreview: Story = {
  render: () => (
    <FileUploadDemo
      multiple
      showPreview={false}
      accept="*/*"
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <FileUploadDemo
      disabled
      multiple
    />
  ),
};

export const LargeFiles: Story = {
  render: () => (
    <FileUploadDemo
      multiple
      maxSize={100 * 1024 * 1024} // 100MB
      maxFiles={2}
      accept=".zip,.rar,.tar,.gz,.mp4,.avi,.mov"
    />
  ),
};

export const FormIntegration: Story = {
  render: () => (
    <div className="w-96 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Submit Documents</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Application Form
          </label>
          <FileUploadDemo
            multiple={false}
            accept=".pdf"
            maxSize={5 * 1024 * 1024}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Supporting Documents
          </label>
          <FileUploadDemo
            multiple
            accept=".pdf,.doc,.docx,.jpg,.png"
            maxFiles={5}
            maxSize={10 * 1024 * 1024}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Photo
          </label>
          <FileUploadDemo
            multiple={false}
            accept="image/*"
            maxSize={2 * 1024 * 1024}
          />
        </div>
        
        <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Submit Application
        </button>
      </div>
    </div>
  ),
};

export const FileTypes: Story = {
  render: () => (
    <div className="space-y-8 w-96 p-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Images Only</h3>
        <FileUploadDemo
          accept="image/*"
          multiple
          maxFiles={3}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">PDFs Only</h3>
        <FileUploadDemo
          accept=".pdf"
          multiple
          maxFiles={2}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Videos Only</h3>
        <FileUploadDemo
          accept="video/*"
          multiple={false}
          maxSize={50 * 1024 * 1024} // 50MB
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Any File Type</h3>
        <FileUploadDemo
          accept="*/*"
          multiple
          maxFiles={5}
        />
      </div>
    </div>
  ),
};

export const ErrorHandling: Story = {
  render: () => {
    const [files, setFiles] = useState<FileItem[]>([]);

    const handleUpload = async () => {
      // Simulate random failures
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (Math.random() > 0.5) {
        throw new Error('Upload failed: Server error');
      }
    };

    return (
      <div className="w-96 p-4">
        <h3 className="text-sm font-medium mb-2">
          Upload with Random Failures
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          50% chance of upload failure to demonstrate error handling
        </p>
        
        <FileUpload
          multiple
          value={files}
          onChange={setFiles}
          onUpload={handleUpload}
          maxFiles={3}
        />
      </div>
    );
  },
};

// Import React for useState
import React from 'react';