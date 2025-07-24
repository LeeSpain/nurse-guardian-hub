import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { User, Bell, Shield, Heart } from 'lucide-react';
import Button from '@/components/ui-components/Button';

const Settings: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-teal-500 border-r-transparent border-b-teal-500 border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!isAuthenticated || user?.role !== UserRole.CLIENT) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-teal-600">Manage your account and preferences</p>
        </div>
        
        {/* Profile Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center mb-4">
            <User className="text-teal-600 mr-3" size={20} />
            <h3 className="font-semibold text-gray-800">Profile Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input 
                type="text" 
                value={user?.firstName || ''} 
                className="w-full py-2 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input 
                type="text" 
                value={user?.lastName || ''} 
                className="w-full py-2 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                readOnly
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                value={user?.email || ''} 
                className="w-full py-2 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                readOnly
              />
            </div>
          </div>
          
          <div className="mt-4">
            <Button variant="client" size="sm">
              Edit Profile
            </Button>
          </div>
        </div>
        
        {/* Health Preferences */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center mb-4">
            <Heart className="text-teal-600 mr-3" size={20} />
            <h3 className="font-semibold text-gray-800">Health Preferences</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
              <select className="w-full py-2 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Provider</label>
              <input 
                type="text" 
                placeholder="Enter your insurance provider" 
                className="w-full py-2 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>
        
        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center mb-4">
            <Bell className="text-teal-600 mr-3" size={20} />
            <h3 className="font-semibold text-gray-800">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Appointment reminders</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Provider messages</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Health tips</span>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </div>
        
        {/* Privacy Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <Shield className="text-teal-600 mr-3" size={20} />
            <h3 className="font-semibold text-gray-800">Privacy & Security</h3>
          </div>
          
          <div className="space-y-4">
            <Button variant="outline" size="sm" fullWidth className="justify-start">
              Change Password
            </Button>
            <Button variant="outline" size="sm" fullWidth className="justify-start">
              Privacy Settings
            </Button>
            <Button variant="outline" size="sm" fullWidth className="justify-start">
              Download My Data
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          <Button variant="outline" as={Link} to="/client/dashboard">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;