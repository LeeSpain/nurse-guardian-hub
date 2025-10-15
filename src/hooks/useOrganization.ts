import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/UserContext';

export interface Organization {
  id: string;
  name: string;
  owner_id: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  registration_number: string | null;
  created_at: string;
  updated_at: string;
}

export const useOrganization = () => {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useUser();

  const fetchOrganization = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      
      // First check if user owns an organization
      const { data: ownedOrg, error: ownedError } = await supabase
        .from('nurse_organizations')
        .select('*')
        .eq('owner_id', user.id)
        .maybeSingle();

      if (ownedError) throw ownedError;

      if (ownedOrg) {
        setOrganization(ownedOrg);
      } else {
        // Check if user is a member of an organization
        const { data: userRole, error: roleError } = await supabase
          .from('user_roles')
          .select('nurse_organization_id')
          .eq('user_id', user.id)
          .maybeSingle();

        if (roleError) throw roleError;

        if (userRole?.nurse_organization_id) {
          const { data: memberOrg, error: memberError } = await supabase
            .from('nurse_organizations')
            .select('*')
            .eq('id', userRole.nurse_organization_id)
            .single();

          if (memberError) throw memberError;
          setOrganization(memberOrg);
        }
      }
    } catch (error: any) {
      console.error('Error loading organization:', error);
    } finally {
      setLoading(false);
    }
  };

  const createOrganization = async (newOrgData: Omit<Partial<Organization>, 'owner_id'> & { name: string }) => {
    if (!user?.id) return;

    try {
      // Create organization
      const { data: createdOrg, error: orgError } = await supabase
        .from('nurse_organizations')
        .insert([{ 
          name: newOrgData.name,
          email: newOrgData.email || null,
          phone: newOrgData.phone || null,
          address: newOrgData.address || null,
          registration_number: newOrgData.registration_number || null,
          owner_id: user.id 
        }])
        .select()
        .single();

      if (orgError) throw orgError;

      // Create owner role for the user
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert([{
          user_id: user.id,
          role: 'owner',
          nurse_organization_id: createdOrg.id
        }]);

      if (roleError) throw roleError;

      toast({
        title: "Success",
        description: "Organization created successfully",
      });

      setOrganization(createdOrg);
      await fetchOrganization();
      return createdOrg;
    } catch (error: any) {
      toast({
        title: "Error creating organization",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateOrganization = async (id: string, updates: Partial<Organization>) => {
    try {
      const { error } = await supabase
        .from('nurse_organizations')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Organization updated successfully",
      });

      await fetchOrganization();
    } catch (error: any) {
      toast({
        title: "Error updating organization",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, [user?.id]);

  return {
    organization,
    loading,
    createOrganization,
    updateOrganization,
    refetch: fetchOrganization,
  };
};