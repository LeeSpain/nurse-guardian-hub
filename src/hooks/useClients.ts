import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useOrganization } from '@/hooks/useOrganization';

export type ClientStatus = 'active' | 'potential' | 'on-hold' | 'discharged' | 'archived';

export interface Client {
  id: string;
  organization_id: string;
  // Personal Information
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  // Emergency Contacts
  emergency_contact_1_name: string | null;
  emergency_contact_1_phone: string | null;
  emergency_contact_1_relationship: string | null;
  emergency_contact_1_email: string | null;
  emergency_contact_2_name: string | null;
  emergency_contact_2_phone: string | null;
  emergency_contact_2_relationship: string | null;
  emergency_contact_2_email: string | null;
  // Next of Kin
  next_of_kin_name: string | null;
  next_of_kin_phone: string | null;
  next_of_kin_relationship: string | null;
  next_of_kin_email: string | null;
  next_of_kin_address: string | null;
  // Medical Information
  nhs_number: string | null;
  hospital_number: string | null;
  medical_history: string | null;
  current_medications: any;
  allergies: string | null;
  dietary_requirements: string | null;
  mobility_status: string | null;
  communication_needs: string | null;
  // GP Details
  gp_name: string | null;
  gp_practice: string | null;
  gp_phone: string | null;
  gp_address: string | null;
  // Care & Support
  care_level: string | null;
  funding_source: string | null;
  preferred_language: string | null;
  cultural_requirements: string | null;
  religious_requirements: string | null;
  // Mental Capacity
  mental_capacity_status: string | null;
  mental_capacity_assessment_date: string | null;
  consent_for_care: boolean | null;
  consent_date: string | null;
  lasting_power_of_attorney: string | null;
  lpa_contact_details: string | null;
  // Risk Assessment
  risk_level: string | null;
  risk_factors: string | null;
  safeguarding_concerns: string | null;
  incident_history: any;
  // Administrative
  start_date: string;
  end_date: string | null;
  status: ClientStatus | null;
  social_services_reference: string | null;
  insurance_provider: string | null;
  insurance_policy_number: string | null;
  insurance_expiry: string | null;
  // Additional
  profile_image_url: string | null;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  appointmentCount?: number;
}

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { organization } = useOrganization();

  const fetchClients = async () => {
    if (!organization?.id) {
      setClients([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('organization_id', organization.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch appointment counts for each client
      const clientsWithCounts = await Promise.all(
        (data || []).map(async (client) => {
          const { count } = await supabase
            .from('appointments')
            .select('*', { count: 'exact', head: true })
            .eq('client_id', client.id);

          return {
            ...client,
            status: (client.status as ClientStatus) || 'active',
            appointmentCount: count || 0,
          };
        })
      );

      setClients(clientsWithCounts);
    } catch (error: any) {
      toast({
        title: "Error loading clients",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createClient = async (clientData: Omit<Partial<Client>, 'id' | 'created_at' | 'updated_at'> & { 
    organization_id: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    start_date: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert([clientData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Client added successfully",
      });

      await fetchClients();
      return data;
    } catch (error: any) {
      toast({
        title: "Error creating client",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateClient = async (id: string, updates: Partial<Client>) => {
    try {
      const { error } = await supabase
        .from('clients')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Client updated successfully",
      });

      await fetchClients();
    } catch (error: any) {
      toast({
        title: "Error updating client",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchClients();
  }, [organization?.id]);

  return {
    clients,
    loading,
    createClient,
    updateClient,
    refetch: fetchClients,
  };
};
