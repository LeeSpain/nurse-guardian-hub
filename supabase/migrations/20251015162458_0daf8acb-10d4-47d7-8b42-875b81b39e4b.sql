-- Create clients table with comprehensive fields
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.nurse_organizations(id) ON DELETE CASCADE,
  
  -- Personal Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  postal_code TEXT,
  
  -- Emergency Contact 1
  emergency_contact_1_name TEXT,
  emergency_contact_1_phone TEXT,
  emergency_contact_1_relationship TEXT,
  emergency_contact_1_email TEXT,
  
  -- Emergency Contact 2
  emergency_contact_2_name TEXT,
  emergency_contact_2_phone TEXT,
  emergency_contact_2_relationship TEXT,
  emergency_contact_2_email TEXT,
  
  -- Next of Kin
  next_of_kin_name TEXT,
  next_of_kin_phone TEXT,
  next_of_kin_relationship TEXT,
  next_of_kin_email TEXT,
  next_of_kin_address TEXT,
  
  -- Medical Information
  nhs_number TEXT,
  hospital_number TEXT,
  medical_history TEXT,
  current_medications JSONB DEFAULT '[]'::jsonb,
  allergies TEXT,
  dietary_requirements TEXT,
  mobility_status TEXT,
  communication_needs TEXT,
  
  -- GP Details
  gp_name TEXT,
  gp_practice TEXT,
  gp_phone TEXT,
  gp_address TEXT,
  
  -- Care & Support
  care_level TEXT, -- e.g., 'low', 'medium', 'high', 'complex'
  funding_source TEXT, -- 'private', 'nhs', 'insurance', 'local_authority'
  preferred_language TEXT DEFAULT 'English',
  cultural_requirements TEXT,
  religious_requirements TEXT,
  
  -- Mental Capacity & Consent
  mental_capacity_status TEXT, -- 'has_capacity', 'lacks_capacity', 'fluctuating'
  mental_capacity_assessment_date DATE,
  consent_for_care BOOLEAN DEFAULT false,
  consent_date DATE,
  lasting_power_of_attorney TEXT,
  lpa_contact_details TEXT,
  
  -- Risk Assessment
  risk_level TEXT, -- 'low', 'medium', 'high'
  risk_factors TEXT,
  safeguarding_concerns TEXT,
  incident_history JSONB DEFAULT '[]'::jsonb,
  
  -- Administrative
  start_date DATE NOT NULL,
  end_date DATE,
  status TEXT DEFAULT 'active', -- 'active', 'pending', 'inactive', 'discharged'
  social_services_reference TEXT,
  insurance_provider TEXT,
  insurance_policy_number TEXT,
  insurance_expiry DATE,
  
  -- Additional
  profile_image_url TEXT,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create client_notes table for ongoing notes
CREATE TABLE IF NOT EXISTS public.client_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.nurse_organizations(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users(id),
  note_type TEXT NOT NULL, -- 'general', 'medical', 'incident', 'safeguarding', 'handover'
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_confidential BOOLEAN DEFAULT false,
  attachments JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for clients table
CREATE POLICY "Organization members can view clients"
  ON public.clients FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.nurse_organization_id = clients.organization_id
    )
  );

CREATE POLICY "Managers can create clients"
  ON public.clients FOR INSERT
  TO authenticated
  WITH CHECK (
    has_role(auth.uid(), 'owner'::app_role, organization_id)
    OR has_role(auth.uid(), 'manager'::app_role, organization_id)
  );

CREATE POLICY "Managers can update clients"
  ON public.clients FOR UPDATE
  TO authenticated
  USING (
    has_role(auth.uid(), 'owner'::app_role, organization_id)
    OR has_role(auth.uid(), 'manager'::app_role, organization_id)
  );

CREATE POLICY "Managers can delete clients"
  ON public.clients FOR DELETE
  TO authenticated
  USING (
    has_role(auth.uid(), 'owner'::app_role, organization_id)
    OR has_role(auth.uid(), 'manager'::app_role, organization_id)
  );

-- RLS Policies for client_notes table
CREATE POLICY "Organization members can view notes"
  ON public.client_notes FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.nurse_organization_id = client_notes.organization_id
    )
  );

CREATE POLICY "Staff can create notes"
  ON public.client_notes FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.nurse_organization_id = client_notes.organization_id
    )
  );

CREATE POLICY "Staff can update own notes"
  ON public.client_notes FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Managers can delete notes"
  ON public.client_notes FOR DELETE
  TO authenticated
  USING (
    has_role(auth.uid(), 'owner'::app_role, organization_id)
    OR has_role(auth.uid(), 'manager'::app_role, organization_id)
  );

-- Create trigger for updated_at
CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_client_notes_updated_at
  BEFORE UPDATE ON public.client_notes
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for performance
CREATE INDEX idx_clients_organization ON public.clients(organization_id);
CREATE INDEX idx_clients_status ON public.clients(status);
CREATE INDEX idx_client_notes_client ON public.client_notes(client_id);
CREATE INDEX idx_client_notes_organization ON public.client_notes(organization_id);