import React from 'react';
import { Calendar, Clock, MapPin, User, Phone } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { Appointment } from '@/hooks/useAppointments';
import { format } from 'date-fns';

interface AppointmentCardProps {
  appointment: Appointment;
  userRole: 'client' | 'nurse';
  onCancel?: (id: string) => void;
  onReschedule?: (id: string) => void;
  onComplete?: (id: string) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  userRole,
  onCancel,
  onReschedule,
  onComplete
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (date: string) => {
    return format(new Date(date), 'MMM dd, yyyy');
  };

  const canCancel = appointment.status === 'pending' || appointment.status === 'confirmed';
  const canComplete = appointment.status === 'confirmed' && userRole === 'nurse';
  const canReschedule = appointment.status === 'pending' && userRole === 'client';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {appointment.title}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </span>
        </div>
        
        {appointment.total_cost && (
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">
              €{appointment.total_cost}
            </p>
            {appointment.hourly_rate && (
              <p className="text-sm text-gray-600">
                €{appointment.hourly_rate}/hr
              </p>
            )}
          </div>
        )}
      </div>
      
      {/* Appointment Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{formatDate(appointment.appointment_date)}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>
            {formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}
            {appointment.duration_minutes && (
              <span className="ml-2 text-sm">({appointment.duration_minutes} min)</span>
            )}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="line-clamp-1">{appointment.address}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <User className="w-4 h-4 mr-2" />
          <span>{appointment.service_type}</span>
        </div>
      </div>
      
      {/* Description */}
      {appointment.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {appointment.description}
        </p>
      )}
      
      {/* Special Instructions */}
      {appointment.special_instructions && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-blue-800 text-sm">
            <strong>Special Instructions:</strong> {appointment.special_instructions}
          </p>
        </div>
      )}
      
      {/* Cancellation Reason */}
      {appointment.status === 'cancelled' && appointment.cancellation_reason && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-red-800 text-sm">
            <strong>Cancelled:</strong> {appointment.cancellation_reason}
          </p>
        </div>
      )}
      
      {/* Actions */}
      {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
        <div className="flex gap-2 flex-wrap">
          {canComplete && (
            <Button
              variant="nurse"
              size="sm"
              onClick={() => onComplete?.(appointment.id)}
            >
              Mark Complete
            </Button>
          )}
          
          {canReschedule && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReschedule?.(appointment.id)}
            >
              Reschedule
            </Button>
          )}
          
          {canCancel && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCancel?.(appointment.id)}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Cancel
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;