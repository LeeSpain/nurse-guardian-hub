import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { Calendar, Clock, Users, Plus, Filter, AlertCircle, CheckCircle, MoreVertical } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { useStaffShifts } from '@/hooks/useStaffShifts';
import { useStaff } from '@/hooks/useStaff';
import { useClients } from '@/hooks/useClients';
import { useOrganization } from '@/hooks/useOrganization';
import { CreateShiftModal } from '@/components/shifts/CreateShiftModal';
import { ShiftSwapRequestModal } from '@/components/shifts/ShiftSwapRequestModal';
import { RefreshCw } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('upcoming');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [selectedShiftForSwap, setSelectedShiftForSwap] = useState<string | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [shiftToCancel, setShiftToCancel] = useState<string | null>(null);
  
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

  const upcomingShifts = shifts.filter(shift => 
    new Date(shift.shift_date) >= new Date() && shift.status !== 'cancelled' && shift.status !== 'completed'
  );

  const completedShifts = shifts.filter(shift => 
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

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Shift Management</h1>
          <p className="text-muted-foreground">Manage staff schedules and shifts</p>
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
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="upcoming">Upcoming Shifts</TabsTrigger>
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