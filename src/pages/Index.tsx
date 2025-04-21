
import React, { useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/navigation/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import VideoOverlay from '../components/video/VideoOverlay';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load secondary components
const Features = lazy(() => import('../components/home/Features'));
const HowItWorks = lazy(() => import('../components/home/HowItWorks'));
const Testimonials = lazy(() => import('../components/home/Testimonials'));
const CallToAction = lazy(() => import('../components/home/CallToAction'));

// Loading fallback component
const SectionLoader = () => (
  <div className="w-full py-16">
    <div className="container mx-auto px-4">
      <Skeleton className="h-8 w-1/3 mx-auto mb-6" />
      <Skeleton className="h-4 w-3/4 mx-auto mb-2" />
      <Skeleton className="h-4 w-2/3 mx-auto mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-xl" />
        ))}
      </div>
    </div>
  </div>
);

const Index: React.FC = () => {
  const location = useLocation();
  
  // Scroll to top and optimize performance when component mounts or route changes
  useEffect(() => {
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Add preload hints for critical resources
    const preloadHero = document.createElement('link');
    preloadHero.rel = 'preload';
    preloadHero.as = 'image';
    preloadHero.href = '/lovable-uploads/d215d01f-93d6-423a-994e-1cb106f5b3ae.png';
    document.head.appendChild(preloadHero);
    
    // Add preconnect for external resources
    const preconnectYT = document.createElement('link');
    preconnectYT.rel = 'preconnect';
    preconnectYT.href = 'https://www.youtube.com';
    document.head.appendChild(preconnectYT);
    
    return () => {
      document.head.removeChild(preloadHero);
      document.head.removeChild(preconnectYT);
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Video Overlay - NurseSync Introduction */}
      <VideoOverlay videoId="6jsBNwkedOE" />
      
      <main className="flex-grow">
        {/* Hero is critical, load it eagerly */}
        <Hero />
        
        {/* Lazy load below-the-fold content with suspense boundaries for each section */}
        <Suspense fallback={<SectionLoader />}>
          <Features />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <HowItWorks />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <CallToAction />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
