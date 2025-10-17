-- Create function to automatically create notifications for reminders
CREATE OR REPLACE FUNCTION create_reminder_notification()
RETURNS TRIGGER AS $$
DECLARE
  client_name text;
  assigned_user_id uuid;
BEGIN
  -- Get client name
  SELECT first_name || ' ' || last_name INTO client_name
  FROM clients
  WHERE id = NEW.client_id;

  -- Determine who to notify
  assigned_user_id := COALESCE(NEW.assigned_to, NEW.created_by);

  -- Create notification for newly created or updated reminder
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.status != NEW.status) THEN
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
      assigned_user_id,
      NEW.organization_id,
      'reminder',
      CASE 
        WHEN TG_OP = 'INSERT' THEN 'New Reminder: ' || NEW.title
        WHEN NEW.status = 'completed' THEN 'Reminder Completed: ' || NEW.title
        ELSE 'Reminder Updated: ' || NEW.title
      END,
      'Reminder for ' || client_name || ' on ' || TO_CHAR(NEW.reminder_date, 'Mon DD, YYYY') || 
      CASE WHEN NEW.reminder_time IS NOT NULL THEN ' at ' || NEW.reminder_time::text ELSE '' END,
      NEW.priority,
      '/nurse/dashboard/clients/' || NEW.client_id || '?tab=reminders',
      jsonb_build_object(
        'reminder_id', NEW.id,
        'client_id', NEW.client_id,
        'reminder_type', NEW.reminder_type,
        'reminder_date', NEW.reminder_date,
        'status', NEW.status
      )
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new reminders
DROP TRIGGER IF EXISTS on_reminder_created ON client_reminders;
CREATE TRIGGER on_reminder_created
  AFTER INSERT OR UPDATE ON client_reminders
  FOR EACH ROW
  EXECUTE FUNCTION create_reminder_notification();

-- Create function to check for due and overdue reminders (called by cron)
CREATE OR REPLACE FUNCTION check_due_reminders()
RETURNS void AS $$
DECLARE
  reminder_record RECORD;
  client_name text;
BEGIN
  -- Check for reminders due today that haven't been notified
  FOR reminder_record IN
    SELECT cr.*, c.first_name || ' ' || c.last_name as client_name
    FROM client_reminders cr
    JOIN clients c ON c.id = cr.client_id
    WHERE cr.reminder_date = CURRENT_DATE
    AND cr.status = 'pending'
    AND NOT EXISTS (
      SELECT 1 FROM notifications n
      WHERE n.metadata->>'reminder_id' = cr.id::text
      AND n.title LIKE '%Due Today%'
      AND n.created_at::date = CURRENT_DATE
    )
  LOOP
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
      COALESCE(reminder_record.assigned_to, reminder_record.created_by),
      reminder_record.organization_id,
      'reminder',
      '🔔 Due Today: ' || reminder_record.title,
      'Reminder for ' || reminder_record.client_name || 
      CASE WHEN reminder_record.reminder_time IS NOT NULL 
        THEN ' at ' || reminder_record.reminder_time::text 
        ELSE '' 
      END,
      'high',
      '/nurse/dashboard/clients/' || reminder_record.client_id || '?tab=reminders',
      jsonb_build_object(
        'reminder_id', reminder_record.id,
        'client_id', reminder_record.client_id,
        'reminder_type', reminder_record.reminder_type,
        'reminder_date', reminder_record.reminder_date,
        'status', 'due_today'
      )
    );
  END LOOP;

  -- Check for overdue reminders
  FOR reminder_record IN
    SELECT cr.*, c.first_name || ' ' || c.last_name as client_name
    FROM client_reminders cr
    JOIN clients c ON c.id = cr.client_id
    WHERE cr.reminder_date < CURRENT_DATE
    AND cr.status = 'pending'
    AND NOT EXISTS (
      SELECT 1 FROM notifications n
      WHERE n.metadata->>'reminder_id' = cr.id::text
      AND n.title LIKE '%Overdue%'
      AND n.created_at::date = CURRENT_DATE
    )
  LOOP
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
      COALESCE(reminder_record.assigned_to, reminder_record.created_by),
      reminder_record.organization_id,
      'reminder',
      '⚠️ Overdue: ' || reminder_record.title,
      'Reminder for ' || reminder_record.client_name || ' was due on ' || 
      TO_CHAR(reminder_record.reminder_date, 'Mon DD, YYYY'),
      'urgent',
      '/nurse/dashboard/clients/' || reminder_record.client_id || '?tab=reminders',
      jsonb_build_object(
        'reminder_id', reminder_record.id,
        'client_id', reminder_record.client_id,
        'reminder_type', reminder_record.reminder_type,
        'reminder_date', reminder_record.reminder_date,
        'status', 'overdue'
      )
    );
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;