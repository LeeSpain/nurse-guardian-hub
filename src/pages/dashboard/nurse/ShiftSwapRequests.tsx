import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useOrganization } from '@/hooks/useOrganization';

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

const ShiftSwapRequests: React.FC = () => {
  const { user, isAuthenticated, isLoading: userLoading } = useUser();
  const { organization } = useOrganization();
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingRequest, setProcessingRequest] = useState<string | null>(null);

  useEffect(() => {
    if (organization?.id) {
      fetchSwapRequests();
    }
  }, [organization?.id]);

  const fetchSwapRequests = async () => {
    try {
      setLoading(true);
      const { data: requests, error } = await supabase
        .from('shift_swap_requests')
        .select(`
          *,
          staff_shifts!original_shift_id(shift_date, start_time, end_time, client_id)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch additional details for each request
      const enrichedRequests = await Promise.all(
        requests.map(async (req) => {
          const shift = req.staff_shifts as any;
          
          // Fetch requesting staff
          const { data: requestingStaff } = await supabase
            .from('staff_members')
            .select('first_name, last_name')
            .eq('id', req.requesting_staff_id)
            .single();

          // Fetch covering staff if exists
          let coveringStaffName = null;
          if (req.covering_staff_id) {
            const { data: coveringStaff } = await supabase
              .from('staff_members')
              .select('first_name, last_name')
              .eq('id', req.covering_staff_id)
              .single();
            coveringStaffName = coveringStaff ? `${coveringStaff.first_name} ${coveringStaff.last_name}` : null;
          }

          // Fetch client
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
    } catch (error: any) {
      console.error('Error fetching swap requests:', error);
      toast.error('Failed to load swap requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveRequest = async (requestId: string) => {
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
      await fetchSwapRequests();
    } catch (error: any) {
      console.error('Error approving request:', error);
      toast.error('Failed to approve request');
    } finally {
      setProcessingRequest(null);
    }
  };

  const handleRejectRequest = async (requestId: string) => {
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
      await fetchSwapRequests();
    } catch (error: any) {
      console.error('Error rejecting request:', error);
      toast.error('Failed to reject request');
    } finally {
      setProcessingRequest(null);
    }
  };

  if (userLoading) {
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
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const pendingRequests = swapRequests.filter(r => r.status === 'pending');
  const approvedRequests = swapRequests.filter(r => r.status === 'approved');
  const rejectedRequests = swapRequests.filter(r => r.status === 'rejected');

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Shift Swap Requests</h1>
          <p className="text-muted-foreground mt-1">Manage shift swap and cover requests</p>
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">
            Pending <Badge variant="secondary" className="ml-2">{pendingRequests.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved <Badge variant="secondary" className="ml-2">{approvedRequests.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected <Badge variant="secondary" className="ml-2">{rejectedRequests.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-48 w-full" />)}
            </div>
          ) : pendingRequests.length === 0 ? (
            <Card className="p-12 text-center">
              <AlertCircle className="text-muted-foreground mx-auto mb-4" size={48} />
              <h3 className="text-lg font-medium text-foreground mb-2">No pending requests</h3>
              <p className="text-muted-foreground">All swap requests have been processed</p>
            </Card>
          ) : (
            pendingRequests.map((request) => (
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
                  <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
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
                    onClick={() => handleRejectRequest(request.id)}
                    disabled={processingRequest === request.id}
                    className="text-red-600 hover:text-red-700"
                  >
                    <XCircle size={16} className="mr-2" />
                    Reject
                  </Button>
                  <Button
                    variant="nurse"
                    onClick={() => handleApproveRequest(request.id)}
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
          {approvedRequests.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No approved requests yet</p>
            </Card>
          ) : (
            approvedRequests.map((request) => (
              <Card key={request.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{request.requesting_staff_name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(request.shift_date), 'MMM d, yyyy')} • {request.shift_start_time} - {request.shift_end_time}
                    </p>
                  </div>
                  <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Approved on {format(new Date(request.approved_at!), 'MMM d, yyyy')}</p>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedRequests.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No rejected requests</p>
            </Card>
          ) : (
            rejectedRequests.map((request) => (
              <Card key={request.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{request.requesting_staff_name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(request.shift_date), 'MMM d, yyyy')} • {request.shift_start_time} - {request.shift_end_time}
                    </p>
                  </div>
                  <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Rejected on {format(new Date(request.approved_at!), 'MMM d, yyyy')}</p>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShiftSwapRequests;
