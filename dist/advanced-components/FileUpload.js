var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import clsx from 'clsx';
import styles from './FileUpload.module.css';
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
export var FileUpload = function (_a) {
    var accept = _a.accept, _b = _a.multiple, multiple = _b === void 0 ? false : _b, _c = _a.maxSize, maxSize = _c === void 0 ? 10 * 1024 * 1024 : _c, // 10MB default
    _d = _a.maxFiles, // 10MB default
    maxFiles = _d === void 0 ? 10 : _d, _e = _a.disabled, disabled = _e === void 0 ? false : _e, _f = _a.showFileList, showFileList = _f === void 0 ? true : _f, _g = _a.dragAndDrop, dragAndDrop = _g === void 0 ? true : _g, onFileSelect = _a.onFileSelect, onFileRemove = _a.onFileRemove, onError = _a.onError, className = _a.className, _h = _a.size, size = _h === void 0 ? 'md' : _h, _j = _a.variant, variant = _j === void 0 ? 'dropzone' : _j, children = _a.children;
    var _k = useState([]), files = _k[0], setFiles = _k[1];
    var _l = useState(false), isDragOver = _l[0], setIsDragOver = _l[1];
    var _m = useState({}), uploadProgress = _m[0], setUploadProgress = _m[1];
    var fileInputRef = useRef(null);
    var validateFile = function (file) {
        var _a;
        // Check file size
        if (file.size > maxSize) {
            var maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
            return "File size exceeds ".concat(maxSizeMB, "MB limit");
        }
        // Check file type
        if (accept) {
            var acceptedTypes = accept.split(',').map(function (type) { return type.trim(); });
            var fileType_1 = file.type;
            var fileExtension_1 = ".".concat((_a = file.name.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase());
            var isTypeAccepted = acceptedTypes.some(function (acceptedType) {
                if (acceptedType.startsWith('.')) {
                    return acceptedType === fileExtension_1;
                }
                if (acceptedType.includes('*')) {
                    var mainType = acceptedType.split('/')[0];
                    return fileType_1.startsWith(mainType);
                }
                return acceptedType === fileType_1;
            });
            if (!isTypeAccepted) {
                return "File type not accepted. Accepted types: ".concat(accept);
            }
        }
        return null;
    };
    var createFilePreview = function (file) {
        return new Promise(function (resolve) {
            var fileWithPreview = file;
            if (file.type.startsWith('image/')) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var _a;
                    fileWithPreview.preview = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                    resolve(fileWithPreview);
                };
                reader.readAsDataURL(file);
            }
            else {
                resolve(fileWithPreview);
            }
        });
    };
    var processFiles = function (fileList) { return __awaiter(void 0, void 0, void 0, function () {
        var newFiles, errors, filesArray, totalFiles, _i, filesArray_1, file, error, filesWithPreviews, updatedFiles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newFiles = [];
                    errors = [];
                    filesArray = Array.from(fileList);
                    // Check total file count
                    if (!multiple && filesArray.length > 1) {
                        onError === null || onError === void 0 ? void 0 : onError('Multiple files not allowed');
                        return [2 /*return*/];
                    }
                    totalFiles = multiple ? files.length + filesArray.length : filesArray.length;
                    if (totalFiles > maxFiles) {
                        onError === null || onError === void 0 ? void 0 : onError("Maximum ".concat(maxFiles, " files allowed"));
                        return [2 /*return*/];
                    }
                    // Validate each file
                    for (_i = 0, filesArray_1 = filesArray; _i < filesArray_1.length; _i++) {
                        file = filesArray_1[_i];
                        error = validateFile(file);
                        if (error) {
                            errors.push("".concat(file.name, ": ").concat(error));
                        }
                        else {
                            newFiles.push(file);
                        }
                    }
                    if (errors.length > 0) {
                        onError === null || onError === void 0 ? void 0 : onError(errors.join('\n'));
                    }
                    if (!(newFiles.length > 0)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Promise.all(newFiles.map(function (file) { return createFilePreview(file); }))];
                case 1:
                    filesWithPreviews = _a.sent();
                    updatedFiles = multiple ? __spreadArray(__spreadArray([], files, true), filesWithPreviews, true) : filesWithPreviews;
                    setFiles(updatedFiles);
                    onFileSelect === null || onFileSelect === void 0 ? void 0 : onFileSelect(newFiles);
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var handleFileInputChange = function (event) {
        var files = event.target.files;
        if (files && files.length > 0) {
            processFiles(files);
        }
        // Reset input value to allow selecting the same file again
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    var handleDrop = function (event) {
        event.preventDefault();
        setIsDragOver(false);
        if (disabled || !dragAndDrop)
            return;
        var droppedFiles = event.dataTransfer.files;
        if (droppedFiles.length > 0) {
            processFiles(droppedFiles);
        }
    };
    var handleDragOver = function (event) {
        event.preventDefault();
        if (!disabled && dragAndDrop) {
            setIsDragOver(true);
        }
    };
    var handleDragLeave = function (event) {
        event.preventDefault();
        setIsDragOver(false);
    };
    var removeFile = function (index) {
        var newFiles = files.filter(function (_, i) { return i !== index; });
        setFiles(newFiles);
        onFileRemove === null || onFileRemove === void 0 ? void 0 : onFileRemove(index);
        // Clean up preview URL
        var file = files[index];
        if (file.preview) {
            URL.revokeObjectURL(file.preview);
        }
    };
    var openFileDialog = function () {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    var formatFileSize = function (bytes) {
        if (bytes === 0)
            return '0 B';
        var k = 1024;
        var sizes = ['B', 'KB', 'MB', 'GB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return "".concat(parseFloat((bytes / Math.pow(k, i)).toFixed(1)), " ").concat(sizes[i]);
    };
    var getFileIcon = function (file) {
        if (file.type.startsWith('image/'))
            return '🖼️';
        if (file.type.startsWith('video/'))
            return '🎥';
        if (file.type.startsWith('audio/'))
            return '🎵';
        if (file.type.includes('pdf'))
            return '📄';
        if (file.type.includes('word') || file.type.includes('document'))
            return '📝';
        if (file.type.includes('excel') || file.type.includes('spreadsheet'))
            return '📊';
        if (file.type.includes('powerpoint') || file.type.includes('presentation'))
            return '📊';
        return '📎';
    };
    var renderUploadArea = function () {
        var _a, _b;
        if (variant === 'button') {
            return (_jsx("button", { type: "button", onClick: openFileDialog, disabled: disabled, className: clsx(styles.uploadButton, styles[size], (_a = {}, _a[styles.disabled] = disabled, _a)), children: children || 'Choose Files' }));
        }
        return (_jsx("div", { className: clsx(styles.dropzone, styles[size], (_b = {},
                _b[styles.dragOver] = isDragOver,
                _b[styles.disabled] = disabled,
                _b)), onDrop: handleDrop, onDragOver: handleDragOver, onDragLeave: handleDragLeave, onClick: openFileDialog, role: "button", tabIndex: disabled ? -1 : 0, "aria-label": "File upload area", onKeyDown: function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openFileDialog();
                }
            }, children: _jsxs("div", { className: styles.dropzoneContent, children: [_jsx("div", { className: styles.uploadIcon, children: "\uD83D\uDCC1" }), _jsx("div", { className: styles.uploadText, children: children || (_jsxs(_Fragment, { children: [_jsx("div", { className: styles.primaryText, children: dragAndDrop ? 'Drop files here or click to browse' : 'Click to browse files' }), _jsxs("div", { className: styles.secondaryText, children: [accept && "Accepted formats: ".concat(accept), maxSize && " \u2022 Max size: ".concat(formatFileSize(maxSize))] })] })) })] }) }));
    };
    return (_jsxs("div", { className: clsx(styles.fileUploadContainer, className), children: [_jsx("input", { ref: fileInputRef, type: "file", accept: accept, multiple: multiple, onChange: handleFileInputChange, disabled: disabled, className: styles.hiddenInput, "aria-hidden": "true" }), renderUploadArea(), showFileList && files.length > 0 && (_jsx("div", { className: styles.fileList, children: files.map(function (file, index) { return (_jsxs("div", { className: styles.fileItem, children: [_jsxs("div", { className: styles.fileInfo, children: [file.preview ? (_jsx("img", { src: file.preview, alt: file.name, className: styles.filePreview })) : (_jsx("div", { className: styles.fileIcon, children: getFileIcon(file) })), _jsxs("div", { className: styles.fileDetails, children: [_jsx("div", { className: styles.fileName, children: file.name }), _jsx("div", { className: styles.fileSize, children: formatFileSize(file.size) }), uploadProgress[file.name] !== undefined && (_jsx("div", { className: styles.progressBar, children: _jsx("div", { className: styles.progressFill, style: { width: "".concat(uploadProgress[file.name], "%") } }) }))] })] }), _jsx("button", { type: "button", onClick: function () { return removeFile(index); }, className: styles.removeButton, "aria-label": "Remove ".concat(file.name), children: "\u2715" })] }, "".concat(file.name, "-").concat(index))); }) }))] }));
};
