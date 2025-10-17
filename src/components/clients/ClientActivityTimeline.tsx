import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, Calendar, ClipboardList, HeartPulse, UserCheck, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface ActivityItem {
  id: string;
  type: 'note' | 'appointment' | 'care_plan' | 'care_log' | 'status_change';
  title: string;
  description: string;
  timestamp: string;
  created_by?: string;
  icon: any;
  color: string;
}

interface ClientActivityTimelineProps {
  clientId: string;
}

const activityConfig = {
  note: { icon: FileText, color: 'bg-blue-500', label: 'Note' },
  appointment: { icon: Calendar, color: 'bg-green-500', label: 'Appointment' },
  care_plan: { icon: ClipboardList, color: 'bg-purple-500', label: 'Care Plan' },
  care_log: { icon: HeartPulse, color: 'bg-pink-500', label: 'Care Log' },
  status_change: { icon: UserCheck, color: 'bg-amber-500', label: 'Status Change' },
};

export const ClientActivityTimeline = ({ clientId }: ClientActivityTimelineProps) => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const [notes, appointments, carePlans, careLogs] = await Promise.all([
          supabase
            .from('client_notes')
            .select('id, title, note_type, created_at')
            .eq('client_id', clientId)
            .order('created_at', { ascending: false })
            .limit(10),
          supabase
            .from('appointments')
            .select('id, title, appointment_date, status, created_at')
            .eq('client_id', clientId)
            .order('created_at', { ascending: false })
            .limit(10),
          supabase
            .from('care_plans')
            .select('id, title, status, created_at')
            .eq('client_id', clientId)
            .order('created_at', { ascending: false })
            .limit(10),
          supabase
            .from('care_logs')
            .select('id, category, content, created_at')
            .eq('client_id', clientId)
            .order('created_at', { ascending: false })
            .limit(10),
        ]);

        const allActivities: ActivityItem[] = [
          ...(notes.data || []).map(note => ({
            id: note.id,
            type: 'note' as const,
            title: note.title,
            description: `${note.note_type} note created`,
            timestamp: note.created_at,
            icon: FileText,
            color: 'bg-blue-500',
          })),
          ...(appointments.data || []).map(apt => ({
            id: apt.id,
            type: 'appointment' as const,
            title: apt.title || 'Appointment',
            description: `${apt.status} - ${format(new Date(apt.appointment_date), 'PPP')}`,
            timestamp: apt.created_at,
            icon: Calendar,
            color: 'bg-green-500',
          })),
          ...(carePlans.data || []).map(plan => ({
            id: plan.id,
            type: 'care_plan' as const,
            title: plan.title,
            description: `Care plan ${plan.status}`,
            timestamp: plan.created_at,
            icon: ClipboardList,
            color: 'bg-purple-500',
          })),
          ...(careLogs.data || []).map(log => ({
            id: log.id,
            type: 'care_log' as const,
            title: log.category || 'Care Log',
            description: log.content.substring(0, 100) + '...',
            timestamp: log.created_at,
            icon: HeartPulse,
            color: 'bg-pink-500',
          })),
        ];

        allActivities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setActivities(allActivities.slice(0, 20));
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [clientId]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <Card className="p-8 text-center">
        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">No activity found</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => {
        const Icon = activity.icon;
        return (
          <div key={activity.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`${activity.color} p-2 rounded-full text-white`}>
                <Icon className="h-4 w-4" />
              </div>
              {index < activities.length - 1 && (
                <div className="w-0.5 flex-1 bg-border mt-2" />
              )}
            </div>
            <Card className="flex-1 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="font-semibold text-sm">{activity.title}</h4>
                <Badge variant="secondary" className="text-xs">
                  {activityConfig[activity.type].label}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{format(new Date(activity.timestamp), 'PPp')}</span>
                {activity.created_by && (
                  <>
                    <span>•</span>
                    <span>{activity.created_by}</span>
                  </>
                )}
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};
