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

    const { email, first_name, last_name, job_title, organization_id }: InvitationRequest = 
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

    const resend = new Resend(resendApiKey);
    const onboardingUrl = `${Deno.env.get("SUPABASE_URL")?.replace(".supabase.co", "")}/staff/onboard?token=${token}`;

    const emailResponse = await resend.emails.send({
      from: "Nurse Guardian Hub <onboarding@resend.dev>",
      to: [email],
      subject: `You've been invited to join ${organizationName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            .highlight { background: #fff; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #667eea; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to ${organizationName}!</h1>
            </div>
            <div class="content">
              <p>Hi ${first_name},</p>
              
              <p>Great news! You've been invited to join <strong>${organizationName}</strong> as a <strong>${job_title}</strong>.</p>
              
              <div class="highlight">
                <p><strong>Next Steps:</strong></p>
                <ol>
                  <li>Click the button below to complete your onboarding</li>
                  <li>Fill in your professional details</li>
                  <li>Set up your account password</li>
                  <li>Upload any required documents</li>
                </ol>
              </div>
              
              <div style="text-align: center;">
                <a href="${onboardingUrl}" class="button">Complete Your Onboarding</a>
              </div>
              
              <p><small><strong>⏰ This invitation expires in 7 days.</strong></small></p>
              
              <p>If you have any questions, feel free to reply to this email.</p>
              
              <p>Looking forward to having you on the team!</p>
            </div>
            <div class="footer">
              <p>This is an automated email from Nurse Guardian Hub</p>
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