-- Create role enum
CREATE TYPE app_role AS ENUM ('owner', 'manager', 'staff_nurse', 'care_assistant', 'admin');

-- User roles table
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nurse_organization_id UUID,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, nurse_organization_id, role)
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents infinite recursion)
CREATE OR REPLACE FUNCTION has_role(_user_id UUID, _role app_role, _org_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = _user_id 
    AND role = _role 
    AND (nurse_organization_id = _org_id OR _org_id IS NULL)
  )
$$;

-- Nurse organizations (practices/agencies)
CREATE TABLE nurse_organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES profiles(id) NOT NULL,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  registration_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE nurse_organizations ENABLE ROW LEVEL SECURITY;

-- Add foreign key to user_roles after nurse_organizations exists
ALTER TABLE user_roles ADD CONSTRAINT user_roles_org_fk 
  FOREIGN KEY (nurse_organization_id) REFERENCES nurse_organizations(id) ON DELETE CASCADE;

-- Staff members
CREATE TABLE staff_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES nurse_organizations(id) ON DELETE CASCADE NOT NULL,
  profile_id UUID REFERENCES profiles(id),
  employment_type TEXT CHECK (employment_type IN ('full_time', 'part_time', 'casual', 'agency')),
  job_title TEXT,
  hourly_rate NUMERIC,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  qualifications JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE staff_members ENABLE ROW LEVEL SECURITY;

-- Shift templates
CREATE TABLE shift_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES nurse_organizations(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  break_duration_minutes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE shift_templates ENABLE ROW LEVEL SECURITY;

-- Staff shifts
CREATE TABLE staff_shifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES nurse_organizations(id) ON DELETE CASCADE NOT NULL,
  staff_member_id UUID REFERENCES staff_members(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES profiles(id),
  shift_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  break_minutes INTEGER DEFAULT 0,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show')),
  notes TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE staff_shifts ENABLE ROW LEVEL SECURITY;

-- Shift swap requests
CREATE TABLE shift_swap_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  original_shift_id UUID REFERENCES staff_shifts(id) ON DELETE CASCADE NOT NULL,
  requesting_staff_id UUID REFERENCES staff_members(id) NOT NULL,
  covering_staff_id UUID REFERENCES staff_members(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  request_reason TEXT,
  approved_by UUID REFERENCES profiles(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE shift_swap_requests ENABLE ROW LEVEL SECURITY;

-- Care plan templates
CREATE TABLE care_plan_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES nurse_organizations(id),
  name TEXT NOT NULL,
  category TEXT CHECK (category IN ('medication', 'mobility', 'nutrition', 'hygiene', 'social', 'mental_health', 'wound_care', 'general')),
  form_schema JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_standard BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE care_plan_templates ENABLE ROW LEVEL SECURITY;

-- Client care plans
CREATE TABLE care_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  organization_id UUID REFERENCES nurse_organizations(id) NOT NULL,
  template_id UUID REFERENCES care_plan_templates(id),
  title TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'review_needed', 'archived')),
  start_date DATE NOT NULL,
  review_date DATE,
  goals JSONB DEFAULT '[]'::jsonb,
  interventions JSONB DEFAULT '[]'::jsonb,
  risk_assessment JSONB DEFAULT '{}'::jsonb,
  created_by UUID REFERENCES profiles(id),
  last_updated_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE care_plans ENABLE ROW LEVEL SECURITY;

-- Care logs
CREATE TABLE care_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  care_plan_id UUID REFERENCES care_plans(id) ON DELETE CASCADE,
  client_id UUID REFERENCES profiles(id) NOT NULL,
  staff_member_id UUID REFERENCES staff_members(id),
  shift_id UUID REFERENCES staff_shifts(id),
  log_date DATE NOT NULL,
  log_time TIME NOT NULL,
  category TEXT CHECK (category IN ('observation', 'medication', 'activity', 'incident', 'general', 'personal_care', 'nutrition', 'mobility')),
  content TEXT NOT NULL,
  attachments JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE care_logs ENABLE ROW LEVEL SECURITY;

-- Medication records
CREATE TABLE medication_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES profiles(id) NOT NULL,
  care_plan_id UUID REFERENCES care_plans(id),
  medication_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  route TEXT CHECK (route IN ('oral', 'topical', 'injection', 'inhalation', 'sublingual', 'rectal', 'other')),
  scheduled_times TIME[],
  start_date DATE NOT NULL,
  end_date DATE,
  prescriber_name TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE medication_records ENABLE ROW LEVEL SECURITY;

-- Medication administrations
CREATE TABLE medication_administrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medication_record_id UUID REFERENCES medication_records(id) ON DELETE CASCADE NOT NULL,
  administered_by UUID REFERENCES staff_members(id) NOT NULL,
  scheduled_time TIMESTAMPTZ NOT NULL,
  actual_time TIMESTAMPTZ,
  status TEXT CHECK (status IN ('given', 'refused', 'not_available', 'omitted')),
  notes TEXT,
  witnessed_by UUID REFERENCES staff_members(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE medication_administrations ENABLE ROW LEVEL SECURITY;

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  organization_id UUID REFERENCES nurse_organizations(id),
  type TEXT NOT NULL CHECK (type IN ('shift_reminder', 'care_plan_review', 'medication_due', 'shift_swap', 'incident_report', 'rota_published', 'shift_completion', 'new_staff')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Notification preferences
CREATE TABLE notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  notification_type TEXT NOT NULL,
  email_enabled BOOLEAN DEFAULT true,
  push_enabled BOOLEAN DEFAULT true,
  sms_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, notification_type)
);

ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES

-- User roles policies
CREATE POLICY "Users can view own roles" ON user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Organization owners can manage roles" ON user_roles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM nurse_organizations 
      WHERE id = user_roles.nurse_organization_id 
      AND owner_id = auth.uid()
    )
  );

