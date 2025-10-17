import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';

export interface FileUploadOptions {
  bucket: 'profile-images' | 'care-logs' | 'documents' | 'appointment-files';
  folder?: string;
  maxSizeBytes?: number;
  allowedTypes?: string[];
}

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user } = useUser();

  const uploadFile = async (
    file: File, 
    options: FileUploadOptions
  ): Promise<{ url?: string; path?: string; error?: string }> => {
    if (!user) {
      return { error: 'User not authenticated' };
    }

    try {
      setUploading(true);
      setProgress(0);

      // Validate file size
      const maxSize = options.maxSizeBytes || 5 * 1024 * 1024; // 5MB default
      if (file.size > maxSize) {
        throw new Error(`File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`);
      }

      // Validate file type
      const allowedTypes = options.allowedTypes || [
        'image/jpeg', 
        'image/png', 
        'image/webp', 
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      if (!allowedTypes.includes(file.type)) {
        throw new Error(`File type ${file.type} not allowed`);
      }

      // Generate file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      let filePath: string;
      if (options.folder) {
        filePath = `${user.id}/${options.folder}/${fileName}`;
      } else {
        filePath = `${user.id}/${fileName}`;
      }

      setProgress(25);

      // Upload file
      const { data, error } = await supabase.storage
        .from(options.bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      setProgress(75);

      // Get public URL or signed URL based on bucket
      let publicUrl: string | undefined;
      if (options.bucket === 'profile-images') {
        const { data: urlData } = supabase.storage
          .from(options.bucket)
          .getPublicUrl(filePath);
        publicUrl = urlData.publicUrl;
      } else {
        // For private buckets, return the path for later signed URL generation
        publicUrl = filePath;
      }

      setProgress(100);
      toast.success('File uploaded successfully');

      return {
        url: publicUrl,
        path: filePath
      };

    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast.error(error.message || 'Failed to upload file');
      return { error: error.message };
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const deleteFile = async (
    bucket: string, 
    path: string
  ): Promise<{ error?: string }> => {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) throw error;

      toast.success('File deleted successfully');
      return {};
    } catch (error: any) {
      console.error('Error deleting file:', error);
      toast.error('Failed to delete file');
      return { error: error.message };
    }
  };

  const getSignedUrl = async (
    bucket: string, 
    path: string, 
    expiresIn: number = 3600
  ): Promise<{ url?: string; error?: string }> => {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(path, expiresIn);

      if (error) throw error;

      return { url: data.signedUrl };
    } catch (error: any) {
      console.error('Error getting signed URL:', error);
      return { error: error.message };
    }
  };

  return {
    uploadFile,
    deleteFile,
    getSignedUrl,
    uploading,
    progress
  };
};