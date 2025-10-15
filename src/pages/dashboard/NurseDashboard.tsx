
import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { toast } from 'sonner';
import { Shield, Calendar, Users, Settings, CreditCard, Star } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { useNurseStats } from '@/hooks/useNurseStats';

const NurseDashboard: React.FC = () => {
  const { user, isAuthenticated, isLoading, subscription, subscriptionLoading, checkSubscription } = useUser();
  const { stats, loading: statsLoading } = useNurseStats();
  
  // If auth is loading, show spinner
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
  
  // If subscription is still loading, show spinner
  if (subscriptionLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-purple-600 border-r-transparent border-b-purple-600 border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // If no active subscription, show payment required screen
  const hasActiveSubscription = subscription?.subscribed || false;
  if (!hasActiveSubscription) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-purple-700">Subscription Required</h1>
            <p className="mt-4 text-lg text-gray-700">
              You need an active subscription to access the healthcare professional dashboard.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button 
                variant="nurse" 
                size="lg"
                as={Link} 
                to="/nurse/pricing"
                className="mx-auto"
              >
                View Subscription Plans
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => checkSubscription()}
              >
                Refresh Status
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsLoading ? (
            <>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-700">Active Clients</h3>
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-purple-700">{stats.activeClients}</p>
            <p className="text-sm text-gray-500 mt-1">
              {stats.totalAppointments} total appointments
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-700">Upcoming Sessions</h3>
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-700">{stats.upcomingAppointments}</p>
            <p className="text-sm text-gray-500 mt-1">This week</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-700">Monthly Earnings</h3>
              <CreditCard className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-700">${stats.monthlyEarnings.toFixed(0)}</p>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-700">Profile Completion</h3>
              <Settings className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-purple-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${stats.profileCompletion}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm text-gray-600">{stats.profileCompletion}%</span>
            </div>
            {stats.averageRating > 0 && (
              <div className="flex items-center mt-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-600">{stats.averageRating}</span>
              </div>
            )}
          </div>
            </>
          )}
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
