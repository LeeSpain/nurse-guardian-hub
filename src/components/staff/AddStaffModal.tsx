import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Button from '@/components/ui-components/Button';
import ProfileImageUploader from '@/components/ui-components/ProfileImageUploader';
import FileUploadZone from '@/components/ui-components/FileUploadZone';
import { useToast } from '@/hooks/use-toast';
import { User, Briefcase, FileCheck, Shield, Phone, GraduationCap, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AddStaffModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (data: any) => Promise<any>;
  organizationId: string;
}

export const AddStaffModal: React.FC<AddStaffModalProps> = ({
  open,
  onOpenChange,
  onSuccess,
  organizationId,
}) => {
  const [loading, setLoading] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<Array<{name: string, url: string, type: string}>>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { toast } = useToast();

  const handleProfileImageUpload = async (url: string) => {
    setProfileImageUrl(url);
  };

  const handleFileUpload = async (result: { url?: string; path?: string }) => {
    if (result.url) {
      const fileName = result.path?.split('/').pop() || 'document';
      const fileType = fileName.split('.').pop() || 'file';
      
      setAttachments([...attachments, {
        name: fileName,
        url: result.url,
        type: fileType
      }]);
      
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    const data = {
      organization_id: organizationId,
      // Personal Information
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      date_of_birth: formData.get('date_of_birth') as string || null,
      address: formData.get('address') as string || null,
      city: formData.get('city') as string || null,
      state: formData.get('state') as string || null,
      postal_code: formData.get('postal_code') as string || null,
      national_id_number: formData.get('national_id_number') as string || null,
      
      // Profile Image & Attachments
      profile_image_url: profileImageUrl,
      attachments: attachments,
      
      // Employment Details
      job_title: formData.get('job_title') as string,
      employment_type: formData.get('employment_type') as string,
      hourly_rate: parseFloat(formData.get('hourly_rate') as string),
      start_date: formData.get('start_date') as string,
      
      // Professional Qualifications
      license_number: formData.get('license_number') as string || null,
      license_type: formData.get('license_type') as string || null,
      license_state: formData.get('license_state') as string || null,
      license_expiry: formData.get('license_expiry') as string || null,
      professional_indemnity_insurance: formData.get('professional_indemnity_insurance') === 'on',
      insurance_policy_number: formData.get('insurance_policy_number') as string || null,
      insurance_expiry: formData.get('insurance_expiry') as string || null,
      
      // Background Checks
      background_check_status: formData.get('background_check_status') as string || 'pending',
      background_check_date: formData.get('background_check_date') as string || null,
      background_check_expiry: formData.get('background_check_expiry') as string || null,
      dbs_number: formData.get('dbs_number') as string || null,
      right_to_work_verified: formData.get('right_to_work_verified') === 'on',
      right_to_work_document_type: formData.get('right_to_work_document_type') as string || null,
      right_to_work_expiry: formData.get('right_to_work_expiry') as string || null,
      
      // Emergency Contact
      emergency_contact_name: formData.get('emergency_contact_name') as string || null,
      emergency_contact_relationship: formData.get('emergency_contact_relationship') as string || null,
      emergency_contact_phone: formData.get('emergency_contact_phone') as string || null,
      emergency_contact_email: formData.get('emergency_contact_email') as string || null,
      
      // Notes
      notes: formData.get('notes') as string || null,
      
      is_active: true,
    };

    try {
      await onSuccess(data);
      onOpenChange(false);
      e.currentTarget.reset();
      setProfileImageUrl(null);
      setAttachments([]);
    } catch (error) {
      // Error handled in hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Staff Member</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="personal" className="text-xs">
                <User className="w-4 h-4 mr-1" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="employment" className="text-xs">
                <Briefcase className="w-4 h-4 mr-1" />
                Employment
              </TabsTrigger>
              <TabsTrigger value="qualifications" className="text-xs">
                <GraduationCap className="w-4 h-4 mr-1" />
                Qualifications
              </TabsTrigger>
              <TabsTrigger value="checks" className="text-xs">
                <Shield className="w-4 h-4 mr-1" />
                Checks
              </TabsTrigger>
              <TabsTrigger value="emergency" className="text-xs">
                <Phone className="w-4 h-4 mr-1" />
                Emergency
              </TabsTrigger>
              <TabsTrigger value="documents" className="text-xs">
                <FileText className="w-4 h-4 mr-1" />
                Documents
              </TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-4 mt-4">
              <div className="mb-6">
                <Label className="block text-sm font-medium text-foreground mb-3">Profile Picture</Label>
                <ProfileImageUploader
                  currentImageUrl={profileImageUrl}
                  onImageUpdated={handleProfileImageUpload}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    placeholder="John"
                    required
                    maxLength={100}
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    placeholder="Smith"
                    required
                    maxLength={100}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.smith@example.com"
                    required
                    maxLength={255}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+44 7700 900000"
                    required
                    maxLength={20}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date_of_birth">Date of Birth</Label>
                  <Input
                    id="date_of_birth"
                    name="date_of_birth"
                    type="date"
                  />
                </div>
                <div>
                  <Label htmlFor="national_id_number">National Insurance / SSN</Label>
                  <Input
                    id="national_id_number"
                    name="national_id_number"
                    placeholder="AB123456C"
                    maxLength={20}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="123 Main Street"
                  maxLength={255}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="London"
                    maxLength={100}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State/County</Label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="Greater London"
                    maxLength={100}
                  />
                </div>
                <div>
                  <Label htmlFor="postal_code">Postal Code</Label>
                  <Input
                    id="postal_code"
                    name="postal_code"
                    placeholder="SW1A 1AA"
                    maxLength={20}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Employment Details Tab */}
            <TabsContent value="employment" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="job_title">Job Title *</Label>
                <Input
                  id="job_title"
                  name="job_title"
                  placeholder="e.g., Registered Nurse"
                  required
                  maxLength={100}
                />
              </div>

              <div>
                <Label htmlFor="employment_type">Employment Type *</Label>
                <Select name="employment_type" required>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hourly_rate">Hourly Rate ($) *</Label>
                  <Input
                    id="hourly_rate"
                    name="hourly_rate"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="start_date">Start Date *</Label>
                  <Input
                    id="start_date"
                    name="start_date"
                    type="date"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Additional notes about employment..."
                  rows={4}
                  maxLength={1000}
                />
              </div>
            </TabsContent>

            {/* Qualifications Tab */}
            <TabsContent value="qualifications" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="license_number">License Number</Label>
                  <Input
                    id="license_number"
                    name="license_number"
                    placeholder="NMC123456"
                    maxLength={50}
                  />
                </div>
                <div>
                  <Label htmlFor="license_type">License Type</Label>
                  <Select name="license_type">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rn">Registered Nurse (RN)</SelectItem>
                      <SelectItem value="lpn">Licensed Practical Nurse (LPN)</SelectItem>
                      <SelectItem value="cna">Certified Nursing Assistant (CNA)</SelectItem>
                      <SelectItem value="np">Nurse Practitioner (NP)</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="license_state">License State/Country</Label>
                  <Input
                    id="license_state"
                    name="license_state"
                    placeholder="United Kingdom"
                    maxLength={50}
                  />
                </div>
                <div>
                  <Label htmlFor="license_expiry">License Expiry</Label>
                  <Input
                    id="license_expiry"
                    name="license_expiry"
                    type="date"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="professional_indemnity_insurance"
                    name="professional_indemnity_insurance"
                  />
                  <Label htmlFor="professional_indemnity_insurance" className="font-normal">
                    Has Professional Indemnity Insurance
                  </Label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="insurance_policy_number">Policy Number</Label>
                  <Input
                    id="insurance_policy_number"
                    name="insurance_policy_number"
                    placeholder="POL123456"
                    maxLength={50}
                  />
                </div>
                <div>
                  <Label htmlFor="insurance_expiry">Insurance Expiry</Label>
                  <Input
                    id="insurance_expiry"
                    name="insurance_expiry"
                    type="date"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Background Checks Tab */}
            <TabsContent value="checks" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="background_check_status">Background Check Status</Label>
                <Select name="background_check_status" defaultValue="pending">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="cleared">Cleared</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="background_check_date">Check Date</Label>
                  <Input
                    id="background_check_date"
                    name="background_check_date"
                    type="date"
                  />
                </div>
                <div>
                  <Label htmlFor="background_check_expiry">Check Expiry</Label>
                  <Input
                    id="background_check_expiry"
                    name="background_check_expiry"
                    type="date"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="dbs_number">DBS/Police Check Number</Label>
                <Input
                  id="dbs_number"
                  name="dbs_number"
                  placeholder="001234567890"
                  maxLength={50}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="right_to_work_verified"
                    name="right_to_work_verified"
                  />
                  <Label htmlFor="right_to_work_verified" className="font-normal">
                    Right to Work Verified
                  </Label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="right_to_work_document_type">Document Type</Label>
                  <Select name="right_to_work_document_type">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="visa">Visa</SelectItem>
                      <SelectItem value="birth_certificate">Birth Certificate</SelectItem>
                      <SelectItem value="residence_permit">Residence Permit</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="right_to_work_expiry">Document Expiry</Label>
                  <Input
                    id="right_to_work_expiry"
                    name="right_to_work_expiry"
                    type="date"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-4 mt-4">
              <div>
                <Label className="block text-sm font-medium text-foreground mb-3">
                  Upload Documents & Certificates
                </Label>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload licenses, certifications, DBS checks, insurance documents, references, etc.
                </p>
                <FileUploadZone
                  onFileUploaded={handleFileUpload}
                  options={{
                    bucket: 'profile-images',
                    folder: 'staff-documents',
                    maxSizeBytes: 10 * 1024 * 1024, // 10MB
                    allowedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png']
                  }}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  multiple={false}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Upload one file at a time. Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                </p>
              </div>

              {attachments.length > 0 && (
                <div className="mt-4">
                  <Label className="block text-sm font-medium text-foreground mb-2">
                    Uploaded Documents ({attachments.length})
                  </Label>
                  <div className="space-y-2">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{file.type}</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeAttachment(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Emergency Contact Tab */}
            <TabsContent value="emergency" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergency_contact_name">Contact Name</Label>
                  <Input
                    id="emergency_contact_name"
                    name="emergency_contact_name"
                    placeholder="Jane Smith"
                    maxLength={100}
                  />
                </div>
                <div>
                  <Label htmlFor="emergency_contact_relationship">Relationship</Label>
                  <Input
                    id="emergency_contact_relationship"
                    name="emergency_contact_relationship"
                    placeholder="Spouse, Parent, Sibling, etc."
                    maxLength={50}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergency_contact_phone">Phone</Label>
                  <Input
                    id="emergency_contact_phone"
                    name="emergency_contact_phone"
                    type="tel"
                    placeholder="+44 7700 900000"
                    maxLength={20}
                  />
                </div>
                <div>
                  <Label htmlFor="emergency_contact_email">Email</Label>
                  <Input
                    id="emergency_contact_email"
                    name="emergency_contact_email"
                    type="email"
                    placeholder="jane.smith@example.com"
                    maxLength={255}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" variant="nurse" disabled={loading}>
              {loading ? 'Adding...' : 'Add Staff Member'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};