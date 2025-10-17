import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Button from '@/components/ui-components/Button';
import type { StaffMember } from '@/hooks/useStaff';

interface CreateClientShiftModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (data: any) => Promise<any>;
  organizationId: string;
  clientId: string;
  clientName: string;
  staff: StaffMember[];
}

export const CreateClientShiftModal: React.FC<CreateClientShiftModalProps> = ({
  open,
  onOpenChange,
  onSuccess,
  organizationId,
  clientId,
  clientName,
  staff,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      organization_id: organizationId,
      staff_member_id: selectedStaff,
      client_id: clientId,
      shift_date: formData.get('shift_date') as string,
      start_time: formData.get('start_time') as string,
      end_time: formData.get('end_time') as string,
      break_minutes: parseInt(formData.get('break_minutes') as string) || 0,
      notes: formData.get('notes') as string || null,
      status: 'scheduled',
    };

    try {
      await onSuccess(data);
      onOpenChange(false);
      e.currentTarget.reset();
      setSelectedStaff('');
    } catch (error) {
      // Error handled in hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Shift for {clientName}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm text-muted-foreground">Client</p>
            <p className="font-medium">{clientName}</p>
          </div>

          <div>
            <Label htmlFor="staff_member">Assign Staff Member *</Label>
            <Select value={selectedStaff} onValueChange={setSelectedStaff} required>
              <SelectTrigger>
                <SelectValue placeholder="Select staff member by name" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {staff.filter(s => s.is_active).map((member) => {
                  const fullName = `${member.first_name || ''} ${member.last_name || ''}`.trim() || 
                                   `${member.profile?.first_name || ''} ${member.profile?.last_name || ''}`.trim();
                  const jobTitle = member.job_title || 'Staff Member';
                  const displayName = fullName || member.email || 'Unknown';
                  
                  return (
                    <SelectItem key={member.id} value={member.id}>
                      <div className="flex flex-col py-1">
                        <span className="font-semibold">{displayName}</span>
                        <span className="text-xs text-muted-foreground">{jobTitle}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="shift_date">Date *</Label>
            <Input
              id="shift_date"
              name="shift_date"
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start_time">Start Time *</Label>
              <Input
                id="start_time"
                name="start_time"
                type="time"
                required
              />
            </div>
            <div>
              <Label htmlFor="end_time">End Time *</Label>
              <Input
                id="end_time"
                name="end_time"
                type="time"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="break_minutes">Break Duration (minutes)</Label>
            <Input
              id="break_minutes"
              name="break_minutes"
              type="number"
              min="0"
              step="15"
              defaultValue="30"
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any additional information..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" variant="nurse" disabled={loading}>
              {loading ? 'Scheduling...' : 'Schedule Shift'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
