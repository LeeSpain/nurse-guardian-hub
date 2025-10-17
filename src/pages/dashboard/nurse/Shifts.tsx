import React, { useState, useEffect, useMemo } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { Calendar, Clock, Users, Plus, Filter, AlertCircle, CheckCircle, MoreVertical, ChevronDown, ChevronUp, User } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { useStaffShifts } from '@/hooks/useStaffShifts';
import { useStaff } from '@/hooks/useStaff';
import { useClients } from '@/hooks/useClients';
import { useOrganization } from '@/hooks/useOrganization';
import { CreateShiftModal } from '@/components/shifts/CreateShiftModal';
import { ShiftSwapRequestModal } from '@/components/shifts/ShiftSwapRequestModal';
import { RefreshCw, X } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Shifts: React.FC = () => {
  const { user, isAuthenticated, isLoading: userLoading } = useUser();
  const { organization, loading: orgLoading } = useOrganization();
  const { shifts, loading: shiftsLoading, createShift, updateShift, deleteShift } = useStaffShifts(organization?.id);
  const { staff, loading: staffLoading } = useStaff(organization?.id);
  const { clients, loading: clientsLoading } = useClients();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [selectedShiftForSwap, setSelectedShiftForSwap] = useState<string | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [shiftToCancel, setShiftToCancel] = useState<string | null>(null);
  const [expandedStaff, setExpandedStaff] = useState<Set<string>>(new Set());
  
  // Get client filter from URL
  const clientIdParam = searchParams.get('clientId');
  
  useEffect(() => {
    // If view param is set, switch to that tab
    const view = searchParams.get('view');
    if (view === 'week') {
      setActiveTab('upcoming');
    }
  }, [searchParams]);

  // Filter shifts by client if param is present
  const filteredShifts = clientIdParam 
    ? shifts.filter(shift => shift.client_id === clientIdParam)
    : shifts;

  const upcomingShifts = filteredShifts.filter(shift => 
    new Date(shift.shift_date) >= new Date() && shift.status !== 'cancelled' && shift.status !== 'completed'
  );

  const completedShifts = filteredShifts.filter(shift => 
    shift.status === 'completed' || new Date(shift.shift_date) < new Date()
  );

  const todayShifts = upcomingShifts.filter(shift => {
    const today = new Date();
    const shiftDate = new Date(shift.shift_date);
    return shiftDate.toDateString() === today.toDateString();
  });

  const thisWeekShifts = upcomingShifts.filter(shift => {
    const today = new Date();
    const weekFromNow = new Date(today);
    weekFromNow.setDate(today.getDate() + 7);
    const shiftDate = new Date(shift.shift_date);
    return shiftDate >= today && shiftDate <= weekFromNow;
  });

  // Group shifts by staff member
  const shiftsByStaff = useMemo(() => {
    const grouped = new Map<string, {
      staff: any;
      shifts: any[];
      todayCount: number;
      weekCount: number;
      totalHours: number;
    }>();

    upcomingShifts.forEach(shift => {
      const staffId = shift.staff_member_id;
      if (!staffId) return;

      if (!grouped.has(staffId)) {
        const today = new Date();
        const weekFromNow = new Date(today);
        weekFromNow.setDate(today.getDate() + 7);

        grouped.set(staffId, {
          staff: shift.staff_member,
          shifts: [],
          todayCount: 0,
          weekCount: 0,
          totalHours: 0,
        });
      }

      const group = grouped.get(staffId)!;
      group.shifts.push(shift);

      // Calculate hours
      const [startHour, startMin] = shift.start_time.split(':').map(Number);
      const [endHour, endMin] = shift.end_time.split(':').map(Number);
      const hours = (endHour + endMin / 60) - (startHour + startMin / 60) - (shift.break_minutes / 60);
      group.totalHours += hours;

      // Count today and this week
      const shiftDate = new Date(shift.shift_date);
      const today = new Date();
      if (shiftDate.toDateString() === today.toDateString()) {
        group.todayCount++;
      }

      const weekFromNow = new Date(today);
      weekFromNow.setDate(today.getDate() + 7);
      if (shiftDate >= today && shiftDate <= weekFromNow) {
        group.weekCount++;
      }
    });

    return Array.from(grouped.values()).sort((a, b) => 
      b.shifts.length - a.shifts.length
    );
  }, [upcomingShifts]);
  
  if (userLoading || orgLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!isAuthenticated || user?.role !== UserRole.NURSE) {
    return <Navigate to="/login" />;
  }

  if (!organization) {
    return (
      <div className="container mx-auto p-6">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">No Organization Found</h2>
          <p className="text-muted-foreground mb-6">
            You need to create or join an organization to manage shifts.
          </p>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      scheduled: 'secondary',
      confirmed: 'default',
      completed: 'outline',
      cancelled: 'destructive',
    };
    return colors[status] || 'outline';
  };

  const clearFilter = () => {
    setSearchParams({});
  };

  const confirmCancel = (id: string) => {
    setShiftToCancel(id);
    setCancelDialogOpen(true);
  };

  const handleCancel = async () => {
    if (shiftToCancel) {
      await deleteShift(shiftToCancel);
      setCancelDialogOpen(false);
      setShiftToCancel(null);
    }
  };

  const toggleStaffExpanded = (staffId: string) => {
    setExpandedStaff(prev => {
      const newSet = new Set(prev);
      if (newSet.has(staffId)) {
        newSet.delete(staffId);
      } else {
        newSet.add(staffId);
      }
      return newSet;
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Shift Management</h1>
          <p className="text-muted-foreground">Manage staff schedules and shifts</p>
          {clientIdParam && (
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                Filtered by Client
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilter}
                  className="h-4 w-4 p-0 hover:bg-transparent"
                >
                  <X size={14} />
                </Button>
              </Badge>
            </div>
          )}
        </div>
        
        <Button 
          variant="nurse" 
          icon={<Plus size={16} />}
          onClick={() => setCreateModalOpen(true)}
          disabled={staff.length === 0}
        >
          Create Shift
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Today's Shifts</p>
              <p className="text-2xl font-bold text-foreground">{todayShifts.length}</p>
            </div>
            <Calendar className="text-primary" size={32} />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">This Week</p>
              <p className="text-2xl font-bold text-foreground">{thisWeekShifts.length}</p>
            </div>
            <Clock className="text-primary" size={32} />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Staff</p>
              <p className="text-2xl font-bold text-foreground">{staff.filter(s => s.is_active).length}</p>
            </div>
            <Users className="text-primary" size={32} />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-foreground">{completedShifts.length}</p>
            </div>
            <CheckCircle className="text-primary" size={32} />
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="upcoming">All Shifts</TabsTrigger>
          <TabsTrigger value="by-staff">By Staff Member</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {shiftsLoading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent rounded-full animate-spin"></div>
            </div>
          ) : upcomingShifts.length === 0 ? (
            <Card className="p-8 text-center">
              <Calendar className="text-muted-foreground mx-auto mb-4" size={48} />
              <h3 className="text-lg font-semibold mb-2">No Upcoming Shifts</h3>
              <p className="text-muted-foreground mb-4">Create a shift to get started</p>
              <Button 
                variant="nurse" 
                onClick={() => setCreateModalOpen(true)}
                disabled={staff.length === 0}
              >
                {staff.length === 0 ? 'Add Staff First' : 'Create Shift'}
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingShifts.map((shift) => (
                <Card key={shift.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">
                          {shift.staff_member?.profile?.first_name} {shift.staff_member?.profile?.last_name}
                        </h3>
                        <Badge variant={getStatusColor(shift.status)}>
                          {shift.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Date</p>
                          <p className="font-medium">{format(new Date(shift.shift_date), 'MMM dd, yyyy')}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Time</p>
                          <p className="font-medium">{shift.start_time} - {shift.end_time}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Client</p>
                          <p className="font-medium">
                            {shift.client ? `${shift.client.first_name} ${shift.client.last_name}` : 'No client'}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Break</p>
                          <p className="font-medium">{shift.break_minutes} min</p>
                        </div>
                      </div>

                      {shift.notes && (
                        <p className="mt-3 text-sm text-muted-foreground">{shift.notes}</p>
                      )}
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-background">
                        <DropdownMenuItem onClick={() => updateShift(shift.id, { status: 'confirmed' })}>
                          <CheckCircle className="mr-2" size={16} />
                          Confirm Shift
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateShift(shift.id, { status: 'completed' })}>
                          <CheckCircle className="mr-2" size={16} />
                          Mark Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedShiftForSwap(shift.id);
                          setIsSwapModalOpen(true);
                        }}>
                          <RefreshCw className="mr-2" size={16} />
                          Request Swap
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => confirmCancel(shift.id)}
                        >
                          <AlertCircle className="mr-2" size={16} />
                          Cancel Shift
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="by-staff">
          {shiftsLoading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent rounded-full animate-spin"></div>
            </div>
          ) : shiftsByStaff.length === 0 ? (
            <Card className="p-8 text-center">
              <Users className="text-muted-foreground mx-auto mb-4" size={48} />
              <h3 className="text-lg font-semibold mb-2">No Staff Shifts</h3>
              <p className="text-muted-foreground mb-4">Create shifts and assign them to staff members</p>
              <Button 
                variant="nurse" 
                onClick={() => setCreateModalOpen(true)}
                disabled={staff.length === 0}
              >
                {staff.length === 0 ? 'Add Staff First' : 'Create Shift'}
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {shiftsByStaff.map((staffGroup) => (
                <Card key={staffGroup.staff.id} className="overflow-hidden">
                  <Collapsible 
                    open={expandedStaff.has(staffGroup.staff.id)}
                    onOpenChange={() => toggleStaffExpanded(staffGroup.staff.id)}
                  >
                    <CollapsibleTrigger className="w-full">
                      <div className="p-6 hover:bg-accent/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={staffGroup.staff.profile_image_url} />
                              <AvatarFallback className="bg-primary/10 text-primary">
                                <User size={24} />
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="text-left">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-lg">
                                  {staffGroup.staff.first_name} {staffGroup.staff.last_name}
                                </h3>
                                <Badge variant="secondary" className="text-xs">
                                  {staffGroup.shifts.length} {staffGroup.shifts.length === 1 ? 'shift' : 'shifts'}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{staffGroup.staff.job_title || 'Staff Member'}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="text-xs text-muted-foreground">Today</p>
                                  <p className="font-bold text-lg text-primary">{staffGroup.todayCount}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">This Week</p>
                                  <p className="font-bold text-lg text-primary">{staffGroup.weekCount}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Total Hours</p>
                                  <p className="font-bold text-lg text-primary">{staffGroup.totalHours.toFixed(1)}h</p>
                                </div>
                              </div>
                            </div>
                            
                            {expandedStaff.has(staffGroup.staff.id) ? (
                              <ChevronUp size={20} className="text-muted-foreground" />
                            ) : (
                              <ChevronDown size={20} className="text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="border-t bg-muted/20 p-4 space-y-3">
                        {staffGroup.shifts.map((shift) => (
                          <Card key={shift.id} className="p-4 bg-background">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant={getStatusColor(shift.status)}>
                                    {shift.status}
                                  </Badge>
                                  {(() => {
                                    const shiftDate = new Date(shift.shift_date);
                                    const today = new Date();
                                    if (shiftDate.toDateString() === today.toDateString()) {
                                      return <Badge className="bg-blue-500">Today</Badge>;
                                    }
                                    return null;
                                  })()}
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                                  <div>
                                    <p className="text-xs text-muted-foreground">Date</p>
                                    <p className="font-medium">{format(new Date(shift.shift_date), 'EEE, MMM dd')}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">Time</p>
                                    <p className="font-medium">{shift.start_time} - {shift.end_time}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">Client</p>
                                    <p className="font-medium">
                                      {shift.client ? `${shift.client.first_name} ${shift.client.last_name}` : 'No client'}
                                    </p>
                                  </div>
                                </div>

                                {shift.notes && (
                                  <p className="mt-2 text-xs text-muted-foreground italic">{shift.notes}</p>
                                )}
                              </div>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical size={16} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-background">
                                  <DropdownMenuItem onClick={() => updateShift(shift.id, { status: 'confirmed' })}>
                                    <CheckCircle className="mr-2" size={16} />
                                    Confirm Shift
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => updateShift(shift.id, { status: 'completed' })}>
                                    <CheckCircle className="mr-2" size={16} />
                                    Mark Completed
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => {
                                    setSelectedShiftForSwap(shift.id);
                                    setIsSwapModalOpen(true);
                                  }}>
                                    <RefreshCw className="mr-2" size={16} />
                                    Request Swap
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    className="text-destructive"
                                    onClick={() => confirmCancel(shift.id)}
                                  >
                                    <AlertCircle className="mr-2" size={16} />
                                    Cancel Shift
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed">
          {completedShifts.length === 0 ? (
            <Card className="p-8 text-center">
              <CheckCircle className="text-muted-foreground mx-auto mb-4" size={48} />
              <h3 className="text-lg font-semibold mb-2">No Completed Shifts</h3>
              <p className="text-muted-foreground">Completed shifts will appear here</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {completedShifts.map((shift) => (
                <Card key={shift.id} className="p-6 opacity-75">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">
                          {shift.staff_member?.profile?.first_name} {shift.staff_member?.profile?.last_name}
                        </h3>
                        <Badge variant="outline">Completed</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Date</p>
                          <p className="font-medium">{format(new Date(shift.shift_date), 'MMM dd, yyyy')}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Time</p>
                          <p className="font-medium">{shift.start_time} - {shift.end_time}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Client</p>
                          <p className="font-medium">
                            {shift.client ? `${shift.client.first_name} ${shift.client.last_name}` : 'No client'}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Break</p>
                          <p className="font-medium">{shift.break_minutes} min</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <CreateShiftModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={createShift}
        organizationId={organization.id}
        staff={staff}
        clients={clients}
      />

{selectedShiftForSwap && (
        <ShiftSwapRequestModal
          isOpen={isSwapModalOpen}
          onClose={() => {
            setIsSwapModalOpen(false);
            setSelectedShiftForSwap(null);
          }}
          shiftId={selectedShiftForSwap}
          onSuccess={() => {
            setIsSwapModalOpen(false);
            setSelectedShiftForSwap(null);
          }}
        />
      )}

      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Shift</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this shift? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Keep Shift</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancel} className="bg-destructive text-destructive-foreground">
              Yes, Cancel Shift
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Shifts;