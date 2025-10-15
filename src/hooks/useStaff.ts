import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface StaffMember {
  id: string;
  profile_id: string | null;
  organization_id: string;
  // Personal Information
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  date_of_birth: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  national_id_number: string | null;
  // Employment Details
  job_title: string | null;
  employment_type: string | null;
  hourly_rate: number | null;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  // Professional Qualifications
  license_number: string | null;
  license_type: string | null;
  license_state: string | null;
  license_expiry: string | null;
  certifications: any;
  professional_indemnity_insurance: boolean;
  insurance_policy_number: string | null;
  insurance_expiry: string | null;
  // Background Checks
  background_check_status: string | null;
  background_check_date: string | null;
  background_check_expiry: string | null;
  dbs_number: string | null;
  right_to_work_verified: boolean;
  right_to_work_document_type: string | null;
  right_to_work_expiry: string | null;
  // Emergency Contact
  emergency_contact_name: string | null;
  emergency_contact_relationship: string | null;
  emergency_contact_phone: string | null;
  emergency_contact_email: string | null;
  // Other
  professional_references: any;
  education_history: any;
  qualifications: any;
  notes: string | null;
  created_at: string;
  updated_at: string;
  profile?: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    phone: string | null;
    avatar_url: string | null;
  };
}

export const useStaff = (organizationId?: string) => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchStaff = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('staff_members')
        .select(`
          *,
          profile:profiles(
            first_name,
            last_name,
            email,
            phone,
            avatar_url
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (organizationId) {
        query = query.eq('organization_id', organizationId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setStaff(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading staff",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createStaff = async (staffData: Omit<Partial<StaffMember>, 'id' | 'created_at' | 'updated_at'> & { organization_id: string }) => {
    try {
      const { data, error } = await supabase
        .from('staff_members')
        .insert([staffData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Staff member added successfully",
      });

      await fetchStaff();
      return data;
    } catch (error: any) {
      toast({
        title: "Error creating staff member",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateStaff = async (id: string, updates: Partial<StaffMember>) => {
    try {
      const { error } = await supabase
        .from('staff_members')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Staff member updated successfully",
      });

      await fetchStaff();
    } catch (error: any) {
      toast({
        title: "Error updating staff member",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteStaff = async (id: string) => {
    try {
      const { error } = await supabase
        .from('staff_members')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Staff member removed successfully",
      });

      await fetchStaff();
    } catch (error: any) {
      toast({
        title: "Error removing staff member",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [organizationId]);

  return {
    staff,
    loading,
    createStaff,
    updateStaff,
    deleteStaff,
    refetch: fetchStaff,
  };
};