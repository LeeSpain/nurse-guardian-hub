-- Expand staff_members table with comprehensive HR information
ALTER TABLE staff_members
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT,
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS postal_code TEXT,
ADD COLUMN IF NOT EXISTS national_id_number TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact_name TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact_relationship TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact_phone TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact_email TEXT,
ADD COLUMN IF NOT EXISTS license_number TEXT,
ADD COLUMN IF NOT EXISTS license_type TEXT,
ADD COLUMN IF NOT EXISTS license_state TEXT,
ADD COLUMN IF NOT EXISTS license_expiry DATE,
ADD COLUMN IF NOT EXISTS certifications JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS background_check_status TEXT CHECK (background_check_status IN ('pending', 'in_progress', 'cleared', 'flagged', 'expired')),
ADD COLUMN IF NOT EXISTS background_check_date DATE,
ADD COLUMN IF NOT EXISTS background_check_expiry DATE,
ADD COLUMN IF NOT EXISTS dbs_number TEXT,
ADD COLUMN IF NOT EXISTS right_to_work_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS right_to_work_document_type TEXT,
ADD COLUMN IF NOT EXISTS right_to_work_expiry DATE,
ADD COLUMN IF NOT EXISTS professional_references JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS education_history JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS professional_indemnity_insurance BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS insurance_policy_number TEXT,
ADD COLUMN IF NOT EXISTS insurance_expiry DATE,
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Create index for searching staff by name
CREATE INDEX IF NOT EXISTS idx_staff_members_name ON staff_members(first_name, last_name);

-- Create index for license expiry monitoring
CREATE INDEX IF NOT EXISTS idx_staff_members_license_expiry ON staff_members(license_expiry) WHERE is_active = true;

-- Create index for background check expiry monitoring
CREATE INDEX IF NOT EXISTS idx_staff_members_background_check_expiry ON staff_members(background_check_expiry) WHERE is_active = true;