import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { ProtectedRoute, UserRole } from '@/contexts/UserContext';

// Lazy load components for better performance
const Index = lazy(() => import('./pages/Index'));
const Features = lazy(() => import('./pages/Features'));
const Pricing = lazy(() => import('./pages/Pricing'));
const About = lazy(() => import('./pages/About'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const HIPAA = lazy(() => import('./pages/HIPAA'));
const Login = lazy(() => import('./pages/Login'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const NurseRegister = lazy(() => import('./pages/NurseRegister'));
const ClientRegister = lazy(() => import('./pages/ClientRegister'));

// Dashboard pages
const NurseDashboard = lazy(() => import('./pages/dashboard/NurseDashboard'));
const ClientDashboard = lazy(() => import('./pages/dashboard/ClientDashboard'));

// Nurse dashboard pages
const NurseCalendar = lazy(() => import('./pages/dashboard/nurse/Calendar'));
const NurseStaff = lazy(() => import('./pages/dashboard/nurse/Staff'));
const NurseClients = lazy(() => import('./pages/dashboard/nurse/Clients'));
const NurseShifts = lazy(() => import('./pages/dashboard/nurse/Shifts'));
const NurseCarePlans = lazy(() => import('./pages/dashboard/nurse/CarePlans'));
const CarePlanDetail = lazy(() => import('./pages/dashboard/nurse/CarePlanDetail'));
const NurseCareLogs = lazy(() => import('./pages/dashboard/nurse/CareLogs'));
const NurseAnalytics = lazy(() => import('./pages/dashboard/nurse/Analytics'));
const NurseReports = lazy(() => import('./pages/dashboard/nurse/Reports'));
const NurseBilling = lazy(() => import('./pages/dashboard/nurse/Billing'));
const NurseMessages = lazy(() => import('./pages/dashboard/nurse/Messages'));
const NurseSubscription = lazy(() => import('./pages/dashboard/nurse/Subscription'));
const NurseSettings = lazy(() => import('./pages/dashboard/nurse/Settings'));

// Detail pages
const ClientDetail = lazy(() => import('./pages/dashboard/nurse/ClientDetail'));
const StaffDetail = lazy(() => import('./pages/dashboard/nurse/StaffDetail'));
const InvoiceDetail = lazy(() => import('./pages/dashboard/nurse/InvoiceDetail'));
const AppointmentDetail = lazy(() => import('./pages/dashboard/nurse/AppointmentDetail'));

// Advanced features
const ShiftSwapRequests = lazy(() => import('./pages/dashboard/nurse/ShiftSwapRequests'));
const Medications = lazy(() => import('./pages/dashboard/nurse/Medications'));

// Client dashboard pages
const ClientSavedProfessionals = lazy(() => import('./pages/dashboard/client/SavedProfessionals'));
const ClientAppointments = lazy(() => import('./pages/dashboard/client/Appointments'));
const ClientMessages = lazy(() => import('./pages/dashboard/client/Messages'));
const ClientSettings = lazy(() => import('./pages/dashboard/client/Settings'));

const NurseSearch = lazy(() => import('./pages/NurseSearch'));

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
const NurseDashboardLayout = lazy(() => import('./layouts/NurseDashboardLayout'));
const StaffOnboarding = lazy(() => import('./pages/StaffOnboarding'));
const ClientOnboarding = lazy(() => import('./pages/ClientOnboarding'));

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
          
          {/* Nurse Public Routes */}
          <Route path="/nurse" element={<NurseLayout />}>
            <Route index element={<Nurse />} />
            <Route path="features" element={<NurseFeatures />} />
            <Route path="pricing" element={<NursePricing />} />
            <Route path="support" element={<NurseSupport />} />
          </Route>
          
          {/* Nurse Dashboard Routes */}
          <Route path="/nurse/dashboard" element={<NurseDashboardLayout />}>
            <Route index element={
              <ProtectedRoute requiredRole={UserRole.NURSE}>
                <NurseDashboard />
              </ProtectedRoute>
            } />
            <Route path="calendar" element={
              <ProtectedRoute requiredRole={UserRole.NURSE}>
                <NurseCalendar />
              </ProtectedRoute>
            } />
            <Route path="staff" element={
              <ProtectedRoute requiredRole={UserRole.NURSE}>
                <NurseStaff />
              </ProtectedRoute>
            } />
            <Route path="clients" element={
              <ProtectedRoute requiredRole={UserRole.NURSE}>
                <NurseClients />
              </ProtectedRoute>
            } />
            <Route path="shifts" element={
              <ProtectedRoute requiredRole={UserRole.NURSE}>
                <NurseShifts />
              </ProtectedRoute>
            } />
            <Route path="care-plans" element={
              <ProtectedRoute requiredRole={UserRole.NURSE}>
                <NurseCarePlans />
              </ProtectedRoute>
            } />
            <Route path="care-plans/:id" element={
              <ProtectedRoute requiredRole={UserRole.NURSE}>
                <CarePlanDetail />
              </ProtectedRoute>
            } />
            <Route path="clients/:id" element={
              <ProtectedRoute requiredRole={UserRole.NURSE}>
                <ClientDetail />
              </ProtectedRoute>
            } />
            <Route path="staff/:id" element={
              <ProtectedRoute requiredRole={UserRole.NURSE}>
                <StaffDetail />
              </ProtectedRoute>
            } />
            <Route path="invoices/:id" element={
              <ProtectedRoute requiredRole={UserRole.NURSE}>
                <InvoiceDetail />
              </ProtectedRoute>
            } />
            <Route path="appointments/:id" element={
              <ProtectedRoute requiredRole={UserRole.NURSE}>
                <AppointmentDetail />
              </ProtectedRoute>
            } />
            <Route path="care-logs" element={
              <ProtectedRoute requiredRole={UserRole.NURSE}>
                <NurseCareLogs />
              </ProtectedRoute>
            } />
            <Route path="analytics" element={
              <ProtectedRoute requiredRole={UserRole.NURSE}>
                <NurseAnalytics />
              </ProtectedRoute>
            } />
            <Route path="reports" element={
              <ProtectedRoute requiredRole={UserRole.NURSE}>
                <NurseReports />
              </ProtectedRoute>
            } />
            <Route path="messages" element={
              <ProtectedRoute requiredRole={UserRole.NURSE}>
                <NurseMessages />
              </ProtectedRoute>
            } />
            <Route path="billing" element={
              <ProtectedRoute requiredRole={UserRole.NURSE}>
                <NurseBilling />
              </ProtectedRoute>
            } />
            <Route path="subscription" element={
              <ProtectedRoute requiredRole={UserRole.NURSE}>
                <NurseSubscription />
              </ProtectedRoute>
            } />
            <Route path="settings" element={
              <ProtectedRoute requiredRole={UserRole.NURSE}>
                <NurseSettings />
              </ProtectedRoute>
            } />
            <Route path="shift-swaps" element={
              <ProtectedRoute requiredRole={UserRole.NURSE}>
                <ShiftSwapRequests />
              </ProtectedRoute>
            } />
            <Route path="medications" element={
              <ProtectedRoute requiredRole={UserRole.NURSE}>
                <Medications />
              </ProtectedRoute>
            } />
          </Route>
          
          {/* Client Routes */}
          <Route path="/client" element={<ClientLayout />}>
            <Route index element={<Navigate to="/client/home" replace />} />
            <Route path="home" element={<Client />} />
            <Route path="features" element={<ClientFeatures />} />
            <Route path="pricing" element={<ClientPricing />} />
            <Route path="testimonials" element={<ClientTestimonials />} /> 
            <Route path="support" element={<ClientSupport />} /> 
            <Route path="dashboard" element={<ClientDashboard />} />
            <Route path="saved-professionals" element={<ClientSavedProfessionals />} />
            <Route path="appointments" element={<ClientAppointments />} />
            <Route path="messages" element={<ClientMessages />} />
            <Route path="settings" element={<ClientSettings />} />
            <Route path="search" element={<NurseSearch />} />
          </Route>
          
          {/* Other Routes */}
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/hipaa" element={<HIPAA />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register/nurse" element={<NurseRegister />} />
          <Route path="/register/client" element={<ClientRegister />} />
          <Route path="/staff/onboard" element={<StaffOnboarding />} />
          <Route path="/client/onboard" element={<ClientOnboarding />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
