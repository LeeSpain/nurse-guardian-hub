import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Button from '@/components/ui-components/Button';
import type { StaffMember } from '@/hooks/useStaff';
import type { Client } from '@/hooks/useClients';

interface CreateShiftModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (data: any) => Promise<any>;
  organizationId: string;
  staff: StaffMember[];
  clients: Client[];
}

export const CreateShiftModal: React.FC<CreateShiftModalProps> = ({
  open,
  onOpenChange,
  onSuccess,
  organizationId,
  staff,
  clients,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState('');
  const [selectedClient, setSelectedClient] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      organization_id: organizationId,
      staff_member_id: selectedStaff,
      client_id: selectedClient || null,
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
      setSelectedClient('');
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
          <DialogTitle>Create New Shift</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="staff_member">Staff Member *</Label>
            <Select value={selectedStaff} onValueChange={setSelectedStaff} required>
              <SelectTrigger>
                <SelectValue placeholder="Select staff member" />
              </SelectTrigger>
              <SelectContent>
                {staff.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.profile?.first_name} {member.profile?.last_name} - {member.job_title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="client">Client (Optional)</Label>
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger>
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">None</SelectItem>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.first_name} {client.last_name}
                  </SelectItem>
                ))}
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
              {loading ? 'Creating...' : 'Create Shift'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};