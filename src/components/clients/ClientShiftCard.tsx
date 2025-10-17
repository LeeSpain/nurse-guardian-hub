import React from 'react';
import { Clock, User, MoreVertical } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { StaffShift } from '@/hooks/useStaffShifts';

interface ClientShiftCardProps {
  shift: StaffShift;
  onEdit?: (shift: StaffShift) => void;
  onCancel?: (shift: StaffShift) => void;
  onViewStaff?: (staffId: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'scheduled':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'completed':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const ClientShiftCard: React.FC<ClientShiftCardProps> = ({
  shift,
  onEdit,
  onCancel,
  onViewStaff,
}) => {
  const staffName = shift.staff_member
    ? `${shift.staff_member.first_name || ''} ${shift.staff_member.last_name || ''}`.trim()
    : 'Unassigned';

  return (
    <Card className="p-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold text-sm">
              {shift.start_time.slice(0, 5)} - {shift.end_time.slice(0, 5)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <button
              onClick={() => onViewStaff?.(shift.staff_member_id)}
              className="text-sm hover:underline text-primary"
            >
              {staffName}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={getStatusColor(shift.status)}
            >
              {shift.status}
            </Badge>
            {shift.break_minutes > 0 && (
              <span className="text-xs text-muted-foreground">
                {shift.break_minutes} min break
              </span>
            )}
          </div>

          {shift.notes && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {shift.notes}
            </p>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit?.(shift)}>
              Edit Shift
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewStaff?.(shift.staff_member_id)}>
              View Staff Profile
            </DropdownMenuItem>
            {shift.status !== 'cancelled' && shift.status !== 'completed' && (
              <DropdownMenuItem 
                onClick={() => onCancel?.(shift)}
                className="text-destructive"
              >
                Cancel Shift
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};
