import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { Search, Plus, Filter, Download, MoreVertical, Mail, Phone, Edit, Trash2, UserPlus, Calendar, DollarSign, Award, Clock } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const Staff: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

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

  // Mock staff data - will be replaced with real data
  const staffMembers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@healthcare.com',
      phone: '+1 (555) 123-4567',
      avatar: null,
      job_title: 'Senior Registered Nurse',
      employment_type: 'full_time',
      hourly_rate: 45.00,
      start_date: '2023-01-15',
      is_active: true,
      qualifications: ['RN', 'BSN', 'ACLS'],
      total_shifts: 156,
      hours_this_month: 168,
      performance_rating: 4.8,
    },
    {
      id: '2',
      name: 'Mike Williams',
      email: 'mike.williams@healthcare.com',
      phone: '+1 (555) 234-5678',
      avatar: null,
      job_title: 'Licensed Practical Nurse',
      employment_type: 'part_time',
      hourly_rate: 32.00,
      start_date: '2023-03-20',
      is_active: true,
      qualifications: ['LPN', 'CPR'],
      total_shifts: 89,
      hours_this_month: 80,
      performance_rating: 4.5,
    },
    {
      id: '3',
      name: 'Emily Brown',
      email: 'emily.brown@healthcare.com',
      phone: '+1 (555) 345-6789',
      avatar: null,
      job_title: 'Certified Nursing Assistant',
      employment_type: 'full_time',
      hourly_rate: 28.00,
      start_date: '2023-05-10',
      is_active: true,
      qualifications: ['CNA', 'First Aid'],
      total_shifts: 124,
      hours_this_month: 160,
      performance_rating: 4.9,
    },
    {
      id: '4',
      name: 'David Martinez',
      email: 'david.martinez@healthcare.com',
      phone: '+1 (555) 456-7890',
      avatar: null,
      job_title: 'Registered Nurse',
      employment_type: 'contract',
      hourly_rate: 42.00,
      start_date: '2023-07-01',
      is_active: true,
      qualifications: ['RN', 'BLS'],
      total_shifts: 67,
      hours_this_month: 120,
      performance_rating: 4.6,
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      email: 'lisa.anderson@healthcare.com',
      phone: '+1 (555) 567-8901',
      avatar: null,
      job_title: 'Care Coordinator',
      employment_type: 'full_time',
      hourly_rate: 38.00,
      start_date: '2022-11-15',
      is_active: false,
      qualifications: ['RN', 'Case Management'],
      total_shifts: 203,
      hours_this_month: 0,
      performance_rating: 4.7,
    },
  ];

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.job_title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && staff.is_active) ||
                         (statusFilter === 'inactive' && !staff.is_active);
    return matchesSearch && matchesStatus;
  });

  const getEmploymentBadgeVariant = (type: string) => {
    const variants: Record<string, any> = {
      full_time: 'default',
      part_time: 'secondary',
      contract: 'outline',
    };
    return variants[type] || 'secondary';
  };

  const getEmploymentLabel = (type: string) => {
    const labels: Record<string, string> = {
      full_time: 'Full Time',
      part_time: 'Part Time',
      contract: 'Contract',
    };
    return labels[type] || type;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const activeStaff = staffMembers.filter(s => s.is_active).length;
  const totalHoursThisMonth = staffMembers.reduce((sum, s) => sum + s.hours_this_month, 0);
  const avgPerformance = (staffMembers.reduce((sum, s) => sum + s.performance_rating, 0) / staffMembers.length).toFixed(1);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
          <p className="text-muted-foreground">Manage your healthcare team members</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download size={16} />
            Export
          </Button>
          <Button size="sm" className="gap-2">
            <UserPlus size={16} />
            Add Staff Member
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <UserPlus className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Staff</p>
              <p className="text-2xl font-bold">{staffMembers.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Clock className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Staff</p>
              <p className="text-2xl font-bold">{activeStaff}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Calendar className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hours This Month</p>
              <p className="text-2xl font-bold">{totalHoursThisMonth}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Award className="text-amber-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Performance</p>
              <p className="text-2xl font-bold">{avgPerformance}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all">All ({staffMembers.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({activeStaff})</TabsTrigger>
              <TabsTrigger value="inactive">Inactive ({staffMembers.length - activeStaff})</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </Card>

      {/* Staff Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Staff Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Employment</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Hours (Month)</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.length > 0 ? (
                filteredStaff.map((staff) => (
                  <TableRow key={staff.id} className="hover:bg-accent/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={staff.avatar || undefined} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getInitials(staff.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{staff.name}</p>
                          <div className="flex flex-col gap-0.5 mt-1">
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Mail size={12} />
                              {staff.email}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Phone size={12} />
                              {staff.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{staff.job_title}</p>
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {staff.qualifications.slice(0, 2).map((qual, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {qual}
                            </Badge>
                          ))}
                          {staff.qualifications.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{staff.qualifications.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge variant={getEmploymentBadgeVariant(staff.employment_type)}>
                        {getEmploymentLabel(staff.employment_type)}
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign size={14} className="text-muted-foreground" />
                        <span className="font-medium">{staff.hourly_rate.toFixed(2)}/hr</span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-center">
                        <p className="font-semibold text-lg">{staff.hours_this_month}</p>
                        <p className="text-xs text-muted-foreground">{staff.total_shifts} total shifts</p>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary rounded-full h-2 transition-all"
                            style={{ width: `${(staff.performance_rating / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{staff.performance_rating}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge variant={staff.is_active ? 'default' : 'secondary'}>
                        {staff.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Edit size={14} />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Calendar size={14} />
                            View Schedule
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <DollarSign size={14} />
                            Payment History
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 size={14} />
                            Remove Staff
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <Search size={48} className="text-muted-foreground opacity-50" />
                      <p className="text-lg font-medium">No staff members found</p>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Staff;
