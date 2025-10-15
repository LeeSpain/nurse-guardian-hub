import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { useAppointments } from '@/hooks/useAppointments';
import { format, startOfWeek, addDays, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isBefore, startOfDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, User, Calendar as CalendarIcon, Grid3x3, List, LayoutGrid, X, UserPlus } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Calendar: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const { appointments, loading } = useAppointments();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState<Date>(new Date());
  const [isNewClient, setIsNewClient] = useState(false);
  
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

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setAppointmentDate(date);
    setIsAppointmentModalOpen(true);
  };

  const handleCreateAppointment = () => {
    // This will be replaced with actual appointment creation logic
    toast.success('Appointment created successfully!');
    setIsAppointmentModalOpen(false);
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
          <Button size="sm" className="gap-2" onClick={() => {
            setAppointmentDate(new Date());
            setIsAppointmentModalOpen(true);
          }}>
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
                    onClick={() => handleDateClick(day)}
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

      {/* Appointment Creation Modal */}
      <Dialog open={isAppointmentModalOpen} onOpenChange={setIsAppointmentModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Appointment</DialogTitle>
            <DialogDescription>
              Schedule an appointment for {format(appointmentDate, 'EEEE, MMMM d, yyyy')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Client Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Client Information</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsNewClient(!isNewClient)}
                  className="gap-2"
                >
                  <UserPlus size={16} />
                  {isNewClient ? 'Select Existing' : 'Add New Client'}
                </Button>
              </div>

              {isNewClient ? (
                <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-accent/50">
                  <div className="space-y-2">
                    <Label htmlFor="client-first-name">First Name *</Label>
                    <Input id="client-first-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-last-name">Last Name *</Label>
                    <Input id="client-last-name" placeholder="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-email">Email</Label>
                    <Input id="client-email" type="email" placeholder="john.doe@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-phone">Phone *</Label>
                    <Input id="client-phone" type="tel" placeholder="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="client-address">Address *</Label>
                    <Input id="client-address" placeholder="123 Main St, City, State 12345" />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="client-select">Select Client *</Label>
                  <Select>
                    <SelectTrigger id="client-select">
                      <SelectValue placeholder="Choose a client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client1">John Smith - 123 Main St</SelectItem>
                      <SelectItem value="client2">Mary Johnson - 456 Oak Ave</SelectItem>
                      <SelectItem value="client3">Robert Davis - 789 Pine Rd</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Staff Assignment */}
            <div className="space-y-2">
              <Label htmlFor="staff-select" className="text-base font-semibold">Assign Staff *</Label>
              <Select>
                <SelectTrigger id="staff-select">
                  <SelectValue placeholder="Select staff member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="staff1">Sarah Johnson - Senior RN</SelectItem>
                  <SelectItem value="staff2">Mike Williams - LPN</SelectItem>
                  <SelectItem value="staff3">Emily Brown - CNA</SelectItem>
                  <SelectItem value="staff4">David Martinez - RN</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Appointment Details */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Appointment Details</Label>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-time">Start Time *</Label>
                  <Input id="start-time" type="time" defaultValue="09:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-time">End Time *</Label>
                  <Input id="end-time" type="time" defaultValue="10:00" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service-type">Service Type *</Label>
                <Select>
                  <SelectTrigger id="service-type">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home-visit">Home Visit</SelectItem>
                    <SelectItem value="medication">Medication Management</SelectItem>
                    <SelectItem value="wound-care">Wound Care</SelectItem>
                    <SelectItem value="vital-check">Vital Signs Check</SelectItem>
                    <SelectItem value="personal-care">Personal Care</SelectItem>
                    <SelectItem value="companionship">Companionship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointment-title">Appointment Title *</Label>
                <Input id="appointment-title" placeholder="e.g., Morning Care Visit" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input id="duration" type="number" defaultValue="60" min="15" step="15" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourly-rate">Hourly Rate ($)</Label>
                <Input id="hourly-rate" type="number" defaultValue="45.00" step="0.01" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="special-instructions">Special Instructions</Label>
                <Textarea
                  id="special-instructions"
                  placeholder="Any special notes or requirements for this appointment..."
                  rows={3}
                />
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-2">
              <h4 className="font-semibold text-sm text-primary">Appointment Summary</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <span className="ml-2 font-medium">{format(appointmentDate, 'MMM d, yyyy')}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Estimated Cost:</span>
                  <span className="ml-2 font-medium text-primary">$45.00</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button onClick={handleCreateAppointment} className="flex-1">
                Create Appointment
              </Button>
              <Button variant="outline" onClick={() => setIsAppointmentModalOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;
