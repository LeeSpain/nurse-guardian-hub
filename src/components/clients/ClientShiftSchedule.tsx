import React, { useState } from 'react';
import { Calendar, Plus, CalendarDays, List } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Button from '@/components/ui-components/Button';
import { ClientShiftCard } from './ClientShiftCard';
import { CreateClientShiftModal } from './CreateClientShiftModal';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import { useClientShifts } from '@/hooks/useClientShifts';
import { useStaffShifts } from '@/hooks/useStaffShifts';
import { useStaff } from '@/hooks/useStaff';
import type { StaffShift } from '@/hooks/useStaffShifts';
import { format, addDays, isToday, isTomorrow, parseISO } from 'date-fns';

interface ClientShiftScheduleProps {
  clientId: string;
  clientName: string;
  organizationId: string;
}

export const ClientShiftSchedule: React.FC<ClientShiftScheduleProps> = ({
  clientId,
  clientName,
  organizationId,
}) => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  
  const { getNext7DaysShifts, getTodayShifts, loading } = useClientShifts(clientId, organizationId);
  const { createShift, updateShift, refetch } = useStaffShifts(organizationId);
  const { staff, loading: staffLoading } = useStaff(organizationId);

  console.log('ClientShiftSchedule - Modal state:', showCreateModal);
  console.log('ClientShiftSchedule - Staff count:', staff.length);

  const next7DaysShifts = getNext7DaysShifts();
  const todayShifts = getTodayShifts();

  const getDayLabel = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEEE');
  };

  const getShiftsForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return next7DaysShifts.filter(shift => shift.shift_date === dateStr);
  };

  const handleCreateShift = async (data: any) => {
    try {
      await createShift(data);
      await refetch();
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating shift:', error);
    }
  };

  const handleOpenModal = () => {
    console.log('Opening shift modal...');
    setShowCreateModal(true);
  };

  const handleEditShift = (shift: StaffShift) => {
    // Navigate to shifts page with edit mode
    navigate(`/nurse/dashboard/shifts?edit=${shift.id}`);
  };

  const handleCancelShift = async (shift: StaffShift) => {
    if (confirm('Are you sure you want to cancel this shift?')) {
      await updateShift(shift.id, { status: 'cancelled' });
      refetch();
    }
  };

  const handleViewStaff = (staffId: string) => {
    navigate(`/nurse/dashboard/staff/${staffId}`);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="text-lg font-semibold">7-Day Schedule</h3>
          <p className="text-sm text-muted-foreground">
            Showing shifts from {format(next7Days[0], 'MMM d')} to {format(next7Days[6], 'MMM d')}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-muted rounded-md p-1">
            <Button
              variant={viewMode === 'calendar' ? 'nurse' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('calendar')}
            >
              <CalendarDays className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'nurse' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            variant="nurse"
            onClick={handleOpenModal}
            disabled={staffLoading || staff.length === 0}
          >
            <Plus className="h-4 w-4 mr-2" />
            {staffLoading ? 'Loading...' : staff.length === 0 ? 'No Staff Available' : 'Schedule Shift'}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate(`/nurse/dashboard/calendar?client=${clientId}`)}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Full Calendar
          </Button>
        </div>
      </div>

      {/* Today's Shifts Highlight */}
      {todayShifts.length > 0 && (
        <Card className="p-4 border-primary bg-primary/5">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Today's Shifts ({todayShifts.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {todayShifts.map(shift => (
              <ClientShiftCard
                key={shift.id}
                shift={shift}
                onEdit={handleEditShift}
                onCancel={handleCancelShift}
                onViewStaff={handleViewStaff}
              />
            ))}
          </div>
        </Card>
      )}

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {next7Days.map((date, index) => {
            const dayShifts = getShiftsForDate(date);
            const isCurrentDay = isToday(date);
            
            return (
              <Card key={index} className={`p-4 ${isCurrentDay ? 'border-primary' : ''}`}>
                <div className="mb-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm">
                      {getDayLabel(date)}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {format(date, 'MMM d')}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {dayShifts.length} {dayShifts.length === 1 ? 'shift' : 'shifts'}
                  </div>
                </div>

                <div className="space-y-2">
                  {dayShifts.length > 0 ? (
                    dayShifts.map(shift => (
                      <ClientShiftCard
                        key={shift.id}
                        shift={shift}
                        onEdit={handleEditShift}
                        onCancel={handleCancelShift}
                        onViewStaff={handleViewStaff}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="text-sm mb-2">No shifts</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleOpenModal}
                        disabled={staffLoading || staff.length === 0}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {next7Days.map((date, index) => {
            const dayShifts = getShiftsForDate(date);
            if (dayShifts.length === 0) return null;
            
            return (
              <Card key={index} className="p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  {getDayLabel(date)} - {format(date, 'MMMM d, yyyy')}
                  <span className="text-sm font-normal text-muted-foreground">
                    ({dayShifts.length} {dayShifts.length === 1 ? 'shift' : 'shifts'})
                  </span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {dayShifts.map(shift => (
                    <ClientShiftCard
                      key={shift.id}
                      shift={shift}
                      onEdit={handleEditShift}
                      onCancel={handleCancelShift}
                      onViewStaff={handleViewStaff}
                    />
                  ))}
                </div>
              </Card>
            );
          })}

          {next7DaysShifts.length === 0 && (
            <Card className="p-8 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h4 className="font-semibold mb-2">No Shifts Scheduled</h4>
              <p className="text-sm text-muted-foreground mb-4">
                No shifts scheduled for the next 7 days
              </p>
              <Button
                variant="nurse"
                onClick={handleOpenModal}
                disabled={staffLoading || staff.length === 0}
              >
                <Plus className="h-4 w-4 mr-2" />
                {staffLoading ? 'Loading Staff...' : staff.length === 0 ? 'No Staff Available' : 'Schedule First Shift'}
              </Button>
            </Card>
          )}
        </div>
      )}

      {!staffLoading && (
        <CreateClientShiftModal
          open={showCreateModal}
          onOpenChange={setShowCreateModal}
          onSuccess={handleCreateShift}
          organizationId={organizationId}
          clientId={clientId}
          clientName={clientName}
          staff={staff}
        />
      )}
    </div>
  );
};
