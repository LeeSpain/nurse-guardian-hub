-- Fix infinite recursion by updating has_role function to be properly isolated
-- and fix nurse_organizations RLS policies

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view organizations they belong to" ON nurse_organizations;

-- Recreate the policy using a simpler approach that doesn't cause recursion
CREATE POLICY "Users can view organizations they belong to"
ON nurse_organizations
FOR SELECT
TO authenticated
USING (
  owner_id = auth.uid() 
  OR 
  id IN (
    SELECT nurse_organization_id 
    FROM user_roles 
    WHERE user_id = auth.uid()
  )
);

-- Create default organization for existing nurse users who don't have one
DO $$
DECLARE
  nurse_record RECORD;
  new_org_id UUID;
  nurse_profile RECORD;
BEGIN
  FOR nurse_record IN 
    SELECT p.id, p.user_id, p.first_name, p.last_name, p.email
    FROM profiles p
    WHERE p.user_role = 'nurse'
    AND NOT EXISTS (
      SELECT 1 FROM nurse_organizations WHERE owner_id = p.id
    )
  LOOP
    -- Create organization for this nurse
    INSERT INTO nurse_organizations (
      owner_id,
      name,
      email
    ) VALUES (
      nurse_record.id,
      COALESCE(nurse_record.first_name || ' ' || nurse_record.last_name || '''s Practice', 'My Practice'),
      nurse_record.email
    ) RETURNING id INTO new_org_id;

    -- Add owner role for this user
    INSERT INTO user_roles (
      user_id,
      role,
      nurse_organization_id
    ) VALUES (
      nurse_record.id,
      'owner',
      new_org_id
    ) ON CONFLICT DO NOTHING;
    
    RAISE NOTICE 'Created organization % for nurse %', new_org_id, nurse_record.id;
  END LOOP;
END $$;