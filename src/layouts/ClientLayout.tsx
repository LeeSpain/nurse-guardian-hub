
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import ClientHeader from '../components/navigation/ClientHeader';
import Footer from '../components/layout/Footer';

const ClientLayout: React.FC = () => {
  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
