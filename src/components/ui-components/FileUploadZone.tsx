import React, { useRef, useState } from 'react';
import { Upload, X, Image, File } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { useFileUpload, FileUploadOptions } from '@/hooks/useFileUpload';

interface FileUploadZoneProps {
  onFileUploaded: (result: { url?: string; path?: string }) => void;
  options: FileUploadOptions;
  accept?: string;
  multiple?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  onFileUploaded,
  options,
  accept = 'image/*',
  multiple = false,
  className = '',
  children
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const { uploadFile, uploading, progress } = useFileUpload();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files: FileList) => {
    const file = files[0]; // Handle single file for now
    if (file) {
      const result = await uploadFile(file, options);
      if (result.url || result.path) {
        onFileUploaded(result);
      }
    }
  };

  const openFileExplorer = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
      
      {children ? (
        <div onClick={openFileExplorer} className="cursor-pointer">
          {children}
        </div>
      ) : (
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            transition-colors duration-200
            ${dragActive 
              ? 'border-teal-500 bg-teal-50' 
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }
            ${uploading ? 'pointer-events-none opacity-75' : ''}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileExplorer}
        >
          {uploading ? (
            <div className="space-y-4">
              <div className="w-12 h-12 mx-auto bg-teal-100 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-teal-600 animate-bounce" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Uploading...</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">{progress}%</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                {accept.includes('image') ? (
                  <Image className="w-6 h-6 text-gray-400" />
                ) : (
                  <File className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  {dragActive ? 'Drop files here' : 'Upload files'}
                </p>
                <p className="text-xs text-gray-500">
                  Drag & drop files here, or click to browse
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;