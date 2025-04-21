
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load components for better performance
const Index = lazy(() => import('./pages/Index'));
const Features = lazy(() => import('./pages/Features'));
const Pricing = lazy(() => import('./pages/Pricing'));
const About = lazy(() => import('./pages/About'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const HIPAA = lazy(() => import('./pages/HIPAA'));
const Login = lazy(() => import('./pages/Login'));

const Nurse = lazy(() => import('./pages/Nurse'));
const NurseFeatures = lazy(() => import('./pages/NurseFeatures'));
const NursePricing = lazy(() => import('./pages/NursePricing'));
const NurseSupport = lazy(() => import('./pages/NurseSupport'));

const Client = lazy(() => import('./pages/Client'));
const ClientFeatures = lazy(() => import('./pages/ClientFeatures'));
const ClientPricing = lazy(() => import('./pages/ClientPricing'));
const ClientTestimonials = lazy(() => import('./pages/ClientTestimonials'));
const ClientSupport = lazy(() => import('./pages/ClientSupport'));

const NotFound = lazy(() => import('./pages/NotFound'));
const ClientLayout = lazy(() => import('./layouts/ClientLayout'));
const NurseLayout = lazy(() => import('./layouts/NurseLayout'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="w-full max-w-md p-8 space-y-4">
      <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
      <Skeleton className="h-48 w-full rounded-xl mb-8" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  </div>
);

function App() {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Nurse Routes */}
          <Route path="/nurse" element={<NurseLayout />}>
            <Route index element={<Nurse />} />
            <Route path="features" element={<NurseFeatures />} />
            <Route path="pricing" element={<NursePricing />} />
            <Route path="support" element={<NurseSupport />} />
          </Route>
          
          {/* Client Routes */}
          <Route path="/client" element={<ClientLayout />}>
            <Route index element={<Navigate to="/client/home" replace />} />
            <Route path="home" element={<Client />} />
            <Route path="features" element={<ClientFeatures />} />
            <Route path="pricing" element={<ClientPricing />} />
            <Route path="testimonials" element={<ClientTestimonials />} /> 
            <Route path="support" element={<ClientSupport />} /> 
          </Route>
          
          {/* Other Routes */}
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/hipaa" element={<HIPAA />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
