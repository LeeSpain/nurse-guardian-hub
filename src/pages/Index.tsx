
import React, { useEffect } from 'react';
import Header from '../components/navigation/Header';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';
import Footer from '../components/layout/Footer';

const Index: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <Hero />
        <div className="bg-white">
          <Features />
        </div>
        <div className="bg-gradient-to-b from-gray-50 to-white">
          <HowItWorks />
        </div>
        <div className="bg-gray-50">
          <Testimonials />
        </div>
        <div className="bg-white">
          <CallToAction />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
