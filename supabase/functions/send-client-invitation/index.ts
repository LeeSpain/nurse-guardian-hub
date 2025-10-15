import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const resendKey = Deno.env.get('RESEND_API_KEY');

    if (!resendKey) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const { email, first_name, last_name, organization_id } = await req.json();

    console.log('Sending client invitation to:', email);

    // Get organization details
    const { data: orgData, error: orgError } = await supabase
      .from('nurse_organizations')
      .select('name')
      .eq('id', organization_id)
      .single();

    if (orgError) {
      console.error('Error fetching organization:', orgError);
      throw new Error('Organization not found');
    }

    // Get inviter's name
    const { data: profileData } = await supabase
      .from('profiles')
      .select('first_name, last_name')
      .eq('id', user.id)
      .single();

    const inviterName = profileData 
      ? `${profileData.first_name} ${profileData.last_name}`
      : 'Your care team';

    // Generate unique token
    const token = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

    // Create invitation record
    const { error: inviteError } = await supabase
      .from('client_invitations')
      .insert({
        organization_id,
        email,
        first_name,
        last_name,
        invited_by_name: inviterName,
        token,
        expires_at: expiresAt.toISOString(),
        invited_by: user.id,
        status: 'pending',
      });

    if (inviteError) {
      console.error('Error creating invitation:', inviteError);
      throw inviteError;
    }

    // Send email via Resend
    const resend = new Resend(resendKey);
    const onboardingLink = `${req.headers.get('origin')}/client/onboard?token=${token}`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
            .button { display: inline-block; padding: 14px 32px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            .info-box { background: #f8f9fa; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to ${orgData.name}</h1>
            </div>
            <div class="content">
              <p>Hi ${first_name || 'there'},</p>
              
              <p>${inviterName} has invited you to complete your client profile for ${orgData.name}.</p>
              
              <p>To get started with your care, please complete your information by clicking the button below:</p>
              
              <div style="text-align: center;">
                <a href="${onboardingLink}" class="button">Complete Your Profile</a>
              </div>
              
              <div class="info-box">
                <p><strong>What you'll need:</strong></p>
                <ul>
                  <li>Personal and contact information</li>
                  <li>NHS Number (UK clients) or NIE Number (Spain clients)</li>
                  <li>Medical history and current medications</li>
                  <li>Emergency contact details</li>
                  <li>GP details (if applicable)</li>
                </ul>
              </div>
              
              <p><strong>This invitation will expire in 7 days.</strong></p>
              
              <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
              
              <p>We look forward to supporting your care needs!</p>
              
              <p>Best regards,<br>${orgData.name}</p>
            </div>
            <div class="footer">
              <p>If you didn't expect this invitation, you can safely ignore this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { error: emailError } = await resend.emails.send({
      from: 'Care Team <onboarding@resend.dev>',
      to: [email],
      subject: `Complete Your Profile - ${orgData.name}`,
      html: emailHtml,
    });

    if (emailError) {
      console.error('Error sending email:', emailError);
      throw emailError;
    }

    console.log('Client invitation sent successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Invitation sent successfully',
        expires_at: expiresAt.toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in send-client-invitation:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});