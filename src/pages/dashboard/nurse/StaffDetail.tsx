import React, { useState, useEffect } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { ArrowLeft, Edit, Save, X, Calendar, FileText, Award, Shield, AlertTriangle, User, Phone, Mail, MapPin } from 'lucide-react';
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
import { useOrganization } from '@/hooks/useOrganization';
import { useStaff } from '@/hooks/useStaff';

interface StaffData {
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
  job_title: string;
  employment_type: string;
  start_date: string;
  hourly_rate: number;
  license_number: string;
  license_type: string;
  license_state: string;
  license_expiry: string;
  background_check_status: string;
  background_check_date: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relationship: string;
  notes: string;
  qualifications: any;
  certifications: any;
  is_active: boolean;
}

const StaffDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: userLoading } = useUser();
  const { organization } = useOrganization();
  const { updateStaff } = useStaff(organization?.id);
  const [staff, setStaff] = useState<StaffData | null>(null);
  const [shifts, setShifts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState<Partial<StaffData>>({});

  useEffect(() => {
    if (id && organization?.id) {
      fetchStaffData();
    }
  }, [id, organization?.id]);

  const fetchStaffData = async () => {
    try {
      setLoading(true);
      
      // Fetch staff member
      const { data: staffData, error: staffError } = await supabase
        .from('staff_members')
        .select('*')
        .eq('id', id)
        .eq('organization_id', organization!.id)
        .single();

      if (staffError) throw staffError;
      const formattedStaff = {
        ...staffData,
        qualifications: Array.isArray(staffData.qualifications) ? staffData.qualifications : [],
        certifications: Array.isArray(staffData.certifications) ? staffData.certifications : [],
      };
      setStaff(formattedStaff);
      setEditForm(formattedStaff);

      // Fetch shifts
      const { data: shiftsData } = await supabase
        .from('staff_shifts')
        .select('*, client_id')
        .eq('staff_member_id', id)
        .eq('organization_id', organization!.id)
        .order('shift_date', { ascending: false })
        .limit(20);
      setShifts(shiftsData || []);

    } catch (error: any) {
      console.error('Error fetching staff data:', error);
      toast.error('Failed to load staff data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!staff) return;

    try {
      setSaving(true);
      await updateStaff(staff.id, editForm);
      toast.success('Staff member updated successfully');
      setEditing(false);
      await fetchStaffData();
    } catch (error: any) {
      console.error('Error updating staff:', error);
      toast.error('Failed to update staff member');
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

  const getStatusColor = (status: boolean) => {
    return status ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const isLicenseExpiring = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 90;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/nurse/dashboard/staff')}>
            <ArrowLeft size={16} className="mr-2" />
            Back to Staff
          </Button>
        </div>
        <div className="flex gap-2">
          {editing ? (
            <>
              <Button variant="outline" onClick={() => { setEditing(false); setEditForm(staff!); }}>
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
              Edit Staff
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="space-y-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      ) : !staff ? (
        <Card className="p-12 text-center">
          <AlertTriangle className="text-muted-foreground mx-auto mb-4" size={48} />
          <h3 className="text-lg font-medium text-foreground mb-2">Staff member not found</h3>
          <p className="text-muted-foreground">The staff member you're looking for doesn't exist or has been removed.</p>
        </Card>
      ) : (
        <>
          {/* Header Card */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <User size={32} className="text-primary" />
                </div>
                <div>
                  {editing ? (
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={editForm.first_name || ''}
                        onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                        placeholder="First Name"
                        className="text-2xl font-bold"
                      />
                      <Input
                        value={editForm.last_name || ''}
                        onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                        placeholder="Last Name"
                        className="text-2xl font-bold"
                      />
                    </div>
                  ) : (
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                      {staff.first_name} {staff.last_name}
                    </h1>
                  )}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{staff.job_title}</span>
                    <span>•</span>
                    <span>{staff.employment_type}</span>
                    <span>•</span>
                    <span>£{staff.hourly_rate}/hr</span>
                  </div>
                </div>
              </div>
              <Badge className={getStatusColor(staff.is_active)}>
                {staff.is_active ? 'Active' : 'Inactive'}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                {editing ? (
                  <Input
                    value={editForm.email || ''}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  />
                ) : (
                  <p className="font-medium flex items-center gap-2">
                    <Mail size={16} className="text-primary" />
                    {staff.email || 'Not provided'}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Phone</p>
                {editing ? (
                  <Input
                    value={editForm.phone || ''}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  />
                ) : (
                  <p className="font-medium flex items-center gap-2">
                    <Phone size={16} className="text-primary" />
                    {staff.phone || 'Not provided'}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Start Date</p>
                <p className="font-medium flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  {format(new Date(staff.start_date), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          </Card>

          {/* License Alert */}
          {staff.license_expiry && isLicenseExpiring(staff.license_expiry) && (
            <Card className="p-4 bg-yellow-50 border-yellow-200">
              <div className="flex items-center gap-2 text-yellow-800">
                <AlertTriangle size={20} />
                <p className="font-medium">
                  License expires on {format(new Date(staff.license_expiry), 'MMM d, yyyy')} - Renewal needed
                </p>
              </div>
            </Card>
          )}

          {/* Tabs for different sections */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
              <TabsTrigger value="shifts">Shifts ({shifts.length})</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Date of Birth</p>
                    <p className="font-medium">
                      {staff.date_of_birth ? format(new Date(staff.date_of_birth), 'MMM d, yyyy') : 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Address</p>
                    {editing ? (
                      <Input
                        value={editForm.address || ''}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      />
                    ) : (
                      <p className="font-medium flex items-center gap-2">
                        <MapPin size={16} className="text-primary" />
                        {staff.address || 'Not provided'}
                      </p>
                    )}
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Name</p>
                    {editing ? (
                      <Input
                        value={editForm.emergency_contact_name || ''}
                        onChange={(e) => setEditForm({ ...editForm, emergency_contact_name: e.target.value })}
                      />
                    ) : (
                      <p className="font-medium">{staff.emergency_contact_name || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    {editing ? (
                      <Input
                        value={editForm.emergency_contact_phone || ''}
                        onChange={(e) => setEditForm({ ...editForm, emergency_contact_phone: e.target.value })}
                      />
                    ) : (
                      <p className="font-medium">{staff.emergency_contact_phone || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Relationship</p>
                    {editing ? (
                      <Input
                        value={editForm.emergency_contact_relationship || ''}
                        onChange={(e) => setEditForm({ ...editForm, emergency_contact_relationship: e.target.value })}
                      />
                    ) : (
                      <p className="font-medium">{staff.emergency_contact_relationship || 'Not provided'}</p>
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
                  <p className="text-muted-foreground">{staff.notes || 'No additional notes'}</p>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="qualifications" className="space-y-4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Award size={20} className="text-primary" />
                  License Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">License Number</p>
                    <p className="font-medium">{staff.license_number || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">License Type</p>
                    <p className="font-medium">{staff.license_type || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">License State</p>
                    <p className="font-medium">{staff.license_state || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Expiry Date</p>
                    <p className={`font-medium ${isLicenseExpiring(staff.license_expiry) ? 'text-yellow-600' : ''}`}>
                      {staff.license_expiry ? format(new Date(staff.license_expiry), 'MMM d, yyyy') : 'Not provided'}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Qualifications</h3>
                <div className="space-y-2">
                  {staff.qualifications && staff.qualifications.length > 0 ? (
                    staff.qualifications.map((qual: any, index: number) => (
                      <div key={index} className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">{qual.name || qual}</p>
                        {qual.institution && <p className="text-sm text-muted-foreground">{qual.institution}</p>}
                        {qual.year && <p className="text-sm text-muted-foreground">Year: {qual.year}</p>}
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No qualifications recorded</p>
                  )}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Certifications</h3>
                <div className="space-y-2">
                  {staff.certifications && staff.certifications.length > 0 ? (
                    staff.certifications.map((cert: any, index: number) => (
                      <div key={index} className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">{cert.name || cert}</p>
                        {cert.expiry && (
                          <p className="text-sm text-muted-foreground">
                            Expires: {format(new Date(cert.expiry), 'MMM d, yyyy')}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No certifications recorded</p>
                  )}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="shifts">
              <Card className="p-6">
                <div className="space-y-4">
                  {shifts.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No shifts scheduled</p>
                  ) : (
                    shifts.map((shift) => (
                      <div key={shift.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold">
                              {format(new Date(shift.shift_date), 'EEEE, MMM d, yyyy')}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {shift.start_time} - {shift.end_time}
                            </p>
                          </div>
                          <Badge className={getStatusColor(shift.status === 'completed')}>
                            {shift.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield size={20} className="text-primary" />
                  Background Checks
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <Badge className={staff.background_check_status === 'cleared' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {staff.background_check_status || 'Pending'}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Check Date</p>
                    <p className="font-medium">
                      {staff.background_check_date ? format(new Date(staff.background_check_date), 'MMM d, yyyy') : 'Not completed'}
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default StaffDetail;
