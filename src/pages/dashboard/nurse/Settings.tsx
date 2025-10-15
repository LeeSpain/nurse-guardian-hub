import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { User, Bell, Shield, Save, CreditCard, Building2 } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import ProfileImageUploader from '@/components/ui-components/ProfileImageUploader';
import { useProfile } from '@/hooks/useProfile';
import { useOrganization } from '@/hooks/useOrganization';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const { profile, loading: profileLoading, updateProfile, updateProfileImage } = useProfile();
  const { organization, loading: orgLoading, createOrganization, updateOrganization, refetch } = useOrganization();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingOrg, setIsEditingOrg] = useState(false);
  const [showCreateOrg, setShowCreateOrg] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: ''
  });
  const [orgFormData, setOrgFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    registration_number: ''
  });

  React.useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        zip_code: profile.zip_code || ''
      });
    }
  }, [profile]);

  React.useEffect(() => {
    if (organization) {
      setOrgFormData({
        name: organization.name || '',
        email: organization.email || '',
        phone: organization.phone || '',
        address: organization.address || '',
        registration_number: organization.registration_number || ''
      });
    }
  }, [organization]);
  
  if (isLoading || profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-purple-600 border-r-transparent border-b-purple-600 border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!isAuthenticated || user?.role !== UserRole.NURSE) {
    return <Navigate to="/login" />;
  }

  const handleSave = async () => {
    await updateProfile(formData);
    setIsEditing(false);
  };

  const handleImageUpload = (url: string) => {
    updateProfileImage(url);
  };

  const handleOrgSave = async () => {
    if (!organization?.id) return;
    try {
      await updateOrganization(organization.id, orgFormData);
      setIsEditingOrg(false);
      toast({
        title: 'Success',
        description: 'Organization details updated successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update organization details',
        variant: 'destructive'
      });
    }
  };

  const handleCreateOrg = async () => {
    if (!orgFormData.name.trim()) {
      toast({
        title: 'Error',
        description: 'Organization name is required',
        variant: 'destructive'
      });
      return;
    }
    try {
      await createOrganization(orgFormData);
      setShowCreateOrg(false);
      toast({
        title: 'Success',
        description: 'Organization created successfully'
      });
      await refetch();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create organization',
        variant: 'destructive'
      });
    }
  };
  
  return (
    <div className="container mx-auto p-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-purple-600">Manage your account and preferences</p>
        </div>
        
        {/* Profile Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <User className="text-purple-600 mr-3" size={20} />
              <h3 className="font-semibold text-gray-800">Profile Information</h3>
            </div>
            <Button 
              variant={isEditing ? "nurse" : "outline"} 
              size="sm"
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              icon={isEditing ? <Save size={16} /> : undefined}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </div>

          <div className="mb-6">
            <Label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</Label>
            <ProfileImageUploader
              currentImageUrl={profile?.profile_image_url}
              onImageUpdated={handleImageUpload}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">First Name</Label>
              <Input
                type="text" 
                value={formData.first_name} 
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">Last Name</Label>
              <Input
                type="text" 
                value={formData.last_name} 
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">Phone</Label>
              <Input
                type="tel" 
                value={formData.phone} 
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">Email</Label>
              <Input
                type="email" 
                value={profile?.email || ''} 
                disabled
              />
            </div>
            <div className="md:col-span-2">
              <Label className="block text-sm font-medium text-gray-700 mb-2">Address</Label>
              <Input
                type="text" 
                value={formData.address} 
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled={!isEditing}
                placeholder="123 Main St"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">City</Label>
              <Input
                type="text" 
                value={formData.city} 
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                disabled={!isEditing}
                placeholder="City"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">State</Label>
              <Input
                type="text" 
                value={formData.state} 
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                disabled={!isEditing}
                placeholder="State"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</Label>
              <Input
                type="text" 
                value={formData.zip_code} 
                onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                disabled={!isEditing}
                placeholder="12345"
              />
            </div>
          </div>
        </div>

        {/* Organization Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Building2 className="text-purple-600 mr-3" size={20} />
              <div>
                <h3 className="font-semibold text-gray-800">Organization Details</h3>
                <p className="text-sm text-gray-500">Manage your organization for invoicing and communications</p>
              </div>
            </div>
            {organization && !isEditingOrg && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditingOrg(true)}
              >
                Edit
              </Button>
            )}
          </div>

          {orgLoading ? (
            <p className="text-sm text-gray-500">Loading organization details...</p>
          ) : !organization ? (
            showCreateOrg ? (
              <div className="space-y-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Organization Name *</Label>
                  <Input
                    type="text"
                    value={orgFormData.name}
                    onChange={(e) => setOrgFormData({ ...orgFormData, name: e.target.value })}
                    placeholder="Your Organization Name"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Business Email</Label>
                  <Input
                    type="email"
                    value={orgFormData.email}
                    onChange={(e) => setOrgFormData({ ...orgFormData, email: e.target.value })}
                    placeholder="contact@organization.com"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Business Phone</Label>
                  <Input
                    type="tel"
                    value={orgFormData.phone}
                    onChange={(e) => setOrgFormData({ ...orgFormData, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Business Address</Label>
                  <Input
                    type="text"
                    value={orgFormData.address}
                    onChange={(e) => setOrgFormData({ ...orgFormData, address: e.target.value })}
                    placeholder="123 Main Street, City, State 12345"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Registration/License Number</Label>
                  <Input
                    type="text"
                    value={orgFormData.registration_number}
                    onChange={(e) => setOrgFormData({ ...orgFormData, registration_number: e.target.value })}
                    placeholder="License or registration number"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleCreateOrg} variant="nurse">Create Organization</Button>
                  <Button onClick={() => setShowCreateOrg(false)} variant="outline">Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <p className="text-gray-600">
                  No organization found. Create one to enable invoicing, official communications, and professional documentation.
                </p>
                <Button onClick={() => setShowCreateOrg(true)} variant="nurse">
                  <Building2 className="mr-2" size={16} />
                  Create My Organization
                </Button>
              </div>
            )
          ) : isEditingOrg ? (
            <div className="space-y-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</Label>
                <Input
                  type="text"
                  value={orgFormData.name}
                  onChange={(e) => setOrgFormData({ ...orgFormData, name: e.target.value })}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Business Email</Label>
                <Input
                  type="email"
                  value={orgFormData.email}
                  onChange={(e) => setOrgFormData({ ...orgFormData, email: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-1">Used for invoices and official communications</p>
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Business Phone</Label>
                <Input
                  type="tel"
                  value={orgFormData.phone}
                  onChange={(e) => setOrgFormData({ ...orgFormData, phone: e.target.value })}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Business Address</Label>
                <Input
                  type="text"
                  value={orgFormData.address}
                  onChange={(e) => setOrgFormData({ ...orgFormData, address: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-1">Appears on invoices and official documents</p>
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Registration/License Number</Label>
                <Input
                  type="text"
                  value={orgFormData.registration_number}
                  onChange={(e) => setOrgFormData({ ...orgFormData, registration_number: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleOrgSave} variant="nurse" icon={<Save size={16} />}>
                  Save Changes
                </Button>
                <Button onClick={() => setIsEditingOrg(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium text-gray-500 mb-1">Organization Name</Label>
                <p className="text-gray-800">{organization.name}</p>
              </div>
              {organization.email && (
                <div>
                  <Label className="block text-sm font-medium text-gray-500 mb-1">Business Email</Label>
                  <p className="text-gray-800">{organization.email}</p>
                </div>
              )}
              {organization.phone && (
                <div>
                  <Label className="block text-sm font-medium text-gray-500 mb-1">Business Phone</Label>
                  <p className="text-gray-800">{organization.phone}</p>
                </div>
              )}
              {organization.address && (
                <div className="md:col-span-2">
                  <Label className="block text-sm font-medium text-gray-500 mb-1">Business Address</Label>
                  <p className="text-gray-800">{organization.address}</p>
                </div>
              )}
              {organization.registration_number && (
                <div>
                  <Label className="block text-sm font-medium text-gray-500 mb-1">Registration Number</Label>
                  <p className="text-gray-800">{organization.registration_number}</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center mb-4">
            <Bell className="text-purple-600 mr-3" size={20} />
            <h3 className="font-semibold text-gray-800">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Email notifications</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">SMS notifications</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Push notifications</span>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
        
        {/* Payment & Integrations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center mb-4">
            <CreditCard className="text-purple-600 mr-3" size={20} />
            <h3 className="font-semibold text-gray-800">Payment & Integrations</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">Stripe Integration</Label>
              <Alert>
                <AlertDescription>
                  Stripe is not configured yet. Contact your administrator to add the Stripe API key to enable payment processing for appointments.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <Shield className="text-purple-600 mr-3" size={20} />
            <h3 className="font-semibold text-gray-800">Privacy & Security</h3>
          </div>
          
          <div className="space-y-4">
            <Button variant="outline" size="sm" fullWidth className="justify-start">
              Change Password
            </Button>
            <Button variant="outline" size="sm" fullWidth className="justify-start">
              Two-Factor Authentication
            </Button>
            <Button variant="outline" size="sm" fullWidth className="justify-start">
              Privacy Settings
            </Button>
          </div>
        </div>
      </div>
  );
};

export default Settings;