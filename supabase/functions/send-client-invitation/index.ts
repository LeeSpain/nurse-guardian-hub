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

    const { email, first_name, last_name, organization_id, redirect_base_url } = await req.json();

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

    // Build invite link with priority: redirect_base_url > header fallback
    const baseUrl = redirect_base_url || 
                    `${req.headers.get('x-forwarded-proto') || 'https'}://${req.headers.get('x-forwarded-host') || req.headers.get('host')}`;
    const url = new URL('/client/onboard', baseUrl);
    url.searchParams.set('token', token);
    const inviteLink = url.toString();

    console.log('Generated invite link:', inviteLink);
    console.log('Base URL used:', baseUrl);

    // Send email via Resend
    const resend = new Resend(resendKey);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 30px; text-align: center; border-bottom: 3px solid #0066cc; }
            .content { background: #ffffff; padding: 30px; }
            .button { display: inline-block; padding: 15px 30px; background: #0066cc; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; background: #f8f9fa; }
            .info-box { background: #f8f9fa; border-left: 4px solid #0066cc; padding: 15px; margin: 20px 0; }
            .link-fallback { background: #f8f9fa; padding: 15px; margin: 20px 0; border-radius: 5px; }
            .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="color: #333; margin: 0;">Welcome to ${orgData.name}</h1>
            </div>
            <div class="content">
              <p>Hi ${first_name || 'there'},</p>
              
              <p>You've been invited by <strong>${orgData.name}</strong> to complete your client profile.</p>
              
              <div style="text-align: center;">
                <a href="${inviteLink}" class="button">Complete Your Profile</a>
              </div>
              
              <div class="info-box">
                <p style="margin: 0 0 10px 0;"><strong>What you'll need:</strong></p>
                <ul style="margin: 0; padding-left: 20px;">
                  <li>Personal and contact information</li>
                  <li>NHS Number (UK) or NIE Number (Spain)</li>
                  <li>Medical history and current medications</li>
                  <li>Emergency contact details</li>
                  <li>GP details (if applicable)</li>
                </ul>
              </div>
              
              <div class="warning">
                <p style="margin: 0;"><strong>⏰ This invitation expires in 7 days.</strong></p>
              </div>
              
              <div class="link-fallback">
                <p style="font-size: 14px; color: #666; margin: 0 0 5px 0;">
                  <strong>If the button doesn't work, copy this link:</strong>
                </p>
                <p style="font-size: 13px; color: #0066cc; word-break: break-all; margin: 0;">
                  ${inviteLink}
                </p>
              </div>
              
              <p>If you have any questions, please don't hesitate to contact us.</p>
            </div>
            <div class="footer">
              <p style="margin: 5px 0;">This invitation was sent by <strong>${orgData.name}</strong></p>
              ${orgData.email ? `<p style="margin: 5px 0;">Contact: ${orgData.email}</p>` : ''}
              <p style="margin: 15px 0 5px 0;">Powered by Angels Nursing Care Platform</p>
              <p style="margin: 5px 0;">If you didn't expect this invitation, you can safely ignore this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { error: emailError } = await resend.emails.send({
      from: 'Angels Nursing Care <care@angelsnursingcare.com>',
      to: [email],
      subject: `Complete Your Profile – ${orgData.name}`,
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
        invite_link: inviteLink,
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