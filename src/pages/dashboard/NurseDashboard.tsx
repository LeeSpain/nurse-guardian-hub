
import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { toast } from 'sonner';
import { Shield, Calendar, Users, Settings, CreditCard } from 'lucide-react';
import Button from '@/components/ui-components/Button';

const NurseDashboard: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  
  // Check subscription status (mockup for now)
  const hasActiveSubscription = user?.role === UserRole.NURSE;
  
  // If loading, show a loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-purple-600 border-r-transparent border-b-purple-600 border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    toast.error('Please log in to access your dashboard');
    return <Navigate to="/login" />;
  }
  
  // If wrong role, redirect
  if (user?.role !== UserRole.NURSE) {
    toast.error('This dashboard is for healthcare professionals only');
    return <Navigate to="/client/home" />;
  }
  
  // If no active subscription, show payment required screen
  if (!hasActiveSubscription) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-purple-700">Subscription Required</h1>
            <p className="mt-4 text-lg text-gray-700">
              You need an active subscription to access the healthcare professional dashboard.
            </p>
            <div className="mt-8">
              <Button 
                variant="nurse" 
                size="lg"
                as={Link} 
                to="/nurse/pricing"
                className="mx-auto"
              >
                View Subscription Plans
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user.firstName}!</h1>
          <p className="text-purple-600">Healthcare Professional Dashboard</p>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-700 mb-2">Active Clients</h3>
            <p className="text-3xl font-bold text-purple-700">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-700 mb-2">Upcoming Sessions</h3>
            <p className="text-3xl font-bold text-purple-700">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-700 mb-2">Profile Completion</h3>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <span className="ml-2 text-sm text-gray-600">65%</span>
            </div>
          </div>
        </div>
        
        {/* Dashboard Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            variant="outline" 
            size="lg"
            fullWidth
            className="p-6 h-auto flex-col items-center justify-center text-center"
            icon={<Calendar size={24} className="mb-2 text-purple-600" />}
            iconPosition="left"
            as={Link}
            to="/nurse/calendar"
          >
            <div>
              <p className="font-semibold">Calendar</p>
              <p className="text-xs text-gray-500 mt-1">Manage your schedule</p>
            </div>
          </Button>
          
          <Button
            variant="outline" 
            size="lg"
            fullWidth
            className="p-6 h-auto flex-col items-center justify-center text-center"
            icon={<Users size={24} className="mb-2 text-purple-600" />}
            iconPosition="left"
            as={Link}
            to="/nurse/clients"
          >
            <div>
              <p className="font-semibold">Clients</p>
              <p className="text-xs text-gray-500 mt-1">View your clients</p>
            </div>
          </Button>
          
          <Button
            variant="outline" 
            size="lg"
            fullWidth
            className="p-6 h-auto flex-col items-center justify-center text-center"
            icon={<CreditCard size={24} className="mb-2 text-purple-600" />}
            iconPosition="left"
            as={Link}
            to="/nurse/subscription"
          >
            <div>
              <p className="font-semibold">Subscription</p>
              <p className="text-xs text-gray-500 mt-1">Manage your plan</p>
            </div>
          </Button>
          
          <Button
            variant="outline" 
            size="lg"
            fullWidth
            className="p-6 h-auto flex-col items-center justify-center text-center"
            icon={<Settings size={24} className="mb-2 text-purple-600" />}
            iconPosition="left"
            as={Link}
            to="/nurse/settings"
          >
            <div>
              <p className="font-semibold">Settings</p>
              <p className="text-xs text-gray-500 mt-1">Update your profile</p>
            </div>
          </Button>
        </div>
        
        {/* Coming Soon Section */}
        <div className="mt-12 bg-purple-50 border border-purple-100 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-purple-700 mb-2">Coming Soon!</h3>
          <p className="text-gray-700">
            We're working on more features to help you manage your healthcare practice - 
            including patient messaging, document sharing, and AI-powered scheduling.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NurseDashboard;
