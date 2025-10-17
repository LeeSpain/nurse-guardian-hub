import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, User, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useStaffShifts, StaffShift } from "@/hooks/useStaffShifts";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import DeclineShiftModal from "@/components/shifts/DeclineShiftModal";

const MyShifts = () => {
  const navigate = useNavigate();
  const [pendingShifts, setPendingShifts] = useState<StaffShift[]>([]);
  const [acceptedShifts, setAcceptedShifts] = useState<StaffShift[]>([]);
  const [declinedShifts, setDeclinedShifts] = useState<StaffShift[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedShift, setSelectedShift] = useState<StaffShift | null>(null);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const { confirmShift, declineShift } = useStaffShifts();

  useEffect(() => {
    fetchMyShifts();
  }, []);

  const fetchMyShifts = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
        return;
      }

      // Get staff member ID for current user
      const { data: staffMember } = await supabase
        .from('staff_members')
        .select('id')
        .eq('profile_id', user.id)
        .single();

      if (!staffMember) {
        setLoading(false);
        return;
      }

      const { data: shifts, error } = await supabase
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
        .eq('staff_member_id', staffMember.id)
        .gte('shift_date', new Date().toISOString().split('T')[0])
        .order('shift_date', { ascending: true })
        .order('start_time', { ascending: true });

      if (error) throw error;

      // Separate shifts by confirmation status
      const pending = shifts?.filter(s => s.confirmation_status === 'pending') || [];
      const accepted = shifts?.filter(s => s.confirmation_status === 'accepted') || [];
      const declined = shifts?.filter(s => s.confirmation_status === 'declined') || [];

      setPendingShifts(pending);
      setAcceptedShifts(accepted);
      setDeclinedShifts(declined);
    } catch (error) {
      console.error('Error fetching shifts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (shiftId: string) => {
    await confirmShift(shiftId);
    await fetchMyShifts();
  };

  const handleDecline = (shift: StaffShift) => {
    setSelectedShift(shift);
    setShowDeclineModal(true);
  };

  const handleDeclineConfirm = async (reason?: string) => {
    if (selectedShift) {
      await declineShift(selectedShift.id, reason);
      await fetchMyShifts();
    }
    setShowDeclineModal(false);
    setSelectedShift(null);
  };

  const calculateDuration = (startTime: string, endTime: string, breakMinutes: number) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const totalMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute) - breakMinutes;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20"><AlertCircle className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="bg-success/10 text-success border-success/20"><CheckCircle2 className="w-3 h-3 mr-1" />Confirmed</Badge>;
      case 'declined':
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20"><XCircle className="w-3 h-3 mr-1" />Declined</Badge>;
      default:
        return null;
    }
  };

  const ShiftCard = ({ shift, showActions = false }: { shift: StaffShift; showActions?: boolean }) => (
    <Card>
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
          {getStatusBadge(shift.confirmation_status || 'pending')}
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
          {shift.decline_reason && (
            <div className="text-sm text-destructive border-l-2 border-destructive/20 pl-3 py-1">
              <strong>Decline Reason:</strong> {shift.decline_reason}
            </div>
          )}
        </div>

        {showActions && (
          <>
            <Separator />
            <div className="flex gap-2">
              <Button
                onClick={() => handleAccept(shift.id)}
                className="flex-1"
                size="sm"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Accept Shift
              </Button>
              <Button
                onClick={() => handleDecline(shift)}
                variant="outline"
                className="flex-1"
                size="sm"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Decline
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your shifts...</p>
          </div>
        </div>
      </div>
    );
  }

  const totalConfirmedHours = acceptedShifts.reduce((total, shift) => {
    const [startHour, startMinute] = shift.start_time.split(':').map(Number);
    const [endHour, endMinute] = shift.end_time.split(':').map(Number);
    const minutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute) - (shift.break_minutes || 0);
    return total + (minutes / 60);
  }, 0);

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">My Shifts</h1>
        <p className="text-muted-foreground">
          View and confirm your upcoming shifts
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold">{pendingShifts.length}</p>
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
                <p className="text-3xl font-bold">{acceptedShifts.length}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-success" />
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

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">
            Pending ({pendingShifts.length})
          </TabsTrigger>
          <TabsTrigger value="confirmed">
            Confirmed ({acceptedShifts.length})
          </TabsTrigger>
          <TabsTrigger value="declined">
            Declined ({declinedShifts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingShifts.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No pending shifts to confirm</p>
              </CardContent>
            </Card>
          ) : (
            pendingShifts.map((shift) => (
              <ShiftCard key={shift.id} shift={shift} showActions={true} />
            ))
          )}
        </TabsContent>

        <TabsContent value="confirmed" className="space-y-4">
          {acceptedShifts.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No confirmed shifts yet</p>
              </CardContent>
            </Card>
          ) : (
            acceptedShifts.map((shift) => (
              <ShiftCard key={shift.id} shift={shift} />
            ))
          )}
        </TabsContent>

        <TabsContent value="declined" className="space-y-4">
          {declinedShifts.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <XCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No declined shifts</p>
              </CardContent>
            </Card>
          ) : (
            declinedShifts.map((shift) => (
              <ShiftCard key={shift.id} shift={shift} />
            ))
          )}
        </TabsContent>
      </Tabs>

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
    </div>
  );
};

export default MyShifts;
