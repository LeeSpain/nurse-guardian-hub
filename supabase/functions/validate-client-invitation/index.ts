import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

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
    
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { token } = await req.json();

    if (!token) {
      return new Response(
        JSON.stringify({ valid: false, error: 'Token is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    console.log('Validating client invitation token:', token);

    // Query invitation with organization details
    const { data: invitation, error: inviteError } = await supabase
      .from('client_invitations')
      .select(`
        *,
        organization:nurse_organizations(id, name)
      `)
      .eq('token', token)
      .single();

    if (inviteError || !invitation) {
      console.error('Invitation not found:', inviteError);
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'Invalid invitation link. Please check your email or contact support.' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404 
        }
      );
    }

    // Check if already accepted
    if (invitation.status === 'accepted') {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'This invitation has already been used.' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    // Check if expired
    const expiresAt = new Date(invitation.expires_at);
    if (expiresAt < new Date()) {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'This invitation has expired. Please contact your care provider for a new invitation.' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    console.log('Invitation validated successfully');

    return new Response(
      JSON.stringify({ 
        valid: true, 
        invitation: {
          id: invitation.id,
          first_name: invitation.first_name,
          last_name: invitation.last_name,
          email: invitation.email,
          organization_id: invitation.organization_id,
          organization_name: invitation.organization?.name,
          invited_by_name: invitation.invited_by_name,
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in validate-client-invitation:', error);
    return new Response(
      JSON.stringify({ valid: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});