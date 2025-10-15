-- Break RLS recursion by removing cross-table references during SELECT

-- 1) Replace user_roles policies to avoid referencing nurse_organizations on SELECT
DROP POLICY IF EXISTS "Organization owners can manage roles" ON user_roles;

-- Helper function that bypasses RLS to check org ownership
CREATE OR REPLACE FUNCTION public.is_org_owner(_user_id uuid, _org_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.nurse_organizations no
    WHERE no.id = _org_id AND no.owner_id = _user_id
  );
$$;

-- Recreate granular policies for write operations only
CREATE POLICY "Owners can insert roles"
ON user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.is_org_owner(auth.uid(), nurse_organization_id));

CREATE POLICY "Owners can update roles"
ON user_roles
FOR UPDATE
TO authenticated
USING (public.is_org_owner(auth.uid(), nurse_organization_id));

CREATE POLICY "Owners can delete roles"
ON user_roles
FOR DELETE
TO authenticated
USING (public.is_org_owner(auth.uid(), nurse_organization_id));

-- Keep/select policy for viewing own roles (already exists, but ensure it does)
DROP POLICY IF EXISTS "Users can view own roles" ON user_roles;
CREATE POLICY "Users can view own roles"
ON user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 2) Update nurse_organizations view policy to use SECURITY DEFINER function for roles
DROP POLICY IF EXISTS "Users can view organizations they belong to" ON nurse_organizations;
CREATE POLICY "Users can view organizations they belong to"
ON nurse_organizations
FOR SELECT
TO authenticated
USING (
  owner_id = auth.uid()
  OR public.has_role(auth.uid(), 'owner', id)
  OR public.has_role(auth.uid(), 'manager', id)
  OR public.has_role(auth.uid(), 'staff_nurse', id)
);