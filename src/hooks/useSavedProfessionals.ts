import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';

export interface SavedProfessional {
  id: string;
  client_id: string;
  nurse_id: string;
  notes?: string;
  created_at: string;
  // From joined tables
  nurse_profile?: {
    first_name: string;
    last_name: string;
    specialties: string[];
    hourly_rate?: number;
    city?: string;
    state?: string;
    profile_image_url?: string;
    is_verified: boolean;
  };
}

export const useSavedProfessionals = () => {
  const [savedProfessionals, setSavedProfessionals] = useState<SavedProfessional[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const fetchSavedProfessionals = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('saved_professionals')
        .select(`
          *,
          nurse_profiles!nurse_profiles_user_id_fkey(
            specialties,
            hourly_rate,
            profiles!nurse_profiles_profile_id_fkey(
              first_name,
              last_name,
              city,
              state,
              profile_image_url,
              is_verified
            )
          )
        `)
        .eq('client_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Flatten the data structure
      const flattenedData = data?.map((saved: any) => ({
        ...saved,
        nurse_profile: {
          ...saved.nurse_profiles?.profiles,
          specialties: saved.nurse_profiles?.specialties || [],
          hourly_rate: saved.nurse_profiles?.hourly_rate
        },
        nurse_profiles: undefined
      })) || [];

      setSavedProfessionals(flattenedData);
    } catch (error: any) {
      console.error('Error fetching saved professionals:', error);
      toast.error('Failed to load saved professionals');
    } finally {
      setLoading(false);
    }
  };

  const saveProfessional = async (nurseId: string, notes?: string) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('saved_professionals')
        .insert([{
          client_id: user.id,
          nurse_id: nurseId,
          notes
        }])
        .select()
        .single();

      if (error) throw error;

      await fetchSavedProfessionals(); // Refresh the list
      toast.success('Professional saved to your favorites');
      return { data, error: null };
    } catch (error: any) {
      console.error('Error saving professional:', error);
      toast.error('Failed to save professional');
      return { data: null, error: error.message };
    }
  };

  const unsaveProfessional = async (nurseId: string) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('saved_professionals')
        .delete()
        .eq('client_id', user.id)
        .eq('nurse_id', nurseId);

      if (error) throw error;

      setSavedProfessionals(prev => 
        prev.filter(saved => saved.nurse_id !== nurseId)
      );
      toast.success('Professional removed from favorites');
      return { error: null };
    } catch (error: any) {
      console.error('Error removing saved professional:', error);
      toast.error('Failed to remove professional');
      return { error: error.message };
    }
  };

  const isNurseSaved = (nurseId: string) => {
    return savedProfessionals.some(saved => saved.nurse_id === nurseId);
  };

  useEffect(() => {
    fetchSavedProfessionals();
  }, [user]);

  return {
    savedProfessionals,
    loading,
    saveProfessional,
    unsaveProfessional,
    isNurseSaved,
    refetch: fetchSavedProfessionals
  };
};