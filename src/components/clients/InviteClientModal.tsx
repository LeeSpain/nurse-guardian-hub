import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Button from '@/components/ui-components/Button';
import { useToast } from '@/hooks/use-toast';
import { useOrganization } from '@/hooks/useOrganization';
import { supabase } from '@/integrations/supabase/client';
import { Mail, UserPlus, Loader2 } from 'lucide-react';

interface InviteClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const InviteClientModal: React.FC<InviteClientModalProps> = ({
  open,
  onOpenChange,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  const { toast } = useToast();
  const { organization } = useOrganization();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!organization?.id) {
      toast({
        title: "Error",
        description: "No organization found",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Not authenticated');
      }

      const { error } = await supabase.functions.invoke('send-client-invitation', {
        body: {
          ...formData,
          organization_id: organization.id,
        },
      });

      if (error) throw error;

      toast({
        title: "Invitation Sent!",
        description: `An email has been sent to ${formData.email} with instructions to complete their profile.`,
      });

      setFormData({ first_name: '', last_name: '', email: '' });
      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
      console.error('Error sending invitation:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite Client
          </DialogTitle>
          <DialogDescription>
            Send an email invitation to a client or family member to complete their profile information.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first_name">First Name *</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                required
                disabled={loading}
                maxLength={100}
              />
            </div>
            <div>
              <Label htmlFor="last_name">Last Name *</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                required
                disabled={loading}
                maxLength={100}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="client@example.com"
              required
              disabled={loading}
              maxLength={255}
            />
            <p className="text-sm text-muted-foreground mt-1">
              The invitation link will be sent to this email address
            </p>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg border border-border">
            <div className="flex items-start gap-2">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-foreground mb-1">What happens next?</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Client receives an email with a secure link</li>
                  <li>They complete their information online</li>
                  <li>Their profile is automatically added to your clients</li>
                  <li>Link expires in 7 days</li>
                </ul>
              </div>
            </div>
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
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Invitation
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};