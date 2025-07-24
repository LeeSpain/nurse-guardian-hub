import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { Calendar, Clock, Plus, Video } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { useAppointments } from '@/hooks/useAppointments';
import AppointmentCard from '@/components/dashboard/AppointmentCard';
import PaymentStatusHandler from '@/components/appointments/PaymentStatusHandler';

const Appointments: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const { upcomingAppointments, pastAppointments, loading: appointmentsLoading, updateAppointment } = useAppointments();
  
  if (isLoading || appointmentsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-teal-500 border-r-transparent border-b-teal-500 border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!isAuthenticated || user?.role !== UserRole.CLIENT) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <PaymentStatusHandler />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
            <p className="text-teal-600">Manage your healthcare appointments</p>
          </div>
          <Button variant="client" size="md" icon={<Plus size={16} />}>
            Book Appointment
          </Button>
        </div>
        
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">Upcoming Appointments</h3>
          
          <div className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(appointment => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  userRole="client"
                  onCancel={(id) => updateAppointment(id, { status: 'cancelled', cancellation_reason: 'Cancelled by client' })}
                />
              ))
            ) : (
              <div className="flex items-center p-4 bg-teal-50 rounded-lg">
                <Calendar className="text-teal-600 mr-3" size={20} />
                <div className="flex-grow">
                  <p className="font-medium text-gray-800">No upcoming appointments</p>
                  <p className="text-sm text-gray-600">Schedule your first appointment</p>
                </div>
                <Button variant="outline" size="sm">
                  Find Provider
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Past Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">Past Appointments</h3>
          
          <div className="space-y-4">
            {pastAppointments.length > 0 ? (
              pastAppointments.map(appointment => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  userRole="client"
                />
              ))
            ) : (
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Clock className="text-gray-400 mr-3" size={20} />
                <div className="flex-grow">
                  <p className="font-medium text-gray-800">No appointment history</p>
                  <p className="text-sm text-gray-600">Your appointment history will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" size="lg" fullWidth className="justify-start" icon={<Video size={20} />}>
              Virtual Consultation
            </Button>
            <Button variant="outline" size="lg" fullWidth className="justify-start" icon={<Calendar size={20} />}>
              In-Person Visit
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          <Button variant="outline" as={Link} to="/client/dashboard">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Appointments;