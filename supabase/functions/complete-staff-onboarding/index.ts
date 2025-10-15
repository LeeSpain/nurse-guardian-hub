import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { token, password, staff_data } = await req.json();

    if (!token || !password || !staff_data) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate invitation
    const { data: invitation, error: inviteError } = await supabase
      .from("staff_invitations")
      .select("*")
      .eq("token", token)
      .single();

    if (inviteError || !invitation) {
      return new Response(
        JSON.stringify({ error: "Invalid invitation" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (invitation.status === "accepted") {
      return new Response(
        JSON.stringify({ error: "Invitation already used" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (new Date() > new Date(invitation.expires_at)) {
      return new Response(
        JSON.stringify({ error: "Invitation expired" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: invitation.email,
      password: password,
      email_confirm: true,
      user_metadata: {
        first_name: staff_data.first_name || invitation.first_name,
        last_name: staff_data.last_name || invitation.last_name,
        role: 'nurse'
      }
    });

    if (authError) {
      console.error("Auth creation error:", authError);
      return new Response(
        JSON.stringify({ error: authError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = authData.user.id;

    // Create profile
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        user_id: userId,
        email: invitation.email,
        first_name: staff_data.first_name || invitation.first_name,
        last_name: staff_data.last_name || invitation.last_name,
        user_role: 'nurse',
        role: 'nurse',
        phone: staff_data.phone,
        address: staff_data.address,
        city: staff_data.city,
        state: staff_data.state,
        zip_code: staff_data.postal_code,
        date_of_birth: staff_data.date_of_birth,
        avatar_url: staff_data.profile_image_url,
        is_verified: false,
      });

    if (profileError) {
      console.error("Profile creation error:", profileError);
    }

    // Create staff member record
    const { error: staffError } = await supabase
      .from("staff_members")
      .insert({
        profile_id: userId,
        organization_id: invitation.organization_id,
        invitation_id: invitation.id,
        first_name: staff_data.first_name || invitation.first_name,
        last_name: staff_data.last_name || invitation.last_name,
        email: invitation.email,
        phone: staff_data.phone,
        date_of_birth: staff_data.date_of_birth,
        address: staff_data.address,
        city: staff_data.city,
        state: staff_data.state,
        postal_code: staff_data.postal_code,
        national_id_number: staff_data.national_id_number,
        job_title: staff_data.job_title || invitation.job_title,
        employment_type: staff_data.employment_type,
        hourly_rate: staff_data.hourly_rate,
        start_date: staff_data.start_date,
        license_number: staff_data.license_number,
        license_type: staff_data.license_type,
        license_state: staff_data.license_state,
        license_expiry: staff_data.license_expiry,
        certifications: staff_data.certifications,
        professional_indemnity_insurance: staff_data.professional_indemnity_insurance,
        insurance_policy_number: staff_data.insurance_policy_number,
        insurance_expiry: staff_data.insurance_expiry,
        background_check_status: staff_data.background_check_status,
        background_check_date: staff_data.background_check_date,
        background_check_expiry: staff_data.background_check_expiry,
        dbs_number: staff_data.dbs_number,
        right_to_work_verified: staff_data.right_to_work_verified,
        right_to_work_document_type: staff_data.right_to_work_document_type,
        right_to_work_expiry: staff_data.right_to_work_expiry,
        emergency_contact_name: staff_data.emergency_contact_name,
        emergency_contact_relationship: staff_data.emergency_contact_relationship,
        emergency_contact_phone: staff_data.emergency_contact_phone,
        emergency_contact_email: staff_data.emergency_contact_email,
        professional_references: staff_data.professional_references,
        education_history: staff_data.education_history,
        qualifications: staff_data.qualifications,
        attachments: staff_data.attachments,
        profile_image_url: staff_data.profile_image_url,
        notes: staff_data.notes,
        is_active: true,
      });

    if (staffError) {
      console.error("Staff creation error:", staffError);
      return new Response(
        JSON.stringify({ error: staffError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create user role
    const { error: roleError } = await supabase
      .from("user_roles")
      .insert({
        user_id: userId,
        role: 'staff_nurse',
        nurse_organization_id: invitation.organization_id,
      });

    if (roleError) {
      console.error("Role creation error:", roleError);
    }

    // Update invitation status
    await supabase
      .from("staff_invitations")
      .update({
        status: "accepted",
        accepted_at: new Date().toISOString(),
      })
      .eq("id", invitation.id);

    // Create session for auto-login
    const { data: sessionData, error: sessionError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: invitation.email,
    });

    if (sessionError) {
      console.error("Session creation error:", sessionError);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Onboarding completed successfully",
        redirect_url: "/nurse/dashboard"
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in complete-staff-onboarding:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);