import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { Users, Search, Plus, MessageSquare } from 'lucide-react';
import Button from '@/components/ui-components/Button';

const Clients: React.FC = () => {
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
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Clients</h1>
            <p className="text-purple-600">Manage your client relationships</p>
          </div>
          <Button variant="nurse" size="md" icon={<Plus size={16} />}>
            Add Client
          </Button>
        </div>
        
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                <input 
                  type="text" 
                  placeholder="Search clients by name or condition..." 
                  className="pl-10 w-full py-2 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <Button variant="nurse" size="md">
              Search
            </Button>
          </div>
        </div>
        
        {/* Clients List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Your Clients</h3>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-purple-50 rounded-lg">
              <Users className="text-purple-600 mr-3" size={20} />
              <div className="flex-grow">
                <p className="font-medium text-gray-800">No clients yet</p>
                <p className="text-sm text-gray-600">Start building your client base</p>
              </div>
              <Button variant="outline" size="sm">
                Find Clients
              </Button>
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

export default Clients;