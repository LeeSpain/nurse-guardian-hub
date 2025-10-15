-- Create invoices table for tracking client billing
CREATE TABLE public.invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_number TEXT NOT NULL UNIQUE,
  organization_id UUID NOT NULL REFERENCES public.nurse_organizations(id) ON DELETE CASCADE,
  client_id UUID NOT NULL,
  billing_period_start DATE NOT NULL,
  billing_period_end DATE NOT NULL,
  total_amount NUMERIC(10,2) NOT NULL,
  total_hours NUMERIC(6,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  due_date DATE NOT NULL,
  paid_date TIMESTAMPTZ,
  stripe_invoice_id TEXT,
  stripe_payment_intent TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create invoice line items table for detailed billing
CREATE TABLE public.invoice_line_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  staff_shift_id UUID REFERENCES public.staff_shifts(id),
  description TEXT NOT NULL,
  quantity NUMERIC(6,2) NOT NULL,
  rate NUMERIC(10,2) NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create payment transactions table
CREATE TABLE public.payment_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  payment_method TEXT NOT NULL,
  stripe_payment_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for invoices
CREATE POLICY "Organization members can view invoices"
ON public.invoices FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.nurse_organization_id = invoices.organization_id
  )
);

CREATE POLICY "Managers can create invoices"
ON public.invoices FOR INSERT
WITH CHECK (
  has_role(auth.uid(), 'owner'::app_role, organization_id) OR
  has_role(auth.uid(), 'manager'::app_role, organization_id)
);

CREATE POLICY "Managers can update invoices"
ON public.invoices FOR UPDATE
USING (
  has_role(auth.uid(), 'owner'::app_role, organization_id) OR
  has_role(auth.uid(), 'manager'::app_role, organization_id)
);

-- RLS Policies for invoice line items
CREATE POLICY "Organization members can view line items"
ON public.invoice_line_items FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM invoices
    JOIN user_roles ON user_roles.nurse_organization_id = invoices.organization_id
    WHERE invoices.id = invoice_line_items.invoice_id
    AND user_roles.user_id = auth.uid()
  )
);

CREATE POLICY "Managers can manage line items"
ON public.invoice_line_items FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM invoices
    WHERE invoices.id = invoice_line_items.invoice_id
    AND (
      has_role(auth.uid(), 'owner'::app_role, invoices.organization_id) OR
      has_role(auth.uid(), 'manager'::app_role, invoices.organization_id)
    )
  )
);

-- RLS Policies for payment transactions
CREATE POLICY "Organization members can view transactions"
ON public.payment_transactions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM invoices
    JOIN user_roles ON user_roles.nurse_organization_id = invoices.organization_id
    WHERE invoices.id = payment_transactions.invoice_id
    AND user_roles.user_id = auth.uid()
  )
);

CREATE POLICY "System can create transactions"
ON public.payment_transactions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Managers can update transactions"
ON public.payment_transactions FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM invoices
    WHERE invoices.id = payment_transactions.invoice_id
    AND (
      has_role(auth.uid(), 'owner'::app_role, invoices.organization_id) OR
      has_role(auth.uid(), 'manager'::app_role, invoices.organization_id)
    )
  )
);

-- Create trigger for updating invoice updated_at
CREATE TRIGGER update_invoices_updated_at
BEFORE UPDATE ON public.invoices
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for performance
CREATE INDEX idx_invoices_organization ON public.invoices(organization_id);
CREATE INDEX idx_invoices_client ON public.invoices(client_id);
CREATE INDEX idx_invoices_status ON public.invoices(status);
CREATE INDEX idx_invoice_line_items_invoice ON public.invoice_line_items(invoice_id);
CREATE INDEX idx_payment_transactions_invoice ON public.payment_transactions(invoice_id);