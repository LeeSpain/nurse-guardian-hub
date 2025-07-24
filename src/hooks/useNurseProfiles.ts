import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface NurseProfile {
  id: string;
  user_id: string;
  profile_id: string;
  license_number: string;
  license_state: string;
  license_expiry: string;
  years_experience: number;
  hourly_rate?: number;
  specialties: string[];
  certifications: string[];
  bio?: string;
  availability_schedule?: any;
  insurance_verified: boolean;
  is_background_checked: boolean;
  created_at: string;
  updated_at: string;
  // From joined profile
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  profile_image_url?: string;
  is_verified?: boolean;
}

export const useNurseProfiles = () => {
  const [nurses, setNurses] = useState<NurseProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNurses = async (filters?: {
    specialty?: string;
    location?: string;
    maxRate?: number;
    searchTerm?: string;
  }) => {
    try {
      setLoading(true);
      let query = supabase
        .from('nurse_profiles')
        .select(`
          *,
          profiles!inner(
            first_name,
            last_name,
            email,
            phone,
            address,
            city,
            state,
            profile_image_url,
            is_verified
          )
        `);

      // Apply filters
      if (filters?.specialty) {
        query = query.contains('specialties', [filters.specialty]);
      }
      
      if (filters?.maxRate) {
        query = query.lte('hourly_rate', filters.maxRate);
      }

      if (filters?.location) {
        query = query.or(`profiles.city.ilike.%${filters.location}%,profiles.state.ilike.%${filters.location}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      // Flatten the data structure
      const flattenedData = data?.map(nurse => ({
        ...nurse,
        ...nurse.profiles,
        profiles: undefined
      })) || [];

      // Apply search term filter on flattened data
      let filteredData = flattenedData;
      if (filters?.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        filteredData = flattenedData.filter(nurse => 
          nurse.first_name?.toLowerCase().includes(searchLower) ||
          nurse.last_name?.toLowerCase().includes(searchLower) ||
          nurse.specialties?.some(s => s.toLowerCase().includes(searchLower)) ||
          nurse.city?.toLowerCase().includes(searchLower) ||
          nurse.state?.toLowerCase().includes(searchLower)
        );
      }

      setNurses(filteredData);
    } catch (error: any) {
      console.error('Error fetching nurses:', error);
      toast.error('Failed to load healthcare professionals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNurses();
  }, []);

  return {
    nurses,
    loading,
    searchNurses: fetchNurses,
    refetch: () => fetchNurses()
  };
};