import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useOrganization } from './useOrganization';
import { startOfMonth, subMonths, format } from 'date-fns';

interface MonthlyRevenue {
  month: string;
  amount: number;
}

interface ServiceRevenue {
  service_type: string;
  amount: number;
  percentage: number;
}

interface TopStaff {
  id: string;
  name: string;
  shifts: number;
  earnings: number;
}

interface ShiftStats {
  completed: number;
  cancelled: number;
  noShow: number;
  completionRate: number;
}

interface PeakHours {
  hour: number;
  count: number;
}

interface AnalyticsData {
  monthlyEarnings: number;
  totalShifts: number;
  activeClients: number;
  averageHourlyRate: number;
  monthlyRevenueData: MonthlyRevenue[];
  revenueByService: ServiceRevenue[];
  topStaff: TopStaff[];
  shiftStats: ShiftStats;
  peakHours: PeakHours[];
}

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { organization } = useOrganization();

  const fetchAnalytics = async () => {
    if (!organization?.id) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch monthly revenue for last 6 months
      const sixMonthsAgo = subMonths(startOfMonth(new Date()), 5);
      const { data: appointments, error: apptError } = await supabase
        .from('appointments')
        .select('appointment_date, total_cost, service_type, hourly_rate')
        .eq('nurse_id', organization.owner_id)
        .gte('appointment_date', sixMonthsAgo.toISOString())
        .eq('payment_status', 'paid');

      if (apptError) throw apptError;

      // Calculate monthly revenue
      const monthlyRevMap = new Map<string, number>();
      const serviceRevMap = new Map<string, number>();
      let totalRevenue = 0;
      let rateSum = 0;
      let rateCount = 0;

      appointments?.forEach((appt) => {
        const month = format(new Date(appt.appointment_date), 'MMM');
        monthlyRevMap.set(month, (monthlyRevMap.get(month) || 0) + Number(appt.total_cost));
        serviceRevMap.set(appt.service_type || 'Other', (serviceRevMap.get(appt.service_type || 'Other') || 0) + Number(appt.total_cost));
        totalRevenue += Number(appt.total_cost);
        if (appt.hourly_rate) {
          rateSum += Number(appt.hourly_rate);
          rateCount++;
        }
      });

      const monthlyRevenueData: MonthlyRevenue[] = Array.from(monthlyRevMap.entries()).map(([month, amount]) => ({
        month,
        amount
      }));

      const totalServiceRev = Array.from(serviceRevMap.values()).reduce((a, b) => a + b, 0);
      const revenueByService: ServiceRevenue[] = Array.from(serviceRevMap.entries()).map(([service_type, amount]) => ({
        service_type,
        amount,
        percentage: totalServiceRev > 0 ? (amount / totalServiceRev) * 100 : 0
      }));

      // Fetch shift statistics
      const { data: shifts, error: shiftsError } = await supabase
        .from('staff_shifts')
        .select('status, start_time, staff_member_id')
        .eq('organization_id', organization.id);

      if (shiftsError) throw shiftsError;

      const totalShifts = shifts?.length || 0;
      const completed = shifts?.filter(s => s.status === 'completed').length || 0;
      const cancelled = shifts?.filter(s => s.status === 'cancelled').length || 0;
      const noShow = shifts?.filter(s => s.status === 'no_show').length || 0;

      // Calculate peak hours
      const hourMap = new Map<number, number>();
      shifts?.forEach(shift => {
        const hour = parseInt(shift.start_time.split(':')[0]);
        hourMap.set(hour, (hourMap.get(hour) || 0) + 1);
      });

      const peakHours: PeakHours[] = Array.from(hourMap.entries())
        .map(([hour, count]) => ({ hour, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

      // Fetch active clients (unique clients in last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { data: recentAppts, error: clientError } = await supabase
        .from('appointments')
        .select('client_id')
        .eq('nurse_id', organization.owner_id)
        .gte('appointment_date', thirtyDaysAgo.toISOString());

      if (clientError) throw clientError;

      const uniqueClients = new Set(recentAppts?.map(a => a.client_id));

      // Fetch top earning staff
      const { data: staffShifts, error: staffError } = await supabase
        .from('staff_shifts')
        .select(`
          staff_member_id,
          start_time,
          end_time,
          status,
          staff_members (
            id,
            hourly_rate,
            profiles (
              first_name,
              last_name
            )
          )
        `)
        .eq('organization_id', organization.id)
        .eq('status', 'completed');

      if (staffError) throw staffError;

      const staffEarnings = new Map<string, { name: string; shifts: number; earnings: number }>();
      
      staffShifts?.forEach((shift: any) => {
        const staffId = shift.staff_member_id;
        const staff = shift.staff_members;
        if (!staff) return;

        const startTime = new Date(`2000-01-01T${shift.start_time}`);
        const endTime = new Date(`2000-01-01T${shift.end_time}`);
        const hours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        const earnings = hours * Number(staff.hourly_rate || 0);

        const current = staffEarnings.get(staffId) || {
          name: `${staff.profiles?.first_name || ''} ${staff.profiles?.last_name || ''}`.trim(),
          shifts: 0,
          earnings: 0
        };

        staffEarnings.set(staffId, {
          name: current.name,
          shifts: current.shifts + 1,
          earnings: current.earnings + earnings
        });
      });

      const topStaff: TopStaff[] = Array.from(staffEarnings.entries())
        .map(([id, data]) => ({ id, ...data }))
        .sort((a, b) => b.earnings - a.earnings)
        .slice(0, 5);

      // Calculate current month earnings
      const currentMonth = format(new Date(), 'MMM');
      const monthlyEarnings = monthlyRevMap.get(currentMonth) || 0;

      setAnalytics({
        monthlyEarnings,
        totalShifts,
        activeClients: uniqueClients.size,
        averageHourlyRate: rateCount > 0 ? rateSum / rateCount : 0,
        monthlyRevenueData,
        revenueByService,
        topStaff,
        shiftStats: {
          completed,
          cancelled,
          noShow,
          completionRate: totalShifts > 0 ? (completed / totalShifts) * 100 : 0
        },
        peakHours
      });
    } catch (err: any) {
      console.error('Error fetching analytics:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [organization?.id]);

  return { analytics, loading, error, refetch: fetchAnalytics };
};
