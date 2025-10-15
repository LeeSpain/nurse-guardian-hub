import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { useAppointments } from '@/hooks/useAppointments';
import { format, startOfWeek, addDays, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isBefore, startOfDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, User, Calendar as CalendarIcon, Grid3x3, List, LayoutGrid } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const Calendar: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const { appointments, loading } = useAppointments();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  
  if (isLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!isAuthenticated || user?.role !== UserRole.NURSE) {
    return <Navigate to="/login" />;
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-500',
      confirmed: 'bg-green-500',
      completed: 'bg-blue-500',
      cancelled: 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(apt => 
      isSameDay(new Date(apt.appointment_date), date) && 
      apt.nurse_id === user.id
    );
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const selectedDayAppointments = getAppointmentsForDate(selectedDate);
  const upcomingAppointments = appointments
    .filter(apt => !isBefore(new Date(apt.appointment_date), startOfDay(new Date())) && apt.nurse_id === user.id)
    .sort((a, b) => new Date(a.appointment_date).getTime() - new Date(b.appointment_date).getTime())
    .slice(0, 5);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = addDays(currentDate, direction === 'next' ? 7 : -7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
          <p className="text-muted-foreground">Manage your appointments and schedule</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button size="sm" className="gap-2">
            <Plus size={16} />
            New Appointment
          </Button>
        </div>
      </div>

      {/* View Selector */}
      <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="month" className="gap-2">
            <LayoutGrid size={16} />
            Month
          </TabsTrigger>
          <TabsTrigger value="week" className="gap-2">
            <Grid3x3 size={16} />
            Week
          </TabsTrigger>
          <TabsTrigger value="day" className="gap-2">
            <List size={16} />
            Day
          </TabsTrigger>
        </TabsList>

        {/* Month View */}
        <TabsContent value="month" className="mt-6 space-y-4">
          <Card className="p-6">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft size={16} />
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Day Headers */}
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="text-center font-semibold text-sm text-muted-foreground py-2">
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {monthDays.map((day, index) => {
                const dayAppointments = getAppointmentsForDate(day);
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentDay = isToday(day);

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(day)}
                    className={cn(
                      "min-h-24 p-2 rounded-lg border transition-all hover:border-primary/50 hover:shadow-sm",
                      isSelected && "border-primary bg-primary/5 shadow-md",
                      isCurrentDay && "bg-accent/50",
                      "flex flex-col items-start"
                    )}
                  >
                    <span className={cn(
                      "text-sm font-medium mb-1",
                      isCurrentDay && "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center",
                      isSelected && !isCurrentDay && "text-primary"
                    )}>
                      {format(day, 'd')}
                    </span>
                    <div className="w-full space-y-1">
                      {dayAppointments.slice(0, 2).map((apt) => (
                        <div
                          key={apt.id}
                          className={cn(
                            "text-xs px-1.5 py-0.5 rounded truncate",
                            "bg-primary/10 text-primary border-l-2 border-primary"
                          )}
                        >
                          {apt.start_time}
                        </div>
                      ))}
                      {dayAppointments.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{dayAppointments.length - 2} more
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        {/* Week View */}
        <TabsContent value="week" className="mt-6 space-y-4">
          <Card className="p-6">
            {/* Week Navigation */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d, yyyy')}
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
                  <ChevronLeft size={16} />
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>

            {/* Week Grid */}
            <div className="grid grid-cols-7 gap-3">
              {weekDays.map((day, index) => {
                const dayAppointments = getAppointmentsForDate(day);
                const isCurrentDay = isToday(day);

                return (
                  <div key={index} className="space-y-2">
                    <div className={cn(
                      "text-center py-2 rounded-lg",
                      isCurrentDay && "bg-primary text-primary-foreground"
                    )}>
                      <div className="text-xs font-medium">{format(day, 'EEE')}</div>
                      <div className="text-lg font-bold">{format(day, 'd')}</div>
                    </div>
                    <div className="space-y-2 min-h-96">
                      {dayAppointments.map((apt) => (
                        <Card key={apt.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-start gap-2">
                            <div className={cn("w-1 h-full rounded-full", getStatusColor(apt.status))} />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{apt.title}</p>
                              <p className="text-xs text-muted-foreground">{apt.start_time}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        {/* Day View */}
        <TabsContent value="day" className="mt-6 space-y-4">
          <Card className="p-6">
            {/* Day Navigation */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedDate(addDays(selectedDate, -1))}>
                  <ChevronLeft size={16} />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedDate(addDays(selectedDate, 1))}>
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>

            {/* Day Schedule */}
            <div className="space-y-3">
              {selectedDayAppointments.length > 0 ? (
                selectedDayAppointments.map((appointment) => (
                  <Card key={appointment.id} className="p-4 hover:shadow-lg transition-all cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className={cn("w-2 h-full rounded-full", getStatusColor(appointment.status))} />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{appointment.title}</h3>
                            <Badge variant="secondary" className="mt-1">
                              {appointment.status}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-primary">${appointment.total_cost}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock size={14} />
                            {appointment.start_time} - {appointment.end_time}
                          </div>
                          {appointment.address && (
                            <div className="flex items-center gap-2">
                              <MapPin size={14} />
                              {appointment.address}
                            </div>
                          )}
                        </div>
                        {appointment.description && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {appointment.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <CalendarIcon size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No appointments scheduled</p>
                  <p className="text-sm">Your calendar is free for this day</p>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sidebar - Upcoming Appointments */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Clock size={20} className="text-primary" />
          Upcoming Appointments
        </h3>
        <div className="space-y-3">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-3 border rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm">{appointment.title}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {appointment.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={12} />
                    {format(new Date(appointment.appointment_date), 'MMM d, yyyy')}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={12} />
                    {appointment.start_time} - {appointment.end_time}
                  </div>
                  {appointment.address && (
                    <div className="flex items-center gap-2">
                      <MapPin size={12} />
                      {appointment.address}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center p-4 bg-accent/50 rounded-lg">
              <CalendarIcon className="text-muted-foreground mr-3" size={20} />
              <div className="flex-grow">
                <p className="font-medium text-sm">No upcoming appointments</p>
                <p className="text-xs text-muted-foreground">Your schedule is clear</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Calendar;