-- Nurse organizations policies
CREATE POLICY "Users can view organizations they belong to" ON nurse_organizations
  FOR SELECT USING (
    owner_id = auth.uid() OR
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND nurse_organization_id = nurse_organizations.id)
  );

CREATE POLICY "Users can create organizations" ON nurse_organizations
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update their organizations" ON nurse_organizations
  FOR UPDATE USING (auth.uid() = owner_id);

-- Staff members policies
CREATE POLICY "Staff can view organization members" ON staff_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND nurse_organization_id = staff_members.organization_id
    ) OR profile_id = auth.uid()
  );

CREATE POLICY "Owners and managers can add staff" ON staff_members
  FOR INSERT WITH CHECK (
    has_role(auth.uid(), 'owner', organization_id) OR
    has_role(auth.uid(), 'manager', organization_id)
  );

CREATE POLICY "Owners and managers can update staff" ON staff_members
  FOR UPDATE USING (
    has_role(auth.uid(), 'owner', organization_id) OR
    has_role(auth.uid(), 'manager', organization_id)
  );

-- Shift templates policies
CREATE POLICY "Organization members can view templates" ON shift_templates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND nurse_organization_id = shift_templates.organization_id
    )
  );

CREATE POLICY "Managers can manage templates" ON shift_templates
  FOR ALL USING (
    has_role(auth.uid(), 'owner', organization_id) OR
    has_role(auth.uid(), 'manager', organization_id)
  );

-- Staff shifts policies
CREATE POLICY "Staff can view organization shifts" ON staff_shifts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND nurse_organization_id = staff_shifts.organization_id
    )
  );

CREATE POLICY "Managers can create shifts" ON staff_shifts
  FOR INSERT WITH CHECK (
    has_role(auth.uid(), 'owner', organization_id) OR
    has_role(auth.uid(), 'manager', organization_id)
  );

CREATE POLICY "Managers and assigned staff can update shifts" ON staff_shifts
  FOR UPDATE USING (
    has_role(auth.uid(), 'owner', organization_id) OR
    has_role(auth.uid(), 'manager', organization_id) OR
    EXISTS (SELECT 1 FROM staff_members WHERE id = staff_shifts.staff_member_id AND profile_id = auth.uid())
  );

-- Shift swap requests policies
CREATE POLICY "Staff can view swap requests" ON shift_swap_requests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM staff_members sm
      JOIN staff_shifts ss ON ss.staff_member_id = sm.id
      WHERE sm.profile_id = auth.uid()
      AND ss.id = shift_swap_requests.original_shift_id
    ) OR
    EXISTS (SELECT 1 FROM staff_members WHERE id = shift_swap_requests.requesting_staff_id AND profile_id = auth.uid()) OR
    EXISTS (SELECT 1 FROM staff_members WHERE id = shift_swap_requests.covering_staff_id AND profile_id = auth.uid())
  );

