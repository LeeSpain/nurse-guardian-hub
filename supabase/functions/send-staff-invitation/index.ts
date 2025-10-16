import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InvitationRequest {
  email: string;
  first_name: string;
  last_name: string;
  job_title: string;
  organization_id: string;
  redirect_base_url?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get authorization token
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace("Bearer ", "")
    );

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { email, first_name, last_name, job_title, organization_id, redirect_base_url }: InvitationRequest = 
      await req.json();

    // Validate required fields
    if (!email || !first_name || !last_name || !job_title || !organization_id) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate unique token
    const token = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

    // Create invitation record
    const { data: invitation, error: inviteError } = await supabase
      .from("staff_invitations")
      .insert({
        organization_id,
        email,
        first_name,
        last_name,
        job_title,
        token,
        expires_at: expiresAt.toISOString(),
        invited_by: user.id,
      })
      .select()
      .single();

    if (inviteError) {
      console.error("Error creating invitation:", inviteError);
      return new Response(
        JSON.stringify({ error: inviteError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get organization name
    const { data: org } = await supabase
      .from("nurse_organizations")
      .select("name")
      .eq("id", organization_id)
      .single();

    const organizationName = org?.name || "the organization";

    // Send invitation email using Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY not found");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build invite link with priority: redirect_base_url > header fallback
    const baseUrl = redirect_base_url || 
                    `${req.headers.get('x-forwarded-proto') || 'https'}://${req.headers.get('x-forwarded-host') || req.headers.get('host')}`;
    const url = new URL('/staff/onboard', baseUrl);
    url.searchParams.set('token', token);
    const inviteLink = url.toString();

    console.log('Generated staff invite link:', inviteLink);
    console.log('Base URL used:', baseUrl);

    const resend = new Resend(resendApiKey);

    const emailResponse = await resend.emails.send({
      from: "Angels Nursing Care <team@angelsnursingcare.com>",
      to: [email],
      subject: `Join ${organizationName} – Complete Your Onboarding`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 30px; text-align: center; border-bottom: 3px solid #0066cc; }
            .content { background: #ffffff; padding: 30px; }
            .button { display: inline-block; background: #0066cc; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; background: #f8f9fa; }
            .highlight { background: #fff; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #0066cc; }
            .link-fallback { background: #f8f9fa; padding: 15px; margin: 20px 0; border-radius: 5px; }
            .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="color: #333; margin: 0;">Welcome to ${organizationName}!</h1>
            </div>
            <div class="content">
              <p>Hi ${first_name},</p>
              
              <p>You've been invited to join <strong>${organizationName}</strong> as a <strong>${job_title}</strong>.</p>
              
              <div class="highlight">
                <p style="margin: 0 0 10px 0;"><strong>Next Steps:</strong></p>
                <ol style="margin: 0; padding-left: 20px;">
                  <li>Click the button below to complete your onboarding</li>
                  <li>Fill in your professional details</li>
                  <li>Set up your account password</li>
                  <li>Upload any required documents</li>
                </ol>
              </div>
              
              <div style="text-align: center;">
                <a href="${inviteLink}" class="button">Complete Your Onboarding</a>
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
              
              <p>If you have any questions, feel free to reply to this email.</p>
              
              <p>Looking forward to having you on the team!</p>
            </div>
            <div class="footer">
              <p style="margin: 5px 0;">This invitation was sent by <strong>${organizationName}</strong></p>
              <p style="margin: 15px 0 5px 0;">Powered by Angels Nursing Care Platform</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        invitation_id: invitation.id,
        invite_link: inviteLink,
        message: "Invitation sent successfully" 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in send-staff-invitation:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);