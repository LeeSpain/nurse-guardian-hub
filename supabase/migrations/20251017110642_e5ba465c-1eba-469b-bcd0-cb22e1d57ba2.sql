-- Add confirmation tracking fields to staff_shifts
ALTER TABLE staff_shifts 
ADD COLUMN IF NOT EXISTS confirmation_status TEXT DEFAULT 'pending' CHECK (confirmation_status IN ('pending', 'accepted', 'declined')),
ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS confirmed_by UUID REFERENCES profiles(id),
ADD COLUMN IF NOT EXISTS decline_reason TEXT;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_staff_shifts_confirmation ON staff_shifts(staff_member_id, confirmation_status);

-- Update existing shifts to pending status
UPDATE staff_shifts 
SET confirmation_status = 'pending' 
WHERE confirmation_status IS NULL AND status IN ('scheduled', 'confirmed');

-- Function to create notification when shift is created or updated
CREATE OR REPLACE FUNCTION notify_staff_shift_change()
RETURNS TRIGGER AS $$
DECLARE
  staff_profile_id UUID;
  client_name TEXT;
  notification_title TEXT;
  notification_message TEXT;
BEGIN
  -- Get staff member's profile_id
  SELECT profile_id INTO staff_profile_id
  FROM staff_members
  WHERE id = NEW.staff_member_id;

  -- Get client name
  SELECT first_name || ' ' || last_name INTO client_name
  FROM clients
  WHERE id = NEW.client_id;

  -- Determine notification content based on operation
  IF TG_OP = 'INSERT' THEN
    notification_title := 'New Shift Assignment';
    notification_message := 'You have been assigned a shift for ' || client_name || 
                          ' on ' || TO_CHAR(NEW.shift_date, 'Mon DD, YYYY') || 
                          ' from ' || NEW.start_time || ' to ' || NEW.end_time || '. Please confirm your availability.';
  ELSIF TG_OP = 'UPDATE' AND (OLD.shift_date != NEW.shift_date OR OLD.start_time != NEW.start_time OR OLD.end_time != NEW.end_time) THEN
    notification_title := 'Shift Updated';
    notification_message := 'Your shift for ' || client_name || 
                          ' has been updated to ' || TO_CHAR(NEW.shift_date, 'Mon DD, YYYY') || 
                          ' from ' || NEW.start_time || ' to ' || NEW.end_time || '. Please confirm.';
  ELSE
    RETURN NEW;
  END IF;

  -- Create notification for staff member
  IF staff_profile_id IS NOT NULL THEN
    INSERT INTO notifications (
      user_id,
      organization_id,
      type,
      title,
      message,
      priority,
      link,
      metadata
    )
    VALUES (
      staff_profile_id,
      NEW.organization_id,
      'shift',
      notification_title,
      notification_message,
      'high',
      '/nurse/dashboard/my-shifts',
      jsonb_build_object(
        'shift_id', NEW.id,
        'client_id', NEW.client_id,
        'confirmation_status', NEW.confirmation_status
      )
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new/updated shifts
DROP TRIGGER IF EXISTS on_staff_shift_change ON staff_shifts;
CREATE TRIGGER on_staff_shift_change
  AFTER INSERT OR UPDATE ON staff_shifts
  FOR EACH ROW
  EXECUTE FUNCTION notify_staff_shift_change();

-- Function to notify manager when staff confirms/declines
CREATE OR REPLACE FUNCTION notify_manager_shift_confirmation()
RETURNS TRIGGER AS $$
DECLARE
  staff_name TEXT;
  client_name TEXT;
  manager_id UUID;
  notification_title TEXT;
  notification_message TEXT;
BEGIN
  -- Only proceed if confirmation status changed
  IF TG_OP = 'UPDATE' AND OLD.confirmation_status = NEW.confirmation_status THEN
    RETURN NEW;
  END IF;

  -- Get staff member name
  SELECT first_name || ' ' || last_name INTO staff_name
  FROM staff_members
  WHERE id = NEW.staff_member_id;

  -- Get client name
  SELECT first_name || ' ' || last_name INTO client_name
  FROM clients
  WHERE id = NEW.client_id;

  -- Get organization owner/manager
  SELECT owner_id INTO manager_id
  FROM nurse_organizations
  WHERE id = NEW.organization_id;

  -- Determine notification content
  IF NEW.confirmation_status = 'accepted' THEN
    notification_title := 'Shift Confirmed';
    notification_message := staff_name || ' has accepted the shift for ' || client_name || 
                          ' on ' || TO_CHAR(NEW.shift_date, 'Mon DD, YYYY') || '.';
  ELSIF NEW.confirmation_status = 'declined' THEN
    notification_title := 'Shift Declined';
    notification_message := staff_name || ' has declined the shift for ' || client_name || 
                          ' on ' || TO_CHAR(NEW.shift_date, 'Mon DD, YYYY') || 
                          CASE WHEN NEW.decline_reason IS NOT NULL 
                               THEN '. Reason: ' || NEW.decline_reason 
                               ELSE '.' 
                          END;
  ELSE
    RETURN NEW;
  END IF;

  -- Create notification for manager
  IF manager_id IS NOT NULL THEN
    INSERT INTO notifications (
      user_id,
      organization_id,
      type,
      title,
      message,
      priority,
      link,
      metadata
    )
    VALUES (
      manager_id,
      NEW.organization_id,
      'shift',
      notification_title,
      notification_message,
      CASE WHEN NEW.confirmation_status = 'declined' THEN 'high' ELSE 'normal' END,
      '/nurse/dashboard/shifts',
      jsonb_build_object(
        'shift_id', NEW.id,
        'staff_member_id', NEW.staff_member_id,
        'confirmation_status', NEW.confirmation_status
      )
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for confirmation changes
DROP TRIGGER IF EXISTS on_shift_confirmation_change ON staff_shifts;
CREATE TRIGGER on_shift_confirmation_change
  AFTER UPDATE ON staff_shifts
  FOR EACH ROW
  EXECUTE FUNCTION notify_manager_shift_confirmation();