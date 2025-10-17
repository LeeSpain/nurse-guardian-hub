import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useOrganization } from '@/hooks/useOrganization';

export type ReminderType = 'follow_up' | 'medication_review' | 'care_review' | 'appointment' | 'assessment' | 'other';
export type ReminderStatus = 'pending' | 'completed' | 'cancelled' | 'snoozed';
export type ReminderPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface ClientReminder {
  id: string;
  client_id: string;
  organization_id: string;
  title: string;
  description: string | null;
  reminder_date: string;
  reminder_time: string | null;
  reminder_type: ReminderType;
  status: ReminderStatus;
  assigned_to: string | null;
  created_by: string | null;
  completed_at: string | null;
  snoozed_until: string | null;
  priority: ReminderPriority;
  created_at: string;
  updated_at: string;
  assigned_staff?: {
    first_name: string;
    last_name: string;
  };
}

export const useClientReminders = (clientId?: string) => {
  const [reminders, setReminders] = useState<ClientReminder[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { organization } = useOrganization();

  const fetchReminders = async () => {
    if (!organization?.id || !clientId) {
      setReminders([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('client_reminders')
        .select(`
          *,
          assigned_staff:staff_members!client_reminders_assigned_to_fkey(first_name, last_name)
        `)
        .eq('client_id', clientId)
        .eq('organization_id', organization.id)
        .order('reminder_date', { ascending: true });

      if (error) throw error;
      setReminders((data || []) as ClientReminder[]);
    } catch (error: any) {
      toast({
        title: "Error loading reminders",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createReminder = async (reminderData: Omit<ClientReminder, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
    if (!organization?.id) return;

    try {
      const { error } = await supabase
        .from('client_reminders')
        .insert([{
          ...reminderData,
          organization_id: organization.id,
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Reminder created successfully",
      });

      await fetchReminders();
    } catch (error: any) {
      toast({
        title: "Error creating reminder",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateReminder = async (id: string, updates: Partial<ClientReminder>) => {
    try {
      const { error } = await supabase
        .from('client_reminders')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Reminder updated successfully",
      });

      await fetchReminders();
    } catch (error: any) {
      toast({
        title: "Error updating reminder",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const completeReminder = async (id: string) => {
    await updateReminder(id, {
      status: 'completed',
      completed_at: new Date().toISOString(),
    });
  };

  const snoozeReminder = async (id: string, snoozeUntil: string) => {
    await updateReminder(id, {
      status: 'snoozed',
      snoozed_until: snoozeUntil,
    });
  };

  const deleteReminder = async (id: string) => {
    try {
      const { error } = await supabase
        .from('client_reminders')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Reminder deleted successfully",
      });

      await fetchReminders();
    } catch (error: any) {
      toast({
        title: "Error deleting reminder",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchReminders();

    if (!clientId || !organization?.id) return;

    const channel = supabase
      .channel(`client_reminders_${clientId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'client_reminders',
          filter: `client_id=eq.${clientId}`,
        },
        () => {
          fetchReminders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [clientId, organization?.id]);

  return {
    reminders,
    loading,
    createReminder,
    updateReminder,
    completeReminder,
    snoozeReminder,
    deleteReminder,
    refetch: fetchReminders,
  };
};
