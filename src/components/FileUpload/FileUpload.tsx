import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, File, Image, CheckCircle, AlertCircle } from 'lucide-react';
import { cn, formatFileSize } from '../../utils';

// Types
export interface FileItem {
  id: string;
  file: File;
  status: 'uploading' | 'success' | 'error' | 'pending';
  progress?: number;
  error?: string;
}

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  disabled?: boolean;
  value?: FileItem[];
  onChange?: (files: FileItem[]) => void;
  onUpload?: (files: File[]) => Promise<void>;
  onRemove?: (fileId: string) => void;
  showProgress?: boolean;
  showPreview?: boolean;
  className?: string;
  dropzoneClassName?: string;
  listClassName?: string;
}

// FileUpload component
export const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 10,
  disabled = false,
  value = [],
  onChange,
  onUpload,
  onRemove,
  showProgress = true,
  showPreview = true,
  className,
  dropzoneClassName,
  listClassName,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<FileItem[]>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateFiles = useCallback((newFiles: FileItem[]) => {
    setFiles(newFiles);
    onChange?.(newFiles);
  }, [onChange]);

  const generateFileId = () => Math.random().toString(36).substr(2, 9);

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `File size exceeds ${formatFileSize(maxSize)}`;
    }

    if (accept && !isFileTypeAccepted(file, accept)) {
      return `File type not accepted. Accepted types: ${accept}`;
    }

    return null;
  };

  const isFileTypeAccepted = (file: File, acceptedTypes: string): boolean => {
    const types = acceptedTypes.split(',').map(type => type.trim());
    
    return types.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      }
      
      if (type.includes('*')) {
        const baseType = type.replace('*', '');
        return file.type.startsWith(baseType);
      }
      
      return file.type === type;
    });
  };

  const processFiles = async (fileList: FileList | File[]) => {
    const filesToProcess = Array.from(fileList);
    const currentFileCount = files.length;
    
    if (!multiple && filesToProcess.length > 1) {
      filesToProcess.splice(1);
    }
    
    if (maxFiles && currentFileCount + filesToProcess.length > maxFiles) {
      const allowedCount = maxFiles - currentFileCount;
      filesToProcess.splice(allowedCount);
    }

    const newFiles: FileItem[] = filesToProcess.map(file => {
      const error = validateFile(file);
      return {
        id: generateFileId(),
        file,
        status: error ? 'error' : 'pending',
        error: error || undefined,
        progress: 0,
      };
    });

    const validFiles = newFiles.filter(f => f.status !== 'error');
    const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
    
    updateFiles(updatedFiles);

    if (onUpload && validFiles.length > 0) {
      try {
        // Update status to uploading
        const uploadingFiles = updatedFiles.map(f => 
          validFiles.some(vf => vf.id === f.id) 
            ? { ...f, status: 'uploading' as const, progress: 0 }
            : f
        );
        updateFiles(uploadingFiles);

        // Simulate upload progress
        const filesToUpload = validFiles.map(f => f.file);
        
        // This is a simulation - in real implementation, you'd track actual upload progress
        for (let progress = 10; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100));
          const progressFiles = uploadingFiles.map(f => 
            validFiles.some(vf => vf.id === f.id) 
              ? { ...f, progress }
              : f
          );
          updateFiles(progressFiles);
        }

        await onUpload(filesToUpload);

        // Mark as successful
        const successFiles = uploadingFiles.map(f => 
          validFiles.some(vf => vf.id === f.id) 
            ? { ...f, status: 'success' as const, progress: 100 }
            : f
        );
        updateFiles(successFiles);

      } catch (error) {
        // Mark as error
        const errorFiles = updatedFiles.map(f => 
          validFiles.some(vf => vf.id === f.id) 
            ? { ...f, status: 'error' as const, error: error instanceof Error ? error.message : 'Upload failed' }
            : f
        );
        updateFiles(errorFiles);
      }
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);

    if (disabled) return;

    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      processFiles(droppedFiles);
    }
  };

  const handleRemoveFile = (fileId: string) => {
    const updatedFiles = files.filter(f => f.id !== fileId);
    updateFiles(updatedFiles);
    onRemove?.(fileId);
  };

  const openFileDialog = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-5 h-5" />;
    }
    return <File className="w-5 h-5" />;
  };

  const getStatusIcon = (status: FileItem['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'uploading':
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      default:
        return null;
    }
  };

  const renderPreview = (fileItem: FileItem) => {
    if (!showPreview || !fileItem.file.type.startsWith('image/')) {
      return null;
    }

    const url = URL.createObjectURL(fileItem.file);
    
    return (
      <img
        src={url}
        alt={fileItem.file.name}
        className="w-12 h-12 object-cover rounded"
        onLoad={() => URL.revokeObjectURL(url)}
      />
    );
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Dropzone */}
      <div
        className={cn(
          'relative border-2 border-dashed rounded-lg p-6 text-center transition-colors',
          isDragOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400',
          disabled && 'opacity-50 cursor-not-allowed',
          !disabled && 'cursor-pointer hover:bg-gray-50',
          dropzoneClassName
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={disabled}
          className="hidden"
        />

        <div className="flex flex-col items-center">
          <Upload className={cn(
            'w-12 h-12 mb-4',
            isDragOver ? 'text-blue-500' : 'text-gray-400'
          )} />
          
          <p className="text-lg font-medium text-gray-900 mb-2">
            {isDragOver ? 'Drop files here' : 'Choose files or drag and drop'}
          </p>
          
          <p className="text-sm text-gray-500">
            {accept && `Accepted formats: ${accept}`}
            {maxSize && ` • Max size: ${formatFileSize(maxSize)}`}
            {maxFiles && ` • Max files: ${maxFiles}`}
          </p>
        </div>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className={cn('mt-4 space-y-2', listClassName)}>
          {files.map((fileItem) => (
            <div
              key={fileItem.id}
              className="flex items-center p-3 bg-gray-50 rounded-lg border"
            >
              {/* Preview or icon */}
              <div className="flex-shrink-0 mr-3">
                {renderPreview(fileItem) || (
                  <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                    {getFileIcon(fileItem.file)}
                  </div>
                )}
              </div>

              {/* File info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {fileItem.file.name}
                  </p>
                  <div className="flex items-center ml-2">
                    {getStatusIcon(fileItem.status)}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(fileItem.id);
                      }}
                      className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                      type="button"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    {formatFileSize(fileItem.file.size)}
                  </p>
                  
                  {fileItem.status === 'error' && fileItem.error && (
                    <p className="text-xs text-red-500 truncate">
                      {fileItem.error}
                    </p>
                  )}
                </div>

                {/* Progress bar */}
                {showProgress && fileItem.status === 'uploading' && typeof fileItem.progress === 'number' && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${fileItem.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};