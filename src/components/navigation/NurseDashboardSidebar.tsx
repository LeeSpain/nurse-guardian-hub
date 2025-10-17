import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Calendar, Users, Clock, FileText, 
  ClipboardList, MessageSquare, Settings, BarChart3, 
  FileBarChart, LogOut, Bell, DollarSign, UserCircle, Pill
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useProfile } from '@/hooks/useProfile';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import Logo from '@/components/ui-components/Logo';
import Button from '@/components/ui-components/Button';
import NotificationPanel from '@/components/notifications/NotificationPanel';

const NurseDashboardSidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout, subscription } = useUser();
  const { profile } = useProfile();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const [pendingRemindersCount, setPendingRemindersCount] = useState(0);

  // Fetch pending reminders count
  useEffect(() => {
    const fetchPendingCount = async () => {
      if (!user?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('client_reminders')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'pending')
          .lte('reminder_date', new Date().toISOString().split('T')[0]);
        
        if (!error && data) {
          setPendingRemindersCount(data.length || 0);
        }
      } catch (error) {
        console.error('Error fetching reminders count:', error);
      }
    };
    
    fetchPendingCount();
    
    // Refresh count every minute
    const interval = setInterval(fetchPendingCount, 60000);
    return () => clearInterval(interval);
  }, [user?.id]);

  const navItems = [
    { path: '/nurse/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/nurse/dashboard/calendar', label: 'Calendar', icon: Calendar },
    { path: '/nurse/dashboard/staff', label: 'Staff', icon: Users },
    { path: '/nurse/dashboard/clients', label: 'Clients', icon: UserCircle },
    { path: '/nurse/dashboard/shifts', label: 'Shifts', icon: Clock },
    { path: '/nurse/dashboard/reminders', label: 'Reminders', icon: Bell, badge: pendingRemindersCount },
    { path: '/nurse/dashboard/care-plans', label: 'Care Plans', icon: FileText },
    { path: '/nurse/dashboard/care-logs', label: 'Care Logs', icon: ClipboardList },
    { path: '/nurse/dashboard/medications', label: 'Medications', icon: Pill },
    { path: '/nurse/dashboard/messages', label: 'Messages', icon: MessageSquare },
  ];

  const managementItems = [
    { path: '/nurse/dashboard/billing', label: 'Billing & Invoices', icon: DollarSign },
    { path: '/nurse/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/nurse/dashboard/reports', label: 'Reports', icon: FileBarChart },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Logo size="small" />
          {!collapsed && <span className="font-semibold text-foreground">HealthCare Pro</span>}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)}>
                    <NavLink to={item.path}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && (
                        <span className="flex items-center gap-2">
                          {item.label}
                          {item.badge && item.badge > 0 && (
                            <Badge variant="destructive" className="h-5 px-1.5 text-xs">
                              {item.badge > 9 ? '9+' : item.badge}
                            </Badge>
                          )}
                        </span>
                      )}
                      {collapsed && item.badge && item.badge > 0 && (
                        <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs">
                          {item.badge > 9 ? '9' : item.badge}
                        </Badge>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management */}
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)}>
                    <NavLink to={item.path}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        {!collapsed && (
          <div className="mb-3 px-2">
            <p className="text-sm font-medium text-foreground truncate">
              {profile?.first_name || user?.firstName || 'Healthcare Professional'}
            </p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            {subscription && (
              <p className="text-xs text-primary font-medium mt-1">
                {subscription.subscription_tier} Plan
              </p>
            )}
          </div>
        )}
        
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="px-2 py-1.5">
              <NotificationPanel />
            </div>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/nurse/dashboard/settings')}>
              <NavLink to="/nurse/dashboard/settings">
                <Settings className="h-4 w-4" />
                {!collapsed && <span>Settings</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button onClick={logout} className="w-full justify-start text-destructive hover:text-destructive">
                <LogOut className="h-4 w-4" />
                {!collapsed && <span>Logout</span>}
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default NurseDashboardSidebar;
