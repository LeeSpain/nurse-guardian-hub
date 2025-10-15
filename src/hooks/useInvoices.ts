import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useOrganization } from './useOrganization';

interface Invoice {
  id: string;
  invoice_number: string;
  client_id: string;
  client_name: string;
  billing_period_start: string;
  billing_period_end: string;
  total_amount: number;
  total_hours: number;
  status: string;
  due_date: string;
  created_at: string;
  line_items_count: number;
}

interface InvoiceStats {
  pendingCount: number;
  pendingAmount: number;
  paidThisMonth: number;
  overdueCount: number;
}

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [stats, setStats] = useState<InvoiceStats>({
    pendingCount: 0,
    pendingAmount: 0,
    paidThisMonth: 0,
    overdueCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { organization } = useOrganization();

  const fetchInvoices = async () => {
    if (!organization?.id) return;

    try {
      setLoading(true);
      setError(null);

      const { data: invoicesData, error: invoicesError } = await supabase
        .from('invoices')
        .select(`
          *,
          profiles!invoices_client_id_fkey (
            first_name,
            last_name
          )
        `)
        .eq('organization_id', organization.id)
        .order('created_at', { ascending: false });

      if (invoicesError) throw invoicesError;

      // Fetch line items count for each invoice
      const invoicesWithCounts = await Promise.all(
        (invoicesData || []).map(async (invoice: any) => {
          const { count } = await supabase
            .from('invoice_line_items')
            .select('*', { count: 'exact', head: true })
            .eq('invoice_id', invoice.id);

          return {
            id: invoice.id,
            invoice_number: invoice.invoice_number,
            client_id: invoice.client_id,
            client_name: `${invoice.profiles?.first_name || ''} ${invoice.profiles?.last_name || ''}`.trim(),
            billing_period_start: invoice.billing_period_start,
            billing_period_end: invoice.billing_period_end,
            total_amount: Number(invoice.total_amount),
            total_hours: Number(invoice.total_hours),
            status: invoice.status,
            due_date: invoice.due_date,
            created_at: invoice.created_at,
            line_items_count: count || 0
          };
        })
      );

      setInvoices(invoicesWithCounts);

      // Calculate stats
      const now = new Date();
      const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const pendingInvoices = invoicesWithCounts.filter(inv => inv.status === 'pending' || inv.status === 'sent');
      const paidThisMonth = invoicesWithCounts
        .filter(inv => inv.status === 'paid' && new Date(inv.created_at) >= firstOfMonth)
        .reduce((sum, inv) => sum + inv.total_amount, 0);
      const overdueInvoices = invoicesWithCounts.filter(
        inv => (inv.status === 'pending' || inv.status === 'sent') && new Date(inv.due_date) < now
      );

      setStats({
        pendingCount: pendingInvoices.length,
        pendingAmount: pendingInvoices.reduce((sum, inv) => sum + inv.total_amount, 0),
        paidThisMonth,
        overdueCount: overdueInvoices.length
      });

      // Set up realtime subscription
      const channel = supabase
        .channel('invoices-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'invoices',
            filter: `organization_id=eq.${organization.id}`
          },
          () => {
            fetchInvoices();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (err: any) {
      console.error('Error fetching invoices:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cleanup = fetchInvoices();
    return () => {
      cleanup?.then(unsub => unsub?.());
    };
  }, [organization?.id]);

  return { invoices, stats, loading, error, refetch: fetchInvoices };
};
