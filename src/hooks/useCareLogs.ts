import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useOrganization } from './useOrganization';

interface CareLog {
  id: string;
  client_id: string;
  client_name: string;
  staff_member_id: string;
  staff_name: string;
  category: string;
  content: string;
  log_date: string;
  log_time: string;
  created_at: string;
  attachments?: any[];
}

interface CareLogStats {
  weeklyLogs: number;
  clientsLogged: number;
  incidents: number;
}

export const useCareLogs = () => {
  const [careLogs, setCareLogs] = useState<CareLog[]>([]);
  const [stats, setStats] = useState<CareLogStats>({
    weeklyLogs: 0,
    clientsLogged: 0,
    incidents: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { organization } = useOrganization();

  const fetchCareLogs = async () => {
    if (!organization?.id) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch care logs with client and staff details
      const { data: logsData, error: logsError } = await supabase
        .from('care_logs')
        .select(`
          *,
          profiles!care_logs_client_id_fkey (
            first_name,
            last_name
          ),
          staff_members!care_logs_staff_member_id_fkey (
            profiles (
              first_name,
              last_name
            )
          )
        `)
        .order('log_date', { ascending: false })
        .order('log_time', { ascending: false })
        .limit(50);

      if (logsError) throw logsError;

      const formattedLogs: CareLog[] = (logsData || []).map((log: any) => ({
        id: log.id,
        client_id: log.client_id,
        client_name: `${log.profiles?.first_name || ''} ${log.profiles?.last_name || ''}`.trim(),
        staff_member_id: log.staff_member_id,
        staff_name: `${log.staff_members?.profiles?.first_name || ''} ${log.staff_members?.profiles?.last_name || ''}`.trim(),
        category: log.category || 'General',
        content: log.content,
        log_date: log.log_date,
        log_time: log.log_time,
        created_at: log.created_at,
        attachments: log.attachments
      }));

      setCareLogs(formattedLogs);

      // Calculate stats
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const weeklyLogs = formattedLogs.filter(
        log => new Date(log.log_date) >= oneWeekAgo
      ).length;

      const uniqueClients = new Set(
        formattedLogs
          .filter(log => new Date(log.log_date) >= oneWeekAgo)
          .map(log => log.client_id)
      );

      const incidents = formattedLogs.filter(
        log => log.category === 'Incident' && new Date(log.log_date) >= oneWeekAgo
      ).length;

      setStats({
        weeklyLogs,
        clientsLogged: uniqueClients.size,
        incidents
      });

      // Set up realtime subscription
      const channel = supabase
        .channel('care-logs-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'care_logs'
          },
          () => {
            fetchCareLogs();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (err: any) {
      console.error('Error fetching care logs:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createCareLog = async (logData: {
    client_id: string;
    staff_member_id: string;
    category: string;
    content: string;
    log_date: string;
    log_time: string;
  }) => {
    try {
      const { error } = await supabase
        .from('care_logs')
        .insert([logData]);

      if (error) throw error;
      await fetchCareLogs();
      return { success: true };
    } catch (err: any) {
      console.error('Error creating care log:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    const cleanup = fetchCareLogs();
    return () => {
      cleanup?.then(unsub => unsub?.());
    };
  }, [organization?.id]);

  return { careLogs, stats, loading, error, createCareLog, refetch: fetchCareLogs };
};
