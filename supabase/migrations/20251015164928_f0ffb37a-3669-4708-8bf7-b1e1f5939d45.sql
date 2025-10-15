-- Create client invitations table
CREATE TABLE client_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES nurse_organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  invited_by_name TEXT,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  invited_by UUID REFERENCES profiles(id),
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, email)
);

CREATE INDEX idx_client_invitations_token ON client_invitations(token);
CREATE INDEX idx_client_invitations_email ON client_invitations(email);

-- Add invitation_id to clients table
ALTER TABLE clients 
ADD COLUMN invitation_id UUID REFERENCES client_invitations(id);

-- RLS Policies for client_invitations
ALTER TABLE client_invitations ENABLE ROW LEVEL SECURITY;

-- Managers can create invitations for their organization
CREATE POLICY "Managers can create client invitations"
ON client_invitations
FOR INSERT
TO authenticated
WITH CHECK (
  has_role(auth.uid(), 'owner'::app_role, organization_id) OR 
  has_role(auth.uid(), 'manager'::app_role, organization_id)
);

-- Managers can view invitations for their organization
CREATE POLICY "Managers can view client invitations"
ON client_invitations
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'owner'::app_role, organization_id) OR 
  has_role(auth.uid(), 'manager'::app_role, organization_id)
);

-- Managers can update invitations for their organization
CREATE POLICY "Managers can update client invitations"
ON client_invitations
FOR UPDATE
TO authenticated
USING (
  has_role(auth.uid(), 'owner'::app_role, organization_id) OR 
  has_role(auth.uid(), 'manager'::app_role, organization_id)
);

-- Public can validate invitation by token
CREATE POLICY "Public can validate client invitation by token"
ON client_invitations
FOR SELECT
TO anon
USING (true);