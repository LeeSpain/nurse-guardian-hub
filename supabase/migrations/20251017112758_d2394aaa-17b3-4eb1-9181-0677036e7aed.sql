-- Create triggers for shift notification system
-- These connect the existing notification functions to the staff_shifts table

-- Trigger to notify staff when shift is created or updated
DROP TRIGGER IF EXISTS trigger_notify_staff_shift_change ON staff_shifts;
CREATE TRIGGER trigger_notify_staff_shift_change
  AFTER INSERT OR UPDATE ON staff_shifts
  FOR EACH ROW
  EXECUTE FUNCTION notify_staff_shift_change();

-- Trigger to notify manager when staff confirms/declines shift
DROP TRIGGER IF EXISTS trigger_notify_manager_shift_confirmation ON staff_shifts;
CREATE TRIGGER trigger_notify_manager_shift_confirmation
  AFTER UPDATE ON staff_shifts
  FOR EACH ROW
  EXECUTE FUNCTION notify_manager_shift_confirmation();

-- Also ensure realtime is enabled for staff_shifts for live updates
ALTER TABLE staff_shifts REPLICA IDENTITY FULL;

-- Add staff_shifts to realtime publication if not already added
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'staff_shifts'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE staff_shifts;
  END IF;
END $$;