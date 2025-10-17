import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { Bell, Check, CheckCheck, Trash2, Filter, Search, Calendar, Users, AlertCircle, FileText, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDistanceToNow, format } from 'date-fns';
import { toast } from 'sonner';

const Notifications: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const { 
    notifications, 
    loading, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useNotifications();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [view, setView] = useState<'unread' | 'all'>('unread');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== UserRole.NURSE) {
    return <Navigate to="/login" />;
  }

  const getIcon = (type: string) => {
    const icons: Record<string, any> = {
      appointment: Calendar,
      shift: Users,
      system: AlertCircle,
      message: MessageSquare,
      reminder: Bell,
    };
    const Icon = icons[type] || FileText;
    return Icon;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      urgent: 'bg-red-500',
      high: 'bg-orange-500',
      normal: 'bg-blue-500',
      low: 'bg-gray-500',
    };
    return colors[priority] || colors.normal;
  };

  const filteredNotifications = notifications.filter(notification => {
    if (view === 'unread' && notification.is_read) return false;
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      if (
        !notification.title.toLowerCase().includes(searchLower) &&
        !notification.message.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }
    
    if (selectedType !== 'all' && notification.type !== selectedType) {
      return false;
    }
    
    if (selectedPriority !== 'all' && notification.priority !== selectedPriority) {
      return false;
    }
    
    return true;
  });

  const unreadNotifications = filteredNotifications.filter(n => !n.is_read);
  const readNotifications = filteredNotifications.filter(n => n.is_read);

  const handleDeleteAll = async () => {
    if (!confirm('Are you sure you want to delete all notifications? This cannot be undone.')) {
      return;
    }
    
    try {
      for (const notification of notifications) {
        await deleteNotification(notification.id);
      }
      toast.success('All notifications deleted');
    } catch (error) {
      toast.error('Failed to delete notifications');
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bell className="h-8 w-8" />
            Notifications
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage all your notifications in one place
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button onClick={() => markAllAsRead()} variant="outline">
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark All Read ({unreadCount})
            </Button>
          )}
          {notifications.length > 0 && (
            <Button onClick={handleDeleteAll} variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete All
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">{notifications.length}</p>
            </div>
            <Bell className="h-8 w-8 text-primary" />
          </div>
        </Card>
        <Card className="p-4 border-primary bg-primary/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Unread</p>
              <p className="text-2xl font-bold">{unreadCount}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-primary" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">High Priority</p>
              <p className="text-2xl font-bold">
                {notifications.filter(n => n.priority === 'high' || n.priority === 'urgent').length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-orange-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Read</p>
              <p className="text-2xl font-bold">{notifications.length - unreadCount}</p>
            </div>
            <Check className="h-8 w-8 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="reminder">Reminders</SelectItem>
              <SelectItem value="appointment">Appointments</SelectItem>
              <SelectItem value="shift">Shifts</SelectItem>
              <SelectItem value="message">Messages</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger>
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Content */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : (
        <Tabs value={view} onValueChange={(v: any) => setView(v)}>
          <TabsList>
            <TabsTrigger value="unread">Unread ({unreadNotifications.length})</TabsTrigger>
            <TabsTrigger value="all">All ({filteredNotifications.length})</TabsTrigger>
          </TabsList>

          <TabsContent value={view} className="space-y-3 mt-4">
            {filteredNotifications.length === 0 ? (
              <Card className="p-12 text-center">
                <Bell className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No Notifications</h3>
                <p className="text-muted-foreground">
                  {view === 'unread' 
                    ? "You're all caught up! No unread notifications." 
                    : "You don't have any notifications yet."}
                </p>
              </Card>
            ) : (
              filteredNotifications.map((notification) => {
                const Icon = getIcon(notification.type);
                
                return (
                  <Card
                    key={notification.id}
                    className={`p-4 hover:shadow-md transition-all ${
                      !notification.is_read ? 'border-primary bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${getPriorityColor(notification.priority)} bg-opacity-10`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{notification.title}</h4>
                              {!notification.is_read && (
                                <Badge variant="default" className="text-xs">New</Badge>
                              )}
                              <Badge variant="outline" className="text-xs">
                                {notification.type}
                              </Badge>
                              <Badge className={`text-xs ${getPriorityColor(notification.priority)}`}>
                                {notification.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                          </div>
                          
                          <div className="flex gap-2">
                            {!notification.is_read && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>
                            {formatDistanceToNow(new Date(notification.created_at), {
                              addSuffix: true,
                            })}
                          </span>
                          <span>
                            {format(new Date(notification.created_at), 'MMM d, yyyy h:mm a')}
                          </span>
                          {notification.link && (
                            <Link 
                              to={notification.link} 
                              className="text-primary hover:underline"
                            >
                              View Details →
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Notifications;
