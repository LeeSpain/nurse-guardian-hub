-- Clean up duplicate triggers (keep only the latest ones we created)

-- Drop the older duplicate triggers
DROP TRIGGER IF EXISTS on_staff_shift_change ON staff_shifts;
DROP TRIGGER IF EXISTS on_shift_confirmation_change ON staff_shifts;

-- The triggers we want to keep are:
-- - trigger_notify_staff_shift_change (for notifying staff of new/updated shifts)
-- - trigger_notify_manager_shift_confirmation (for notifying managers of confirmations/declines)
-- - update_staff_shifts_updated_at (for updating timestamp)

-- Verify we have the correct triggers
SELECT 
  tgname as trigger_name,
  proname as function_name
FROM pg_trigger t
JOIN pg_proc p ON t.tgfoid = p.oid
WHERE tgrelid = 'staff_shifts'::regclass
AND NOT tgisinternal
ORDER BY tgname;