-- Add delete policy for appointments
CREATE POLICY "Users can delete own appointments" 
ON public.appointments 
FOR DELETE 
USING (auth.uid() = client_id OR auth.uid() = nurse_id);