
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NurseHeader from '../components/navigation/NurseHeader';
import Footer from '../components/layout/Footer';

const NurseLayout: React.FC = () => {
  const location = useLocation();
  
  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <NurseHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default NurseLayout;
