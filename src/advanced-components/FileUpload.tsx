import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import clsx from 'clsx';
import styles from './FileUpload.module.css';

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  disabled?: boolean;
  showFileList?: boolean;
  dragAndDrop?: boolean;
  onFileSelect?: (files: File[]) => void;
  onFileRemove?: (index: number) => void;
  onError?: (error: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'button' | 'dropzone';
  children?: React.ReactNode;
}

interface FileWithPreview extends File {
  preview?: string;
}

/**
 * FileUpload - Advanced file input component
 * 
 * Features:
 * - Drag and drop support
 * - Multiple file selection
 * - File type validation
 * - File size limits
 * - Image preview support
 * - Progress indication
 * - File list management
 * - Accessible with ARIA attributes
 * - Multiple variants (button, dropzone)
 */
export const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 10,
  disabled = false,
  showFileList = true,
  dragAndDrop = true,
  onFileSelect,
  onFileRemove,
  onError,
  className,
  size = 'md',
  variant = 'dropzone',
  children
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize) {
      const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
      return `File size exceeds ${maxSizeMB}MB limit`;
    }

    // Check file type
    if (accept) {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const fileType = file.type;
      const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;

      const isTypeAccepted = acceptedTypes.some(acceptedType => {
        if (acceptedType.startsWith('.')) {
          return acceptedType === fileExtension;
        }
        if (acceptedType.includes('*')) {
          const [mainType] = acceptedType.split('/');
          return fileType.startsWith(mainType);
        }
        return acceptedType === fileType;
      });

      if (!isTypeAccepted) {
        return `File type not accepted. Accepted types: ${accept}`;
      }
    }

    return null;
  };

  const createFilePreview = (file: File): Promise<FileWithPreview> => {
    return new Promise((resolve) => {
      const fileWithPreview = file as FileWithPreview;

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          fileWithPreview.preview = e.target?.result as string;
          resolve(fileWithPreview);
        };
        reader.readAsDataURL(file);
      } else {
        resolve(fileWithPreview);
      }
    });
  };

  const processFiles = async (fileList: FileList | File[]) => {
    const newFiles: File[] = [];
    const errors: string[] = [];

    // Convert to array
    const filesArray = Array.from(fileList);

    // Check total file count
    if (!multiple && filesArray.length > 1) {
      onError?.('Multiple files not allowed');
      return;
    }

    const totalFiles = multiple ? files.length + filesArray.length : filesArray.length;
    if (totalFiles > maxFiles) {
      onError?.(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Validate each file
    for (const file of filesArray) {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        newFiles.push(file);
      }
    }

    if (errors.length > 0) {
      onError?.(errors.join('\n'));
    }

    if (newFiles.length > 0) {
      // Create previews for image files
      const filesWithPreviews = await Promise.all(
        newFiles.map(file => createFilePreview(file))
      );

      const updatedFiles = multiple ? [...files, ...filesWithPreviews] : filesWithPreviews;
      setFiles(updatedFiles);
      onFileSelect?.(newFiles);
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    if (disabled || !dragAndDrop) return;

    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      processFiles(droppedFiles);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!disabled && dragAndDrop) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFileRemove?.(index);

    // Clean up preview URL
    const file = files[index];
    if (file.preview) {
      URL.revokeObjectURL(file.preview);
    }
  };

  const openFileDialog = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const getFileIcon = (file: File): string => {
    if (file.type.startsWith('image/')) return '🖼️';
    if (file.type.startsWith('video/')) return '🎥';
    if (file.type.startsWith('audio/')) return '🎵';
    if (file.type.includes('pdf')) return '📄';
    if (file.type.includes('word') || file.type.includes('document')) return '📝';
    if (file.type.includes('excel') || file.type.includes('spreadsheet')) return '📊';
    if (file.type.includes('powerpoint') || file.type.includes('presentation')) return '📊';
    return '📎';
  };

  const renderUploadArea = () => {
    if (variant === 'button') {
      return (
        <button
          type="button"
          onClick={openFileDialog}
          disabled={disabled}
          className={clsx(
            styles.uploadButton,
            styles[size],
            { [styles.disabled]: disabled }
          )}
        >
          {children || 'Choose Files'}
        </button>
      );
    }

    return (
      <div
        className={clsx(
          styles.dropzone,
          styles[size],
          {
            [styles.dragOver]: isDragOver,
            [styles.disabled]: disabled
          }
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="File upload area"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openFileDialog();
          }
        }}
      >
        <div className={styles.dropzoneContent}>
          <div className={styles.uploadIcon}>📁</div>
          <div className={styles.uploadText}>
            {children || (
              <>
                <div className={styles.primaryText}>
                  {dragAndDrop ? 'Drop files here or click to browse' : 'Click to browse files'}
                </div>
                <div className={styles.secondaryText}>
                  {accept && `Accepted formats: ${accept}`}
                  {maxSize && ` • Max size: ${formatFileSize(maxSize)}`}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={clsx(styles.fileUploadContainer, className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInputChange}
        disabled={disabled}
        className={styles.hiddenInput}
        aria-hidden="true"
      />

      {renderUploadArea()}

      {showFileList && files.length > 0 && (
        <div className={styles.fileList}>
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className={styles.fileItem}>
              <div className={styles.fileInfo}>
                {file.preview ? (
                  <img
                    src={file.preview}
                    alt={file.name}
                    className={styles.filePreview}
                  />
                ) : (
                  <div className={styles.fileIcon}>
                    {getFileIcon(file)}
                  </div>
                )}
                
                <div className={styles.fileDetails}>
                  <div className={styles.fileName}>{file.name}</div>
                  <div className={styles.fileSize}>
                    {formatFileSize(file.size)}
                  </div>
                  
                  {uploadProgress[file.name] !== undefined && (
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${uploadProgress[file.name]}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => removeFile(index)}
                className={styles.removeButton}
                aria-label={`Remove ${file.name}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};