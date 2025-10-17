-- Fix the foreign key constraint for staff_shifts.client_id
-- Currently it incorrectly references profiles.id, should reference clients.id

-- Drop the incorrect foreign key constraint
ALTER TABLE staff_shifts
DROP CONSTRAINT IF EXISTS staff_shifts_client_id_fkey;

-- Add the correct foreign key constraint
ALTER TABLE staff_shifts
ADD CONSTRAINT staff_shifts_client_id_fkey
FOREIGN KEY (client_id)
REFERENCES clients(id)
ON DELETE SET NULL;