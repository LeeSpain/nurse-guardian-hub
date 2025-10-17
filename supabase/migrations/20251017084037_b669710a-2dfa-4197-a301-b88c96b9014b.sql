-- Add columns to support multi-day appointments and live-in care
ALTER TABLE appointments 
ADD COLUMN IF NOT EXISTS end_date DATE,
ADD COLUMN IF NOT EXISTS is_live_in BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS shift_group_id UUID;

-- Add index for querying by shift group
CREATE INDEX IF NOT EXISTS idx_appointments_shift_group ON appointments(shift_group_id) WHERE shift_group_id IS NOT NULL;