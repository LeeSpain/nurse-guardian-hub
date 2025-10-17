-- Create client_reminders table
CREATE TABLE public.client_reminders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.nurse_organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  reminder_date DATE NOT NULL,
  reminder_time TIME,
  reminder_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  assigned_to UUID REFERENCES public.staff_members(id),
  created_by UUID REFERENCES auth.users(id),
  completed_at TIMESTAMP WITH TIME ZONE,
  snoozed_until TIMESTAMP WITH TIME ZONE,
  priority TEXT NOT NULL DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.client_reminders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Organization members can view reminders"
ON public.client_reminders
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND nurse_organization_id = client_reminders.organization_id
  )
);

CREATE POLICY "Managers can create reminders"
ON public.client_reminders
FOR INSERT
WITH CHECK (
  has_role(auth.uid(), 'owner'::app_role, organization_id) OR
  has_role(auth.uid(), 'manager'::app_role, organization_id)
);

CREATE POLICY "Managers can update reminders"
ON public.client_reminders
FOR UPDATE
USING (
  has_role(auth.uid(), 'owner'::app_role, organization_id) OR
  has_role(auth.uid(), 'manager'::app_role, organization_id)
);

CREATE POLICY "Managers can delete reminders"
ON public.client_reminders
FOR DELETE
USING (
  has_role(auth.uid(), 'owner'::app_role, organization_id) OR
  has_role(auth.uid(), 'manager'::app_role, organization_id)
);

-- Create indices
CREATE INDEX idx_client_reminders_client_id ON public.client_reminders(client_id);
CREATE INDEX idx_client_reminders_organization_id ON public.client_reminders(organization_id);
CREATE INDEX idx_client_reminders_reminder_date ON public.client_reminders(reminder_date);
CREATE INDEX idx_client_reminders_status ON public.client_reminders(status);
CREATE INDEX idx_client_reminders_assigned_to ON public.client_reminders(assigned_to);

-- Create trigger for updated_at
CREATE TRIGGER update_client_reminders_updated_at
BEFORE UPDATE ON public.client_reminders
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();