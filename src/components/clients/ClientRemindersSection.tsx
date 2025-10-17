import { useState } from 'react';
import { useClientReminders, ReminderStatus } from '@/hooks/useClientReminders';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AddReminderModal } from './AddReminderModal';
import { Plus, Clock, CheckCircle2, XCircle, Bell } from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';

interface ClientRemindersSectionProps {
  clientId: string;
}

const priorityColors = {
  low: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
  medium: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-300',
  high: 'bg-orange-500/10 text-orange-700 dark:text-orange-300',
  urgent: 'bg-red-500/10 text-red-700 dark:text-red-300',
};

const statusColors = {
  pending: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-300',
  completed: 'bg-green-500/10 text-green-700 dark:text-green-300',
  cancelled: 'bg-gray-500/10 text-gray-700 dark:text-gray-300',
  snoozed: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
};

export const ClientRemindersSection = ({ clientId }: ClientRemindersSectionProps) => {
  const { reminders, loading, completeReminder, deleteReminder } = useClientReminders(clientId);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const pendingReminders = reminders.filter(r => r.status === 'pending');
  const completedReminders = reminders.filter(r => r.status === 'completed');

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-full mb-2" />
            <Skeleton className="h-3 w-2/3" />
          </Card>
        ))}
      </div>
    );
  }

  const ReminderCard = ({ reminder }: { reminder: any }) => {
    const reminderDate = new Date(reminder.reminder_date);
    const isOverdue = isPast(reminderDate) && reminder.status === 'pending';
    const isDueToday = isToday(reminderDate) && reminder.status === 'pending';

    return (
      <Card className={`p-4 hover:shadow-md transition-shadow ${isOverdue ? 'border-destructive' : ''}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h4 className="font-semibold text-sm">{reminder.title}</h4>
              <Badge className={priorityColors[reminder.priority as keyof typeof priorityColors]}>
                {reminder.priority}
              </Badge>
              {isOverdue && (
                <Badge variant="destructive" className="text-xs">
                  Overdue
                </Badge>
              )}
              {isDueToday && (
                <Badge className="text-xs bg-amber-500/10 text-amber-700 dark:text-amber-300">
                  Due Today
                </Badge>
              )}
            </div>
            {reminder.description && (
              <p className="text-sm text-muted-foreground mb-2">{reminder.description}</p>
            )}
            <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {format(reminderDate, 'PPP')}
                {reminder.reminder_time && ` at ${reminder.reminder_time}`}
              </span>
              <Badge variant="secondary" className="text-xs">
                {reminder.reminder_type.replace('_', ' ')}
              </Badge>
              {reminder.assigned_staff && (
                <span>
                  Assigned: {reminder.assigned_staff.first_name} {reminder.assigned_staff.last_name}
                </span>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {reminder.status === 'pending' && (
                <DropdownMenuItem onClick={() => completeReminder(reminder.id)}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark Complete
                </DropdownMenuItem>
              )}
              <DropdownMenuItem 
                onClick={() => deleteReminder(reminder.id)}
                className="text-destructive"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Reminders</h3>
        <Button onClick={() => setIsAddModalOpen(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Reminder
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Pending ({pendingReminders.length})
          </h4>
          {pendingReminders.length === 0 ? (
            <Card className="p-4 text-center">
              <p className="text-sm text-muted-foreground">No pending reminders</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {pendingReminders.map((reminder) => (
                <ReminderCard key={reminder.id} reminder={reminder} />
              ))}
            </div>
          )}
        </div>

        {completedReminders.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Completed ({completedReminders.length})
            </h4>
            <div className="space-y-3">
              {completedReminders.map((reminder) => (
                <ReminderCard key={reminder.id} reminder={reminder} />
              ))}
            </div>
          </div>
        )}
      </div>

      <AddReminderModal
        clientId={clientId}
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
      />
    </div>
  );
};
