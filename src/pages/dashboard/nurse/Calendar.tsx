import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { Calendar as CalendarIcon, Plus, Clock, User } from 'lucide-react';
import Button from '@/components/ui-components/Button';

const Calendar: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-purple-600 border-r-transparent border-b-purple-600 border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!isAuthenticated || user?.role !== UserRole.NURSE) {
    return <Navigate to="/login" />;
  }
  
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
        
        {/* Calendar View */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-7 gap-4 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: 35 }, (_, i) => (
              <div key={i} className="h-24 border border-gray-100 rounded-lg p-2 hover:bg-purple-50 cursor-pointer">
                <span className="text-sm text-gray-500">{((i % 30) + 1)}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Upcoming Appointments</h3>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-purple-50 rounded-lg">
              <CalendarIcon className="text-purple-600 mr-3" size={20} />
              <div className="flex-grow">
                <p className="font-medium text-gray-800">No appointments scheduled</p>
                <p className="text-sm text-gray-600">Your calendar is empty</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <Button variant="outline" as={Link} to="/nurse/dashboard">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;