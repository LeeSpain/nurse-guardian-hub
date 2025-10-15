import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { Calendar, Clock, Users, Plus, Filter, AlertCircle, CheckCircle } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';

const Shifts: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const [activeTab, setActiveTab] = useState('upcoming');
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-purple-600 border-r-transparent border-b-purple-600 border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!isAuthenticated || user?.role !== UserRole.NURSE) {
    return <Navigate to="/login" />;
  }

  // Mock data
  const upcomingShifts = [
    {
      id: '1',
      staff_name: 'Sarah Johnson',
      client_name: 'Mrs. Thompson',
      shift_date: new Date(2025, 9, 16),
      start_time: '09:00',
      end_time: '17:00',
      status: 'confirmed',
      break_minutes: 60,
    },
    {
      id: '2',
      staff_name: 'Michael Chen',
      client_name: 'Mr. Davis',
      shift_date: new Date(2025, 9, 16),
      start_time: '14:00',
      end_time: '22:00',
      status: 'scheduled',
      break_minutes: 30,
    },
  ];

  const swapRequests = [
    {
      id: '1',
      requesting_staff: 'Sarah Johnson',
      covering_staff: 'Michael Chen',
      original_shift_date: new Date(2025, 9, 18),
      reason: 'Doctor appointment',
      status: 'pending',
      created_at: new Date(2025, 9, 14),
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      scheduled: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
      no_show: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Shift Management</h1>
            <p className="text-muted-foreground">Manage staff schedules and shift swaps</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" icon={<Filter size={16} />}>
              Filter
            </Button>
            <Button variant="nurse" icon={<Plus size={16} />}>
              Create Shift
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Shifts</p>
                <p className="text-2xl font-bold text-foreground">8</p>
              </div>
              <Calendar className="text-purple-600" size={32} />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-foreground">42</p>
              </div>
              <Clock className="text-blue-600" size={32} />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Swaps</p>
                <p className="text-2xl font-bold text-foreground">{swapRequests.length}</p>
              </div>
              <AlertCircle className="text-yellow-600" size={32} />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">156</p>
              </div>
              <CheckCircle className="text-green-600" size={32} />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming Shifts</TabsTrigger>
            <TabsTrigger value="swaps">Swap Requests ({swapRequests.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingShifts.map((shift) => (
              <Card key={shift.id} className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-grow space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users size={20} className="text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{shift.staff_name}</h3>
                        <p className="text-sm text-muted-foreground">Caring for {shift.client_name}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-muted-foreground" />
                        <span>{format(shift.shift_date, 'EEE, MMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-muted-foreground" />
                        <span>{shift.start_time} - {shift.end_time}</span>
                      </div>
                      <div>
                        <Badge className={getStatusColor(shift.status)}>
                          {shift.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Break: {shift.break_minutes} minutes
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Cancel</Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="swaps" className="space-y-4">
            {swapRequests.length === 0 ? (
              <Card className="p-12 text-center">
                <CheckCircle className="text-muted-foreground mx-auto mb-4" size={48} />
                <h3 className="text-lg font-medium text-foreground mb-2">No pending swap requests</h3>
                <p className="text-muted-foreground">All shift swap requests have been processed</p>
              </Card>
            ) : (
              swapRequests.map((swap) => (
                <Card key={swap.id} className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Shift Swap Request</h3>
                        <p className="text-sm text-muted-foreground">
                          {format(swap.created_at, 'MMM d, yyyy')}
                        </p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Original Staff:</span>
                        <span className="text-sm">{swap.requesting_staff}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Covering Staff:</span>
                        <span className="text-sm">{swap.covering_staff || 'Not assigned'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Shift Date:</span>
                        <span className="text-sm">{format(swap.original_shift_date, 'MMM d, yyyy')}</span>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-sm font-medium mb-1">Reason:</p>
                        <p className="text-sm text-muted-foreground">{swap.reason}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="nurse" size="sm" className="flex-1">
                        <CheckCircle size={16} className="mr-1" />
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:bg-red-50">
                        Reject
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <Card className="p-12 text-center">
              <CheckCircle className="text-green-600 mx-auto mb-4" size={48} />
              <h3 className="text-lg font-medium text-foreground mb-2">156 Shifts Completed</h3>
              <p className="text-muted-foreground">View detailed completion history</p>
              <Button variant="outline" className="mt-4">View All</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  );
};

export default Shifts;