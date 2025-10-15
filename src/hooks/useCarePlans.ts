import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useOrganization } from './useOrganization';

interface CarePlan {
  id: string;
  client_id: string;
  client_name: string;
  title: string;
  status: string;
  start_date: string;
  review_date: string | null;
  goals: any[];
  interventions: any[];
  created_at: string;
}

interface CarePlanTemplate {
  id: string;
  name: string;
  category: string;
  form_schema: any;
}

interface CarePlanStats {
  activeCount: number;
  reviewNeededCount: number;
  archivedCount: number;
}

export const useCarePlans = () => {
  const [carePlans, setCarePlans] = useState<CarePlan[]>([]);
  const [templates, setTemplates] = useState<CarePlanTemplate[]>([]);
  const [stats, setStats] = useState<CarePlanStats>({
    activeCount: 0,
    reviewNeededCount: 0,
    archivedCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { organization } = useOrganization();

  const fetchCarePlans = async () => {
    if (!organization?.id) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch care plans
      const { data: plansData, error: plansError } = await supabase
        .from('care_plans')
        .select(`
          *,
          profiles!care_plans_client_id_fkey (
            first_name,
            last_name
          )
        `)
        .eq('organization_id', organization.id)
        .order('created_at', { ascending: false });

      if (plansError) throw plansError;

      const formattedPlans: CarePlan[] = (plansData || []).map((plan: any) => ({
        id: plan.id,
        client_id: plan.client_id,
        client_name: `${plan.profiles?.first_name || ''} ${plan.profiles?.last_name || ''}`.trim(),
        title: plan.title,
        status: plan.status,
        start_date: plan.start_date,
        review_date: plan.review_date,
        goals: plan.goals || [],
        interventions: plan.interventions || [],
        created_at: plan.created_at
      }));

      setCarePlans(formattedPlans);

      // Fetch templates
      const { data: templatesData, error: templatesError } = await supabase
        .from('care_plan_templates')
        .select('*')
        .or(`organization_id.eq.${organization.id},is_standard.eq.true`);

      if (templatesError) throw templatesError;

      setTemplates(templatesData || []);

      // Calculate stats
      const now = new Date();
      const activeCount = formattedPlans.filter(p => p.status === 'active').length;
      const reviewNeededCount = formattedPlans.filter(
        p => p.status === 'active' && p.review_date && new Date(p.review_date) <= now
      ).length;
      const archivedCount = formattedPlans.filter(p => p.status === 'archived').length;

      setStats({
        activeCount,
        reviewNeededCount,
        archivedCount
      });

      // Set up realtime subscription
      const channel = supabase
        .channel('care-plans-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'care_plans',
            filter: `organization_id=eq.${organization.id}`
          },
          () => {
            fetchCarePlans();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (err: any) {
      console.error('Error fetching care plans:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createCarePlan = async (planData: {
    client_id: string;
    title: string;
    start_date: string;
    review_date?: string;
    goals?: any[];
    interventions?: any[];
  }) => {
    if (!organization?.id) return { success: false, error: 'No organization' };

    try {
      const { error } = await supabase
        .from('care_plans')
        .insert([{
          ...planData,
          organization_id: organization.id,
          status: 'active'
        }]);

      if (error) throw error;
      await fetchCarePlans();
      return { success: true };
    } catch (err: any) {
      console.error('Error creating care plan:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    const cleanup = fetchCarePlans();
    return () => {
      cleanup?.then(unsub => unsub?.());
    };
  }, [organization?.id]);

  return { carePlans, templates, stats, loading, error, createCarePlan, refetch: fetchCarePlans };
};
