import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { User, Bell, Shield, Save, CreditCard } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import ProfileImageUploader from '@/components/ui-components/ProfileImageUploader';
import { useProfile } from '@/hooks/useProfile';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Settings: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const { profile, loading: profileLoading, updateProfile, updateProfileImage } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: ''
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
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
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
    </div>
  );
};

export default Settings;