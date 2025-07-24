import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { useMessages } from '@/hooks/useMessages';

export const useRealtimeMessages = () => {
  const { user } = useUser();
  const { refetch } = useMessages();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!user) return;

    console.log('Setting up realtime connection for messages');

    // Subscribe to message changes
    const messageChannel = supabase
      .channel('message-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `recipient_id=eq.${user.id}`
        },
        (payload) => {
          console.log('New message received:', payload);
          refetch(); // Refresh messages list
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `recipient_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Message updated:', payload);
          refetch(); // Refresh messages list
        }
      )
      .subscribe((status) => {
        console.log('Message subscription status:', status);
        setIsConnected(status === 'SUBSCRIBED');
      });

    // Also subscribe to messages where user is sender (for read receipts, etc.)
    const senderChannel = supabase
      .channel('sender-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `sender_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Sent message updated:', payload);
          refetch();
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up realtime subscriptions');
      supabase.removeChannel(messageChannel);
      supabase.removeChannel(senderChannel);
      setIsConnected(false);
    };
  }, [user, refetch]);

  return { isConnected };
};