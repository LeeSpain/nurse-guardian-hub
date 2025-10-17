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
import { useToast } from '@/hooks/use-toast';
import { User, Heart, Stethoscope, Shield, Phone, FileText } from 'lucide-react';
import { useOrganization } from '@/hooks/useOrganization';

interface AddClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (data: any) => Promise<any>;
  editingClient?: any;
}

export const AddClientModal: React.FC<AddClientModalProps> = ({
  open,
  onOpenChange,
  onSuccess,
  editingClient,
}) => {
  const [loading, setLoading] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { organization } = useOrganization();

  const handleProfileImageUpload = async (url: string) => {
    setProfileImageUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!organization?.id) {
      toast({
        title: "Error",
        description: "No organization found. Please create an organization first.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    const data = {
      organization_id: organization.id,
      // Personal Information
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
      date_of_birth: formData.get('date_of_birth') as string,
      gender: formData.get('gender') as string || null,
      email: formData.get('email') as string || null,
      phone: formData.get('phone') as string || null,
      address: formData.get('address') as string || null,
      city: formData.get('city') as string || null,
      state: formData.get('state') as string || null,
      postal_code: formData.get('postal_code') as string || null,
      profile_image_url: profileImageUrl,
      
      // Emergency Contact 1
      emergency_contact_1_name: formData.get('emergency_contact_1_name') as string || null,
      emergency_contact_1_phone: formData.get('emergency_contact_1_phone') as string || null,
      emergency_contact_1_relationship: formData.get('emergency_contact_1_relationship') as string || null,
      emergency_contact_1_email: formData.get('emergency_contact_1_email') as string || null,
      
      // Emergency Contact 2
      emergency_contact_2_name: formData.get('emergency_contact_2_name') as string || null,
      emergency_contact_2_phone: formData.get('emergency_contact_2_phone') as string || null,
      emergency_contact_2_relationship: formData.get('emergency_contact_2_relationship') as string || null,
      emergency_contact_2_email: formData.get('emergency_contact_2_email') as string || null,
      
      // Next of Kin
      next_of_kin_name: formData.get('next_of_kin_name') as string || null,
      next_of_kin_phone: formData.get('next_of_kin_phone') as string || null,
      next_of_kin_relationship: formData.get('next_of_kin_relationship') as string || null,
      next_of_kin_email: formData.get('next_of_kin_email') as string || null,
      next_of_kin_address: formData.get('next_of_kin_address') as string || null,
      
      // Medical Information
      nhs_number: formData.get('nhs_number') as string || null,
      hospital_number: formData.get('hospital_number') as string || null,
      medical_history: formData.get('medical_history') as string || null,
      allergies: formData.get('allergies') as string || null,
      dietary_requirements: formData.get('dietary_requirements') as string || null,
      mobility_status: formData.get('mobility_status') as string || null,
      communication_needs: formData.get('communication_needs') as string || null,
      
      // GP Details
      gp_name: formData.get('gp_name') as string || null,
      gp_practice: formData.get('gp_practice') as string || null,
      gp_phone: formData.get('gp_phone') as string || null,
      gp_address: formData.get('gp_address') as string || null,
      
      // Care & Support
      care_level: formData.get('care_level') as string || null,
      funding_source: formData.get('funding_source') as string || null,
      preferred_language: formData.get('preferred_language') as string || 'English',
      cultural_requirements: formData.get('cultural_requirements') as string || null,
      religious_requirements: formData.get('religious_requirements') as string || null,
      
      // Mental Capacity & Consent
      mental_capacity_status: formData.get('mental_capacity_status') as string || null,
      mental_capacity_assessment_date: formData.get('mental_capacity_assessment_date') as string || null,
      consent_for_care: formData.get('consent_for_care') === 'on',
      consent_date: formData.get('consent_date') as string || null,
      lasting_power_of_attorney: formData.get('lasting_power_of_attorney') as string || null,
      lpa_contact_details: formData.get('lpa_contact_details') as string || null,
      
      // Risk Assessment
      risk_level: formData.get('risk_level') as string || 'low',
      risk_factors: formData.get('risk_factors') as string || null,
      safeguarding_concerns: formData.get('safeguarding_concerns') as string || null,
      
      // Administrative
      start_date: formData.get('start_date') as string,
      social_services_reference: formData.get('social_services_reference') as string || null,
      insurance_provider: formData.get('insurance_provider') as string || null,
      insurance_policy_number: formData.get('insurance_policy_number') as string || null,
      insurance_expiry: formData.get('insurance_expiry') as string || null,
      
      notes: formData.get('notes') as string || null,
      status: formData.get('status') as string || 'potential',
    };

    try {
      await onSuccess(data);
      onOpenChange(false);
      e.currentTarget.reset();
      setProfileImageUrl(null);
    } catch (error) {
      // Error handled in hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="personal" className="text-xs">
                <User className="w-4 h-4 mr-1" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="medical" className="text-xs">
                <Stethoscope className="w-4 h-4 mr-1" />
                Medical
              </TabsTrigger>
              <TabsTrigger value="care" className="text-xs">
                <Heart className="w-4 h-4 mr-1" />
                Care
              </TabsTrigger>
              <TabsTrigger value="risk" className="text-xs">
                <Shield className="w-4 h-4 mr-1" />
                Risk
              </TabsTrigger>
              <TabsTrigger value="contacts" className="text-xs">
                <Phone className="w-4 h-4 mr-1" />
                Contacts
              </TabsTrigger>
              <TabsTrigger value="admin" className="text-xs">
                <FileText className="w-4 h-4 mr-1" />
                Admin
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
                  <Input id="first_name" name="first_name" required maxLength={100} />
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input id="last_name" name="last_name" required maxLength={100} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date_of_birth">Date of Birth *</Label>
                  <Input id="date_of_birth" name="date_of_birth" type="date" required />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select name="gender">
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="preferred_language">Preferred Language</Label>
                  <Input id="preferred_language" name="preferred_language" defaultValue="English" maxLength={50} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" maxLength={255} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" maxLength={20} />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" maxLength={255} />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" maxLength={100} />
                </div>
                <div>
                  <Label htmlFor="state">State/County</Label>
                  <Input id="state" name="state" maxLength={100} />
                </div>
                <div>
                  <Label htmlFor="postal_code">Postal Code</Label>
                  <Input id="postal_code" name="postal_code" maxLength={20} />
                </div>
              </div>
            </TabsContent>

            {/* Medical Information Tab */}
            <TabsContent value="medical" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nhs_number">NHS Number</Label>
                  <Input id="nhs_number" name="nhs_number" placeholder="000 000 0000" maxLength={20} />
                </div>
                <div>
                  <Label htmlFor="hospital_number">Hospital Number</Label>
                  <Input id="hospital_number" name="hospital_number" maxLength={50} />
                </div>
              </div>

              <div>
                <Label htmlFor="medical_history">Medical History / Conditions</Label>
                <Textarea 
                  id="medical_history" 
                  name="medical_history"
                  placeholder="List chronic conditions, diagnoses, medical history..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="allergies">Allergies & Intolerances</Label>
                <Textarea 
                  id="allergies" 
                  name="allergies"
                  placeholder="List all known allergies and intolerances..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mobility_status">Mobility Status</Label>
                  <Select name="mobility_status">
                    <SelectTrigger>
                      <SelectValue placeholder="Select mobility level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="independent">Independent</SelectItem>
                      <SelectItem value="walking_aid">Walking Aid Required</SelectItem>
                      <SelectItem value="wheelchair">Wheelchair User</SelectItem>
                      <SelectItem value="bed_bound">Bed Bound</SelectItem>
                      <SelectItem value="hoisted">Requires Hoisting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dietary_requirements">Dietary Requirements</Label>
                  <Input id="dietary_requirements" name="dietary_requirements" placeholder="e.g., Diabetic, Vegetarian..." maxLength={255} />
                </div>
              </div>

              <div>
                <Label htmlFor="communication_needs">Communication Needs</Label>
                <Textarea 
                  id="communication_needs" 
                  name="communication_needs"
                  placeholder="e.g., Hearing impaired, uses sign language, visual aids required..."
                  rows={2}
                />
              </div>

              <div className="border-t pt-4 mt-4">
                <h4 className="font-semibold text-foreground mb-4">GP Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gp_name">GP Name</Label>
                    <Input id="gp_name" name="gp_name" maxLength={100} />
                  </div>
                  <div>
                    <Label htmlFor="gp_practice">GP Practice</Label>
                    <Input id="gp_practice" name="gp_practice" maxLength={150} />
                  </div>
                  <div>
                    <Label htmlFor="gp_phone">GP Phone</Label>
                    <Input id="gp_phone" name="gp_phone" type="tel" maxLength={20} />
                  </div>
                  <div>
                    <Label htmlFor="gp_address">GP Address</Label>
                    <Input id="gp_address" name="gp_address" maxLength={255} />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Care & Support Tab */}
            <TabsContent value="care" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="care_level">Care Level Required</Label>
                  <Select name="care_level">
                    <SelectTrigger>
                      <SelectValue placeholder="Select care level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Basic Support</SelectItem>
                      <SelectItem value="medium">Medium - Regular Care</SelectItem>
                      <SelectItem value="high">High - Intensive Care</SelectItem>
                      <SelectItem value="complex">Complex - Specialist Care</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="funding_source">Funding Source</Label>
                  <Select name="funding_source">
                    <SelectTrigger>
                      <SelectValue placeholder="Select funding" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="nhs">NHS</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="local_authority">Local Authority</SelectItem>
                      <SelectItem value="mixed">Mixed Funding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="cultural_requirements">Cultural Requirements</Label>
                <Textarea 
                  id="cultural_requirements" 
                  name="cultural_requirements"
                  placeholder="Any cultural preferences or requirements..."
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="religious_requirements">Religious Requirements</Label>
                <Textarea 
                  id="religious_requirements" 
                  name="religious_requirements"
                  placeholder="Any religious observances or requirements..."
                  rows={2}
                />
              </div>

              <div className="border-t pt-4 mt-4">
                <h4 className="font-semibold text-foreground mb-4">Mental Capacity & Consent</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="mental_capacity_status">Mental Capacity Status</Label>
                    <Select name="mental_capacity_status">
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="has_capacity">Has Capacity</SelectItem>
                        <SelectItem value="lacks_capacity">Lacks Capacity</SelectItem>
                        <SelectItem value="fluctuating">Fluctuating Capacity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="mental_capacity_assessment_date">Assessment Date</Label>
                    <Input id="mental_capacity_assessment_date" name="mental_capacity_assessment_date" type="date" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="consent_for_care" name="consent_for_care" />
                    <Label htmlFor="consent_for_care" className="font-normal">Consent for Care Obtained</Label>
                  </div>
                  <div>
                    <Label htmlFor="consent_date">Consent Date</Label>
                    <Input id="consent_date" name="consent_date" type="date" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="lasting_power_of_attorney">Lasting Power of Attorney</Label>
                    <Input id="lasting_power_of_attorney" name="lasting_power_of_attorney" placeholder="Name of attorney" maxLength={150} />
                  </div>
                  <div>
                    <Label htmlFor="lpa_contact_details">LPA Contact Details</Label>
                    <Input id="lpa_contact_details" name="lpa_contact_details" placeholder="Phone/email" maxLength={255} />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Risk Assessment Tab */}
            <TabsContent value="risk" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="risk_level">Overall Risk Level</Label>
                <Select name="risk_level" defaultValue="low">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="risk_factors">Risk Factors</Label>
                <Textarea 
                  id="risk_factors" 
                  name="risk_factors"
                  placeholder="Falls risk, pressure sores, malnutrition, infection, safeguarding concerns..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="safeguarding_concerns">Safeguarding Concerns</Label>
                <Textarea 
                  id="safeguarding_concerns" 
                  name="safeguarding_concerns"
                  placeholder="Any safeguarding issues or concerns..."
                  rows={3}
                />
              </div>
            </TabsContent>

            {/* Emergency Contacts Tab */}
            <TabsContent value="contacts" className="space-y-4 mt-4">
              <h4 className="font-semibold text-foreground">Emergency Contact 1</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergency_contact_1_name">Name</Label>
                  <Input id="emergency_contact_1_name" name="emergency_contact_1_name" maxLength={100} />
                </div>
                <div>
                  <Label htmlFor="emergency_contact_1_relationship">Relationship</Label>
                  <Input id="emergency_contact_1_relationship" name="emergency_contact_1_relationship" maxLength={50} />
                </div>
                <div>
                  <Label htmlFor="emergency_contact_1_phone">Phone *</Label>
                  <Input id="emergency_contact_1_phone" name="emergency_contact_1_phone" type="tel" maxLength={20} />
                </div>
                <div>
                  <Label htmlFor="emergency_contact_1_email">Email</Label>
                  <Input id="emergency_contact_1_email" name="emergency_contact_1_email" type="email" maxLength={255} />
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h4 className="font-semibold text-foreground mb-4">Emergency Contact 2 (Optional)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergency_contact_2_name">Name</Label>
                    <Input id="emergency_contact_2_name" name="emergency_contact_2_name" maxLength={100} />
                  </div>
                  <div>
                    <Label htmlFor="emergency_contact_2_relationship">Relationship</Label>
                    <Input id="emergency_contact_2_relationship" name="emergency_contact_2_relationship" maxLength={50} />
                  </div>
                  <div>
                    <Label htmlFor="emergency_contact_2_phone">Phone</Label>
                    <Input id="emergency_contact_2_phone" name="emergency_contact_2_phone" type="tel" maxLength={20} />
                  </div>
                  <div>
                    <Label htmlFor="emergency_contact_2_email">Email</Label>
                    <Input id="emergency_contact_2_email" name="emergency_contact_2_email" type="email" maxLength={255} />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h4 className="font-semibold text-foreground mb-4">Next of Kin</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="next_of_kin_name">Name</Label>
                    <Input id="next_of_kin_name" name="next_of_kin_name" maxLength={100} />
                  </div>
                  <div>
                    <Label htmlFor="next_of_kin_relationship">Relationship</Label>
                    <Input id="next_of_kin_relationship" name="next_of_kin_relationship" maxLength={50} />
                  </div>
                  <div>
                    <Label htmlFor="next_of_kin_phone">Phone</Label>
                    <Input id="next_of_kin_phone" name="next_of_kin_phone" type="tel" maxLength={20} />
                  </div>
                  <div>
                    <Label htmlFor="next_of_kin_email">Email</Label>
                    <Input id="next_of_kin_email" name="next_of_kin_email" type="email" maxLength={255} />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="next_of_kin_address">Address</Label>
                    <Input id="next_of_kin_address" name="next_of_kin_address" maxLength={255} />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Administrative Tab */}
            <TabsContent value="admin" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">Start Date of Care *</Label>
                  <Input id="start_date" name="start_date" type="date" required />
                </div>
                <div>
                  <Label htmlFor="status">Client Status</Label>
                  <Select name="status" defaultValue="potential">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="potential">Potential</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                      <SelectItem value="discharged">Discharged</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="social_services_reference">Social Services Reference</Label>
                <Input id="social_services_reference" name="social_services_reference" maxLength={100} />
              </div>

              <div className="border-t pt-4 mt-4">
                <h4 className="font-semibold text-foreground mb-4">Insurance Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="insurance_provider">Insurance Provider</Label>
                    <Input id="insurance_provider" name="insurance_provider" maxLength={150} />
                  </div>
                  <div>
                    <Label htmlFor="insurance_policy_number">Policy Number</Label>
                    <Input id="insurance_policy_number" name="insurance_policy_number" maxLength={100} />
                  </div>
                  <div>
                    <Label htmlFor="insurance_expiry">Policy Expiry</Label>
                    <Input id="insurance_expiry" name="insurance_expiry" type="date" />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">General Notes</Label>
                <Textarea 
                  id="notes" 
                  name="notes"
                  placeholder="Additional notes about the client..."
                  rows={4}
                />
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
              {loading ? 'Adding...' : 'Add Client'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
