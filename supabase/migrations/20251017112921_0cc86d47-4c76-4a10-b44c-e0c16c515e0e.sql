-- Optimize staff_members table for better performance

-- Add index on profile_id for faster lookups when checking if user is a staff member
CREATE INDEX IF NOT EXISTS idx_staff_members_profile_id ON staff_members(profile_id) 
WHERE profile_id IS NOT NULL;

-- Add index on organization_id and is_active for faster filtering
CREATE INDEX IF NOT EXISTS idx_staff_members_org_active ON staff_members(organization_id, is_active);

-- Verify the indexes
SELECT 
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'staff_members'
ORDER BY indexname;