
/**
 * Image optimization utilities for improving loading performance
 */

// Define image quality tiers
export type ImageQuality = 'low' | 'medium' | 'high' | 'original';

// Interface for image optimization options
interface OptimizeOptions {
  width?: number;
  height?: number;
  quality?: ImageQuality;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
  blur?: boolean;
}

// Quality values for different tiers
const qualityValues = {
  low: 40,
  medium: 65,
  high: 85,
  original: 100
};

/**
 * Optimize image URL for performance
 * Works with imgix, Cloudinary or similar image CDNs
 */
export const optimizeImageUrl = (
  url: string, 
  options: OptimizeOptions = {}
): string => {
  // Skip optimization for SVGs, data URLs, or missing URLs
  if (!url || url.includes('.svg') || url.startsWith('data:')) {
    return url;
  }
  
  // For demo purposes, assume images are served through a hypothetical NurseSync CDN
  // In a production app, replace with actual image optimization service
  try {
    const parsedUrl = new URL(url);
    const params = new URLSearchParams(parsedUrl.search);
    
    // Set optimization parameters
    if (options.width) params.set('w', options.width.toString());
    if (options.height) params.set('h', options.height.toString());
    
    if (options.quality) {
      params.set('q', qualityValues[options.quality].toString());
    }
    
    if (options.format) params.set('fm', options.format);
    if (options.blur) params.set('blur', '100');
    
    parsedUrl.search = params.toString();
    return parsedUrl.toString();
  } catch (error) {
    // If URL parsing fails, return original URL
    console.error('Image optimization failed:', error);
    return url;
  }
};

/**
 * Generate responsive srcSet for images
 */
export const generateSrcSet = (
  url: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1536],
  options: Omit<OptimizeOptions, 'width'> = {}
): string => {
  return widths
    .map(width => {
      const optimizedUrl = optimizeImageUrl(url, { ...options, width });
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
};

/**
 * Preload critical images
 */
export const preloadCriticalImages = (urls: string[]): void => {
  if (typeof document === 'undefined') return;
  
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = optimizeImageUrl(url, { quality: 'medium' });
    document.head.appendChild(link);
  });
};

/**
 * Get blurhash placeholder for image (simulated)
 * In a real implementation, blurhash would need to be generated server-side
 */
export const getImagePlaceholder = (url: string): string => {
  // This would normally return a real blurhash or LQIP
  // For demo purposes, return a gray placeholder
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23EAEAEA'/%3E%3C/svg%3E`;
};
