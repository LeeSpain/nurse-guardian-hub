-- Create storage buckets for different file types
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) VALUES 
('profile-images', 'profile-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
('documents', 'documents', false, 52428800, ARRAY['application/pdf', 'image/jpeg', 'image/png', 'text/plain']),
('appointment-files', 'appointment-files', false, 52428800, ARRAY['application/pdf', 'image/jpeg', 'image/png', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']);

-- Profile Images Policies (Public bucket)
CREATE POLICY "Avatar images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'profile-images');

CREATE POLICY "Users can upload their own avatar" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'profile-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own avatar" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'profile-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own avatar" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'profile-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Documents Policies (Private bucket)
CREATE POLICY "Users can view their own documents" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can upload their own documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own documents" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own documents" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Appointment Files Policies (Private bucket)
CREATE POLICY "Users can view appointment files for their appointments" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'appointment-files' 
  AND (
    -- File owner can view
    auth.uid()::text = (storage.foldername(name))[1]
    OR
    -- Participants in appointments can view files shared with their appointments
    EXISTS (
      SELECT 1 FROM appointments 
      WHERE appointments.id::text = (storage.foldername(name))[2]
      AND (appointments.client_id = auth.uid() OR appointments.nurse_id = auth.uid())
    )
  )
);

CREATE POLICY "Users can upload files for their appointments" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'appointment-files' 
  AND auth.uid()::text = (storage.foldername(name))[1]
  AND EXISTS (
    SELECT 1 FROM appointments 
    WHERE appointments.id::text = (storage.foldername(name))[2]
    AND (appointments.client_id = auth.uid() OR appointments.nurse_id = auth.uid())
  )
);

CREATE POLICY "Users can update their own appointment files" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'appointment-files' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own appointment files" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'appointment-files' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Enable realtime for messages table
ALTER TABLE public.messages REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.messages;