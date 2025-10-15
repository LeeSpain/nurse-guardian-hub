import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NurseDashboardHeader from '../components/navigation/NurseDashboardHeader';

const NurseDashboardLayout: React.FC = () => {
  const location = useLocation();
  
  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NurseDashboardHeader />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default NurseDashboardLayout;
