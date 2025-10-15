import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { FileText, Plus, Search, Filter, Clock, User } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { format, formatDistanceToNow } from 'date-fns';
import { useCareLogs } from '@/hooks/useCareLogs';

const CareLogs: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const { careLogs, stats, loading: logsLoading, error } = useCareLogs();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddLogOpen, setIsAddLogOpen] = useState(false);
  
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

  const filteredLogs = careLogs.filter(log =>
    log.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      observation: 'bg-blue-100 text-blue-800',
      medication: 'bg-purple-100 text-purple-800',
      activity: 'bg-green-100 text-green-800',
      incident: 'bg-red-100 text-red-800',
      general: 'bg-gray-100 text-gray-800',
      personal_care: 'bg-pink-100 text-pink-800',
      nutrition: 'bg-orange-100 text-orange-800',
      mobility: 'bg-teal-100 text-teal-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Daily Care Logs</h1>
            <p className="text-muted-foreground">Document client care and observations</p>
          </div>
          
          <Dialog open={isAddLogOpen} onOpenChange={setIsAddLogOpen}>
            <DialogTrigger asChild>
              <Button variant="nurse" icon={<Plus size={16} />}>
                Add Log Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add Care Log Entry</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Client</label>
                  <select className="w-full rounded-md border border-input px-3 py-2">
                    <option value="">Select client...</option>
                    <option value="1">Mrs. Thompson</option>
                    <option value="2">Mr. Davis</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full rounded-md border border-input px-3 py-2">
                    <option value="observation">Observation</option>
                    <option value="medication">Medication</option>
                    <option value="activity">Activity</option>
                    <option value="personal_care">Personal Care</option>
                    <option value="nutrition">Nutrition</option>
                    <option value="mobility">Mobility</option>
                    <option value="incident">Incident</option>
                    <option value="general">General</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Input type="date" defaultValue={format(new Date(), 'yyyy-MM-dd')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time</label>
                    <Input type="time" defaultValue={format(new Date(), 'HH:mm')} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Care Log Entry</label>
                  <Textarea
                    placeholder="Describe the care provided, observations, or any notable events..."
                    rows={5}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="nurse" className="flex-1">
                    Save Log Entry
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddLogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Recent Logs</p>
                {logsLoading ? <Skeleton className="h-8 w-16" /> : (
                  <p className="text-2xl font-bold text-foreground">{careLogs.length}</p>
                )}
              </div>
              <FileText className="text-purple-600" size={32} />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                {logsLoading ? <Skeleton className="h-8 w-16" /> : (
                  <p className="text-2xl font-bold text-foreground">{stats.weeklyLogs}</p>
                )}
              </div>
              <Clock className="text-blue-600" size={32} />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Clients Logged</p>
                {logsLoading ? <Skeleton className="h-8 w-12" /> : (
                  <p className="text-2xl font-bold text-foreground">{stats.clientsLogged}</p>
                )}
              </div>
              <User className="text-green-600" size={32} />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Incidents</p>
                {logsLoading ? <Skeleton className="h-8 w-12" /> : (
                  <p className="text-2xl font-bold text-foreground">{stats.incidents}</p>
                )}
              </div>
              <FileText className="text-orange-600" size={32} />
            </div>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="p-4 mb-6">
          <div className="flex gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-3 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search logs by client or content..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" icon={<Filter size={16} />}>
              Filter
            </Button>
          </div>
        </Card>

        {/* Timeline */}
        <div className="space-y-4">
          {filteredLogs.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="text-muted-foreground mx-auto mb-4" size={48} />
              <h3 className="text-lg font-medium text-foreground mb-2">No care logs found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Try adjusting your search' : 'Add your first care log entry'}
              </p>
            </Card>
          ) : (
            filteredLogs.map((log, index) => (
              <div key={log.id} className="flex gap-4">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  {index < filteredLogs.length - 1 && (
                    <div className="w-0.5 flex-grow bg-purple-200 my-2"></div>
                  )}
                </div>

                {/* Log Card */}
                <Card className="flex-grow p-6 mb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{log.client_name}</h3>
                        <Badge className={getCategoryColor(log.category)}>
                          {log.category.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        By {log.staff_name} • {formatDistanceToNow(log.created_at, { addSuffix: true })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{format(log.log_date, 'MMM d, yyyy')}</p>
                      <p className="text-sm text-muted-foreground">{log.log_time}</p>
                    </div>
                  </div>
                  
                  <p className="text-foreground">{log.content}</p>
                  
                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
  );
};

export default CareLogs;