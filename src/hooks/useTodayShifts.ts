import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useOrganization } from './useOrganization';
import { format } from 'date-fns';

interface TodayShift {
  id: string;
  staff_name: string;
  client_name: string;
  start_time: string;
  end_time: string;
  status: string;
}

export const useTodayShifts = () => {
  const [shifts, setShifts] = useState<TodayShift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { organization } = useOrganization();

  const fetchTodayShifts = async () => {
    if (!organization?.id) {
      setShifts([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const today = format(new Date(), 'yyyy-MM-dd');

      const { data: shiftsData, error: shiftsError } = await supabase
        .from('staff_shifts')
        .select(`
          id,
          start_time,
          end_time,
          status,
          staff_members!staff_shifts_staff_member_id_fkey (
            profiles (
              first_name,
              last_name
            )
          ),
          clients!staff_shifts_client_id_fkey (
            first_name,
            last_name
          )
        `)
        .eq('organization_id', organization.id)
        .eq('shift_date', today)
        .order('start_time', { ascending: true })
        .limit(5);

      if (shiftsError) throw shiftsError;

      const formattedShifts: TodayShift[] = (shiftsData || []).map((shift: any) => ({
        id: shift.id,
        staff_name: `${shift.staff_members?.profiles?.first_name || ''} ${shift.staff_members?.profiles?.last_name || ''}`.trim() || 'Unknown Staff',
        client_name: `${shift.clients?.first_name || ''} ${shift.clients?.last_name || ''}`.trim() || 'Unassigned',
        start_time: shift.start_time,
        end_time: shift.end_time,
        status: shift.status || 'scheduled'
      }));

      setShifts(formattedShifts);

      // Set up realtime subscription
      const channel = supabase
        .channel('today-shifts-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'staff_shifts',
            filter: `organization_id=eq.${organization.id}`
          },
          () => {
            fetchTodayShifts();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (err: any) {
      console.error('Error fetching today shifts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cleanup = fetchTodayShifts();
    return () => {
      cleanup?.then(unsub => unsub?.());
    };
  }, [organization?.id]);

  return { shifts, loading, error };
};
