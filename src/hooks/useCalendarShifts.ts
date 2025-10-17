import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface CalendarShift {
  id: string;
  shift_date: string;
  start_time: string;
  end_time: string;
  status: string;
  staff_member_id: string;
  client_id: string;
  break_minutes: number;
  notes: string;
  staff_member?: {
    profiles?: {
      first_name: string;
      last_name: string;
    };
  };
  client?: {
    first_name: string;
    last_name: string;
  };
}

interface UseCalendarShiftsParams {
  startDate: Date;
  endDate: Date;
  organizationId?: string;
  clientId?: string;
  staffId?: string;
  status?: string;
}

export const useCalendarShifts = ({
  startDate,
  endDate,
  organizationId,
  clientId,
  staffId,
  status,
}: UseCalendarShiftsParams) => {
  const [shifts, setShifts] = useState<CalendarShift[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchShifts = async () => {
    if (!organizationId) {
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
            profiles(
              first_name,
              last_name
            )
          ),
          client:clients!staff_shifts_client_id_fkey(
            first_name,
            last_name
          )
        `)
        .eq('organization_id', organizationId)
        .gte('shift_date', format(startDate, 'yyyy-MM-dd'))
        .lte('shift_date', format(endDate, 'yyyy-MM-dd'))
        .order('shift_date', { ascending: true })
        .order('start_time', { ascending: true });

      if (clientId) {
        query = query.eq('client_id', clientId);
      }

      if (staffId) {
        query = query.eq('staff_member_id', staffId);
      }

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) throw error;
      setShifts(data || []);
    } catch (error: any) {
      console.error('Error fetching calendar shifts:', error);
      toast({
        title: "Error loading shifts",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, [startDate, endDate, organizationId, clientId, staffId, status]);

  return {
    shifts,
    loading,
    refetch: fetchShifts,
  };
};
