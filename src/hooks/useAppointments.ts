import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';

export interface Appointment {
  id: string;
  client_id: string;
  nurse_id: string;
  title: string;
  description?: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  duration_minutes?: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  service_type: string;
  address: string;
  hourly_rate?: number;
  total_cost?: number;
  special_instructions?: string;
  cancellation_reason?: string;
  created_at: string;
  updated_at: string;
}

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const fetchAppointments = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .or(`client_id.eq.${user.id},nurse_id.eq.${user.id}`)
        .order('appointment_date', { ascending: true });

      if (error) throw error;

      setAppointments((data || []) as Appointment[]);
    } catch (error: any) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async (appointmentData: Partial<Appointment>) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([appointmentData as any])
        .select()
        .single();

      if (error) throw error;

      setAppointments(prev => [...prev, data as Appointment]);
      toast.success('Appointment created successfully');
      return { data, error: null };
    } catch (error: any) {
      console.error('Error creating appointment:', error);
      toast.error('Failed to create appointment');
      return { data: null, error: error.message };
    }
  };

  const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setAppointments(prev => 
        prev.map(apt => apt.id === id ? { ...apt, ...data } as Appointment : apt)
      );
      toast.success('Appointment updated successfully');
      return { data, error: null };
    } catch (error: any) {
      console.error('Error updating appointment:', error);
      toast.error('Failed to update appointment');
      return { data: null, error: error.message };
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const upcomingAppointments = appointments.filter(apt => {
    const appointmentDate = new Date(`${apt.appointment_date}T${apt.start_time}`);
    return appointmentDate >= new Date() && apt.status !== 'cancelled';
  });

  const pastAppointments = appointments.filter(apt => {
    const appointmentDate = new Date(`${apt.appointment_date}T${apt.start_time}`);
    return appointmentDate < new Date() || apt.status === 'completed';
  });

  return {
    appointments,
    upcomingAppointments,
    pastAppointments,
    loading,
    createAppointment,
    updateAppointment,
    refetch: fetchAppointments
  };
};