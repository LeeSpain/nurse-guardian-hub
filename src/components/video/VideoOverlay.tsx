
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface VideoOverlayProps {
  videoId: string;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ videoId }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  if (isHidden) return null;

  return (
    <div 
      className={`fixed z-50 transition-all duration-300 shadow-xl ${
        isMinimized 
          ? 'bottom-4 right-4 w-64 h-36 rounded-lg' 
          : 'top-24 right-4 md:right-6 lg:right-8 w-72 md:w-80 lg:w-96 rounded-xl'
      }`}
    >
      <div className="relative w-full h-full bg-white rounded-xl overflow-hidden border border-purple-200">
        {/* Video Header */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-between px-3 z-10">
          <div className="text-xs font-medium text-white">NurseSync Introduction</div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white/80 hover:text-white"
              aria-label={isMinimized ? "Expand video" : "Minimize video"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMinimized ? (
                  <polyline points="15 3 21 3 21 9"></polyline>
                ) : (
                  <polyline points="4 14 10 14 10 20"></polyline>
                )}
                {isMinimized ? (
                  <polyline points="10 14 4 14 4 20"></polyline>
                ) : (
                  <polyline points="21 10 21 3 14 3"></polyline>
                )}
                {isMinimized ? (
                  <line x1="14" y1="10" x2="21" y2="3"></line>
                ) : (
                  <line x1="3" y1="21" x2="10" y2="14"></line>
                )}
              </svg>
            </button>
            <button
              onClick={() => setIsHidden(true)}
              className="text-white/80 hover:text-white"
              aria-label="Close video"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* YouTube Video with appropriate aspect ratio */}
        <div className="w-full h-full pt-8">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?rel=0`}
            title="NurseSync Introduction Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;
