-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Clients can create appointments" ON public.appointments;

-- Create updated policy that allows both clients and nurses to create appointments
CREATE POLICY "Users can create appointments" 
ON public.appointments 
FOR INSERT 
WITH CHECK (
  auth.uid() = client_id OR auth.uid() = nurse_id
);