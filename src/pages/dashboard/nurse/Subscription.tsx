import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '@/components/ui-components/Button';

const Subscription: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-purple-600 border-r-transparent border-b-purple-600 border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!isAuthenticated || user?.role !== UserRole.NURSE) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Subscription</h1>
          <p className="text-purple-600">Manage your subscription plan</p>
        </div>
        
        {/* Current Plan */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">Current Plan</h3>
          
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="text-purple-600 mr-3" size={20} />
              <div>
                <p className="font-medium text-gray-800">Free Plan</p>
                <p className="text-sm text-gray-600">Basic features included</p>
              </div>
            </div>
            <Button variant="nurse" size="sm" as={Link} to="/nurse/pricing">
              Upgrade Plan
            </Button>
          </div>
        </div>
        
        {/* Plan Features */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">Plan Features</h3>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-3" size={16} />
              <span className="text-gray-700">Basic profile creation</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-3" size={16} />
              <span className="text-gray-700">Limited client connections</span>
            </div>
            <div className="flex items-center">
              <AlertCircle className="text-gray-400 mr-3" size={16} />
              <span className="text-gray-400">Advanced scheduling (Pro only)</span>
            </div>
            <div className="flex items-center">
              <AlertCircle className="text-gray-400 mr-3" size={16} />
              <span className="text-gray-400">Priority support (Pro only)</span>
            </div>
          </div>
        </div>
        
        {/* Billing History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Billing History</h3>
          
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <CreditCard className="text-gray-400 mr-3" size={20} />
            <div>
              <p className="font-medium text-gray-800">No billing history</p>
              <p className="text-sm text-gray-600">You're currently on the free plan</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <Button variant="outline" as={Link} to="/nurse/dashboard">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;