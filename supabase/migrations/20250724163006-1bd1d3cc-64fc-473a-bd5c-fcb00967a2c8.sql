-- Create function to automatically create profiles on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  -- Create a profile for the new user
  INSERT INTO public.profiles (
    user_id,
    email,
    first_name,
    last_name,
    role
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'firstName', NEW.raw_user_meta_data ->> 'first_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'lastName', NEW.raw_user_meta_data ->> 'last_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'client')
  );
  
  -- If the user is a nurse, create a nurse profile
  IF (NEW.raw_user_meta_data ->> 'role') = 'nurse' THEN
    INSERT INTO public.nurse_profiles (
      user_id,
      profile_id,
      license_number,
      license_state,
      license_expiry
    ) VALUES (
      NEW.id,
      (SELECT id FROM public.profiles WHERE user_id = NEW.id),
      COALESCE(NEW.raw_user_meta_data ->> 'licenseNumber', 'PENDING'),
      COALESCE(NEW.raw_user_meta_data ->> 'licenseState', 'PENDING'),
      COALESCE((NEW.raw_user_meta_data ->> 'licenseExpiry')::date, (now() + interval '1 year')::date)
    );
  END IF;
  
  -- If the user is a client, create a client profile
  IF (NEW.raw_user_meta_data ->> 'role') = 'client' THEN
    INSERT INTO public.client_profiles (
      user_id,
      profile_id,
      emergency_contact_name,
      emergency_contact_phone
    ) VALUES (
      NEW.id,
      (SELECT id FROM public.profiles WHERE user_id = NEW.id),
      COALESCE(NEW.raw_user_meta_data ->> 'emergencyContactName', 'PENDING'),
      COALESCE(NEW.raw_user_meta_data ->> 'emergencyContactPhone', 'PENDING')
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profiles on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();