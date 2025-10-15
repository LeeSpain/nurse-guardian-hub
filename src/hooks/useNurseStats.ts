import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';

export interface NurseStats {
  activeClients: number;
  upcomingAppointments: number;
  profileCompletion: number;
  monthlyEarnings: number;
  totalAppointments: number;
  averageRating: number;
}

export const useNurseStats = () => {
  const [stats, setStats] = useState<NurseStats>({
    activeClients: 0,
    upcomingAppointments: 0,
    profileCompletion: 0,
    monthlyEarnings: 0,
    totalAppointments: 0,
    averageRating: 0
  });
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const calculateProfileCompletion = async (userId: string) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      const { data: nurseProfile } = await supabase
        .from('nurse_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!profile || !nurseProfile) return 0;

      const requiredFields = [
        profile.first_name,
        profile.last_name,
        profile.email,
        profile.phone,
        profile.address,
        profile.city,
        profile.state,
        nurseProfile.license_number,
        nurseProfile.license_state,
        nurseProfile.license_expiry,
        nurseProfile.specialties?.length > 0,
        nurseProfile.years_experience,
        nurseProfile.hourly_rate,
        nurseProfile.bio
      ];

      const completedFields = requiredFields.filter(Boolean).length;
      return Math.round((completedFields / requiredFields.length) * 100);
    } catch (error) {
      console.error('Error calculating profile completion:', error);
      return 0;
    }
  };

  const fetchStats = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Get appointments
      const { data: appointments } = await supabase
        .from('appointments')
        .select('*')
        .eq('nurse_id', user.id);

      // Get unique active clients (clients with confirmed or pending appointments)
      const activeClientIds = new Set(
        appointments
          ?.filter(apt => apt.status === 'confirmed' || apt.status === 'pending')
          .map(apt => apt.client_id) || []
      );

      // Get upcoming appointments
      const now = new Date();
      const upcomingAppointments = appointments?.filter(apt => {
        const appointmentDate = new Date(`${apt.appointment_date}T${apt.start_time}`);
        return appointmentDate > now && (apt.status === 'confirmed' || apt.status === 'pending');
      }).length || 0;

      // Calculate monthly earnings (current month)
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      const monthlyEarnings = appointments
        ?.filter(apt => {
          const aptDate = new Date(apt.appointment_date);
          return aptDate.getMonth() === currentMonth && 
                 aptDate.getFullYear() === currentYear && 
                 apt.status === 'completed' &&
                 apt.total_cost;
        })
        .reduce((sum, apt) => sum + (apt.total_cost || 0), 0) || 0;

      // Get profile completion
      const profileCompletion = await calculateProfileCompletion(user.id);

      // Get reviews for average rating
      const { data: reviews } = await supabase
        .from('reviews')
        .select('rating')
        .eq('nurse_id', user.id);

      const averageRating = reviews && reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;

      setStats({
        activeClients: activeClientIds.size,
        upcomingAppointments,
        profileCompletion,
        monthlyEarnings,
        totalAppointments: appointments?.length || 0,
        averageRating: Math.round(averageRating * 10) / 10
      });
    } catch (error) {
      console.error('Error fetching nurse stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  return {
    stats,
    loading,
    refetch: fetchStats
  };
};