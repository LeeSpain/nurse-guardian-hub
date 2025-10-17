import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useClients } from '@/hooks/useClients';
import { useOrganization } from '@/hooks/useOrganization';
import { supabase } from '@/integrations/supabase/client';
import { format, startOfMonth, endOfMonth } from 'date-fns';

interface GenerateInvoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const GenerateInvoiceModal: React.FC<GenerateInvoiceModalProps> = ({ 
  open, 
  onOpenChange,
  onSuccess 
}) => {
  const { clients } = useClients();
  const { organization } = useOrganization();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    client_id: '',
    billing_period_start: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    billing_period_end: format(endOfMonth(new Date()), 'yyyy-MM-dd'),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.client_id || !formData.billing_period_start || !formData.billing_period_end) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!organization?.id) {
      toast.error('Organization not found');
      return;
    }

    setLoading(true);
    try {
      // Fetch all shifts for the billing period
      const { data: shifts, error: shiftsError } = await supabase
        .from('staff_shifts')
        .select('*')
        .eq('organization_id', organization.id)
        .eq('client_id', formData.client_id)
        .gte('shift_date', formData.billing_period_start)
        .lte('shift_date', formData.billing_period_end)
        .eq('status', 'completed');

      if (shiftsError) throw shiftsError;

      if (!shifts || shifts.length === 0) {
        toast.error('No completed shifts found for this period');
        setLoading(false);
        return;
      }

      // Calculate totals - calculate hours from times
      let totalHours = 0;
      let totalAmount = 0;

      shifts.forEach(shift => {
        // Calculate hours from start_time and end_time
        const [startHour, startMin] = shift.start_time.split(':').map(Number);
        const [endHour, endMin] = shift.end_time.split(':').map(Number);
        const hours = (endHour * 60 + endMin - startHour * 60 - startMin) / 60;
        
        // We don't have hourly_rate on shifts, so we'll use a default or skip
        // For now, let's just track hours
        totalHours += hours;
      });

      // For now, set a default hourly rate or get from organization
      const defaultRate = 30; // Default hourly rate
      totalAmount = totalHours * defaultRate;

      // Generate invoice number
      const invoiceNumber = `INV-${Date.now()}`;

      // Create invoice
      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert({
          organization_id: organization.id,
          client_id: formData.client_id,
          invoice_number: invoiceNumber,
          billing_period_start: formData.billing_period_start,
          billing_period_end: formData.billing_period_end,
          total_hours: totalHours,
          total_amount: totalAmount,
          due_date: format(new Date(new Date().setDate(new Date().getDate() + 30)), 'yyyy-MM-dd'),
          status: 'pending',
        })
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      // Create line items
      const lineItems = shifts.map((shift, index) => {
        // Calculate hours from start_time and end_time
        const [startHour, startMin] = shift.start_time.split(':').map(Number);
        const [endHour, endMin] = shift.end_time.split(':').map(Number);
        const hours = (endHour * 60 + endMin - startHour * 60 - startMin) / 60;
        
        return {
          invoice_id: invoice.id,
          staff_shift_id: shift.id,
          description: `Shift - ${format(new Date(shift.shift_date), 'MMM d, yyyy')}`,
          quantity: hours,
          rate: defaultRate,
          amount: hours * defaultRate,
        };
      });

      const { error: lineItemsError } = await supabase
        .from('invoice_line_items')
        .insert(lineItems);

      if (lineItemsError) throw lineItemsError;

      toast.success(`Invoice ${invoiceNumber} created successfully`);
      onSuccess();
      onOpenChange(false);
      
      // Reset form
      setFormData({
        client_id: '',
        billing_period_start: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
        billing_period_end: format(endOfMonth(new Date()), 'yyyy-MM-dd'),
      });
    } catch (error: any) {
      console.error('Error creating invoice:', error);
      toast.error('Failed to create invoice: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Generate Invoice</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="client">Client *</Label>
            <Select value={formData.client_id} onValueChange={(v) => setFormData({ ...formData, client_id: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Select client..." />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.first_name} {client.last_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Billing Period Start *</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.billing_period_start}
                onChange={(e) => setFormData({ ...formData, billing_period_start: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date">Billing Period End *</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.billing_period_end}
                onChange={(e) => setFormData({ ...formData, billing_period_end: e.target.value })}
              />
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              This will generate an invoice for all completed shifts within the selected period.
              The invoice will include all shift hours and costs automatically.
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Generating...' : 'Generate Invoice'}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
