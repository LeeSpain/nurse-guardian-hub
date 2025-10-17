-- Enable realtime for staff_shifts table
ALTER TABLE public.staff_shifts REPLICA IDENTITY FULL;

-- Add staff_shifts to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.staff_shifts;