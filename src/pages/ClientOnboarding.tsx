import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Button from '@/components/ui-components/Button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import ProfileImageUploader from '@/components/ui-components/ProfileImageUploader';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, Heart, Stethoscope, Shield, Phone, FileText, Loader2, CheckCircle2 } from 'lucide-react';

const ClientOnboarding: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [invitation, setInvitation] = useState<any>(null);
  const [existingClient, setExistingClient] = useState<any>(null);
  const [isVerificationMode, setIsVerificationMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const token = searchParams.get('token') || searchParams.get('t') || searchParams.get('Token');

  useEffect(() => {
    if (!token) {
      setError('No invitation token provided');
      setLoading(false);
      return;
    }

    validateToken();
  }, [token]);

  const validateToken = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('validate-client-invitation', {
        body: { token },
      });

      if (error || !data.valid) {
        setError(data?.error || 'Invalid invitation link');
        return;
      }

      setInvitation(data.invitation);

      // Check if client already exists for this invitation
      if (data.invitation.id) {
        const { data: clientData } = await supabase
          .from('clients')
          .select('*')
          .eq('invitation_id', data.invitation.id)
          .single();

        if (clientData) {
          setExistingClient(clientData);
          setIsVerificationMode(true);
          setProfileImageUrl(clientData.profile_image_url);
          console.log('[CLIENT-ONBOARDING] Verification mode - existing client found');
        } else {
          console.log('[CLIENT-ONBOARDING] Onboarding mode - new client');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to validate invitation');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileImageUpload = async (url: string) => {
    setProfileImageUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    const clientData = {
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
      
      emergency_contact_1_name: formData.get('emergency_contact_1_name') as string || null,
      emergency_contact_1_phone: formData.get('emergency_contact_1_phone') as string || null,
      emergency_contact_1_relationship: formData.get('emergency_contact_1_relationship') as string || null,
      emergency_contact_1_email: formData.get('emergency_contact_1_email') as string || null,
      
      emergency_contact_2_name: formData.get('emergency_contact_2_name') as string || null,
      emergency_contact_2_phone: formData.get('emergency_contact_2_phone') as string || null,
      emergency_contact_2_relationship: formData.get('emergency_contact_2_relationship') as string || null,
      emergency_contact_2_email: formData.get('emergency_contact_2_email') as string || null,
      
      next_of_kin_name: formData.get('next_of_kin_name') as string || null,
      next_of_kin_phone: formData.get('next_of_kin_phone') as string || null,
      next_of_kin_relationship: formData.get('next_of_kin_relationship') as string || null,
      next_of_kin_email: formData.get('next_of_kin_email') as string || null,
      next_of_kin_address: formData.get('next_of_kin_address') as string || null,
      
      nhs_number: formData.get('nhs_number') as string || null,
      hospital_number: formData.get('hospital_number') as string || null,
      medical_history: formData.get('medical_history') as string || null,
      allergies: formData.get('allergies') as string || null,
      dietary_requirements: formData.get('dietary_requirements') as string || null,
      mobility_status: formData.get('mobility_status') as string || null,
      communication_needs: formData.get('communication_needs') as string || null,
      
      gp_name: formData.get('gp_name') as string || null,
      gp_practice: formData.get('gp_practice') as string || null,
      gp_phone: formData.get('gp_phone') as string || null,
      gp_address: formData.get('gp_address') as string || null,
      
      preferred_language: formData.get('preferred_language') as string || 'English',
      cultural_requirements: formData.get('cultural_requirements') as string || null,
      religious_requirements: formData.get('religious_requirements') as string || null,
      
      consent_for_care: formData.get('consent_for_care') === 'on',
      consent_date: formData.get('consent_date') as string || null,
      
      safeguarding_concerns: formData.get('safeguarding_concerns') as string || null,
      
      ...(isVerificationMode ? {} : {
        // Only include these fields for new clients (onboarding mode)
        care_level: formData.get('care_level') as string || null,
        funding_source: formData.get('funding_source') as string || null,
        mental_capacity_status: formData.get('mental_capacity_status') as string || null,
        mental_capacity_assessment_date: formData.get('mental_capacity_assessment_date') as string || null,
        lasting_power_of_attorney: formData.get('lasting_power_of_attorney') as string || null,
        lpa_contact_details: formData.get('lpa_contact_details') as string || null,
        risk_level: formData.get('risk_level') as string || 'low',
        risk_factors: formData.get('risk_factors') as string || null,
        start_date: formData.get('start_date') as string,
        social_services_reference: formData.get('social_services_reference') as string || null,
        insurance_provider: formData.get('insurance_provider') as string || null,
        insurance_policy_number: formData.get('insurance_policy_number') as string || null,
        insurance_expiry: formData.get('insurance_expiry') as string || null,
        notes: formData.get('notes') as string || null,
        status: 'active',
      }),
    };

    try {
      const functionName = isVerificationMode ? 'update-client-profile' : 'complete-client-onboarding';
      
      const { error } = await supabase.functions.invoke(functionName, {
        body: {
          token,
          client_data: clientData,
        },
      });

      if (error) throw error;

      setCompleted(true);
      toast({
        title: isVerificationMode ? "Profile Verified!" : "Profile Completed!",
        description: isVerificationMode 
          ? "Your information has been successfully verified and updated."
          : "Your information has been successfully submitted.",
      });

      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } catch (error: any) {
      console.error('Error completing onboarding:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to complete profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getFieldValue = (fieldName: string) => {
    return existingClient?.[fieldName] || '';
  };

  const hasValue = (fieldName: string) => {
    const value = existingClient?.[fieldName];
    return value !== null && value !== undefined && value !== '';
  };

  const FieldLabel = ({ htmlFor, children, fieldName }: { htmlFor: string; children: React.ReactNode; fieldName?: string }) => (
    <Label htmlFor={htmlFor} className="flex items-center gap-2">
      {children}
      {isVerificationMode && fieldName && (
        <Badge variant={hasValue(fieldName) ? "default" : "secondary"} className="text-xs">
          {hasValue(fieldName) ? '✓ Saved' : '⚠ Please Complete'}
        </Badge>
      )}
    </Label>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="text-destructive mb-4">
            <Shield className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Invalid or Incomplete Invitation
          </h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          
          {error === 'No invitation token provided' ? (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Need help?
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                Your invitation link seems incomplete. Please:
              </p>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside text-left">
                <li>Open the full link from the invitation email</li>
                <li>Or ask your care team to re-send the invitation</li>
              </ul>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mb-4">
              This invitation may have expired or been used already.
            </p>
          )}
          
          <div className="flex flex-col gap-2">
            <Button onClick={() => window.location.href = '/'}>
              Go to Home
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.href = 'mailto:care@angelsnursingcare.com?subject=Help with Invitation'}
            >
              Contact Support
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="text-green-500 mb-4">
            <CheckCircle2 className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {isVerificationMode ? 'Information Verified!' : 'All Set!'}
          </h2>
          <p className="text-muted-foreground mb-4">
            {isVerificationMode 
              ? `Your profile has been successfully verified and any updates have been saved with ${invitation.organization_name}.`
              : `Your profile has been successfully completed and submitted to ${invitation.organization_name}.`
            }
          </p>
          <p className="text-sm text-muted-foreground">
            Redirecting you to the homepage...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isVerificationMode ? `Welcome back, ${invitation.first_name}!` : `Welcome, ${invitation.first_name}!`}
            </h1>
            <p className="text-muted-foreground">
              {isVerificationMode 
                ? `Please review and verify your information for `
                : `Complete your profile for `}
              <span className="font-semibold">{invitation.organization_name}</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {isVerificationMode ? 'Update any information as needed' : `Invited by: ${invitation.invited_by_name}`}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal" className="text-xs">
                  <User className="w-4 h-4 mr-1" />
                  Personal
                </TabsTrigger>
                <TabsTrigger value="contacts" className="text-xs">
                  <Phone className="w-4 h-4 mr-1" />
                  Contacts
                </TabsTrigger>
                <TabsTrigger value="medical" className="text-xs">
                  <Stethoscope className="w-4 h-4 mr-1" />
                  Medical & GP
                </TabsTrigger>
                <TabsTrigger value="care" className="text-xs">
                  <Heart className="w-4 h-4 mr-1" />
                  Care & Consent
                </TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal" className="space-y-4 mt-6">
                <div className="mb-6">
                  <Label className="block text-sm font-medium mb-3">Profile Picture</Label>
                  <ProfileImageUploader
                    currentImageUrl={profileImageUrl}
                    onImageUpdated={handleProfileImageUpload}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FieldLabel htmlFor="first_name" fieldName="first_name">First Name *</FieldLabel>
                    <Input 
                      id="first_name" 
                      name="first_name" 
                      defaultValue={getFieldValue('first_name') || invitation.first_name}
                      required 
                      maxLength={100} 
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="last_name" fieldName="last_name">Last Name *</FieldLabel>
                    <Input 
                      id="last_name" 
                      name="last_name" 
                      defaultValue={getFieldValue('last_name') || invitation.last_name}
                      required 
                      maxLength={100} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <FieldLabel htmlFor="date_of_birth" fieldName="date_of_birth">Date of Birth *</FieldLabel>
                    <Input 
                      id="date_of_birth" 
                      name="date_of_birth" 
                      type="date" 
                      defaultValue={getFieldValue('date_of_birth')}
                      required 
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="gender" fieldName="gender">Gender</FieldLabel>
                    <Select name="gender" defaultValue={getFieldValue('gender')}>
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
                    <FieldLabel htmlFor="preferred_language" fieldName="preferred_language">Preferred Language</FieldLabel>
                    <Input 
                      id="preferred_language" 
                      name="preferred_language" 
                      defaultValue={getFieldValue('preferred_language') || 'English'} 
                      maxLength={50} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FieldLabel htmlFor="email" fieldName="email">Email</FieldLabel>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      defaultValue={getFieldValue('email') || invitation.email}
                      maxLength={255} 
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="phone" fieldName="phone">Phone</FieldLabel>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      defaultValue={getFieldValue('phone')}
                      maxLength={20} 
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel htmlFor="address" fieldName="address">Address</FieldLabel>
                  <Input 
                    id="address" 
                    name="address" 
                    defaultValue={getFieldValue('address')}
                    maxLength={255} 
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <FieldLabel htmlFor="city" fieldName="city">City</FieldLabel>
                    <Input 
                      id="city" 
                      name="city" 
                      defaultValue={getFieldValue('city')}
                      maxLength={100} 
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="state" fieldName="state">State/Province/Region</FieldLabel>
                    <Input 
                      id="state" 
                      name="state" 
                      defaultValue={getFieldValue('state')}
                      maxLength={100} 
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="postal_code" fieldName="postal_code">Postal Code</FieldLabel>
                    <Input 
                      id="postal_code" 
                      name="postal_code" 
                      defaultValue={getFieldValue('postal_code')}
                      maxLength={20} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FieldLabel htmlFor="cultural_requirements" fieldName="cultural_requirements">Cultural Requirements</FieldLabel>
                    <Textarea 
                      id="cultural_requirements" 
                      name="cultural_requirements"
                      defaultValue={getFieldValue('cultural_requirements')}
                      placeholder="Any cultural preferences or requirements"
                      maxLength={500}
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="religious_requirements" fieldName="religious_requirements">Religious Requirements</FieldLabel>
                    <Textarea 
                      id="religious_requirements" 
                      name="religious_requirements"
                      defaultValue={getFieldValue('religious_requirements')}
                      placeholder="Any religious preferences or requirements"
                      maxLength={500}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Medical Information Tab */}
              <TabsContent value="medical" className="space-y-4 mt-6">
                <div className="bg-muted/50 p-4 rounded-lg border border-border mb-4">
                  <p className="text-sm font-medium text-foreground mb-2">
                    Please provide the applicable identification number based on your location:
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside">
                    <li><strong>UK Clients:</strong> NHS Number</li>
                    <li><strong>Spain Clients:</strong> NIE Number (Número de Identidad de Extranjero)</li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FieldLabel htmlFor="nhs_number" fieldName="nhs_number">NHS Number (UK) / NIE Number (Spain)</FieldLabel>
                    <Input 
                      id="nhs_number" 
                      name="nhs_number" 
                      defaultValue={getFieldValue('nhs_number')}
                      placeholder="000 000 0000 or X-1234567-A" 
                      maxLength={20} 
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter NHS (UK) or NIE (Spain)
                    </p>
                  </div>
                  <div>
                    <FieldLabel htmlFor="hospital_number" fieldName="hospital_number">Hospital Number (if applicable)</FieldLabel>
                    <Input 
                      id="hospital_number" 
                      name="hospital_number" 
                      defaultValue={getFieldValue('hospital_number')}
                      maxLength={50} 
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel htmlFor="medical_history" fieldName="medical_history">Medical History / Conditions</FieldLabel>
                  <Textarea 
                    id="medical_history" 
                    name="medical_history"
                    defaultValue={getFieldValue('medical_history')}
                    placeholder="List chronic conditions, diagnoses, medical history..."
                    rows={4}
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="allergies" fieldName="allergies">Allergies & Intolerances</FieldLabel>
                  <Textarea 
                    id="allergies" 
                    name="allergies"
                    defaultValue={getFieldValue('allergies')}
                    placeholder="List all known allergies and intolerances..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FieldLabel htmlFor="mobility_status" fieldName="mobility_status">Mobility Status</FieldLabel>
                    <Select name="mobility_status" defaultValue={getFieldValue('mobility_status')}>
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
                    <FieldLabel htmlFor="dietary_requirements" fieldName="dietary_requirements">Dietary Requirements</FieldLabel>
                    <Input 
                      id="dietary_requirements" 
                      name="dietary_requirements" 
                      defaultValue={getFieldValue('dietary_requirements')}
                      placeholder="e.g., Diabetic, Vegetarian..." 
                      maxLength={255} 
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel htmlFor="communication_needs" fieldName="communication_needs">Communication Needs</FieldLabel>
                  <Textarea 
                    id="communication_needs" 
                    name="communication_needs"
                    defaultValue={getFieldValue('communication_needs')}
                    placeholder="e.g., Hearing impaired, uses sign language, visual aids required..."
                    rows={2}
                  />
                </div>

                <div className="border-t pt-4 mt-4">
                  <h4 className="font-semibold mb-4">GP/Doctor Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FieldLabel htmlFor="gp_name" fieldName="gp_name">Doctor Name</FieldLabel>
                      <Input 
                        id="gp_name" 
                        name="gp_name" 
                        defaultValue={getFieldValue('gp_name')}
                        maxLength={100} 
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor="gp_practice" fieldName="gp_practice">Practice/Clinic Name</FieldLabel>
                      <Input 
                        id="gp_practice" 
                        name="gp_practice" 
                        defaultValue={getFieldValue('gp_practice')}
                        maxLength={150} 
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor="gp_phone" fieldName="gp_phone">Doctor Phone</FieldLabel>
                      <Input 
                        id="gp_phone" 
                        name="gp_phone" 
                        type="tel" 
                        defaultValue={getFieldValue('gp_phone')}
                        maxLength={20} 
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor="gp_address" fieldName="gp_address">Practice Address</FieldLabel>
                      <Input 
                        id="gp_address" 
                        name="gp_address" 
                        defaultValue={getFieldValue('gp_address')}
                        maxLength={255} 
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Care & Support Tab */}
              <TabsContent value="care" className="space-y-4 mt-6">
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-semibold mb-4">Consent for Care</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="consent_for_care" 
                        name="consent_for_care" 
                        defaultChecked={getFieldValue('consent_for_care')}
                      />
                      <FieldLabel htmlFor="consent_for_care" fieldName="consent_for_care">
                        I consent to receive care and support services
                      </FieldLabel>
                    </div>
                    <div>
                      <FieldLabel htmlFor="consent_date" fieldName="consent_date">Date of Consent</FieldLabel>
                      <Input 
                        id="consent_date" 
                        name="consent_date" 
                        type="date" 
                        defaultValue={getFieldValue('consent_date')}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor="safeguarding_concerns" fieldName="safeguarding_concerns">
                        Any Safeguarding Concerns (Self-Reported)
                      </FieldLabel>
                      <Textarea 
                        id="safeguarding_concerns" 
                        name="safeguarding_concerns"
                        defaultValue={getFieldValue('safeguarding_concerns')}
                        placeholder="Please share any concerns you may have..."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Emergency Contacts Tab */}
              <TabsContent value="contacts" className="space-y-6 mt-6">
                <h4 className="font-semibold text-lg">Emergency Contact 1</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FieldLabel htmlFor="emergency_contact_1_name" fieldName="emergency_contact_1_name">Name</FieldLabel>
                    <Input id="emergency_contact_1_name" name="emergency_contact_1_name" defaultValue={getFieldValue('emergency_contact_1_name')} maxLength={100} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="emergency_contact_1_relationship" fieldName="emergency_contact_1_relationship">Relationship</FieldLabel>
                    <Input id="emergency_contact_1_relationship" name="emergency_contact_1_relationship" defaultValue={getFieldValue('emergency_contact_1_relationship')} maxLength={50} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="emergency_contact_1_phone" fieldName="emergency_contact_1_phone">Phone</FieldLabel>
                    <Input id="emergency_contact_1_phone" name="emergency_contact_1_phone" type="tel" defaultValue={getFieldValue('emergency_contact_1_phone')} maxLength={20} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="emergency_contact_1_email" fieldName="emergency_contact_1_email">Email</FieldLabel>
                    <Input id="emergency_contact_1_email" name="emergency_contact_1_email" type="email" defaultValue={getFieldValue('emergency_contact_1_email')} maxLength={255} />
                  </div>
                </div>

                <h4 className="font-semibold text-lg pt-4 border-t">Emergency Contact 2</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FieldLabel htmlFor="emergency_contact_2_name" fieldName="emergency_contact_2_name">Name</FieldLabel>
                    <Input id="emergency_contact_2_name" name="emergency_contact_2_name" defaultValue={getFieldValue('emergency_contact_2_name')} maxLength={100} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="emergency_contact_2_relationship" fieldName="emergency_contact_2_relationship">Relationship</FieldLabel>
                    <Input id="emergency_contact_2_relationship" name="emergency_contact_2_relationship" defaultValue={getFieldValue('emergency_contact_2_relationship')} maxLength={50} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="emergency_contact_2_phone" fieldName="emergency_contact_2_phone">Phone</FieldLabel>
                    <Input id="emergency_contact_2_phone" name="emergency_contact_2_phone" type="tel" defaultValue={getFieldValue('emergency_contact_2_phone')} maxLength={20} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="emergency_contact_2_email" fieldName="emergency_contact_2_email">Email</FieldLabel>
                    <Input id="emergency_contact_2_email" name="emergency_contact_2_email" type="email" defaultValue={getFieldValue('emergency_contact_2_email')} maxLength={255} />
                  </div>
                </div>

                <h4 className="font-semibold text-lg pt-4 border-t">Next of Kin</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FieldLabel htmlFor="next_of_kin_name" fieldName="next_of_kin_name">Name</FieldLabel>
                    <Input id="next_of_kin_name" name="next_of_kin_name" defaultValue={getFieldValue('next_of_kin_name')} maxLength={100} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="next_of_kin_relationship" fieldName="next_of_kin_relationship">Relationship</FieldLabel>
                    <Input id="next_of_kin_relationship" name="next_of_kin_relationship" defaultValue={getFieldValue('next_of_kin_relationship')} maxLength={50} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="next_of_kin_phone" fieldName="next_of_kin_phone">Phone</FieldLabel>
                    <Input id="next_of_kin_phone" name="next_of_kin_phone" type="tel" defaultValue={getFieldValue('next_of_kin_phone')} maxLength={20} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="next_of_kin_email" fieldName="next_of_kin_email">Email</FieldLabel>
                    <Input id="next_of_kin_email" name="next_of_kin_email" type="email" defaultValue={getFieldValue('next_of_kin_email')} maxLength={255} />
                  </div>
                  <div className="col-span-2">
                    <FieldLabel htmlFor="next_of_kin_address" fieldName="next_of_kin_address">Address</FieldLabel>
                    <Input id="next_of_kin_address" name="next_of_kin_address" defaultValue={getFieldValue('next_of_kin_address')} maxLength={255} />
                  </div>
                </div>
              </TabsContent>
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
                        <SelectItem value="nhs">NHS (UK)</SelectItem>
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
                  <h4 className="font-semibold mb-4">Mental Capacity & Consent</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mental_capacity_status">Mental Capacity Status</Label>
                      <Select name="mental_capacity_status">
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Full Capacity</SelectItem>
                          <SelectItem value="impaired">Impaired Capacity</SelectItem>
                          <SelectItem value="lacks">Lacks Capacity</SelectItem>
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
                    <div>
                      <Label htmlFor="lasting_power_of_attorney">Lasting Power of Attorney</Label>
                      <Select name="lasting_power_of_attorney">
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="health_welfare">Health & Welfare</SelectItem>
                          <SelectItem value="property_financial">Property & Financial</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="lpa_contact_details">LPA Contact Details</Label>
                      <Input id="lpa_contact_details" name="lpa_contact_details" placeholder="Name & phone" maxLength={255} />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 mt-4 p-4 bg-muted/30 rounded-lg">
                    <Checkbox id="consent_for_care" name="consent_for_care" />
                    <div className="flex-1">
                      <Label htmlFor="consent_for_care" className="font-medium cursor-pointer">
                        I consent to receive care and treatment
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        By checking this box, I confirm that I consent to the care and treatment outlined
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="consent_date">Consent Date</Label>
                    <Input id="consent_date" name="consent_date" type="date" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
              <Button type="submit" size="lg" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {isVerificationMode ? 'Verifying...' : 'Submitting...'}
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    {isVerificationMode ? 'Confirm & Save Changes' : 'Complete Profile'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ClientOnboarding;