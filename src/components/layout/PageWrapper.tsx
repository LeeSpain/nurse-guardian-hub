
import React, { useEffect, memo } from 'react';
import { useLocation } from 'react-router-dom';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = memo(({ children, className = "" }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top with instant behavior for better performance
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Add page visibility change handler to ensure scroll position on tab focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [location.pathname]);
  
  return (
    <div className={className}>
      {children}
    </div>
  );
});

PageWrapper.displayName = 'PageWrapper';

export default PageWrapper;
