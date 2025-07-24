
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { toast } from 'sonner';
import { Search, Calendar, MessageSquare, Settings, Heart, Users, Clock } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { useAppointments } from '@/hooks/useAppointments';
import { useSavedProfessionals } from '@/hooks/useSavedProfessionals';
import { useMessages } from '@/hooks/useMessages';

const ClientDashboard: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const { upcomingAppointments, loading: appointmentsLoading } = useAppointments();
  const { savedProfessionals, loading: savedLoading } = useSavedProfessionals();
  const { conversations, loading: messagesLoading } = useMessages();
  
  // If loading, show a loading state
  if (isLoading || appointmentsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-teal-500 border-r-transparent border-b-teal-500 border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    toast.error('Please log in to access your dashboard');
    return <Navigate to="/login" />;
  }
  
  // If wrong role, redirect
  if (user?.role !== UserRole.CLIENT) {
    toast.error('This dashboard is for care seekers only');
    return <Navigate to="/nurse" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user.firstName}!</h1>
          <p className="text-teal-600">Care Seeker Dashboard</p>
        </div>
        
        {/* Quick Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">Find Healthcare Professionals</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                <input 
                  type="text" 
                  placeholder="Search by specialty, name, or location..." 
                  className="pl-10 w-full py-2 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
            <Button variant="client" size="md" as={Link} to="/client/search">
              Search
            </Button>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-700">Upcoming Appointments</h3>
              <Calendar className="w-5 h-5 text-teal-600" />
            </div>
            <p className="text-3xl font-bold text-teal-700">{upcomingAppointments.length}</p>
            <p className="text-sm text-gray-500 mt-1">This week</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-700">Saved Professionals</h3>
              <Heart className="w-5 h-5 text-teal-600" />
            </div>
            <p className="text-3xl font-bold text-teal-700">{savedProfessionals.length}</p>
            <p className="text-sm text-gray-500 mt-1">Healthcare providers</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-700">Messages</h3>
              <MessageSquare className="w-5 h-5 text-teal-600" />
            </div>
            <p className="text-3xl font-bold text-teal-700">{conversations.length}</p>
            <p className="text-sm text-gray-500 mt-1">
              {conversations.reduce((sum, conv) => sum + conv.unread_count, 0)} unread
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        {upcomingAppointments.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <h3 className="font-semibold text-gray-800 mb-4">Upcoming Appointments</h3>
            <div className="space-y-3">
              {upcomingAppointments.slice(0, 3).map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{appointment.title}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(appointment.appointment_date).toLocaleDateString()} at {appointment.start_time}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" as={Link} to="/client/appointments">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Dashboard Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button
            variant="outline" 
            size="lg"
            fullWidth
            className="p-6 h-auto flex-col items-center justify-center text-center"
            icon={<Heart size={24} className="mb-2 text-teal-600" />}
            iconPosition="left"
            as={Link}
            to="/client/saved-professionals"
          >
            <div>
              <p className="font-semibold">Saved Professionals</p>
              <p className="text-xs text-gray-500 mt-1">View your favorites</p>
            </div>
          </Button>
          
          <Button
            variant="outline" 
            size="lg"
            fullWidth
            className="p-6 h-auto flex-col items-center justify-center text-center"
            icon={<Calendar size={24} className="mb-2 text-teal-600" />}
            iconPosition="left"
            as={Link}
            to="/client/appointments"
          >
            <div>
              <p className="font-semibold">Appointments</p>
              <p className="text-xs text-gray-500 mt-1">View your schedule</p>
            </div>
          </Button>
          
          <Button
            variant="outline" 
            size="lg"
            fullWidth
            className="p-6 h-auto flex-col items-center justify-center text-center"
            icon={<MessageSquare size={24} className="mb-2 text-teal-600" />}
            iconPosition="left"
            as={Link}
            to="/client/messages"
          >
            <div>
              <p className="font-semibold">Messages</p>
              <p className="text-xs text-gray-500 mt-1">Contact your providers</p>
            </div>
          </Button>
          
          <Button
            variant="outline" 
            size="lg"
            fullWidth
            className="p-6 h-auto flex-col items-center justify-center text-center"
            icon={<Settings size={24} className="mb-2 text-teal-600" />}
            iconPosition="left"
            as={Link}
            to="/client/settings"
          >
            <div>
              <p className="font-semibold">Settings</p>
              <p className="text-xs text-gray-500 mt-1">Update your profile</p>
            </div>
          </Button>
        </div>
        
        {/* Coming Soon Section */}
        <div className="mt-6 bg-teal-50 border border-teal-100 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-teal-700 mb-2">Coming Soon!</h3>
          <p className="text-gray-700">
            We're working on more features to help you find and connect with the right healthcare professionals - 
            including video consultations, integrated medical records, and personalized care recommendations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
