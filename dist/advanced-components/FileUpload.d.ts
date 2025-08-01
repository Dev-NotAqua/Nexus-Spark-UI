import React from 'react';
export interface FileUploadProps {
    accept?: string;
    multiple?: boolean;
    maxSize?: number;
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
export declare const FileUpload: React.FC<FileUploadProps>;
