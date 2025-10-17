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
  confirmation_status?: string;
  confirmed_at?: string;
  confirmed_by?: string;
  decline_reason?: string;
  staff_member?: {
    first_name: string | null;
    last_name: string | null;
    email?: string | null;
    job_title?: string | null;
  };
  client?: {
    first_name: string | null;
    last_name: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
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
            first_name,
            last_name,
            email,
            job_title
          ),
          client:clients!staff_shifts_client_id_fkey(
            first_name,
            last_name,
            address,
            city,
            state
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

  const confirmShift = async (shiftId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('staff_shifts')
        .update({
          confirmation_status: 'accepted',
          confirmed_at: new Date().toISOString(),
          confirmed_by: user.id,
        })
        .eq('id', shiftId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Shift confirmed successfully",
      });

      await fetchShifts();
    } catch (error: any) {
      toast({
        title: "Error confirming shift",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const declineShift = async (shiftId: string, reason?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('staff_shifts')
        .update({
          confirmation_status: 'declined',
          confirmed_at: new Date().toISOString(),
          confirmed_by: user.id,
          decline_reason: reason || null,
        })
        .eq('id', shiftId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Shift declined successfully",
      });

      await fetchShifts();
    } catch (error: any) {
      toast({
        title: "Error declining shift",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const getMyPendingShifts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Get staff member ID for current user
      const { data: staffMember } = await supabase
        .from('staff_members')
        .select('id')
        .eq('profile_id', user.id)
        .single();

      if (!staffMember) return [];

      const { data, error } = await supabase
        .from('staff_shifts')
        .select(`
          *,
          staff_member:staff_members(
            first_name,
            last_name,
            email,
            job_title
          ),
          client:clients!staff_shifts_client_id_fkey(
            first_name,
            last_name,
            address,
            city,
            state
          )
        `)
        .eq('staff_member_id', staffMember.id)
        .eq('confirmation_status', 'pending')
        .order('shift_date', { ascending: true })
        .order('start_time', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      toast({
        title: "Error loading pending shifts",
        description: error.message,
        variant: "destructive",
      });
      return [];
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
    confirmShift,
    declineShift,
    getMyPendingShifts,
    refetch: fetchShifts,
  };
};