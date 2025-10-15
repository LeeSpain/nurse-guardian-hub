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
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { token, client_data } = await req.json();

    if (!token || !client_data) {
      return new Response(
        JSON.stringify({ error: 'Token and client data are required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    console.log('Processing client onboarding for token:', token);

    // Validate invitation
    const { data: invitation, error: inviteError } = await supabase
      .from('client_invitations')
      .select('*')
      .eq('token', token)
      .eq('status', 'pending')
      .single();

    if (inviteError || !invitation) {
      console.error('Invalid invitation:', inviteError);
      return new Response(
        JSON.stringify({ error: 'Invalid or expired invitation' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    // Check expiry
    if (new Date(invitation.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: 'Invitation has expired' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    // Create client record
    const { data: newClient, error: clientError } = await supabase
      .from('clients')
      .insert({
        ...client_data,
        organization_id: invitation.organization_id,
        invitation_id: invitation.id,
        status: client_data.status || 'active',
      })
      .select()
      .single();

    if (clientError) {
      console.error('Error creating client:', clientError);
      throw clientError;
    }

    // Update invitation status
    const { error: updateError } = await supabase
      .from('client_invitations')
      .update({ 
        status: 'accepted',
        accepted_at: new Date().toISOString()
      })
      .eq('id', invitation.id);

    if (updateError) {
      console.error('Error updating invitation:', updateError);
    }

    console.log('Client onboarding completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        client: newClient,
        message: 'Profile completed successfully!'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in complete-client-onboarding:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});