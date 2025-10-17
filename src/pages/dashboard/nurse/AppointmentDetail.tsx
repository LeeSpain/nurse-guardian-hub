import React, { useState, useEffect } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { ArrowLeft, Edit, Save, X, Calendar, Clock, MapPin, User, AlertTriangle, DollarSign } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useOrganization } from '@/hooks/useOrganization';

interface AppointmentData {
  id: string;
  title: string;
  description: string;
  client_id: string;
  nurse_id: string;
  staff_member_id: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  service_type: string;
  address: string;
  status: string;
  hourly_rate: number;
  total_cost: number;
  special_instructions: string;
  notes: string;
  payment_status: string;
  created_at: string;
}

interface PersonInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

const AppointmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: userLoading } = useUser();
  const { organization } = useOrganization();
  const [appointment, setAppointment] = useState<AppointmentData | null>(null);
  const [clientInfo, setClientInfo] = useState<PersonInfo | null>(null);
  const [staffInfo, setStaffInfo] = useState<PersonInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState<Partial<AppointmentData>>({});

  useEffect(() => {
    if (id) {
      fetchAppointmentData();
    }
  }, [id]);

  const fetchAppointmentData = async () => {
    try {
      setLoading(true);
      
      // Fetch appointment
      const { data: appointmentData, error: appointmentError } = await supabase
        .from('appointments')
        .select('*')
        .eq('id', id)
        .single();

      if (appointmentError) throw appointmentError;
      setAppointment(appointmentData);
      setEditForm(appointmentData);

      // Fetch client info
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('first_name, last_name, email, phone')
        .eq('id', appointmentData.client_id)
        .single();

      if (clientError) throw clientError;
      setClientInfo(clientData);

      // Fetch staff info if assigned
      if (appointmentData.staff_member_id) {
        const { data: staffData, error: staffError } = await supabase
          .from('staff_members')
          .select('first_name, last_name, email, phone')
          .eq('id', appointmentData.staff_member_id)
          .single();

        if (staffError) throw staffError;
        setStaffInfo(staffData);
      }

    } catch (error: any) {
      console.error('Error fetching appointment data:', error);
      toast.error('Failed to load appointment data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!appointment) return;

    try {
      setSaving(true);
      const { error } = await supabase
        .from('appointments')
        .update({
          title: editForm.title,
          description: editForm.description,
          appointment_date: editForm.appointment_date,
          start_time: editForm.start_time,
          end_time: editForm.end_time,
          service_type: editForm.service_type,
          address: editForm.address,
          status: editForm.status,
          special_instructions: editForm.special_instructions,
          notes: editForm.notes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', appointment.id);

      if (error) throw error;

      toast.success('Appointment updated successfully');
      setEditing(false);
      await fetchAppointmentData();
    } catch (error: any) {
      console.error('Error updating appointment:', error);
      toast.error('Failed to update appointment');
    } finally {
      setSaving(false);
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
      confirmed: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/nurse/dashboard/calendar')}>
            <ArrowLeft size={16} className="mr-2" />
            Back to Calendar
          </Button>
        </div>
        <div className="flex gap-2">
          {editing ? (
            <>
              <Button variant="outline" onClick={() => { setEditing(false); setEditForm(appointment!); }}>
                <X size={16} className="mr-2" />
                Cancel
              </Button>
              <Button variant="nurse" onClick={handleSave} disabled={saving}>
                <Save size={16} className="mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          ) : (
            <Button variant="nurse" onClick={() => setEditing(true)}>
              <Edit size={16} className="mr-2" />
              Edit Appointment
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="space-y-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      ) : !appointment ? (
        <Card className="p-12 text-center">
          <AlertTriangle className="text-muted-foreground mx-auto mb-4" size={48} />
          <h3 className="text-lg font-medium text-foreground mb-2">Appointment not found</h3>
          <p className="text-muted-foreground">The appointment you're looking for doesn't exist or has been removed.</p>
        </Card>
      ) : (
        <>
          {/* Header Card */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                {editing ? (
                  <Input
                    value={editForm.title || ''}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="text-2xl font-bold mb-2"
                    placeholder="Appointment Title"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    {appointment.title || 'Appointment'}
                  </h1>
                )}
                {editing ? (
                  <Textarea
                    value={editForm.description || ''}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    placeholder="Description"
                    rows={2}
                  />
                ) : (
                  <p className="text-muted-foreground">{appointment.description}</p>
                )}
              </div>
              {editing ? (
                <Select value={editForm.status} onValueChange={(value: any) => setEditForm({ ...editForm, status: value })}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge className={getStatusColor(appointment.status)}>
                  {appointment.status.replace('_', ' ')}
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Date & Time</p>
                {editing ? (
                  <div className="space-y-2">
                    <Input
                      type="date"
                      value={editForm.appointment_date || ''}
                      onChange={(e) => setEditForm({ ...editForm, appointment_date: e.target.value })}
                    />
                    <div className="flex gap-2">
                      <Input
                        type="time"
                        value={editForm.start_time || ''}
                        onChange={(e) => setEditForm({ ...editForm, start_time: e.target.value })}
                      />
                      <Input
                        type="time"
                        value={editForm.end_time || ''}
                        onChange={(e) => setEditForm({ ...editForm, end_time: e.target.value })}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="font-medium flex items-center gap-2">
                      <Calendar size={16} className="text-primary" />
                      {format(new Date(appointment.appointment_date), 'EEEE, MMM d, yyyy')}
                    </p>
                    <p className="font-medium flex items-center gap-2 mt-1">
                      <Clock size={16} className="text-primary" />
                      {appointment.start_time} - {appointment.end_time}
                    </p>
                  </>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Service Type</p>
                {editing ? (
                  <Input
                    value={editForm.service_type || ''}
                    onChange={(e) => setEditForm({ ...editForm, service_type: e.target.value })}
                  />
                ) : (
                  <p className="font-medium">{appointment.service_type || 'Not specified'}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Cost</p>
                <p className="font-medium flex items-center gap-1 text-primary">
                  <DollarSign size={16} />
                  {appointment.total_cost?.toFixed(2) || '0.00'}
                </p>
              </div>
            </div>
          </Card>

          {/* People Involved */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User size={20} className="text-primary" />
                Client Information
              </h3>
              {clientInfo && (
                <div className="space-y-2">
                  <p className="font-medium">{clientInfo.first_name} {clientInfo.last_name}</p>
                  <p className="text-sm text-muted-foreground">{clientInfo.email}</p>
                  <p className="text-sm text-muted-foreground">{clientInfo.phone}</p>
                </div>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User size={20} className="text-primary" />
                Assigned Staff
              </h3>
              {staffInfo ? (
                <div className="space-y-2">
                  <p className="font-medium">{staffInfo.first_name} {staffInfo.last_name}</p>
                  <p className="text-sm text-muted-foreground">{staffInfo.email}</p>
                  <p className="text-sm text-muted-foreground">{staffInfo.phone}</p>
                </div>
              ) : (
                <p className="text-muted-foreground">No staff assigned yet</p>
              )}
            </Card>
          </div>

          {/* Location */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-primary" />
              Location
            </h3>
            {editing ? (
              <Input
                value={editForm.address || ''}
                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                placeholder="Address"
              />
            ) : (
              <p className="text-muted-foreground">{appointment.address || 'No address specified'}</p>
            )}
          </Card>

          {/* Special Instructions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Special Instructions</h3>
            {editing ? (
              <Textarea
                value={editForm.special_instructions || ''}
                onChange={(e) => setEditForm({ ...editForm, special_instructions: e.target.value })}
                rows={3}
                placeholder="Any special instructions..."
              />
            ) : (
              <p className="text-muted-foreground">{appointment.special_instructions || 'No special instructions'}</p>
            )}
          </Card>

          {/* Notes */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Notes</h3>
            {editing ? (
              <Textarea
                value={editForm.notes || ''}
                onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                rows={4}
                placeholder="Additional notes..."
              />
            ) : (
              <p className="text-muted-foreground">{appointment.notes || 'No additional notes'}</p>
            )}
          </Card>

          {/* Payment Status */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Payment Status</p>
                <Badge className={appointment.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  {appointment.payment_status || 'pending'}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold text-primary">£{appointment.total_cost?.toFixed(2) || '0.00'}</p>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default AppointmentDetail;
