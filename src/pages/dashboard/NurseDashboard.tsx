
import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { toast } from 'sonner';
import { Shield, Calendar, Users, Settings, CreditCard, Star, FileText, Activity, AlertCircle, Clock } from 'lucide-react';
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
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {user.firstName}!</h1>
        <p className="text-muted-foreground">Healthcare Professional Dashboard</p>
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
        
        {/* Today's Rota Widget */}
        <div className="mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Today's Rota</h2>
              <Link to="/nurse/dashboard/shifts" className="text-sm text-purple-600 hover:text-purple-700">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { staff: 'Sarah Johnson', client: 'Mrs. Thompson', time: '09:00 - 17:00', status: 'active' },
                { staff: 'Michael Chen', client: 'Mr. Davis', time: '14:00 - 22:00', status: 'upcoming' },
              ].map((shift, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{shift.staff}</p>
                      <p className="text-xs text-gray-500">{shift.client}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{shift.time}</p>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                      shift.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {shift.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/nurse/dashboard/care-logs"
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group"
            >
              <FileText size={24} className="text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-gray-800">Care Logs</p>
              <p className="text-xs text-gray-500 mt-1">Document client care</p>
            </Link>

            <Link
              to="/nurse/dashboard/staff"
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group"
            >
              <Users size={24} className="text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-gray-800">Staff</p>
              <p className="text-xs text-gray-500 mt-1">Manage your team</p>
            </Link>

            <Link
              to="/nurse/dashboard/care-plans"
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group"
            >
              <FileText size={24} className="text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-gray-800">Care Plans</p>
              <p className="text-xs text-gray-500 mt-1">Review and update</p>
            </Link>

            <Link
              to="/nurse/dashboard/analytics"
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group"
            >
              <Activity size={24} className="text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-gray-800">Analytics</p>
              <p className="text-xs text-gray-500 mt-1">View insights</p>
            </Link>
          </div>
        </div>

        {/* Compliance Alerts */}
        <div className="mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-800">Compliance Dashboard</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-sm font-medium">Staff DBS Checks</span>
                <span className="text-green-600 font-semibold">✓ Current</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-sm font-medium">Training Certificates</span>
                <span className="text-green-600 font-semibold">✓ Up to Date</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} className="text-yellow-600" />
                  <span className="text-sm font-medium">Insurance Renewal</span>
                </div>
                <span className="text-yellow-600 font-semibold">14 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            variant="outline" 
            size="lg"
            fullWidth
            className="p-6 h-auto flex-col items-center justify-center text-center"
            icon={<Calendar size={24} className="mb-2 text-purple-600" />}
            iconPosition="left"
            as={Link}
            to="/nurse/dashboard/calendar"
          >
            <div>
              <p className="font-semibold">Calendar</p>
              <p className="text-xs text-gray-500 mt-1">Manage schedule</p>
            </div>
          </Button>
          
          <Button
            variant="outline" 
            size="lg"
            fullWidth
            className="p-6 h-auto flex-col items-center justify-center text-center"
            icon={<Clock size={24} className="mb-2 text-purple-600" />}
            iconPosition="left"
            as={Link}
            to="/nurse/dashboard/shifts"
          >
            <div>
              <p className="font-semibold">Shifts</p>
              <p className="text-xs text-gray-500 mt-1">View rotas</p>
            </div>
          </Button>
          
          <Button
            variant="outline" 
            size="lg"
            fullWidth
            className="p-6 h-auto flex-col items-center justify-center text-center"
            icon={<FileText size={24} className="mb-2 text-purple-600" />}
            iconPosition="left"
            as={Link}
            to="/nurse/dashboard/reports"
          >
            <div>
              <p className="font-semibold">Reports</p>
              <p className="text-xs text-gray-500 mt-1">Generate reports</p>
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
            to="/nurse/dashboard/settings"
          >
            <div>
              <p className="font-semibold">Settings</p>
              <p className="text-xs text-gray-500 mt-1">Update profile</p>
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
  );
};

export default NurseDashboard;
