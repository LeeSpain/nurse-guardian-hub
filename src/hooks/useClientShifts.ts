import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { StaffShift } from '@/hooks/useStaffShifts';

export const useClientShifts = (clientId?: string, organizationId?: string) => {
  const [shifts, setShifts] = useState<StaffShift[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchShifts = async () => {
    if (!clientId) {
      setShifts([]);
      setLoading(false);
      return;
    }

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
        .eq('client_id', clientId)
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

  const getNext7DaysShifts = () => {
    const today = new Date();
    const next7Days = new Date();
    next7Days.setDate(today.getDate() + 7);
    
    return shifts.filter(shift => {
      const shiftDate = new Date(shift.shift_date);
      return shiftDate >= today && shiftDate <= next7Days;
    });
  };

  const getTodayShifts = () => {
    const today = new Date().toISOString().split('T')[0];
    return shifts.filter(shift => shift.shift_date === today);
  };

  const getThisWeekStats = () => {
    const next7Shifts = getNext7DaysShifts();
    const totalHours = next7Shifts.reduce((sum, shift) => {
      const start = new Date(`2000-01-01T${shift.start_time}`);
      const end = new Date(`2000-01-01T${shift.end_time}`);
      const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      const breakHours = (shift.break_minutes || 0) / 60;
      return sum + (hours - breakHours);
    }, 0);

    return {
      count: next7Shifts.length,
      totalHours: Math.round(totalHours * 10) / 10,
    };
  };

  useEffect(() => {
    fetchShifts();
  }, [clientId, organizationId]);

  return {
    shifts,
    loading,
    getNext7DaysShifts,
    getTodayShifts,
    getThisWeekStats,
    refetch: fetchShifts,
  };
};
