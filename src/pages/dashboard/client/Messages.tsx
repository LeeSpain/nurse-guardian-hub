import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { MessageSquare, Search, Plus, Send, User } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { useMessages } from '@/hooks/useMessages';
import { useRealtimeMessages } from '@/hooks/useRealtimeMessages';
import MessageComposer from '@/components/messaging/MessageComposer';
import { formatDistanceToNow } from 'date-fns';

const Messages: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const { conversations, loading: messagesLoading, refetch } = useMessages();
  const { isConnected } = useRealtimeMessages();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
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
          <div className="flex items-center gap-4">
            {/* Connection Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600">
                {isConnected ? 'Connected' : 'Connecting...'}
              </span>
            </div>
            <Button variant="client" size="md" icon={<Plus size={16} />}>
              New Message
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search conversations..." 
                  className="pl-10 w-full py-2 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Conversations</h3>
              
              {messagesLoading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-2 border-t-teal-500 border-r-transparent border-b-teal-500 border-l-transparent rounded-full animate-spin mx-auto"></div>
                </div>
              ) : conversations.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="text-gray-400 mx-auto mb-3" size={40} />
                  <p className="text-gray-600">No conversations yet</p>
                  <p className="text-sm text-gray-500">Start messaging with healthcare providers</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedConversation === conversation.id 
                          ? 'bg-teal-50 border border-teal-200' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User size={20} className="text-gray-600" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="font-medium text-gray-800 truncate">Healthcare Provider</p>
                          {conversation.last_message && (
                            <p className="text-sm text-gray-600 truncate">
                              {conversation.last_message.content}
                            </p>
                          )}
                          {conversation.last_message && (
                            <p className="text-xs text-gray-500">
                              {formatDistanceToNow(new Date(conversation.last_message.created_at), { addSuffix: true })}
                            </p>
                          )}
                        </div>
                        {conversation.unread_count > 0 && (
                          <div className="bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unread_count}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {selectedConversation ? (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Healthcare Provider</h3>
                  
                  {/* Messages */}
                  <div className="h-96 border border-gray-200 rounded-lg p-4 mb-4 overflow-y-auto">
                    <div className="text-center text-gray-500 py-8">
                      Select a conversation to view messages
                    </div>
                  </div>

                  {/* Message Composer */}
                  <MessageComposer
                    recipientId={selectedConversation}
                    onMessageSent={() => refetch()}
                    placeholder="Type your message to the healthcare provider..."
                  />
                </div>
              ) : (
                <div className="text-center py-16">
                  <MessageSquare className="text-gray-400 mx-auto mb-4" size={60} />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a conversation from the left to start messaging</p>
                </div>
              )}
            </div>
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