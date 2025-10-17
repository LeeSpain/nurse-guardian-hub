
import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { toast } from 'sonner';
import { Shield, Calendar, Users, Settings, CreditCard, Star, FileText, Activity, AlertCircle, Clock } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { useNurseStats } from '@/hooks/useNurseStats';
import { useProfile } from '@/hooks/useProfile';
import { useOrganization } from '@/hooks/useOrganization';
import { useTodayShifts } from '@/hooks/useTodayShifts';
import { format } from 'date-fns';

const NurseDashboard: React.FC = () => {
  const { user, isAuthenticated, isLoading, subscription, subscriptionLoading, checkSubscription } = useUser();
  const { stats, loading: statsLoading } = useNurseStats();
  const { profile } = useProfile();
  const { organization } = useOrganization();
  const { shifts: todayShifts, loading: shiftsLoading } = useTodayShifts();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Auto-check subscription on mount
  useEffect(() => {
    if (isAuthenticated) {
      checkSubscription();
    }
  }, [isAuthenticated, checkSubscription]);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);
  
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
  
  // Optional: Show subscription banner (non-blocking)
  const showSubscriptionBanner = !subscriptionLoading && subscription && !subscription.subscribed;
  
  return (
    <div className="container mx-auto p-6">
      {/* Optional Subscription Info Banner (non-blocking) */}
      {showSubscriptionBanner && (
        <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100">
                Upgrade your plan to unlock premium features
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Access advanced analytics, unlimited clients, and priority support
              </p>
            </div>
            <Button 
              variant="primary" 
              size="sm"
              as={Link}
              to="/nurse/pricing"
            >
              View Plans
            </Button>
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {profile?.first_name || user.firstName}!
            </h1>
            {organization && (
              <p className="text-lg text-purple-600 font-medium mt-1">
                {organization.name}
              </p>
            )}
            <p className="text-muted-foreground mt-1">Healthcare Professional Dashboard</p>
          </div>
          <div className="flex items-center gap-3 bg-card px-4 py-3 rounded-xl shadow-sm border border-border">
            <Clock className="w-5 h-5 text-purple-600" />
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">
                {format(currentTime, 'h:mm a')}
              </p>
              <p className="text-xs text-muted-foreground">
                {format(currentTime, 'EEEE, MMMM d, yyyy')}
              </p>
            </div>
          </div>
        </div>
      </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsLoading ? (
            <>
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border animate-pulse">
                <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-muted rounded w-1/3"></div>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border animate-pulse">
                <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-muted rounded w-1/3"></div>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border animate-pulse">
                <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-muted rounded w-1/3"></div>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border animate-pulse">
                <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-muted rounded w-1/3"></div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">Active Clients</h3>
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-purple-700">{stats.activeClients}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {stats.totalAppointments} total appointments
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">Upcoming Sessions</h3>
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-700">{stats.upcomingAppointments}</p>
            <p className="text-sm text-muted-foreground mt-1">This week</p>
          </div>
          
          <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">Monthly Earnings</h3>
              <CreditCard className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-700">${stats.monthlyEarnings.toFixed(0)}</p>
            <p className="text-sm text-muted-foreground mt-1">This month</p>
          </div>
          
          <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">Profile Completion</h3>
              <Settings className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex items-center">
              <div className="w-full bg-muted rounded-full h-2.5">
                <div 
                  className="bg-purple-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${stats.profileCompletion}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm text-muted-foreground">{stats.profileCompletion}%</span>
            </div>
            {stats.averageRating > 0 && (
              <div className="flex items-center mt-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-muted-foreground">{stats.averageRating}</span>
              </div>
            )}
          </div>
            </>
          )}
        </div>
        
        {/* Today's Rota Widget */}
        <div className="mb-8">
          <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Today's Rota</h2>
              <Link to="/nurse/dashboard/shifts" className="text-sm text-purple-600 hover:text-purple-700">
                View All
              </Link>
            </div>
            {shiftsLoading ? (
              <div className="space-y-3">
                {[1, 2].map(i => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full"></div>
                      <div>
                        <div className="h-4 bg-muted rounded w-24 mb-1"></div>
                        <div className="h-3 bg-muted rounded w-20"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-muted rounded w-16"></div>
                  </div>
                ))}
              </div>
            ) : todayShifts.length > 0 ? (
              <div className="space-y-3">
                {todayShifts.map((shift) => {
                  const now = new Date();
                  const [startHour, startMin] = shift.start_time.split(':').map(Number);
                  const [endHour, endMin] = shift.end_time.split(':').map(Number);
                  const shiftStart = new Date(now);
                  shiftStart.setHours(startHour, startMin, 0);
                  const shiftEnd = new Date(now);
                  shiftEnd.setHours(endHour, endMin, 0);
                  
                  const isActive = now >= shiftStart && now <= shiftEnd;
                  const isPast = now > shiftEnd;
                  const isUpcoming = now < shiftStart;
                  
                  let displayStatus = shift.status;
                  if (shift.status === 'scheduled') {
                    displayStatus = isActive ? 'active' : isUpcoming ? 'upcoming' : 'completed';
                  }
                  
                  return (
                    <div key={shift.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-500/20 rounded-full flex items-center justify-center">
                          <Users size={20} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-foreground">{shift.staff_name}</p>
                          <p className="text-xs text-muted-foreground">{shift.client_name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{shift.start_time} - {shift.end_time}</p>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                          displayStatus === 'active' || displayStatus === 'in_progress' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300' 
                            : displayStatus === 'completed' 
                            ? 'bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-200'
                            : displayStatus === 'cancelled'
                            ? 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300'
                        }`}>
                          {displayStatus}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No shifts scheduled for today</p>
                <Link to="/nurse/dashboard/shifts" className="text-sm text-purple-600 hover:text-purple-700 mt-2 inline-block">
                  Create a shift
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/nurse/dashboard/care-logs"
              className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md hover:border-purple-200 dark:hover:border-purple-400 transition-all group"
            >
              <FileText size={24} className="text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-foreground">Care Logs</p>
              <p className="text-xs text-muted-foreground mt-1">Document client care</p>
            </Link>

            <Link
              to="/nurse/dashboard/staff"
              className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md hover:border-purple-200 dark:hover:border-purple-400 transition-all group"
            >
              <Users size={24} className="text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-foreground">Staff</p>
              <p className="text-xs text-muted-foreground mt-1">Manage your team</p>
            </Link>

            <Link
              to="/nurse/dashboard/care-plans"
              className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md hover:border-purple-200 dark:hover:border-purple-400 transition-all group"
            >
              <FileText size={24} className="text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-foreground">Care Plans</p>
              <p className="text-xs text-muted-foreground mt-1">Review and update</p>
            </Link>

            <Link
              to="/nurse/dashboard/analytics"
              className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md hover:border-purple-200 dark:hover:border-purple-400 transition-all group"
            >
              <Activity size={24} className="text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-foreground">Analytics</p>
              <p className="text-xs text-muted-foreground mt-1">View insights</p>
            </Link>
          </div>
        </div>

        {/* Compliance Alerts */}
        <div className="mb-8">
          <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-foreground">Compliance Dashboard</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-500/20 border border-green-200 dark:border-green-500/30 rounded-lg">
                <span className="text-sm font-medium text-foreground">Staff DBS Checks</span>
                <span className="text-green-600 dark:text-green-400 font-semibold">✓ Current</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-500/20 border border-green-200 dark:border-green-500/30 rounded-lg">
                <span className="text-sm font-medium text-foreground">Training Certificates</span>
                <span className="text-green-600 dark:text-green-400 font-semibold">✓ Up to Date</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-500/20 border border-yellow-200 dark:border-yellow-500/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} className="text-yellow-600 dark:text-yellow-400" />
                  <span className="text-sm font-medium text-foreground">Insurance Renewal</span>
                </div>
                <span className="text-yellow-600 dark:text-yellow-400 font-semibold">14 days</span>
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
