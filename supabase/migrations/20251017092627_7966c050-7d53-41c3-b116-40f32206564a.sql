-- Performance optimization indices for faster queries
-- Add index on clients table for faster searches
CREATE INDEX IF NOT EXISTS idx_clients_name_search ON public.clients 
  USING gin(to_tsvector('english', first_name || ' ' || last_name));
CREATE INDEX IF NOT EXISTS idx_clients_organization ON public.clients(organization_id);
CREATE INDEX IF NOT EXISTS idx_clients_status ON public.clients(status);

-- Add index on staff_members table for faster searches
CREATE INDEX IF NOT EXISTS idx_staff_name_search ON public.staff_members 
  USING gin(to_tsvector('english', first_name || ' ' || last_name || ' ' || COALESCE(job_title, '')));
CREATE INDEX IF NOT EXISTS idx_staff_organization ON public.staff_members(organization_id);
CREATE INDEX IF NOT EXISTS idx_staff_active ON public.staff_members(is_active);

-- Add index on staff_shifts for faster date queries
CREATE INDEX IF NOT EXISTS idx_shifts_date ON public.staff_shifts(shift_date);
CREATE INDEX IF NOT EXISTS idx_shifts_staff_date ON public.staff_shifts(staff_member_id, shift_date);
CREATE INDEX IF NOT EXISTS idx_shifts_client_date ON public.staff_shifts(client_id, shift_date);
CREATE INDEX IF NOT EXISTS idx_shifts_status ON public.staff_shifts(status);

-- Add index on messages for faster conversation queries
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(conversation_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient ON public.messages(recipient_id);

-- Add index on care_logs for faster date queries
CREATE INDEX IF NOT EXISTS idx_care_logs_date ON public.care_logs(log_date, log_time);
CREATE INDEX IF NOT EXISTS idx_care_logs_client ON public.care_logs(client_id, log_date DESC);

-- Add index on appointments for faster date queries
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_nurse_date ON public.appointments(nurse_id, appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_client_date ON public.appointments(client_id, appointment_date);

-- Add index on invoices for faster date and status queries
CREATE INDEX IF NOT EXISTS idx_invoices_organization ON public.invoices(organization_id);
CREATE INDEX IF NOT EXISTS idx_invoices_client ON public.invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON public.invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_period ON public.invoices(billing_period_start, billing_period_end);