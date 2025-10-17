-- Drop constraints if they exist in broken state
ALTER TABLE client_reminders DROP CONSTRAINT IF EXISTS client_reminders_assigned_to_fkey;
ALTER TABLE client_reminders DROP CONSTRAINT IF EXISTS client_reminders_created_by_fkey;

-- Add foreign key for assigned_to
ALTER TABLE client_reminders
ADD CONSTRAINT client_reminders_assigned_to_fkey 
FOREIGN KEY (assigned_to) 
REFERENCES staff_members(id) 
ON DELETE SET NULL;

-- Add foreign key for created_by  
ALTER TABLE client_reminders
ADD CONSTRAINT client_reminders_created_by_fkey 
FOREIGN KEY (created_by) 
REFERENCES staff_members(id) 
ON DELETE SET NULL;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_client_reminders_assigned_to ON client_reminders(assigned_to);
CREATE INDEX IF NOT EXISTS idx_client_reminders_created_by ON client_reminders(created_by);
CREATE INDEX IF NOT EXISTS idx_client_reminders_client_org ON client_reminders(client_id, organization_id);