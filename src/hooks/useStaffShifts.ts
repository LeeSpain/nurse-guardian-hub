import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface StaffShift {
  id: string;
  organization_id: string;
  staff_member_id: string;
  client_id: string | null;
  appointment_id: string | null;
  shift_date: string;
  start_time: string;
  end_time: string;
  break_minutes: number;
  status: string;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  staff_member?: {
    profile?: {
      first_name: string | null;
      last_name: string | null;
    };
  };
  client?: {
    first_name: string | null;
    last_name: string | null;
  };
}

export const useStaffShifts = (organizationId?: string) => {
  const [shifts, setShifts] = useState<StaffShift[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchShifts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('staff_shifts')
        .select(`
          *,
          staff_member:staff_members(
            profile:profiles(
              first_name,
              last_name
            )
          ),
          client:profiles!staff_shifts_client_id_fkey(
            first_name,
            last_name
          )
        `)
        .order('shift_date', { ascending: true })
        .order('start_time', { ascending: true });

      if (organizationId) {
        query = query.eq('organization_id', organizationId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setShifts(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading shifts",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createShift = async (shiftData: Omit<Partial<StaffShift>, 'id' | 'created_at' | 'updated_at'> & {
    organization_id: string;
    staff_member_id: string;
    shift_date: string;
    start_time: string;
    end_time: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('staff_shifts')
        .insert([shiftData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Shift created successfully",
      });

      await fetchShifts();
      return data;
    } catch (error: any) {
      toast({
        title: "Error creating shift",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateShift = async (id: string, updates: Partial<StaffShift>) => {
    try {
      const { error } = await supabase
        .from('staff_shifts')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Shift updated successfully",
      });

      await fetchShifts();
    } catch (error: any) {
      toast({
        title: "Error updating shift",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteShift = async (id: string) => {
    try {
      const { error } = await supabase
        .from('staff_shifts')
        .update({ status: 'cancelled' })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Shift cancelled successfully",
      });

      await fetchShifts();
    } catch (error: any) {
      toast({
        title: "Error cancelling shift",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchShifts();
  }, [organizationId]);

  return {
    shifts,
    loading,
    createShift,
    updateShift,
    deleteShift,
    refetch: fetchShifts,
  };
};