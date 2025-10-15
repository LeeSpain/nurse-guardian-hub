-- Update existing test@example.com account to have nurse role
UPDATE profiles 
SET user_role = 'nurse', role = 'nurse' 
WHERE email = 'test@example.com';