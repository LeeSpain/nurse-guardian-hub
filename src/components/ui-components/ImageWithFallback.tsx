
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { optimizeImageUrl, generateSrcSet, getImagePlaceholder, ImageQuality } from '../../lib/imageOptimizer';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  decoding?: 'async' | 'sync' | 'auto';
  fallbackSrc?: string;
  quality?: ImageQuality;
  sizes?: string;
  placeholderColor?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  fetchPriority = 'auto',
  decoding = 'async',
  fallbackSrc = '/placeholder.svg',
  quality = 'high',
  sizes,
  placeholderColor = '#f3f4f6',
  objectFit = 'cover'
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  // Generate placeholder
  const placeholder = getImagePlaceholder(src);

  useEffect(() => {
    // Reset state when src changes
    setImgSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  useEffect(() => {
    // Set up intersection observer for lazy loading
    if (loading === 'lazy') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      }, { rootMargin: '200px' });
      
      const element = document.getElementById(`image-${alt.replace(/\s+/g, '-').toLowerCase()}`);
      if (element) {
        observer.observe(element);
      }
      
      return () => observer.disconnect();
    } else {
      setIsVisible(true);
    }
  }, [alt, loading]);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Optimize the image URL
  const optimizedSrc = optimizeImageUrl(imgSrc, { quality });
  
  // Generate srcSet for responsive images
  const srcSet = !hasError ? generateSrcSet(imgSrc, undefined, { quality }) : undefined;

  return (
    <div 
      className="relative overflow-hidden"
      id={`image-${alt.replace(/\s+/g, '-').toLowerCase()}`}
      style={{ 
        width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
        height: height ? (typeof height === 'number' ? `${height}px` : height) : 'auto',
      }}
    >
      {/* Skeleton loading state */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded overflow-hidden">
          <Skeleton className="w-full h-full absolute inset-0" />
          {/* Blurred placeholder image for better UX during loading */}
          {placeholder && (
            <div 
              className="absolute inset-0 bg-center bg-cover blur-xl scale-110 opacity-50 transition-opacity"
              style={{ backgroundImage: `url(${placeholder})` }}
            />
          )}
        </div>
      )}
      
      {/* Only load image when in viewport or if loading is eager */}
      {isVisible && (
        <img
          src={optimizedSrc}
          alt={alt}
          className={`${className} transition-opacity duration-300`}
          width={width}
          height={height}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding={decoding}
          onError={handleError}
          onLoad={handleLoad}
          srcSet={srcSet}
          sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          style={{ 
            opacity: isLoading ? 0 : 1, 
            objectFit,
            transition: 'opacity 0.3s ease',
            width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
            height: height ? (typeof height === 'number' ? `${height}px` : height) : 'auto',
          }}
        />
      )}
    </div>
  );
};

export default ImageWithFallback;
