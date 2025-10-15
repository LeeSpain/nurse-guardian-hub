-- Create staff invitations table
CREATE TABLE staff_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES nurse_organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  job_title TEXT,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'accepted', 'expired'
  invited_by UUID REFERENCES profiles(id),
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, email)
);

-- Create indexes for performance
CREATE INDEX idx_staff_invitations_token ON staff_invitations(token);
CREATE INDEX idx_staff_invitations_email ON staff_invitations(email);
CREATE INDEX idx_staff_invitations_org ON staff_invitations(organization_id);

-- Add invitation_id to staff_members
ALTER TABLE staff_members 
ADD COLUMN invitation_id UUID REFERENCES staff_invitations(id);

-- Enable RLS
ALTER TABLE staff_invitations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Managers can create invitations for their organization
CREATE POLICY "Managers can create invitations"
ON staff_invitations
FOR INSERT
TO authenticated
WITH CHECK (
  has_role(auth.uid(), 'owner'::app_role, organization_id) OR
  has_role(auth.uid(), 'manager'::app_role, organization_id)
);

-- Managers can view invitations for their organization
CREATE POLICY "Managers can view invitations"
ON staff_invitations
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'owner'::app_role, organization_id) OR
  has_role(auth.uid(), 'manager'::app_role, organization_id)
);

-- Public can read invitation by token for validation
CREATE POLICY "Public can validate invitation by token"
ON staff_invitations
FOR SELECT
TO anon
USING (true);

-- Managers can update invitations (for resend/cancel)
CREATE POLICY "Managers can update invitations"
ON staff_invitations
FOR UPDATE
TO authenticated
USING (
  has_role(auth.uid(), 'owner'::app_role, organization_id) OR
  has_role(auth.uid(), 'manager'::app_role, organization_id)
);