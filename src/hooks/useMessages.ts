import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  message_type: 'text' | 'file';
  file_url?: string;
  appointment_id?: string;
  is_read: boolean;
  read_at?: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  last_message?: Message;
  unread_count: number;
}

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const fetchConversations = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group messages by conversation
      const conversationMap = new Map();
      data?.forEach(message => {
        if (!conversationMap.has(message.conversation_id)) {
          conversationMap.set(message.conversation_id, {
            id: message.conversation_id,
            participants: [message.sender_id, message.recipient_id],
            messages: [],
            unread_count: 0
          });
        }
        conversationMap.get(message.conversation_id).messages.push(message);
        
        if (!message.is_read && message.recipient_id === user.id) {
          conversationMap.get(message.conversation_id).unread_count++;
        }
      });

      const conversationsArray = Array.from(conversationMap.values()).map(conv => ({
        ...conv,
        last_message: conv.messages[0]
      }));

      setConversations(conversationsArray);
      setMessages((data || []) as Message[]);
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (recipientId: string, content: string, appointmentId?: string) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const conversationId = [user.id, recipientId].sort().join('-');
      
      const { data, error } = await supabase
        .from('messages')
        .insert([{
          conversation_id: conversationId,
          sender_id: user.id,
          recipient_id: recipientId,
          content,
          appointment_id: appointmentId,
          message_type: 'text'
        }])
        .select()
        .single();

      if (error) throw error;

      setMessages(prev => [data as Message, ...prev]);
      await fetchConversations(); // Refresh conversations
      toast.success('Message sent');
      return { data, error: null };
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      return { data: null, error: error.message };
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ 
          is_read: true, 
          read_at: new Date().toISOString() 
        })
        .eq('id', messageId);

      if (error) throw error;

      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, is_read: true, read_at: new Date().toISOString() }
            : msg
        )
      );
    } catch (error: any) {
      console.error('Error marking message as read:', error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [user]);

  return {
    messages,
    conversations,
    loading,
    sendMessage,
    markAsRead,
    refetch: fetchConversations
  };
};