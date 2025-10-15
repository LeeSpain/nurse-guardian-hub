-- Add foreign key relationship between invoices and profiles
ALTER TABLE invoices
ADD CONSTRAINT invoices_client_id_fkey 
FOREIGN KEY (client_id) 
REFERENCES profiles(id) 
ON DELETE CASCADE;