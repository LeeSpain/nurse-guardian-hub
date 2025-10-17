import React, { useState, useEffect, useMemo } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { Calendar, Clock, Users, Plus, AlertCircle, CheckCircle, MoreVertical, ChevronDown, ChevronUp, User, XCircle, MapPin, X, RefreshCw } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { useStaffShifts, StaffShift } from '@/hooks/useStaffShifts';
import { useStaff } from '@/hooks/useStaff';
import { useClients } from '@/hooks/useClients';
import { useOrganization } from '@/hooks/useOrganization';
import { CreateShiftModal } from '@/components/shifts/CreateShiftModal';
import { ShiftSwapRequestModal } from '@/components/shifts/ShiftSwapRequestModal';
import DeclineShiftModal from '@/components/shifts/DeclineShiftModal';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
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

interface SwapRequest {
  id: string;
  original_shift_id: string;
  requesting_staff_id: string;
  covering_staff_id: string | null;
  request_reason: string;
  status: string;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  shift_date: string;
  shift_start_time: string;
  shift_end_time: string;
  requesting_staff_name: string;
  covering_staff_name: string | null;
  client_name: string;
}

const Shifts: React.FC = () => {
  const { user, isAuthenticated, isLoading: userLoading } = useUser();
  const { organization, loading: orgLoading } = useOrganization();
  const { shifts, loading: shiftsLoading, confirmShift, declineShift, createShift, updateShift, deleteShift, refetch: refetchShifts } = useStaffShifts(organization?.id);
  const { staff, loading: staffLoading } = useStaff(organization?.id);
  const { clients, loading: clientsLoading } = useClients();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('all');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [selectedShiftForSwap, setSelectedShiftForSwap] = useState<string | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [shiftToCancel, setShiftToCancel] = useState<string | null>(null);
  const [expandedStaff, setExpandedStaff] = useState<Set<string>>(new Set());
  const [confirmationFilter, setConfirmationFilter] = useState<'all' | 'pending' | 'accepted' | 'declined'>('all');
  const [isStaffMember, setIsStaffMember] = useState(false);
  const [myStaffId, setMyStaffId] = useState<string | null>(null);
  const [myShifts, setMyShifts] = useState<{ pending: StaffShift[], accepted: StaffShift[], declined: StaffShift[] }>({
    pending: [],
    accepted: [],
    declined: []
  });
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);
  const [processingRequest, setProcessingRequest] = useState<string | null>(null);
  const [selectedShift, setSelectedShift] = useState<StaffShift | null>(null);
  const [showDeclineModal, setShowDeclineModal] = useState(false);

  const clientIdParam = searchParams.get('clientId');

  // Check if user is a staff member
  useEffect(() => {
    const checkStaffMember = async () => {
      if (!user?.id) return;
      
      const { data, error } = await supabase
        .from('staff_members')
        .select('id')
        .eq('profile_id', user.id)
        .eq('is_active', true)
        .single();
      
      if (!error && data) {
        setIsStaffMember(true);
        setMyStaffId(data.id);
      }
    };
    
    checkStaffMember();
  }, [user?.id]);

  // Fetch my personal shifts
  useEffect(() => {
    const fetchMyShifts = async () => {
      if (!myStaffId) return;

      const { data: myShiftsData, error } = await supabase
        .from('staff_shifts')
        .select(`
          *,
          client:clients!staff_shifts_client_id_fkey(
            first_name,
            last_name,
            address,
            city,
            state
          )
        `)
        .eq('staff_member_id', myStaffId)
        .gte('shift_date', new Date().toISOString().split('T')[0])
        .order('shift_date', { ascending: true })
        .order('start_time', { ascending: true });

      if (!error && myShiftsData) {
        setMyShifts({
          pending: myShiftsData.filter(s => s.confirmation_status === 'pending'),
          accepted: myShiftsData.filter(s => s.confirmation_status === 'accepted'),
          declined: myShiftsData.filter(s => s.confirmation_status === 'declined')
        });
      }
    };

    fetchMyShifts();
  }, [myStaffId, shifts]);

  // Fetch swap requests
  useEffect(() => {
    const fetchSwapRequests = async () => {
      if (!organization?.id) return;

      const { data: requests, error } = await supabase
        .from('shift_swap_requests')
        .select(`
          *,
          staff_shifts!original_shift_id(shift_date, start_time, end_time, client_id)
        `)
        .order('created_at', { ascending: false });

      if (!error && requests) {
        const enrichedRequests = await Promise.all(
          requests.map(async (req) => {
            const shift = req.staff_shifts as any;
            
            const { data: requestingStaff } = await supabase
              .from('staff_members')
              .select('first_name, last_name')
              .eq('id', req.requesting_staff_id)
              .single();

            let coveringStaffName = null;
            if (req.covering_staff_id) {
              const { data: coveringStaff } = await supabase
                .from('staff_members')
                .select('first_name, last_name')
                .eq('id', req.covering_staff_id)
                .single();
              coveringStaffName = coveringStaff ? `${coveringStaff.first_name} ${coveringStaff.last_name}` : null;
            }

            const { data: client } = await supabase
              .from('clients')
              .select('first_name, last_name')
              .eq('id', shift.client_id)
              .single();

            return {
              ...req,
              shift_date: shift.shift_date,
              shift_start_time: shift.start_time,
              shift_end_time: shift.end_time,
              requesting_staff_name: requestingStaff ? `${requestingStaff.first_name} ${requestingStaff.last_name}` : 'Unknown',
              covering_staff_name: coveringStaffName,
              client_name: client ? `${client.first_name} ${client.last_name}` : 'Unknown',
            };
          })
        );

        setSwapRequests(enrichedRequests);
      }
    };

    fetchSwapRequests();
  }, [organization?.id]);

  // Real-time subscription for shifts
  useEffect(() => {
    if (!organization?.id) return;

    const channel = supabase
      .channel('staff_shifts_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'staff_shifts',
          filter: `organization_id=eq.${organization.id}`
        },
        (payload) => {
          console.log('Shift change detected:', payload);
          refetchShifts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [organization?.id, refetchShifts]);

  const filteredShifts = clientIdParam 
    ? shifts.filter(shift => shift.client_id === clientIdParam)
    : shifts;

  let upcomingShifts = filteredShifts.filter(shift => 
    new Date(shift.shift_date) >= new Date() && shift.status !== 'cancelled' && shift.status !== 'completed'
  );

  if (confirmationFilter !== 'all') {
    upcomingShifts = upcomingShifts.filter(shift => shift.confirmation_status === confirmationFilter);
  }

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

      const [startHour, startMin] = shift.start_time.split(':').map(Number);
      const [endHour, endMin] = shift.end_time.split(':').map(Number);
      const hours = (endHour + endMin / 60) - (startHour + startMin / 60) - (shift.break_minutes / 60);
      group.totalHours += hours;

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

  const getConfirmationBadge = (confirmationStatus?: string) => {
    switch (confirmationStatus) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 flex items-center gap-1"><AlertCircle className="w-3 h-3" />Pending</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20 flex items-center gap-1"><CheckCircle className="w-3 h-3" />Confirmed</Badge>;
      case 'declined':
        return <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20 flex items-center gap-1"><XCircle className="w-3 h-3" />Declined</Badge>;
      default:
        return null;
    }
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

  const handleAcceptShift = async (shiftId: string) => {
    await confirmShift(shiftId);
    refetchShifts();
  };

  const handleDeclineShift = (shift: StaffShift) => {
    setSelectedShift(shift);
    setShowDeclineModal(true);
  };

  const handleDeclineConfirm = async (reason?: string) => {
    if (selectedShift) {
      await declineShift(selectedShift.id, reason);
      refetchShifts();
    }
    setShowDeclineModal(false);
    setSelectedShift(null);
  };

  const handleApproveSwapRequest = async (requestId: string) => {
    try {
      setProcessingRequest(requestId);
      const { error } = await supabase
        .from('shift_swap_requests')
        .update({
          status: 'approved',
          approved_by: user?.id,
          approved_at: new Date().toISOString(),
        })
        .eq('id', requestId);

      if (error) throw error;

      toast.success('Swap request approved');
      const { data: requests } = await supabase
        .from('shift_swap_requests')
        .select('*')
        .order('created_at', { ascending: false });
      if (requests) {
        // Re-fetch swap requests
        window.location.reload();
      }
    } catch (error: any) {
      console.error('Error approving request:', error);
      toast.error('Failed to approve request');
    } finally {
      setProcessingRequest(null);
    }
  };

  const handleRejectSwapRequest = async (requestId: string) => {
    try {
      setProcessingRequest(requestId);
      const { error } = await supabase
        .from('shift_swap_requests')
        .update({
          status: 'rejected',
          approved_by: user?.id,
          approved_at: new Date().toISOString(),
        })
        .eq('id', requestId);

      if (error) throw error;

      toast.success('Swap request rejected');
      window.location.reload();
    } catch (error: any) {
      console.error('Error rejecting request:', error);
      toast.error('Failed to reject request');
    } finally {
      setProcessingRequest(null);
    }
  };

  const calculateDuration = (startTime: string, endTime: string, breakMinutes: number) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const totalMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute) - breakMinutes;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  };

  const totalConfirmedHours = myShifts.accepted.reduce((total, shift) => {
    const [startHour, startMinute] = shift.start_time.split(':').map(Number);
    const [endHour, endMinute] = shift.end_time.split(':').map(Number);
    const minutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute) - (shift.break_minutes || 0);
    return total + (minutes / 60);
  }, 0);

  const pendingSwapRequests = swapRequests.filter(r => r.status === 'pending');
  const approvedSwapRequests = swapRequests.filter(r => r.status === 'approved');
  const rejectedSwapRequests = swapRequests.filter(r => r.status === 'rejected');

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1">
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
        
        <div className="flex gap-2">
          {activeTab === 'all' && (
            <select
              value={confirmationFilter}
              onChange={(e) => setConfirmationFilter(e.target.value as any)}
              className="px-3 py-2 border rounded-md text-sm bg-background"
            >
              <option value="all">All Confirmations</option>
              <option value="pending">Pending</option>
              <option value="accepted">Confirmed</option>
              <option value="declined">Declined</option>
            </select>
          )}
          <Button 
            variant="nurse" 
            icon={<Plus size={16} />}
            onClick={() => setCreateModalOpen(true)}
            disabled={staff.length === 0}
          >
            Create Shift
          </Button>
        </div>
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
        <TabsList className={isStaffMember ? "grid w-full grid-cols-5 mb-6" : "grid w-full grid-cols-4 mb-6"}>
          <TabsTrigger value="all">All Shifts</TabsTrigger>
          <TabsTrigger value="by-staff">By Staff Member</TabsTrigger>
          {isStaffMember && <TabsTrigger value="my-shifts">My Shifts</TabsTrigger>}
          <TabsTrigger value="swaps">Shift Swaps</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        {/* All Shifts Tab */}
        <TabsContent value="all">
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
                        {getConfirmationBadge(shift.confirmation_status)}
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

        {/* By Staff Member Tab */}
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
                              <div className="flex gap-2 mt-1">
                                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-600">
                                  {staffGroup.shifts.filter(s => s.confirmation_status === 'pending').length} pending
                                </span>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-600">
                                  {staffGroup.shifts.filter(s => s.confirmation_status === 'accepted').length} confirmed
                                </span>
                                {staffGroup.shifts.filter(s => s.confirmation_status === 'declined').length > 0 && (
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-600">
                                    {staffGroup.shifts.filter(s => s.confirmation_status === 'declined').length} declined
                                  </span>
                                )}
                              </div>
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
                                  {getConfirmationBadge(shift.confirmation_status)}
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

        {/* My Shifts Tab - Staff Member Personal View */}
        {isStaffMember && (
          <TabsContent value="my-shifts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending</p>
                      <p className="text-3xl font-bold">{myShifts.pending.length}</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-warning" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Confirmed</p>
                      <p className="text-3xl font-bold">{myShifts.accepted.length}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-success" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Hours</p>
                      <p className="text-3xl font-bold">{totalConfirmedHours.toFixed(1)}</p>
                    </div>
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending">
                  Pending ({myShifts.pending.length})
                </TabsTrigger>
                <TabsTrigger value="confirmed">
                  Confirmed ({myShifts.accepted.length})
                </TabsTrigger>
                <TabsTrigger value="declined">
                  Declined ({myShifts.declined.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4">
                {myShifts.pending.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center py-12">
                      <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No pending shifts to confirm</p>
                    </CardContent>
                  </Card>
                ) : (
                  myShifts.pending.map((shift) => (
                    <Card key={shift.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              {shift.client?.first_name} {shift.client?.last_name}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {format(new Date(shift.shift_date), 'EEEE, MMMM d, yyyy')}
                            </CardDescription>
                          </div>
                          {getConfirmationBadge(shift.confirmation_status)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>{shift.start_time} - {shift.end_time}</span>
                            <span className="text-muted-foreground">
                              ({calculateDuration(shift.start_time, shift.end_time, shift.break_minutes || 0)})
                            </span>
                          </div>
                          {shift.client?.address && (
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span>
                                {shift.client.address}
                                {shift.client.city && `, ${shift.client.city}`}
                                {shift.client.state && `, ${shift.client.state}`}
                              </span>
                            </div>
                          )}
                          {shift.notes && (
                            <div className="text-sm text-muted-foreground border-l-2 border-primary/20 pl-3 py-1">
                              {shift.notes}
                            </div>
                          )}
                        </div>

                        <Separator />
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleAcceptShift(shift.id)}
                            className="flex-1"
                            size="sm"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Accept Shift
                          </Button>
                          <Button
                            onClick={() => handleDeclineShift(shift)}
                            variant="outline"
                            className="flex-1"
                            size="sm"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Decline
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="confirmed" className="space-y-4">
                {myShifts.accepted.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center py-12">
                      <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No confirmed shifts yet</p>
                    </CardContent>
                  </Card>
                ) : (
                  myShifts.accepted.map((shift) => (
                    <Card key={shift.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              {shift.client?.first_name} {shift.client?.last_name}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {format(new Date(shift.shift_date), 'EEEE, MMMM d, yyyy')}
                            </CardDescription>
                          </div>
                          {getConfirmationBadge(shift.confirmation_status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>{shift.start_time} - {shift.end_time}</span>
                            <span className="text-muted-foreground">
                              ({calculateDuration(shift.start_time, shift.end_time, shift.break_minutes || 0)})
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="declined" className="space-y-4">
                {myShifts.declined.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center py-12">
                      <XCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No declined shifts</p>
                    </CardContent>
                  </Card>
                ) : (
                  myShifts.declined.map((shift) => (
                    <Card key={shift.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              {shift.client?.first_name} {shift.client?.last_name}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {format(new Date(shift.shift_date), 'EEEE, MMMM d, yyyy')}
                            </CardDescription>
                          </div>
                          {getConfirmationBadge(shift.confirmation_status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>{shift.start_time} - {shift.end_time}</span>
                          </div>
                          {shift.decline_reason && (
                            <div className="text-sm text-destructive border-l-2 border-destructive/20 pl-3 py-1">
                              <strong>Decline Reason:</strong> {shift.decline_reason}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </TabsContent>
        )}

        {/* Shift Swaps Tab */}
        <TabsContent value="swaps">
          <Tabs defaultValue="pending" className="w-full">
            <TabsList>
              <TabsTrigger value="pending">
                Pending <Badge variant="secondary" className="ml-2">{pendingSwapRequests.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved <Badge variant="secondary" className="ml-2">{approvedSwapRequests.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected <Badge variant="secondary" className="ml-2">{rejectedSwapRequests.length}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {pendingSwapRequests.length === 0 ? (
                <Card className="p-12 text-center">
                  <AlertCircle className="text-muted-foreground mx-auto mb-4" size={48} />
                  <h3 className="text-lg font-medium text-foreground mb-2">No pending requests</h3>
                  <p className="text-muted-foreground">All swap requests have been processed</p>
                </Card>
              ) : (
                pendingSwapRequests.map((request) => (
                  <Card key={request.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <User size={24} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{request.requesting_staff_name}</h3>
                          <p className="text-sm text-muted-foreground">Requested {format(new Date(request.created_at), 'MMM d, yyyy')}</p>
                        </div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">{request.status}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Shift Date</p>
                        <p className="font-medium flex items-center gap-2">
                          <Calendar size={16} className="text-primary" />
                          {format(new Date(request.shift_date), 'EEEE, MMM d, yyyy')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Shift Time</p>
                        <p className="font-medium flex items-center gap-2">
                          <Clock size={16} className="text-primary" />
                          {request.shift_start_time} - {request.shift_end_time}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Client</p>
                        <p className="font-medium">{request.client_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Preferred Cover</p>
                        <p className="font-medium">{request.covering_staff_name || 'No preference'}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Reason for Request</p>
                      <p className="text-sm p-3 bg-muted rounded-lg">{request.request_reason}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleRejectSwapRequest(request.id)}
                        disabled={processingRequest === request.id}
                        className="text-red-600 hover:text-red-700"
                      >
                        <XCircle size={16} className="mr-2" />
                        Reject
                      </Button>
                      <Button
                        variant="nurse"
                        onClick={() => handleApproveSwapRequest(request.id)}
                        disabled={processingRequest === request.id}
                      >
                        <CheckCircle size={16} className="mr-2" />
                        {processingRequest === request.id ? 'Processing...' : 'Approve'}
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="approved" className="space-y-4">
              {approvedSwapRequests.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">No approved requests yet</p>
                </Card>
              ) : (
                approvedSwapRequests.map((request) => (
                  <Card key={request.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{request.requesting_staff_name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(request.shift_date), 'MMM d, yyyy')} • {request.shift_start_time} - {request.shift_end_time}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">{request.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Approved on {format(new Date(request.approved_at!), 'MMM d, yyyy')}</p>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="rejected" className="space-y-4">
              {rejectedSwapRequests.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">No rejected requests</p>
                </Card>
              ) : (
                rejectedSwapRequests.map((request) => (
                  <Card key={request.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{request.requesting_staff_name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(request.shift_date), 'MMM d, yyyy')} • {request.shift_start_time} - {request.shift_end_time}
                        </p>
                      </div>
                      <Badge className="bg-red-100 text-red-800">{request.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Rejected on {format(new Date(request.approved_at!), 'MMM d, yyyy')}</p>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Completed Tab */}
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
        organizationId={organization.id}
        onSuccess={createShift}
        staff={staff}
        clients={clients}
      />

      <ShiftSwapRequestModal
        isOpen={isSwapModalOpen}
        onClose={() => setIsSwapModalOpen(false)}
        shiftId={selectedShiftForSwap || ''}
        onSuccess={refetchShifts}
      />

      <DeclineShiftModal
        open={showDeclineModal}
        onOpenChange={setShowDeclineModal}
        onConfirm={handleDeclineConfirm}
        shiftDetails={selectedShift ? {
          date: format(new Date(selectedShift.shift_date), 'MMMM d, yyyy'),
          time: `${selectedShift.start_time} - ${selectedShift.end_time}`,
          client: `${selectedShift.client?.first_name} ${selectedShift.client?.last_name}`,
        } : undefined}
      />

      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Shift?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this shift? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Shift</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancel}>Cancel Shift</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Shifts;
