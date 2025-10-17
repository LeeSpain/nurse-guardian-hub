import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Button from '@/components/ui-components/Button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useStaff } from '@/hooks/useStaff';
import { useOrganization } from '@/hooks/useOrganization';

interface ShiftSwapRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  shiftId: string;
  onSuccess: () => void;
}

export const ShiftSwapRequestModal: React.FC<ShiftSwapRequestModalProps> = ({
  isOpen,
  onClose,
  shiftId,
  onSuccess,
}) => {
  const { organization } = useOrganization();
  const { staff } = useStaff(organization?.id);
  const [coveringStaffId, setCoveringStaffId] = useState('');
  const [requestReason, setRequestReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!requestReason.trim()) {
      toast.error('Please provide a reason for the swap request');
      return;
    }

    try {
      setSubmitting(true);
      
      // Get the requesting staff member ID from the shift
      const { data: shift, error: shiftError } = await supabase
        .from('staff_shifts')
        .select('staff_member_id')
        .eq('id', shiftId)
        .single();

      if (shiftError) throw shiftError;

      const { error } = await supabase
        .from('shift_swap_requests')
        .insert({
          original_shift_id: shiftId,
          requesting_staff_id: shift.staff_member_id,
          covering_staff_id: coveringStaffId || null,
          request_reason: requestReason,
          status: 'pending',
        });

      if (error) throw error;

      toast.success('Shift swap request submitted successfully');
      onSuccess();
      onClose();
      resetForm();
    } catch (error: any) {
      console.error('Error submitting swap request:', error);
      toast.error('Failed to submit swap request');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setCoveringStaffId('');
    setRequestReason('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request Shift Swap</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Preferred Cover Staff (Optional)</Label>
            <Select value={coveringStaffId} onValueChange={setCoveringStaffId}>
              <SelectTrigger>
                <SelectValue placeholder="Select staff member (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No preference</SelectItem>
                {staff.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.first_name} {member.last_name} - {member.job_title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Swap Request *</Label>
            <Textarea
              id="reason"
              value={requestReason}
              onChange={(e) => setRequestReason(e.target.value)}
              placeholder="Please explain why you need to swap this shift..."
              rows={4}
              required
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="nurse"
            onClick={handleSubmit}
            disabled={submitting || !requestReason.trim()}
          >
            {submitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
