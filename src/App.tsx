import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Index from './pages/Index';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Nurse from './pages/Nurse';
import NurseFeatures from './pages/NurseFeatures';
import NursePricing from './pages/NursePricing';
import ClientLayout from './layouts/ClientLayout';
import Client from './pages/Client';
import ClientFeatures from './pages/ClientFeatures';
import ClientPricing from './pages/ClientPricing';
import ClientDetailedOverview from './pages/ClientDetailedOverview';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        
        {/* Nurse Routes */}
        <Route path="/nurse" element={<Nurse />} />
        <Route path="/nurse/features" element={<NurseFeatures />} />
        <Route path="/nurse/pricing" element={<NursePricing />} />
        
        {/* Client Routes */}
        <Route path="/client" element={<ClientLayout />}>
          <Route index element={<Navigate to="/client/home" replace />} />
          <Route path="home" element={<Client />} />
          <Route path="features" element={<ClientFeatures />} />
          <Route path="pricing" element={<ClientPricing />} />
          <Route path="detailed-overview" element={<ClientDetailedOverview />} />
          {/* ... keep existing code (other client routes) */}
        </Route>
        
        {/* Other Routes */}
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
