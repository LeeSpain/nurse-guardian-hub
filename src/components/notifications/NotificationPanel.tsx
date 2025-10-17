import React, { useState } from 'react';
import { Bell, Check, X, Calendar, Users, AlertCircle, FileText, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { useNotifications } from '@/hooks/useNotifications';

const NotificationPanel: React.FC = () => {
  const { 
    notifications, 
    loading, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useNotifications();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const getIcon = (type: string) => {
    const icons: Record<string, any> = {
      appointment: Calendar,
      shift: Users,
      system: AlertCircle,
      message: FileText,
      reminder: Bell,
    };
    return icons[type] || Bell;
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      high: 'text-red-600 bg-red-50',
      normal: 'text-blue-600 bg-blue-50',
      low: 'text-gray-600 bg-gray-50',
    };
    return colors[priority] || colors.normal;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 bg-background z-50" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-foreground">Notifications</h3>
          <Link to="/nurse/dashboard/notifications">
            <Button variant="ghost" size="sm">
              <ExternalLink size={16} className="mr-2" />
              View All
            </Button>
          </Link>
        </div>

        <div className="p-2 border-b">
          <Tabs value={filter} onValueChange={setFilter} className="w-full">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="reminder" className="text-xs">
                <Bell size={14} />
              </TabsTrigger>
              <TabsTrigger value="appointment" className="text-xs">
                <Calendar size={14} />
              </TabsTrigger>
              <TabsTrigger value="shift" className="text-xs">
                <Users size={14} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {unreadCount > 0 && (
          <div className="px-4 py-2 border-b bg-muted/30">
            <Button variant="ghost" size="sm" onClick={() => markAllAsRead()} className="w-full justify-start">
              <Check size={16} className="mr-2" />
              Mark all {unreadCount} as read
            </Button>
          </div>
        )}

        <ScrollArea className="h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Bell size={48} className="mb-2 opacity-50" />
              <p className="text-sm">No {filter !== 'all' ? filter : ''} notifications</p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredNotifications.slice(0, 10).map((notification) => {
                const IconComponent = getIcon(notification.type);
                
                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-muted/50 transition-colors ${
                      !notification.is_read ? 'bg-muted/30' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getPriorityColor(notification.priority)} bg-opacity-10`}>
                        <IconComponent size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-sm text-foreground">
                            {notification.title}
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X size={14} />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(notification.created_at), {
                              addSuffix: true,
                            })}
                          </span>
                          {!notification.is_read && (
                            <Button
                              variant="link"
                              size="sm"
                              className="h-auto p-0 text-xs"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          )}
                          {notification.link && (
                            <Link 
                              to={notification.link}
                              className="text-xs text-primary hover:underline"
                              onClick={() => {
                                if (!notification.is_read) {
                                  markAsRead(notification.id);
                                }
                                setOpen(false);
                              }}
                            >
                              View →
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPanel;
