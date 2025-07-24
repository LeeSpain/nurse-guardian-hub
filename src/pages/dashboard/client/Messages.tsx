import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { MessageSquare, Search, Plus, Send } from 'lucide-react';
import Button from '@/components/ui-components/Button';

const Messages: React.FC = () => {
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
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
            <p className="text-teal-600">Communicate with your healthcare providers</p>
          </div>
          <Button variant="client" size="md" icon={<Plus size={16} />}>
            New Message
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
                  placeholder="Search conversations..." 
                  className="pl-10 w-full py-2 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
            <Button variant="client" size="md">
              Search
            </Button>
          </div>
        </div>
        
        {/* Messages List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">Recent Conversations</h3>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-teal-50 rounded-lg">
              <MessageSquare className="text-teal-600 mr-3" size={20} />
              <div className="flex-grow">
                <p className="font-medium text-gray-800">No messages yet</p>
                <p className="text-sm text-gray-600">Start a conversation with your healthcare providers</p>
              </div>
              <Button variant="outline" size="sm">
                Find Providers
              </Button>
            </div>
          </div>
        </div>
        
        {/* Message Composer */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Quick Message</h3>
          
          <div className="space-y-4">
            <select className="w-full py-2 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>Select a provider...</option>
            </select>
            
            <textarea 
              placeholder="Type your message here..."
              className="w-full py-2 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              rows={4}
            />
            
            <Button variant="client" size="md" icon={<Send size={16} />} disabled>
              Send Message
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

export default Messages;