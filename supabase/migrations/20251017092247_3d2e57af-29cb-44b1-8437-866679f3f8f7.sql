-- Create storage bucket for message attachments
INSERT INTO storage.buckets (id, name, public) 
VALUES ('messages', 'messages', false)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for messages bucket
CREATE POLICY "Users can view message files they sent or received"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'messages' 
  AND (
    auth.uid()::text = (storage.foldername(name))[1]
    OR EXISTS (
      SELECT 1 FROM messages 
      WHERE messages.sender_id = auth.uid() OR messages.recipient_id = auth.uid()
    )
  )
);

CREATE POLICY "Users can upload message files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'messages'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update own message files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'messages'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete own message files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'messages'
  AND auth.uid()::text = (storage.foldername(name))[1]
);