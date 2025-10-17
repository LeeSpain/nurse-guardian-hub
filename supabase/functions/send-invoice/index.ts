import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InvoiceEmailData {
  invoice_id: string;
  client_email: string;
  invoice_number: string;
  total_amount: number;
  due_date: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    // Verify user authentication
    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const { invoice_id } = await req.json();

    // Get invoice details using service role
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: invoice, error: invoiceError } = await supabaseAdmin
      .from('invoices')
      .select(`
        *,
        clients (
          email,
          first_name,
          last_name
        )
      `)
      .eq('id', invoice_id)
      .single();

    if (invoiceError || !invoice) {
      throw new Error('Invoice not found');
    }

    // Check if Resend API key is available
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.error('Resend API key not configured');
      throw new Error('Email service not configured');
    }

    const clientEmail = invoice.clients.email;
    const clientName = `${invoice.clients.first_name} ${invoice.clients.last_name}`;

    // Send email using Resend
    const emailBody = `
      <h1>Invoice ${invoice.invoice_number}</h1>
      <p>Dear ${clientName},</p>
      <p>Please find your invoice details below:</p>
      <ul>
        <li><strong>Invoice Number:</strong> ${invoice.invoice_number}</li>
        <li><strong>Total Amount:</strong> €${invoice.total_amount.toFixed(2)}</li>
        <li><strong>Due Date:</strong> ${new Date(invoice.due_date).toLocaleDateString()}</li>
        <li><strong>Total Hours:</strong> ${invoice.total_hours}</li>
      </ul>
      <p>Please process payment by the due date.</p>
      <p>Thank you for your business!</p>
    `;

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'Healthcare Pro <noreply@healthcare.com>',
        to: [clientEmail],
        subject: `Invoice ${invoice.invoice_number} - Healthcare Services`,
        html: emailBody,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('Resend API error:', errorText);
      throw new Error('Failed to send email');
    }

    // Update invoice status to 'sent'
    const { error: updateError } = await supabaseAdmin
      .from('invoices')
      .update({ status: 'sent', updated_at: new Date().toISOString() })
      .eq('id', invoice_id);

    if (updateError) {
      console.error('Error updating invoice status:', updateError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Invoice sent successfully',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in send-invoice function:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'An error occurred',
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
