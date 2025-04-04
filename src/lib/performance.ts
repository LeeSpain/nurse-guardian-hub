
/**
 * Performance utilities for optimizing loading and rendering
 */

// Debounce function to limit frequent function calls
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

// Function to preload critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Function to preload multiple images
export const preloadImages = (sources: string[]): Promise<void[]> => {
  return Promise.all(sources.map(preloadImage));
};

// Create critical CSS inline styles
export const createCriticalCSS = (styles: string): void => {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = styles;
    document.head.appendChild(style);
  }
};

// Initialize performance monitoring
export const initPerformanceMonitoring = (): void => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Report Web Vitals
    const reportWebVitals = (metric: any) => {
      console.log(metric);
    };

    // Listen for LCP
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        console.log(`LCP: ${entry.startTime}ms`);
      });
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    // Listen for FID
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        console.log(`FID: ${entry.processingStart - entry.startTime}ms`);
      });
    }).observe({ type: 'first-input', buffered: true });

    // Listen for CLS
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        console.log(`CLS: ${entry.value}`);
      });
    }).observe({ type: 'layout-shift', buffered: true });
  }
};
