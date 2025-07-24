-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nurse_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nurse_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_professionals ENABLE ROW LEVEL SECURITY;

-- Create security definer functions to avoid infinite recursion
CREATE OR REPLACE FUNCTION public.get_current_user_id()
RETURNS UUID AS $$
  SELECT auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create RLS policies for profiles table
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Nurses can view client profiles for appointments" 
ON public.profiles 
FOR SELECT 
USING (
  role = 'client' AND 
  EXISTS (
    SELECT 1 FROM public.appointments 
    WHERE appointments.client_id = profiles.user_id 
    AND appointments.nurse_id = auth.uid()
  )
);

CREATE POLICY "Clients can view nurse profiles" 
ON public.profiles 
FOR SELECT 
USING (role = 'nurse');

-- Create RLS policies for nurse_profiles table
CREATE POLICY "Nurses can manage their own profile" 
ON public.nurse_profiles 
FOR ALL 
USING (user_id = auth.uid());

CREATE POLICY "Clients can view nurse profiles" 
ON public.nurse_profiles 
FOR SELECT 
TO authenticated
USING (true);

-- Create RLS policies for client_profiles table
CREATE POLICY "Clients can manage their own profile" 
ON public.client_profiles 
FOR ALL 
USING (user_id = auth.uid());

CREATE POLICY "Nurses can view client profiles for appointments" 
ON public.client_profiles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.appointments 
    WHERE appointments.client_id = client_profiles.user_id 
    AND appointments.nurse_id = auth.uid()
  )
);

-- Create RLS policies for appointments table
CREATE POLICY "Users can view their own appointments" 
ON public.appointments 
FOR SELECT 
USING (nurse_id = auth.uid() OR client_id = auth.uid());

CREATE POLICY "Nurses can update their appointments" 
ON public.appointments 
FOR UPDATE 
USING (nurse_id = auth.uid());

CREATE POLICY "Clients can create appointments" 
ON public.appointments 
FOR INSERT 
WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can update their appointments" 
ON public.appointments 
FOR UPDATE 
USING (client_id = auth.uid());

-- Create RLS policies for messages table
CREATE POLICY "Users can view their messages" 
ON public.messages 
FOR SELECT 
USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Users can send messages" 
ON public.messages 
FOR INSERT 
WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can update their sent messages" 
ON public.messages 
FOR UPDATE 
USING (sender_id = auth.uid() OR recipient_id = auth.uid());

-- Create RLS policies for reviews table
CREATE POLICY "Users can view public reviews" 
ON public.reviews 
FOR SELECT 
USING (is_public = true);

CREATE POLICY "Users can view their own reviews" 
ON public.reviews 
FOR SELECT 
USING (reviewer_id = auth.uid() OR reviewed_id = auth.uid());

CREATE POLICY "Users can create reviews for completed appointments" 
ON public.reviews 
FOR INSERT 
WITH CHECK (
  reviewer_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM public.appointments 
    WHERE appointments.id = reviews.appointment_id 
    AND (appointments.nurse_id = auth.uid() OR appointments.client_id = auth.uid())
    AND appointments.status = 'completed'
  )
);

CREATE POLICY "Users can update their own reviews" 
ON public.reviews 
FOR UPDATE 
USING (reviewer_id = auth.uid());

-- Create RLS policies for nurse_availability table
CREATE POLICY "Nurses can manage their availability" 
ON public.nurse_availability 
FOR ALL 
USING (nurse_id = auth.uid());

CREATE POLICY "Clients can view nurse availability" 
ON public.nurse_availability 
FOR SELECT 
TO authenticated
USING (is_available = true);

-- Create RLS policies for saved_professionals table
CREATE POLICY "Clients can manage their saved professionals" 
ON public.saved_professionals 
FOR ALL 
USING (client_id = auth.uid());

-- Update the search path function to be secure
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;