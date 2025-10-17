-- Enable RLS on notifications if not already enabled
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Add delete policy for notifications
CREATE POLICY "Users can delete own notifications"
ON public.notifications
FOR DELETE
USING (auth.uid() = user_id);

-- Create storage bucket for care log attachments if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('care-logs', 'care-logs', false)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for care logs
CREATE POLICY "Users can view own care log files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'care-logs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload care log files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'care-logs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update own care log files"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'care-logs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own care log files"
ON storage.objects
FOR DELETE
USING (bucket_id = 'care-logs' AND auth.uid()::text = (storage.foldername(name))[1]);