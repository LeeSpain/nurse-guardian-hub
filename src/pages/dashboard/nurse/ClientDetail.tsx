import React, { useState, useEffect } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { ArrowLeft, Edit, Save, X, Calendar, FileText, Clock, AlertTriangle, User, Phone, Mail, MapPin, Heart, Bell, Activity, Send } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useOrganization } from '@/hooks/useOrganization';
import { useClients, Client } from '@/hooks/useClients';
import { ClientNotesSection } from '@/components/clients/ClientNotesSection';
import { ClientRemindersSection } from '@/components/clients/ClientRemindersSection';
import { ClientActivityTimeline } from '@/components/clients/ClientActivityTimeline';
import { ClientShiftSchedule } from '@/components/clients/ClientShiftSchedule';
import { useClientReminders } from '@/hooks/useClientReminders';
import { useClientShifts } from '@/hooks/useClientShifts';

interface ClientData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  status: string;
  care_level: string;
  medical_history: string;
  allergies: string;
  dietary_requirements: string;
  mobility_status: string;
  emergency_contact_1_name: string;
  emergency_contact_1_phone: string;
  emergency_contact_1_relationship: string;
  gp_name: string;
  gp_practice: string;
  gp_phone: string;
  notes: string;
  created_at: string;
}

const ClientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: userLoading } = useUser();
  const { organization } = useOrganization();
  const { updateClient } = useClients();
  const { reminders } = useClientReminders(id);
  const { getThisWeekStats } = useClientShifts(id, organization?.id);
  const [client, setClient] = useState<ClientData | null>(null);
  const [carePlans, setCarePlans] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [careLogs, setCareLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState<Partial<ClientData>>({});
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [sendingVerification, setSendingVerification] = useState(false);

  const pendingReminders = reminders.filter(r => r.status === 'pending');
  const shiftStats = getThisWeekStats();

  useEffect(() => {
    if (id && organization?.id) {
      fetchClientData();
    }
  }, [id, organization?.id]);

  const fetchClientData = async () => {
    try {
      setLoading(true);
      
      // Fetch client
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .eq('organization_id', organization!.id)
        .single();

      if (clientError) throw clientError;
      setClient(clientData);
      setEditForm(clientData);

      // Fetch care plans
      const { data: plansData } = await supabase
        .from('care_plans')
        .select('*')
        .eq('client_id', id)
        .eq('organization_id', organization!.id)
        .order('created_at', { ascending: false });
      setCarePlans(plansData || []);

      // Fetch appointments
      const { data: appointmentsData } = await supabase
        .from('appointments')
        .select('*, nurse_id, staff_member_id')
        .eq('client_id', id)
        .order('appointment_date', { ascending: false })
        .limit(10);
      setAppointments(appointmentsData || []);

      // Fetch care logs
      const { data: logsData } = await supabase
        .from('care_logs')
        .select('*, staff_member_id')
        .eq('client_id', id)
        .order('log_date', { ascending: false })
        .limit(10);
      setCareLogs(logsData || []);

    } catch (error: any) {
      console.error('Error fetching client data:', error);
      toast.error('Failed to load client data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!client) return;

    try {
      setSaving(true);
      await updateClient(client.id, editForm as Partial<Client>);
      toast.success('Client updated successfully');
      setEditing(false);
      await fetchClientData();
    } catch (error: any) {
      console.error('Error updating client:', error);
      toast.error('Failed to update client');
    } finally {
      setSaving(false);
    }
  };

  const handleSendVerificationEmail = async () => {
    if (!client || !organization) return;

    try {
      setSendingVerification(true);
      
      const { data, error } = await supabase.functions.invoke('send-client-invitation', {
        body: {
          email: client.email,
          first_name: client.first_name,
          last_name: client.last_name,
          organization_id: organization.id,
          client_id: client.id,
          redirect_base_url: window.location.origin,
        },
      });

      if (error) throw error;

      toast.success('Verification email sent successfully');
      setShowVerificationDialog(false);
    } catch (error: any) {
      console.error('Error sending verification email:', error);
      toast.error('Failed to send verification email');
    } finally {
      setSendingVerification(false);
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
      active: 'bg-green-100 text-green-800',
      potential: 'bg-yellow-100 text-yellow-800',
      inactive: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header with Back Button and Actions */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => navigate('/nurse/dashboard/clients')}>
          <ArrowLeft size={16} className="mr-2" />
          Back to Clients
        </Button>
        
        <div className="flex gap-2">
          {editing ? (
            <>
              <Button variant="outline" onClick={() => { setEditing(false); setEditForm(client!); }}>
                <X size={16} className="mr-2" />
                Cancel
              </Button>
              <Button variant="nurse" onClick={handleSave} disabled={saving}>
                <Save size={16} className="mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={() => setShowVerificationDialog(true)}
                disabled={!client?.email}
                title={!client?.email ? 'Client email is required' : 'Send verification email'}
              >
                <Send size={16} className="mr-2" />
                Send Verification Email
              </Button>
              <Button variant="nurse" onClick={() => setEditing(true)}>
                <Edit size={16} className="mr-2" />
                Edit Details
              </Button>
            </>
          )}
        </div>
      </div>

      {loading ? (
        <div className="space-y-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      ) : !client ? (
        <Card className="p-12 text-center">
          <AlertTriangle className="text-muted-foreground mx-auto mb-4" size={48} />
          <h3 className="text-lg font-medium text-foreground mb-2">Client not found</h3>
          <p className="text-muted-foreground">The client you're looking for doesn't exist or has been removed.</p>
        </Card>
      ) : (
        <>
          {/* Client Profile Header */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Picture and Basic Info */}
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                  <User size={40} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    {editing ? (
                      <div className="flex gap-2">
                        <Input
                          value={editForm.first_name || ''}
                          onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                          placeholder="First Name"
                        />
                        <Input
                          value={editForm.last_name || ''}
                          onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                          placeholder="Last Name"
                        />
                      </div>
                    ) : (
                      <>
                        <h1 className="text-3xl font-bold">
                          {client.first_name} {client.last_name}
                        </h1>
                        <Badge variant={client.status === 'active' ? 'default' : client.status === 'potential' ? 'secondary' : 'outline'} className="text-sm">
                          {client.status}
                        </Badge>
                      </>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={16} />
                      Age {new Date().getFullYear() - new Date(client.date_of_birth).getFullYear()} • DOB: {format(new Date(client.date_of_birth), 'MMM d, yyyy')}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Heart size={16} />
                      {client.care_level || 'Care Level Not Set'}
                    </span>
                    {pendingReminders.length > 0 && (
                      <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                        <Bell size={16} />
                        {pendingReminders.length} Pending Reminder{pendingReminders.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 ml-auto">
                <Card className="p-3 bg-muted/50">
                  <div className="text-2xl font-bold text-primary">{shiftStats.count}</div>
                  <div className="text-xs text-muted-foreground">Shifts/Week</div>
                </Card>
                <Card className="p-3 bg-muted/50">
                  <div className="text-2xl font-bold text-primary">{shiftStats.totalHours}h</div>
                  <div className="text-xs text-muted-foreground">Hours/Week</div>
                </Card>
                <Card className="p-3 bg-muted/50">
                  <div className="text-2xl font-bold text-primary">{appointments.length}</div>
                  <div className="text-xs text-muted-foreground">Appointments</div>
                </Card>
                <Card className="p-3 bg-muted/50">
                  <div className="text-2xl font-bold text-primary">{carePlans.length}</div>
                  <div className="text-xs text-muted-foreground">Care Plans</div>
                </Card>
                <Card className="p-3 bg-muted/50">
                  <div className="text-2xl font-bold text-primary">{careLogs.length}</div>
                  <div className="text-xs text-muted-foreground">Care Logs</div>
                </Card>
                <Card className="p-3 bg-muted/50">
                  <div className="text-2xl font-bold text-amber-600">{pendingReminders.length}</div>
                  <div className="text-xs text-muted-foreground">Reminders</div>
                </Card>
              </div>
            </div>

            {/* Contact Information - Always Visible */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Email</p>
                {editing ? (
                  <Input
                    value={editForm.email || ''}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                ) : (
                  <p className="font-medium flex items-center gap-2">
                    <Mail size={16} className="text-primary" />
                    {client.email || 'Not provided'}
                  </p>
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Phone</p>
                {editing ? (
                  <Input
                    value={editForm.phone || ''}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    placeholder="Phone number"
                  />
                ) : (
                  <p className="font-medium flex items-center gap-2">
                    <Phone size={16} className="text-primary" />
                    {client.phone || 'Not provided'}
                  </p>
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Address</p>
                {editing ? (
                  <Input
                    value={editForm.address || ''}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    placeholder="Address"
                  />
                ) : (
                  <p className="font-medium flex items-center gap-2">
                    <MapPin size={16} className="text-primary" />
                    {client.address ? `${client.address}, ${client.city || ''} ${client.state || ''} ${client.postal_code || ''}`.trim() : 'Not provided'}
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Tabs for different sections */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="shifts">
                <Clock className="h-4 w-4 mr-2" />
                Shifts & Schedule ({shiftStats.count})
              </TabsTrigger>
              <TabsTrigger value="medical">Medical Info</TabsTrigger>
              <TabsTrigger value="notes-activity">
                <FileText className="h-4 w-4 mr-2" />
                Notes & Activity
              </TabsTrigger>
              <TabsTrigger value="reminders">
                <Bell className="h-4 w-4 mr-2" />
                Reminders {pendingReminders.length > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5 px-1.5 text-xs">
                    {pendingReminders.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="care-plans">Care Plans ({carePlans.length})</TabsTrigger>
              <TabsTrigger value="appointments">Appointments ({appointments.length})</TabsTrigger>
              <TabsTrigger value="logs">Care Logs ({careLogs.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Name</p>
                    {editing ? (
                      <Input
                        value={editForm.emergency_contact_1_name || ''}
                        onChange={(e) => setEditForm({ ...editForm, emergency_contact_1_name: e.target.value })}
                      />
                    ) : (
                      <p className="font-medium">{client.emergency_contact_1_name || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    {editing ? (
                      <Input
                        value={editForm.emergency_contact_1_phone || ''}
                        onChange={(e) => setEditForm({ ...editForm, emergency_contact_1_phone: e.target.value })}
                      />
                    ) : (
                      <p className="font-medium">{client.emergency_contact_1_phone || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Relationship</p>
                    {editing ? (
                      <Input
                        value={editForm.emergency_contact_1_relationship || ''}
                        onChange={(e) => setEditForm({ ...editForm, emergency_contact_1_relationship: e.target.value })}
                      />
                    ) : (
                      <p className="font-medium">{client.emergency_contact_1_relationship || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">GP Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">GP Name</p>
                    {editing ? (
                      <Input
                        value={editForm.gp_name || ''}
                        onChange={(e) => setEditForm({ ...editForm, gp_name: e.target.value })}
                      />
                    ) : (
                      <p className="font-medium">{client.gp_name || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Practice</p>
                    {editing ? (
                      <Input
                        value={editForm.gp_practice || ''}
                        onChange={(e) => setEditForm({ ...editForm, gp_practice: e.target.value })}
                      />
                    ) : (
                      <p className="font-medium">{client.gp_practice || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    {editing ? (
                      <Input
                        value={editForm.gp_phone || ''}
                        onChange={(e) => setEditForm({ ...editForm, gp_phone: e.target.value })}
                      />
                    ) : (
                      <p className="font-medium">{client.gp_phone || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Additional Notes</h3>
                {editing ? (
                  <Textarea
                    value={editForm.notes || ''}
                    onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                    rows={4}
                    placeholder="Additional notes..."
                  />
                ) : (
                  <p className="text-muted-foreground">{client.notes || 'No additional notes'}</p>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="shifts">
              <ClientShiftSchedule 
                clientId={id!}
                clientName={`${client.first_name} ${client.last_name}`}
                organizationId={organization!.id}
              />
            </TabsContent>

            <TabsContent value="medical" className="space-y-4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Medical History</h3>
                {editing ? (
                  <Textarea
                    value={editForm.medical_history || ''}
                    onChange={(e) => setEditForm({ ...editForm, medical_history: e.target.value })}
                    rows={4}
                  />
                ) : (
                  <p className="text-muted-foreground">{client.medical_history || 'No medical history recorded'}</p>
                )}
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Allergies</h3>
                {editing ? (
                  <Textarea
                    value={editForm.allergies || ''}
                    onChange={(e) => setEditForm({ ...editForm, allergies: e.target.value })}
                    rows={3}
                  />
                ) : (
                  <p className="text-muted-foreground">{client.allergies || 'No known allergies'}</p>
                )}
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Dietary Requirements</h3>
                {editing ? (
                  <Textarea
                    value={editForm.dietary_requirements || ''}
                    onChange={(e) => setEditForm({ ...editForm, dietary_requirements: e.target.value })}
                    rows={3}
                  />
                ) : (
                  <p className="text-muted-foreground">{client.dietary_requirements || 'No special dietary requirements'}</p>
                )}
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Mobility Status</h3>
                {editing ? (
                  <Input
                    value={editForm.mobility_status || ''}
                    onChange={(e) => setEditForm({ ...editForm, mobility_status: e.target.value })}
                  />
                ) : (
                  <p className="text-muted-foreground">{client.mobility_status || 'Not specified'}</p>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="care-plans">
              <Card className="p-6">
                <div className="space-y-4">
                  {carePlans.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No care plans yet</p>
                  ) : (
                    carePlans.map((plan) => (
                      <div
                        key={plan.id}
                        className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => navigate(`/nurse/dashboard/care-plans/${plan.id}`)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{plan.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Started: {format(new Date(plan.start_date), 'MMM d, yyyy')}
                            </p>
                          </div>
                          <Badge className={getStatusColor(plan.status)}>{plan.status}</Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="appointments">
              <Card className="p-6">
                <div className="space-y-4">
                  {appointments.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No appointments yet</p>
                  ) : (
                    appointments.map((apt) => (
                      <div key={apt.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold">{apt.title || 'Appointment'}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {format(new Date(apt.appointment_date), 'MMM d, yyyy')} at {apt.start_time}
                            </p>
                          </div>
                          <Badge className={getStatusColor(apt.status)}>{apt.status}</Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="notes-activity" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <ClientNotesSection clientId={id!} />
                </div>
                <div>
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Activity Timeline
                    </h3>
                    <ClientActivityTimeline clientId={id!} />
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reminders">
              <ClientRemindersSection clientId={id!} />
            </TabsContent>

            <TabsContent value="logs">
              <Card className="p-6">
                <div className="space-y-4">
                  {careLogs.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No care logs yet</p>
                  ) : (
                    careLogs.map((log) => (
                      <div key={log.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="outline">{log.category}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(log.log_date), 'MMM d, yyyy')} at {log.log_time}
                          </span>
                        </div>
                        <p className="text-sm">{log.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}

      {/* Verification Email Confirmation Dialog */}
      <AlertDialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Send Verification Email</AlertDialogTitle>
            <AlertDialogDescription>
              Send {client?.first_name} {client?.last_name} a secure link to verify and complete their profile information?
              <div className="mt-4 p-3 bg-muted rounded-md text-sm">
                <p className="font-medium text-foreground mb-1">Email will be sent to:</p>
                <p className="text-foreground">{client?.email}</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={sendingVerification}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleSendVerificationEmail}
              disabled={sendingVerification}
            >
              {sendingVerification ? 'Sending...' : 'Send Email'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ClientDetail;
