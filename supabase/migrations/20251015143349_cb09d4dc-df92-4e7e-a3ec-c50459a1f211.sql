-- Phase 1: Database Structure Fixes

-- Add staff_member_id to appointments table
ALTER TABLE public.appointments 
ADD COLUMN staff_member_id uuid REFERENCES public.staff_members(id);

-- Add appointment_id to staff_shifts table
ALTER TABLE public.staff_shifts 
ADD COLUMN appointment_id uuid REFERENCES public.appointments(id);

-- Create client_staff_assignments table for assigning staff to clients
CREATE TABLE public.client_staff_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  staff_member_id uuid NOT NULL REFERENCES public.staff_members(id) ON DELETE CASCADE,
  organization_id uuid NOT NULL REFERENCES public.nurse_organizations(id) ON DELETE CASCADE,
  assigned_at timestamp with time zone DEFAULT now(),
  assigned_by uuid REFERENCES public.profiles(id),
  is_primary boolean DEFAULT false,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(client_id, staff_member_id)
);

-- Enable RLS on client_staff_assignments
ALTER TABLE public.client_staff_assignments ENABLE ROW LEVEL SECURITY;

-- RLS policies for client_staff_assignments
CREATE POLICY "Organization members can view assignments"
ON public.client_staff_assignments
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.nurse_organization_id = client_staff_assignments.organization_id
  )
);

CREATE POLICY "Managers can manage assignments"
ON public.client_staff_assignments
FOR ALL
USING (
  has_role(auth.uid(), 'owner'::app_role, organization_id) OR
  has_role(auth.uid(), 'manager'::app_role, organization_id)
);

-- Update RLS policies for appointments to include staff access
CREATE POLICY "Staff can view assigned appointments"
ON public.appointments
FOR SELECT
USING (
  auth.uid() = client_id OR 
  auth.uid() = nurse_id OR
  EXISTS (
    SELECT 1 FROM staff_members
    WHERE staff_members.id = appointments.staff_member_id
    AND staff_members.profile_id = auth.uid()
  )
);

-- Add index for performance
CREATE INDEX idx_appointments_staff_member ON public.appointments(staff_member_id);
CREATE INDEX idx_staff_shifts_appointment ON public.staff_shifts(appointment_id);
CREATE INDEX idx_client_staff_assignments_client ON public.client_staff_assignments(client_id);
CREATE INDEX idx_client_staff_assignments_staff ON public.client_staff_assignments(staff_member_id);