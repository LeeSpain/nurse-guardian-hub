-- Add profile_image_url and attachments columns to staff_members if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'staff_members' 
                 AND column_name = 'profile_image_url') THEN
    ALTER TABLE public.staff_members ADD COLUMN profile_image_url TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'staff_members' 
                 AND column_name = 'attachments') THEN
    ALTER TABLE public.staff_members ADD COLUMN attachments JSONB DEFAULT '[]'::jsonb;
  END IF;
END $$;