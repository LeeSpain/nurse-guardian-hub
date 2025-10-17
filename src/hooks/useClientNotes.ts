import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useOrganization } from '@/hooks/useOrganization';

export type NoteType = 'general' | 'medical' | 'incident' | 'communication' | 'care_update' | 'assessment' | 'complaint' | 'safeguarding';

export interface ClientNote {
  id: string;
  client_id: string;
  organization_id: string;
  title: string;
  content: string;
  note_type: NoteType;
  is_confidential: boolean;
  attachments: any[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

export const useClientNotes = (clientId?: string) => {
  const [notes, setNotes] = useState<ClientNote[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { organization } = useOrganization();

  const fetchNotes = async () => {
    if (!organization?.id || !clientId) {
      setNotes([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('client_notes')
        .select('*')
        .eq('client_id', clientId)
        .eq('organization_id', organization.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes((data || []) as ClientNote[]);
    } catch (error: any) {
      toast({
        title: "Error loading notes",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (noteData: Omit<ClientNote, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
    if (!organization?.id) return;

    try {
      const { error } = await supabase
        .from('client_notes')
        .insert([{
          ...noteData,
          organization_id: organization.id,
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Note added successfully",
      });

      await fetchNotes();
    } catch (error: any) {
      toast({
        title: "Error creating note",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateNote = async (id: string, updates: Partial<ClientNote>) => {
    try {
      const { error } = await supabase
        .from('client_notes')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Note updated successfully",
      });

      await fetchNotes();
    } catch (error: any) {
      toast({
        title: "Error updating note",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const { error } = await supabase
        .from('client_notes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Note deleted successfully",
      });

      await fetchNotes();
    } catch (error: any) {
      toast({
        title: "Error deleting note",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchNotes();

    if (!clientId || !organization?.id) return;

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`client_notes_${clientId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'client_notes',
          filter: `client_id=eq.${clientId}`,
        },
        () => {
          fetchNotes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [clientId, organization?.id]);

  return {
    notes,
    loading,
    createNote,
    updateNote,
    deleteNote,
    refetch: fetchNotes,
  };
};
