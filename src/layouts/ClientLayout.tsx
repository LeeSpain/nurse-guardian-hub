
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ClientHeader from '../components/navigation/ClientHeader';
import Footer from '../components/layout/Footer';

const ClientLayout: React.FC = () => {
  const location = useLocation();
  
  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <ClientHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