CREATE POLICY "Staff can create swap requests" ON shift_swap_requests
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM staff_members WHERE id = requesting_staff_id AND profile_id = auth.uid())
  );

CREATE POLICY "Managers can update swap requests" ON shift_swap_requests
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM staff_shifts ss
      JOIN nurse_organizations no ON no.id = ss.organization_id
      WHERE ss.id = shift_swap_requests.original_shift_id
      AND (has_role(auth.uid(), 'owner', no.id) OR has_role(auth.uid(), 'manager', no.id))
    )
  );

-- Care plan templates policies
CREATE POLICY "Organization members can view templates" ON care_plan_templates
  FOR SELECT USING (
    is_standard = true OR
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND nurse_organization_id = care_plan_templates.organization_id
    )
  );

CREATE POLICY "Managers can manage templates" ON care_plan_templates
  FOR ALL USING (
    has_role(auth.uid(), 'owner', organization_id) OR
    has_role(auth.uid(), 'manager', organization_id)
  );

-- Care plans policies
CREATE POLICY "Assigned staff can view care plans" ON care_plans
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM staff_shifts ss
      JOIN staff_members sm ON sm.id = ss.staff_member_id
      WHERE ss.client_id = care_plans.client_id
      AND sm.profile_id = auth.uid()
    ) OR
    has_role(auth.uid(), 'owner', organization_id) OR
    has_role(auth.uid(), 'manager', organization_id)
  );

CREATE POLICY "Staff can create care plans" ON care_plans
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND nurse_organization_id = care_plans.organization_id
    )
  );

CREATE POLICY "Staff can update care plans" ON care_plans
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM staff_shifts ss
      JOIN staff_members sm ON sm.id = ss.staff_member_id
      WHERE ss.client_id = care_plans.client_id
      AND sm.profile_id = auth.uid()
    ) OR
    has_role(auth.uid(), 'owner', organization_id) OR
    has_role(auth.uid(), 'manager', organization_id)
  );

-- Care logs policies
CREATE POLICY "Staff can view care logs for their clients" ON care_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM staff_shifts ss
      JOIN staff_members sm ON sm.id = ss.staff_member_id
      WHERE ss.client_id = care_logs.client_id
      AND sm.profile_id = auth.uid()
    )
  );

CREATE POLICY "Staff can create care logs" ON care_logs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM staff_members 
      WHERE id = care_logs.staff_member_id 
      AND profile_id = auth.uid()
    )
  );

-- Medication records policies
CREATE POLICY "Staff can view medication records" ON medication_records
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM staff_shifts ss
      JOIN staff_members sm ON sm.id = ss.staff_member_id
      WHERE ss.client_id = medication_records.client_id
      AND sm.profile_id = auth.uid()
    )
  );

CREATE POLICY "Staff can manage medication records" ON medication_records
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM care_plans cp
      WHERE cp.id = medication_records.care_plan_id
      AND (
        has_role(auth.uid(), 'owner', cp.organization_id) OR
        has_role(auth.uid(), 'manager', cp.organization_id) OR
        has_role(auth.uid(), 'staff_nurse', cp.organization_id)
      )
    )
  );

-- Medication administrations policies
CREATE POLICY "Staff can view administrations" ON medication_administrations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM medication_records mr
      JOIN staff_shifts ss ON ss.client_id = mr.client_id
      JOIN staff_members sm ON sm.id = ss.staff_member_id
      WHERE mr.id = medication_administrations.medication_record_id
      AND sm.profile_id = auth.uid()
    )
  );

CREATE POLICY "Staff can record administrations" ON medication_administrations
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM staff_members 
      WHERE id = medication_administrations.administered_by 
      AND profile_id = auth.uid()
    )
  );

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications" ON notifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Notification preferences policies
CREATE POLICY "Users can manage own preferences" ON notification_preferences
  FOR ALL USING (auth.uid() = user_id);

-- Add updated_at triggers
CREATE TRIGGER update_nurse_organizations_updated_at BEFORE UPDATE ON nurse_organizations
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER update_staff_members_updated_at BEFORE UPDATE ON staff_members
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER update_staff_shifts_updated_at BEFORE UPDATE ON staff_shifts
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER update_care_plans_updated_at BEFORE UPDATE ON care_plans
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();