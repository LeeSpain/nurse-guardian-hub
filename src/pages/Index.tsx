
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/navigation/Header';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';
import Footer from '../components/layout/Footer';

const Index: React.FC = () => {
  const location = useLocation();
  
  // Scroll to top when component mounts or route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20"> {/* Added padding-top to account for fixed header */}
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
