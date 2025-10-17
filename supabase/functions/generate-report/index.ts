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

    // Get auth token
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { reportType, startDate, endDate, organizationId } = await req.json();

    console.log(`Generating ${reportType} report from ${startDate} to ${endDate}`);

    let reportData: any = {};
    let reportContent = '';

    switch (reportType) {
      case 'timesheet':
        reportData = await generateTimesheetReport(supabase, organizationId, startDate, endDate);
        reportContent = formatTimesheetCSV(reportData);
        break;
      
      case 'care-plan':
        reportData = await generateCarePlanReport(supabase, organizationId, startDate, endDate);
        reportContent = formatCarePlanCSV(reportData);
        break;
      
      case 'financial':
        reportData = await generateFinancialReport(supabase, organizationId, startDate, endDate);
        reportContent = formatFinancialCSV(reportData);
        break;
      
      case 'visits':
        reportData = await generateVisitsReport(supabase, organizationId, startDate, endDate);
        reportContent = formatVisitsCSV(reportData);
        break;
      
      default:
        return new Response(JSON.stringify({ error: 'Invalid report type' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    return new Response(reportContent, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${reportType}-report-${startDate}-to-${endDate}.csv"`,
      },
    });
  } catch (error: any) {
    console.error('Error generating report:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function generateTimesheetReport(supabase: any, organizationId: string, startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from('staff_shifts')
    .select(`
      *,
      staff_members!inner(first_name, last_name),
      clients!inner(first_name, last_name)
    `)
    .eq('organization_id', organizationId)
    .gte('shift_date', startDate)
    .lte('shift_date', endDate)
    .order('shift_date', { ascending: true });

  if (error) throw error;
  return data;
}

async function generateCarePlanReport(supabase: any, organizationId: string, startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from('care_plans')
    .select(`
      *,
      clients!inner(first_name, last_name)
    `)
    .eq('organization_id', organizationId)
    .gte('start_date', startDate)
    .lte('start_date', endDate)
    .order('start_date', { ascending: true });

  if (error) throw error;
  return data;
}

async function generateFinancialReport(supabase: any, organizationId: string, startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from('invoices')
    .select(`
      *,
      clients!inner(first_name, last_name)
    `)
    .eq('organization_id', organizationId)
    .gte('billing_period_start', startDate)
    .lte('billing_period_end', endDate)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

async function generateVisitsReport(supabase: any, organizationId: string, startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      clients!inner(first_name, last_name),
      staff_members(first_name, last_name)
    `)
    .eq('nurse_id', organizationId)
    .gte('appointment_date', startDate)
    .lte('appointment_date', endDate)
    .order('appointment_date', { ascending: true });

  if (error) throw error;
  return data;
}

function formatTimesheetCSV(data: any[]): string {
  const headers = 'Staff Name,Client Name,Date,Start Time,End Time,Hours,Rate,Total,Status\n';
  const rows = data.map(row => {
    const staffName = `${row.staff_members.first_name} ${row.staff_members.last_name}`;
    const clientName = `${row.clients.first_name} ${row.clients.last_name}`;
    const hours = row.duration_hours || 0;
    const rate = row.hourly_rate || 0;
    const total = hours * rate;
    return `"${staffName}","${clientName}","${row.shift_date}","${row.start_time}","${row.end_time}",${hours},${rate},${total},"${row.status}"`;
  }).join('\n');
  return headers + rows;
}

function formatCarePlanCSV(data: any[]): string {
  const headers = 'Client Name,Plan Title,Start Date,Review Date,Status,Goals Count\n';
  const rows = data.map(row => {
    const clientName = `${row.clients.first_name} ${row.clients.last_name}`;
    const goalsCount = Array.isArray(row.goals) ? row.goals.length : 0;
    return `"${clientName}","${row.title}","${row.start_date}","${row.review_date}","${row.status}",${goalsCount}`;
  }).join('\n');
  return headers + rows;
}

function formatFinancialCSV(data: any[]): string {
  const headers = 'Invoice Number,Client Name,Period Start,Period End,Total Hours,Total Amount,Status,Due Date\n';
  const rows = data.map(row => {
    const clientName = `${row.clients.first_name} ${row.clients.last_name}`;
    return `"${row.invoice_number}","${clientName}","${row.billing_period_start}","${row.billing_period_end}",${row.total_hours},${row.total_amount},"${row.status}","${row.due_date}"`;
  }).join('\n');
  return headers + rows;
}

function formatVisitsCSV(data: any[]): string {
  const headers = 'Client Name,Staff Name,Date,Start Time,End Time,Status,Duration,Cost\n';
  const rows = data.map(row => {
    const clientName = `${row.clients.first_name} ${row.clients.last_name}`;
    const staffName = row.staff_members ? `${row.staff_members.first_name} ${row.staff_members.last_name}` : 'Unassigned';
    const duration = row.duration_minutes || 0;
    return `"${clientName}","${staffName}","${row.appointment_date}","${row.start_time}","${row.end_time}","${row.status}",${duration},${row.total_cost}`;
  }).join('\n');
  return headers + rows;
}
