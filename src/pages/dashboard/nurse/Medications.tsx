import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { Plus, Pill, Calendar, Clock, CheckCircle, AlertTriangle, User } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { format, addDays } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useOrganization } from '@/hooks/useOrganization';
import { useClients } from '@/hooks/useClients';

interface MedicationRecord {
  id: string;
  client_id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  route: string;
  start_date: string;
  end_date: string | null;
  is_active: boolean;
  prescriber_name: string;
  scheduled_times: string[];
  client_name: string;
}

interface MedicationAdministration {
  id: string;
  medication_record_id: string;
  scheduled_time: string;
  actual_time: string | null;
  status: string;
  notes: string | null;
  medication_name: string;
  client_name: string;
  dosage: string;
}

const Medications: React.FC = () => {
  const { user, isAuthenticated, isLoading: userLoading } = useUser();
  const { organization } = useOrganization();
  const { clients } = useClients();
  const [medications, setMedications] = useState<MedicationRecord[]>([]);
  const [administrations, setAdministrations] = useState<MedicationAdministration[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAdministerModal, setShowAdministerModal] = useState(false);
  const [selectedAdministration, setSelectedAdministration] = useState<MedicationAdministration | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [medicationForm, setMedicationForm] = useState({
    client_id: '',
    medication_name: '',
    dosage: '',
    frequency: '',
    route: '',
    start_date: format(new Date(), 'yyyy-MM-dd'),
    end_date: '',
    prescriber_name: '',
    scheduled_times: ['09:00'],
  });

  const [administerNotes, setAdministerNotes] = useState('');

  useEffect(() => {
    if (organization?.id) {
      fetchMedications();
      fetchTodayAdministrations();
    }
  }, [organization?.id]);

  const fetchMedications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('medication_records')
        .select(`
          *,
          clients(first_name, last_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formatted = data.map((med: any) => ({
        ...med,
        client_name: `${med.clients.first_name} ${med.clients.last_name}`,
      }));

      setMedications(formatted);
    } catch (error: any) {
      console.error('Error fetching medications:', error);
      toast.error('Failed to load medications');
    } finally {
      setLoading(false);
    }
  };

  const fetchTodayAdministrations = async () => {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const { data, error } = await supabase
        .from('medication_administrations')
        .select(`
          *,
          medication_records(medication_name, dosage, client_id, clients(first_name, last_name))
        `)
        .gte('scheduled_time', `${today}T00:00:00`)
        .lte('scheduled_time', `${today}T23:59:59`)
        .order('scheduled_time', { ascending: true });

      if (error) throw error;

      const formatted = data.map((admin: any) => ({
        ...admin,
        medication_name: admin.medication_records.medication_name,
        dosage: admin.medication_records.dosage,
        client_name: `${admin.medication_records.clients.first_name} ${admin.medication_records.clients.last_name}`,
      }));

      setAdministrations(formatted);
    } catch (error: any) {
      console.error('Error fetching administrations:', error);
      toast.error('Failed to load medication administrations');
    }
  };

  const handleAddMedication = async () => {
    if (!medicationForm.client_id || !medicationForm.medication_name || !medicationForm.dosage) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const { error } = await supabase
        .from('medication_records')
        .insert({
          ...medicationForm,
          is_active: true,
        });

      if (error) throw error;

      toast.success('Medication added successfully');
      setShowAddModal(false);
      resetMedicationForm();
      await fetchMedications();
    } catch (error: any) {
      console.error('Error adding medication:', error);
      toast.error('Failed to add medication');
    }
  };

  const handleAdministerMedication = async () => {
    if (!selectedAdministration) return;

    try {
      const { error } = await supabase
        .from('medication_administrations')
        .update({
          actual_time: new Date().toISOString(),
          status: 'administered',
          notes: administerNotes,
        })
        .eq('id', selectedAdministration.id);

      if (error) throw error;

      toast.success('Medication administration recorded');
      setShowAdministerModal(false);
      setSelectedAdministration(null);
      setAdministerNotes('');
      await fetchTodayAdministrations();
    } catch (error: any) {
      console.error('Error recording administration:', error);
      toast.error('Failed to record administration');
    }
  };

  const resetMedicationForm = () => {
    setMedicationForm({
      client_id: '',
      medication_name: '',
      dosage: '',
      frequency: '',
      route: '',
      start_date: format(new Date(), 'yyyy-MM-dd'),
      end_date: '',
      prescriber_name: '',
      scheduled_times: ['09:00'],
    });
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

  const filteredMedications = medications.filter(med =>
    med.medication_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.client_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeMedications = filteredMedications.filter(m => m.is_active);
  const inactiveMedications = filteredMedications.filter(m => !m.is_active);
  const pendingAdministrations = administrations.filter(a => a.status === 'pending');
  const completedAdministrations = administrations.filter(a => a.status === 'administered');

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Medication Management</h1>
          <p className="text-muted-foreground mt-1">Manage medications and track administrations</p>
        </div>
        <Button variant="nurse" onClick={() => setShowAddModal(true)}>
          <Plus size={16} className="mr-2" />
          Add Medication
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Medications</p>
              <p className="text-2xl font-bold">{activeMedications.length}</p>
            </div>
            <Pill className="text-primary" size={32} />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Today</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingAdministrations.length}</p>
            </div>
            <Clock className="text-yellow-600" size={32} />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed Today</p>
              <p className="text-2xl font-bold text-green-600">{completedAdministrations.length}</p>
            </div>
            <CheckCircle className="text-green-600" size={32} />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Clients</p>
              <p className="text-2xl font-bold">{new Set(activeMedications.map(m => m.client_id)).size}</p>
            </div>
            <User className="text-primary" size={32} />
          </div>
        </Card>
      </div>

      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search medications or clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Tabs defaultValue="administrations" className="w-full">
        <TabsList>
          <TabsTrigger value="administrations">
            Today's Administrations <Badge variant="secondary" className="ml-2">{pendingAdministrations.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="active">
            Active Medications <Badge variant="secondary" className="ml-2">{activeMedications.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <TabsContent value="administrations" className="space-y-4">
          {pendingAdministrations.length === 0 ? (
            <Card className="p-12 text-center">
              <CheckCircle className="text-green-600 mx-auto mb-4" size={48} />
              <h3 className="text-lg font-medium text-foreground mb-2">All medications administered</h3>
              <p className="text-muted-foreground">No pending administrations for today</p>
            </Card>
          ) : (
            pendingAdministrations.map((admin) => (
              <Card key={admin.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Clock size={24} className="text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{admin.medication_name}</h3>
                      <p className="text-sm text-muted-foreground">{admin.client_name}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-sm">
                          <span className="font-medium">Dosage:</span> {admin.dosage}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Time:</span> {format(new Date(admin.scheduled_time), 'h:mm a')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="nurse"
                    size="sm"
                    onClick={() => {
                      setSelectedAdministration(admin);
                      setShowAdministerModal(true);
                    }}
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Administer
                  </Button>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full" />)}
            </div>
          ) : activeMedications.length === 0 ? (
            <Card className="p-12 text-center">
              <AlertTriangle className="text-muted-foreground mx-auto mb-4" size={48} />
              <h3 className="text-lg font-medium text-foreground mb-2">No active medications</h3>
              <p className="text-muted-foreground">Add medications to start tracking</p>
            </Card>
          ) : (
            activeMedications.map((med) => (
              <Card key={med.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Pill size={20} className="text-primary" />
                      {med.medication_name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{med.client_name}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Dosage</p>
                    <p className="font-medium">{med.dosage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Route</p>
                    <p className="font-medium">{med.route}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Frequency</p>
                    <p className="font-medium">{med.frequency}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Prescriber</p>
                    <p className="font-medium">{med.prescriber_name || 'Not specified'}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-muted-foreground mb-2">Scheduled Times</p>
                  <div className="flex gap-2 flex-wrap">
                    {med.scheduled_times?.map((time, idx) => (
                      <Badge key={idx} variant="outline">{time}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="inactive">
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">{inactiveMedications.length} inactive medications</p>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Medication Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Medication</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Client *</Label>
              <Select value={medicationForm.client_id} onValueChange={(value) => setMedicationForm({ ...medicationForm, client_id: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.first_name} {client.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Medication Name *</Label>
                <Input
                  value={medicationForm.medication_name}
                  onChange={(e) => setMedicationForm({ ...medicationForm, medication_name: e.target.value })}
                  placeholder="e.g., Aspirin"
                />
              </div>
              <div className="space-y-2">
                <Label>Dosage *</Label>
                <Input
                  value={medicationForm.dosage}
                  onChange={(e) => setMedicationForm({ ...medicationForm, dosage: e.target.value })}
                  placeholder="e.g., 100mg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Frequency *</Label>
                <Input
                  value={medicationForm.frequency}
                  onChange={(e) => setMedicationForm({ ...medicationForm, frequency: e.target.value })}
                  placeholder="e.g., Twice daily"
                />
              </div>
              <div className="space-y-2">
                <Label>Route</Label>
                <Input
                  value={medicationForm.route}
                  onChange={(e) => setMedicationForm({ ...medicationForm, route: e.target.value })}
                  placeholder="e.g., Oral"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Input
                  type="date"
                  value={medicationForm.start_date}
                  onChange={(e) => setMedicationForm({ ...medicationForm, start_date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date (Optional)</Label>
                <Input
                  type="date"
                  value={medicationForm.end_date}
                  onChange={(e) => setMedicationForm({ ...medicationForm, end_date: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Prescriber Name</Label>
              <Input
                value={medicationForm.prescriber_name}
                onChange={(e) => setMedicationForm({ ...medicationForm, prescriber_name: e.target.value })}
                placeholder="Dr. Smith"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button variant="nurse" onClick={handleAddMedication}>Add Medication</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Administer Medication Modal */}
      <Dialog open={showAdministerModal} onOpenChange={setShowAdministerModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Administer Medication</DialogTitle>
          </DialogHeader>

          {selectedAdministration && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-semibold">{selectedAdministration.medication_name}</p>
                <p className="text-sm text-muted-foreground">{selectedAdministration.client_name}</p>
                <p className="text-sm mt-2">Dosage: {selectedAdministration.dosage}</p>
              </div>

              <div className="space-y-2">
                <Label>Notes (Optional)</Label>
                <Textarea
                  value={administerNotes}
                  onChange={(e) => setAdministerNotes(e.target.value)}
                  placeholder="Any observations or notes..."
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdministerModal(false)}>Cancel</Button>
            <Button variant="nurse" onClick={handleAdministerMedication}>
              <CheckCircle size={16} className="mr-2" />
              Confirm Administration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Medications;
