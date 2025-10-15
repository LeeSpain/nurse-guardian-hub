import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Button from '@/components/ui-components/Button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ProfileImageUploader from '@/components/ui-components/ProfileImageUploader';
import FileUploadZone from '@/components/ui-components/FileUploadZone';
import { AlertCircle, CheckCircle, Loader2, Shield, Key } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

interface InvitationData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  job_title: string;
  organization_id: string;
  organization_name: string;
}

const StaffOnboarding: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const token = searchParams.get('token');

  const [validating, setValidating] = useState(true);
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState('account');
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [attachments, setAttachments] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    address: '',
    city: '',
    state: '',
    postal_code: '',
    national_id_number: '',
    job_title: '',
    employment_type: '',
    hourly_rate: '',
    start_date: '',
    license_number: '',
    license_type: '',
    license_state: '',
    license_expiry: '',
    certifications: [],
    professional_indemnity_insurance: false,
    insurance_policy_number: '',
    insurance_expiry: '',
    background_check_status: '',
    dbs_number: '',
    right_to_work_verified: false,
    right_to_work_document_type: '',
    right_to_work_expiry: '',
    emergency_contact_name: '',
    emergency_contact_relationship: '',
    emergency_contact_phone: '',
    emergency_contact_email: '',
  });

  useEffect(() => {
    validateInvitation();
  }, [token]);

  const validateInvitation = async () => {
    if (!token) {
      setError('No invitation token provided');
      setValidating(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('validate-staff-invitation', {
        body: { token },
      });

      if (error || !data.valid) {
        setError(data.error || 'Invalid invitation');
        setValidating(false);
        return;
      }

      setInvitation(data.invitation);
      setFormData(prev => ({
        ...prev,
        first_name: data.invitation.first_name,
        last_name: data.invitation.last_name,
        email: data.invitation.email,
        job_title: data.invitation.job_title,
      }));
      setValidating(false);
    } catch (err: any) {
      setError(err.message || 'Failed to validate invitation');
      setValidating(false);
    }
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: 'Weak Password',
        description: 'Password must be at least 8 characters',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('complete-staff-onboarding', {
        body: {
          token,
          password,
          staff_data: {
            ...formData,
            profile_image_url: profileImageUrl,
            attachments,
            hourly_rate: formData.hourly_rate ? parseFloat(formData.hourly_rate) : null,
          },
        },
      });

      if (error) throw error;

      toast({
        title: 'Onboarding Complete!',
        description: 'Your account has been created successfully',
      });

      // Sign in the user
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password,
      });

      if (signInError) {
        navigate('/login');
      } else {
        navigate('/nurse/dashboard');
      }
    } catch (err: any) {
      console.error('Onboarding error:', err);
      toast({
        title: 'Onboarding Failed',
        description: err.message || 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getProgress = () => {
    const tabs = ['account', 'personal', 'employment', 'qualifications', 'compliance', 'emergency', 'documents'];
    const currentIndex = tabs.indexOf(currentTab);
    return ((currentIndex + 1) / tabs.length) * 100;
  };

  if (validating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 max-w-md w-full text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Validating your invitation...</p>
        </Card>
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="p-8 max-w-md w-full space-y-4">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <h2 className="text-2xl font-bold text-center">Invalid Invitation</h2>
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button variant="outline" onClick={() => navigate('/')} className="w-full">
            Return to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Welcome, {invitation.first_name}!</h1>
              <p className="text-muted-foreground">
                Complete your profile for {invitation.organization_name} as {invitation.job_title}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{Math.round(getProgress())}%</span>
            </div>
            <Progress value={getProgress()} className="h-2" />
          </div>
        </Card>

        {/* Form */}
        <Card className="p-6">
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-7 w-full">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="employment">Employment</TabsTrigger>
              <TabsTrigger value="qualifications">Quals</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
              <TabsTrigger value="documents">Docs</TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-4 mt-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Key className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">Set Up Your Account</h3>
                </div>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Create a secure password to access your account
                </p>
              </div>

              <div className="space-y-2">
                <Label>Email (cannot be changed)</Label>
                <Input value={invitation.email} disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </TabsContent>

            <TabsContent value="personal" className="space-y-4 mt-6">
              <ProfileImageUploader
                currentImageUrl={profileImageUrl}
                onImageUpdated={setProfileImageUrl}
                size="lg"
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date_of_birth">Date of Birth</Label>
                  <Input
                    id="date_of_birth"
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postal_code">Postal Code</Label>
                  <Input
                    id="postal_code"
                    value={formData.postal_code}
                    onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="national_id_number">National ID Number</Label>
                <Input
                  id="national_id_number"
                  value={formData.national_id_number}
                  onChange={(e) => setFormData({ ...formData, national_id_number: e.target.value })}
                />
              </div>
            </TabsContent>

            <TabsContent value="employment" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="job_title">Job Title *</Label>
                <Input
                  id="job_title"
                  value={formData.job_title}
                  onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employment_type">Employment Type</Label>
                  <Select
                    value={formData.employment_type}
                    onValueChange={(value) => setFormData({ ...formData, employment_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full_time">Full Time</SelectItem>
                      <SelectItem value="part_time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="per_diem">Per Diem</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hourly_rate">Hourly Rate</Label>
                  <Input
                    id="hourly_rate"
                    type="number"
                    step="0.01"
                    value={formData.hourly_rate}
                    onChange={(e) => setFormData({ ...formData, hourly_rate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                />
              </div>
            </TabsContent>

            <TabsContent value="qualifications" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="license_number">License Number</Label>
                  <Input
                    id="license_number"
                    value={formData.license_number}
                    onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="license_type">License Type</Label>
                  <Input
                    id="license_type"
                    value={formData.license_type}
                    onChange={(e) => setFormData({ ...formData, license_type: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="license_state">License State</Label>
                  <Input
                    id="license_state"
                    value={formData.license_state}
                    onChange={(e) => setFormData({ ...formData, license_state: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="license_expiry">License Expiry</Label>
                  <Input
                    id="license_expiry"
                    type="date"
                    value={formData.license_expiry}
                    onChange={(e) => setFormData({ ...formData, license_expiry: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="insurance_policy_number">Insurance Policy Number</Label>
                  <Input
                    id="insurance_policy_number"
                    value={formData.insurance_policy_number}
                    onChange={(e) => setFormData({ ...formData, insurance_policy_number: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insurance_expiry">Insurance Expiry</Label>
                  <Input
                    id="insurance_expiry"
                    type="date"
                    value={formData.insurance_expiry}
                    onChange={(e) => setFormData({ ...formData, insurance_expiry: e.target.value })}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="background_check_status">Background Check Status</Label>
                  <Select
                    value={formData.background_check_status}
                    onValueChange={(value) => setFormData({ ...formData, background_check_status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="cleared">Cleared</SelectItem>
                      <SelectItem value="flagged">Flagged</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dbs_number">DBS Number</Label>
                  <Input
                    id="dbs_number"
                    value={formData.dbs_number}
                    onChange={(e) => setFormData({ ...formData, dbs_number: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="right_to_work_document_type">Right to Work Document</Label>
                  <Input
                    id="right_to_work_document_type"
                    value={formData.right_to_work_document_type}
                    onChange={(e) => setFormData({ ...formData, right_to_work_document_type: e.target.value })}
                    placeholder="e.g., Passport, Work Visa"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="right_to_work_expiry">Right to Work Expiry</Label>
                  <Input
                    id="right_to_work_expiry"
                    type="date"
                    value={formData.right_to_work_expiry}
                    onChange={(e) => setFormData({ ...formData, right_to_work_expiry: e.target.value })}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="emergency" className="space-y-4 mt-6">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-4">
                <p className="text-sm text-yellow-900 dark:text-yellow-100">
                  <strong>Emergency Contact Information</strong> - This person will be contacted in case of an emergency
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_name">Contact Name</Label>
                  <Input
                    id="emergency_contact_name"
                    value={formData.emergency_contact_name}
                    onChange={(e) => setFormData({ ...formData, emergency_contact_name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_relationship">Relationship</Label>
                  <Input
                    id="emergency_contact_relationship"
                    value={formData.emergency_contact_relationship}
                    onChange={(e) => setFormData({ ...formData, emergency_contact_relationship: e.target.value })}
                    placeholder="e.g., Spouse, Parent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_phone">Contact Phone</Label>
                  <Input
                    id="emergency_contact_phone"
                    type="tel"
                    value={formData.emergency_contact_phone}
                    onChange={(e) => setFormData({ ...formData, emergency_contact_phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_email">Contact Email</Label>
                  <Input
                    id="emergency_contact_email"
                    type="email"
                    value={formData.emergency_contact_email}
                    onChange={(e) => setFormData({ ...formData, emergency_contact_email: e.target.value })}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4 mt-6">
              <FileUploadZone
                onFileUploaded={(file) => setAttachments([...attachments, file])}
                options={{
                  bucket: 'profile-images',
                  folder: 'staff-documents',
                  maxSizeBytes: 10485760,
                  allowedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'],
                }}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                multiple
              />

              {attachments.length > 0 && (
                <div className="mt-4">
                  <Label>Uploaded Documents ({attachments.length})</Label>
                  <div className="mt-2 space-y-2">
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm truncate">{file.name || `Document ${index + 1}`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => {
                const tabs = ['account', 'personal', 'employment', 'qualifications', 'compliance', 'emergency', 'documents'];
                const currentIndex = tabs.indexOf(currentTab);
                if (currentIndex > 0) {
                  setCurrentTab(tabs[currentIndex - 1]);
                }
              }}
              disabled={currentTab === 'account'}
            >
              Previous
            </Button>

            {currentTab === 'documents' ? (
              <Button
                variant="nurse"
                onClick={handleSubmit}
                disabled={submitting || !password || password !== confirmPassword}
                icon={submitting ? <Loader2 className="animate-spin" size={16} /> : <Shield size={16} />}
              >
                {submitting ? 'Completing...' : 'Complete Onboarding'}
              </Button>
            ) : (
              <Button
                variant="nurse"
                onClick={() => {
                  const tabs = ['account', 'personal', 'employment', 'qualifications', 'compliance', 'emergency', 'documents'];
                  const currentIndex = tabs.indexOf(currentTab);
                  if (currentIndex < tabs.length - 1) {
                    setCurrentTab(tabs[currentIndex + 1]);
                  }
                }}
              >
                Next
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StaffOnboarding;