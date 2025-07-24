import React, { useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import FileUploadZone from '@/components/ui-components/FileUploadZone';
import { useUser } from '@/contexts/UserContext';

interface ProfileImageUploaderProps {
  currentImageUrl?: string;
  onImageUpdated: (newImageUrl: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  currentImageUrl,
  onImageUpdated,
  size = 'md'
}) => {
  const [showUploader, setShowUploader] = useState(false);
  const { user } = useUser();

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const handleImageUploaded = (result: { url?: string; path?: string }) => {
    if (result.url) {
      onImageUpdated(result.url);
      setShowUploader(false);
    }
  };

  const displayName = user ? `${user.firstName} ${user.lastName}` : 'User';

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative group">
        <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200`}>
          {currentImageUrl ? (
            <img
              src={currentImageUrl}
              alt={displayName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-400 to-purple-500">
              <span className="text-white text-lg font-semibold">
                {displayName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
          )}
        </div>
        
        <button
          onClick={() => setShowUploader(true)}
          className="absolute -bottom-1 -right-1 bg-teal-600 text-white rounded-full p-2 shadow-lg hover:bg-teal-700 transition-colors"
        >
          <Camera className="w-4 h-4" />
        </button>
      </div>

      {showUploader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Update Profile Photo
              </h3>
              <button
                onClick={() => setShowUploader(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <FileUploadZone
              onFileUploaded={handleImageUploaded}
              options={{
                bucket: 'profile-images',
                maxSizeBytes: 5 * 1024 * 1024, // 5MB
                allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
              }}
              accept="image/*"
              className="mb-4"
            />

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => setShowUploader(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileImageUploader;