-- Add missing columns to appointments table
ALTER TABLE public.appointments
ADD COLUMN title TEXT,
ADD COLUMN description TEXT,
ADD COLUMN service_type TEXT,
ADD COLUMN address TEXT,
ADD COLUMN duration_minutes INTEGER,
ADD COLUMN hourly_rate DECIMAL(10,2),
ADD COLUMN special_instructions TEXT,
ADD COLUMN cancellation_reason TEXT;

-- Add missing columns to profiles table
ALTER TABLE public.profiles
ADD COLUMN user_id UUID,
ADD COLUMN date_of_birth DATE,
ADD COLUMN profile_image_url TEXT,
ADD COLUMN role TEXT,
ADD COLUMN is_verified BOOLEAN DEFAULT false;

-- Set user_id to be the same as id for existing records
UPDATE public.profiles SET user_id = id WHERE user_id IS NULL;

-- Add missing columns to nurse_profiles table
ALTER TABLE public.nurse_profiles
ADD COLUMN user_id UUID,
ADD COLUMN profile_id UUID,
ADD COLUMN certifications TEXT[] DEFAULT '{}',
ADD COLUMN availability_schedule JSONB,
ADD COLUMN insurance_verified BOOLEAN DEFAULT false,
ADD COLUMN is_background_checked BOOLEAN DEFAULT false;

-- Set user_id and profile_id for nurse_profiles
UPDATE public.nurse_profiles SET user_id = id, profile_id = id WHERE user_id IS NULL;

-- Update the handle_new_user function to include new fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    user_id,
    email,
    first_name,
    last_name,
    user_role,
    role,
    is_verified
  )
  VALUES (
    NEW.id,
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    COALESCE((NEW.raw_user_meta_data->>'user_role')::user_role, 'client'::user_role),
    COALESCE(NEW.raw_user_meta_data->>'user_role', 'client'),
    false
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;