import React, { useState, useEffect } from 'react';
import { Navigate, useSearchParams, Link } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { useOrganization } from '@/hooks/useOrganization';
import { Bell, CheckCircle2, Calendar as CalendarIcon, Filter, Search, X, Clock, AlertTriangle, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { format, isPast, isToday, isTomorrow, startOfWeek, addDays, isSameDay } from 'date-fns';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const Reminders: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const { organization } = useOrganization();
  const [searchParams] = useSearchParams();
  const [reminders, setReminders] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'calendar'>('list');
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<string>('all');
  const [selectedStaff, setSelectedStaff] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('pending');
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'created'>('date');

  useEffect(() => {
    if (organization?.id) {
      fetchData();
    }
  }, [organization?.id, selectedClient, selectedStaff, selectedPriority, selectedStatus, sortBy]);

  const fetchData = async () => {
    if (!organization?.id) return;
    
    try {
      setLoading(true);
      
      // Fetch reminders
      let query = supabase
        .from('client_reminders')
        .select(`
          *,
          client:clients(id, first_name, last_name),
          assigned_staff:staff_members!client_reminders_assigned_to_fkey(id, first_name, last_name),
          created_by_staff:staff_members!client_reminders_created_by_fkey(id, first_name, last_name)
        `)
        .eq('organization_id', organization.id);

      if (selectedClient !== 'all') {
        query = query.eq('client_id', selectedClient);
      }
      
      if (selectedStaff !== 'all') {
        query = query.eq('assigned_to', selectedStaff);
      }
      
      if (selectedPriority !== 'all') {
        query = query.eq('priority', selectedPriority);
      }
      
      if (selectedStatus !== 'all') {
        query = query.eq('status', selectedStatus);
      }
      
      if (dateRange.from) {
        query = query.gte('reminder_date', format(dateRange.from, 'yyyy-MM-dd'));
      }
      
      if (dateRange.to) {
        query = query.lte('reminder_date', format(dateRange.to, 'yyyy-MM-dd'));
      }

      // Sort
      if (sortBy === 'date') {
        query = query.order('reminder_date', { ascending: true }).order('reminder_time', { ascending: true });
      } else if (sortBy === 'priority') {
        query = query.order('priority', { ascending: false }).order('reminder_date', { ascending: true });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const { data: remindersData, error: remindersError } = await query;
      
      if (remindersError) throw remindersError;
      setReminders(remindersData || []);

      // Fetch clients for filter
      const { data: clientsData } = await supabase
        .from('clients')
        .select('id, first_name, last_name')
        .eq('organization_id', organization.id)
        .eq('status', 'active')
        .order('first_name');
      
      setClients(clientsData || []);

      // Fetch staff for filter
      const { data: staffData } = await supabase
        .from('staff_members')
        .select('id, first_name, last_name')
        .eq('organization_id', organization.id)
        .eq('is_active', true)
        .order('first_name');
      
      setStaff(staffData || []);

    } catch (error) {
      console.error('Error fetching reminders:', error);
      toast.error('Failed to load reminders');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteReminder = async (reminderId: string) => {
    try {
      const { error } = await supabase
        .from('client_reminders')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('id', reminderId);

      if (error) throw error;
      
      toast.success('Reminder marked as completed');
      fetchData();
    } catch (error) {
      console.error('Error completing reminder:', error);
      toast.error('Failed to complete reminder');
    }
  };

  const handleDeleteReminder = async (reminderId: string) => {
    if (!confirm('Are you sure you want to delete this reminder?')) return;
    
    try {
      const { error } = await supabase
        .from('client_reminders')
        .delete()
        .eq('id', reminderId);

      if (error) throw error;
      
      toast.success('Reminder deleted');
      fetchData();
    } catch (error) {
      console.error('Error deleting reminder:', error);
      toast.error('Failed to delete reminder');
    }
  };

  const filteredReminders = reminders.filter(reminder => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      reminder.title.toLowerCase().includes(searchLower) ||
      reminder.description?.toLowerCase().includes(searchLower) ||
      reminder.client?.first_name.toLowerCase().includes(searchLower) ||
      reminder.client?.last_name.toLowerCase().includes(searchLower)
    );
  });

  const overdueReminders = filteredReminders.filter(r => isPast(new Date(r.reminder_date)) && !isToday(new Date(r.reminder_date)) && r.status === 'pending');
  const todayReminders = filteredReminders.filter(r => isToday(new Date(r.reminder_date)) && r.status === 'pending');
  const upcomingReminders = filteredReminders.filter(r => !isPast(new Date(r.reminder_date)) && !isToday(new Date(r.reminder_date)) && r.status === 'pending');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== UserRole.NURSE) {
    return <Navigate to="/login" />;
  }

  const ReminderCard = ({ reminder }: { reminder: any }) => {
    const reminderDate = new Date(reminder.reminder_date);
    const isOverdue = isPast(reminderDate) && !isToday(reminderDate) && reminder.status === 'pending';
    const isDueToday = isToday(reminderDate) && reminder.status === 'pending';
    const isDueTomorrow = isTomorrow(reminderDate) && reminder.status === 'pending';

    return (
      <Card className={cn(
        "p-4 hover:shadow-md transition-all",
        isOverdue && "border-red-300 bg-red-50/50 dark:bg-red-950/20",
        isDueToday && "border-amber-300 bg-amber-50/50 dark:bg-amber-950/20"
      )}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h4 className="font-semibold text-sm">{reminder.title}</h4>
              <Badge className={
                reminder.priority === 'urgent' ? 'bg-red-500' :
                reminder.priority === 'high' ? 'bg-orange-500' :
                reminder.priority === 'medium' ? 'bg-yellow-500' :
                'bg-blue-500'
              }>
                {reminder.priority}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {reminder.reminder_type.replace('_', ' ')}
              </Badge>
              {isOverdue && <Badge variant="destructive" className="text-xs">Overdue</Badge>}
              {isDueToday && <Badge className="bg-amber-500 text-xs">Due Today</Badge>}
              {isDueTomorrow && <Badge className="bg-blue-500 text-xs">Tomorrow</Badge>}
              {reminder.status !== 'pending' && (
                <Badge variant="outline" className="text-xs">{reminder.status}</Badge>
              )}
            </div>
            
            {reminder.description && (
              <p className="text-sm text-muted-foreground mb-2">{reminder.description}</p>
            )}
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
              <Link 
                to={`/nurse/dashboard/clients/${reminder.client_id}?tab=reminders`}
                className="flex items-center gap-1 hover:text-primary"
              >
                <User className="h-3 w-3" />
                {reminder.client?.first_name} {reminder.client?.last_name}
              </Link>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {format(reminderDate, 'MMM d, yyyy')}
                {reminder.reminder_time && ` at ${reminder.reminder_time}`}
              </span>
              {reminder.assigned_staff && (
                <span>
                  Assigned: {reminder.assigned_staff.first_name} {reminder.assigned_staff.last_name}
                </span>
              )}
            </div>
          </div>
          
          {reminder.status === 'pending' && (
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleCompleteReminder(reminder.id)}
              >
                <CheckCircle2 className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => handleDeleteReminder(reminder.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bell className="h-8 w-8" />
            Reminders
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage all client reminders across your organization
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            onClick={() => setView('list')}
          >
            List View
          </Button>
          <Button
            variant={view === 'calendar' ? 'default' : 'outline'}
            onClick={() => setView('calendar')}
          >
            Calendar View
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-red-200 bg-red-50/50 dark:bg-red-950/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Overdue</p>
              <p className="text-2xl font-bold">{overdueReminders.length}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </Card>
        <Card className="p-4 border-amber-200 bg-amber-50/50 dark:bg-amber-950/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Due Today</p>
              <p className="text-2xl font-bold">{todayReminders.length}</p>
            </div>
            <CalendarIcon className="h-8 w-8 text-amber-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Upcoming</p>
              <p className="text-2xl font-bold">{upcomingReminders.length}</p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Pending</p>
              <p className="text-2xl font-bold">{filteredReminders.filter(r => r.status === 'pending').length}</p>
            </div>
            <Bell className="h-8 w-8 text-primary" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          <div className="col-span-1 md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reminders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger>
              <SelectValue placeholder="All Clients" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clients</SelectItem>
              {clients.map(client => (
                <SelectItem key={client.id} value={client.id}>
                  {client.first_name} {client.last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStaff} onValueChange={setSelectedStaff}>
            <SelectTrigger>
              <SelectValue placeholder="All Staff" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Staff</SelectItem>
              {staff.map(member => (
                <SelectItem key={member.id} value={member.id}>
                  {member.first_name} {member.last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger>
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="created">Created Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Content */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : view === 'list' ? (
        <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
          <TabsList>
            <TabsTrigger value="pending">Pending ({filteredReminders.filter(r => r.status === 'pending').length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({filteredReminders.filter(r => r.status === 'completed').length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({filteredReminders.filter(r => r.status === 'cancelled').length})</TabsTrigger>
            <TabsTrigger value="all">All ({filteredReminders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedStatus} className="space-y-4">
            {overdueReminders.length > 0 && selectedStatus === 'pending' && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-600 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Overdue ({overdueReminders.length})
                </h3>
                <div className="space-y-3">
                  {overdueReminders.map(reminder => (
                    <ReminderCard key={reminder.id} reminder={reminder} />
                  ))}
                </div>
              </div>
            )}

            {todayReminders.length > 0 && selectedStatus === 'pending' && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-amber-600 flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Due Today ({todayReminders.length})
                </h3>
                <div className="space-y-3">
                  {todayReminders.map(reminder => (
                    <ReminderCard key={reminder.id} reminder={reminder} />
                  ))}
                </div>
              </div>
            )}

            {upcomingReminders.length > 0 && selectedStatus === 'pending' && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Upcoming ({upcomingReminders.length})
                </h3>
                <div className="space-y-3">
                  {upcomingReminders.map(reminder => (
                    <ReminderCard key={reminder.id} reminder={reminder} />
                  ))}
                </div>
              </div>
            )}

            {selectedStatus !== 'pending' && filteredReminders.length > 0 && (
              <div className="space-y-3">
                {filteredReminders.map(reminder => (
                  <ReminderCard key={reminder.id} reminder={reminder} />
                ))}
              </div>
            )}

            {filteredReminders.length === 0 && (
              <Card className="p-12 text-center">
                <Bell className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No Reminders Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or create a new reminder
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <Card className="p-6">
          <p className="text-center text-muted-foreground">Calendar view coming soon</p>
        </Card>
      )}
    </div>
  );
};

export default Reminders;
