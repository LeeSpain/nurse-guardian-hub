-- Fix the handle_new_user trigger to read the correct role field and create nurse_profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  user_role_value user_role;
BEGIN
  -- Get the role from metadata, defaulting to 'client'
  user_role_value := COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'client'::user_role);
  
  -- Insert into profiles table
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
    user_role_value,
    NEW.raw_user_meta_data->>'role',
    false
  );
  
  -- If the user is a nurse, create a nurse_profile entry
  IF user_role_value = 'nurse'::user_role THEN
    INSERT INTO public.nurse_profiles (
      id,
      user_id,
      profile_id,
      license_number,
      license_state,
      license_expiry,
      specialties,
      bio,
      years_experience,
      hourly_rate,
      is_available,
      rating,
      total_reviews
    )
    VALUES (
      NEW.id,
      NEW.id,
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'licenseNumber', 'PENDING'),
      COALESCE(NEW.raw_user_meta_data->>'licenseState', 'PENDING'),
      CURRENT_DATE + INTERVAL '1 year',
      COALESCE(
        ARRAY(SELECT jsonb_array_elements_text(NEW.raw_user_meta_data->'specialties')),
        ARRAY[]::text[]
      ),
      NULL,
      NULL,
      NULL,
      true,
      0,
      0
    );
  END IF;
  
  RETURN NEW;
END;
$function$;