import React, { useCallback, useState } from 'react';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useFileUpload } from '@/hooks/useFileUpload';

interface FileUploadZoneProps {
  onFilesUploaded: (files: { url: string; path: string; name: string; type: string }[]) => void;
  maxFiles?: number;
  accept?: string;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  onFilesUploaded,
  maxFiles = 5,
  accept = 'image/*,.pdf,.doc,.docx',
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const { uploadFile, uploading } = useFileUpload();
  const [uploadedFiles, setUploadedFiles] = useState<
    { url: string; path: string; name: string; type: string }[]
  >([]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const droppedFiles = Array.from(e.dataTransfer.files);
      
      if (files.length + droppedFiles.length > maxFiles) {
        toast.error(`Maximum ${maxFiles} files allowed`);
        return;
      }

      setFiles((prev) => [...prev, ...droppedFiles.slice(0, maxFiles - prev.length)]);
    },
    [files, maxFiles]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const selectedFiles = Array.from(e.target.files);
    
    if (files.length + selectedFiles.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setFiles((prev) => [...prev, ...selectedFiles.slice(0, maxFiles - prev.length)]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    try {
      const uploadPromises = files.map(async (file) => {
        const result = await uploadFile(file, {
          bucket: 'profile-images',
          folder: 'care-logs',
          maxSizeBytes: 10 * 1024 * 1024, // 10MB
          allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
        });

        if (result.error) {
          throw new Error(result.error);
        }

        return {
          url: result.url || '',
          path: result.path || '',
          name: file.name,
          type: file.type,
        };
      });

      const uploaded = await Promise.all(uploadPromises);
      setUploadedFiles((prev) => [...prev, ...uploaded]);
      onFilesUploaded(uploaded);
      setFiles([]);
      toast.success('Files uploaded successfully');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Failed to upload files');
    }
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <ImageIcon size={20} />;
    }
    return <FileText size={20} />;
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer"
      >
        <input
          type="file"
          multiple
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
          disabled={uploading}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="mx-auto mb-3 text-muted-foreground" size={32} />
          <p className="text-sm text-foreground mb-1">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">
            Images, PDFs, Documents (max {maxFiles} files, 10MB each)
          </p>
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Selected Files ({files.length})</p>
            <Button
              size="sm"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Files'}
            </Button>
          </div>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {getFileIcon(file.type)}
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  disabled={uploading}
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-green-600">Uploaded Files</p>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
              >
                {getFileIcon(file.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">Uploaded successfully</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;
