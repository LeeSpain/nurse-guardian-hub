import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { Calendar as CalendarIcon, Plus, Clock, User, MapPin } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import Button from '@/components/ui-components/Button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useAppointments } from '@/hooks/useAppointments';
import { Card } from '@/components/ui/card';

const Calendar: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const { appointments, upcomingAppointments, loading } = useAppointments();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  if (isLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-purple-600 border-r-transparent border-b-purple-600 border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!isAuthenticated || user?.role !== UserRole.NURSE) {
    return <Navigate to="/login" />;
  }

  // Get appointments for the selected date
  const selectedDateAppointments = selectedDate 
    ? appointments.filter(apt => 
        isSameDay(new Date(apt.appointment_date), selectedDate) && 
        apt.nurse_id === user.id
      )
    : [];

  // Get dates that have appointments
  const appointmentDates = appointments
    .filter(apt => apt.nurse_id === user.id)
    .map(apt => new Date(apt.appointment_date));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
            <p className="text-purple-600">Manage your appointments and schedule</p>
          </div>
          <Button variant="nurse" size="md" icon={<Plus size={16} />}>
            Add Appointment
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border-0 p-0"
                modifiers={{
                  hasAppointment: appointmentDates,
                }}
                modifiersStyles={{
                  hasAppointment: {
                    backgroundColor: 'hsl(var(--primary) / 0.1)',
                    color: 'hsl(var(--primary))',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Card>
          </div>

          {/* Selected Date Appointments */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
              </h3>
              
              {selectedDateAppointments.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{appointment.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          {appointment.start_time} - {appointment.end_time}
                        </div>
                        <div className="flex items-center">
                          <MapPin size={12} className="mr-1" />
                          {appointment.address}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No appointments for this date</p>
              )}
            </Card>

            {/* Upcoming Appointments */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Upcoming Appointments</h3>
              
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-3">
                  {upcomingAppointments.slice(0, 5).map((appointment) => (
                    <div key={appointment.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{appointment.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                      <div className="space-y-1 text-xs text-gray-600">
                        <div>{format(new Date(appointment.appointment_date), 'MMM d')}</div>
                        <div className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          {appointment.start_time} - {appointment.end_time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                  <CalendarIcon className="text-purple-600 mr-3" size={20} />
                  <div className="flex-grow">
                    <p className="font-medium text-gray-800">No appointments scheduled</p>
                    <p className="text-sm text-gray-600">Your calendar is empty</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;