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
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { token, client_data } = await req.json();

    console.log('[UPDATE-CLIENT] Validating token for profile update');

    // Validate the invitation token
    const { data: invitation, error: invitationError } = await supabase
      .from('client_invitations')
      .select('*')
      .eq('token', token)
      .eq('status', 'pending')
      .single();

    if (invitationError || !invitation) {
      console.error('[UPDATE-CLIENT] Invalid or expired token:', invitationError);
      return new Response(
        JSON.stringify({ error: 'Invalid or expired invitation token' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    // Check if invitation has expired
    const expiresAt = new Date(invitation.expires_at);
    if (expiresAt < new Date()) {
      console.error('[UPDATE-CLIENT] Token has expired');
      return new Response(
        JSON.stringify({ error: 'This invitation link has expired' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    console.log('[UPDATE-CLIENT] Looking for existing client with invitation_id:', invitation.id);

    // Find the client associated with this invitation
    const { data: existingClient, error: clientError } = await supabase
      .from('clients')
      .select('id')
      .eq('invitation_id', invitation.id)
      .single();

    if (clientError || !existingClient) {
      console.error('[UPDATE-CLIENT] Client not found for invitation:', clientError);
      return new Response(
        JSON.stringify({ error: 'Client record not found for this invitation' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404 
        }
      );
    }

    console.log('[UPDATE-CLIENT] Updating client:', existingClient.id);

    // Update the existing client record
    const { data: updatedClient, error: updateError } = await supabase
      .from('clients')
      .update({
        ...client_data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existingClient.id)
      .select()
      .single();

    if (updateError) {
      console.error('[UPDATE-CLIENT] Error updating client:', updateError);
      throw updateError;
    }

    // Mark the invitation as accepted
    await supabase
      .from('client_invitations')
      .update({ 
        status: 'accepted',
        accepted_at: new Date().toISOString()
      })
      .eq('id', invitation.id);

    console.log('[UPDATE-CLIENT] Client profile updated successfully');

    return new Response(
      JSON.stringify({ 
        success: true,
        client: updatedClient,
        message: 'Profile updated successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('[UPDATE-CLIENT] Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
