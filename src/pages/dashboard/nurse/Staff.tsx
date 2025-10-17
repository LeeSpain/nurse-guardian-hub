import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { Search, Plus, MoreVertical, Mail, Phone, Edit, Trash2, DollarSign, Award, Clock, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useStaff } from '@/hooks/useStaff';
import { useOrganization } from '@/hooks/useOrganization';
import { AddStaffModal } from '@/components/staff/AddStaffModal';
import { InviteStaffModal } from '@/components/staff/InviteStaffModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Staff: React.FC = () => {
  const { user, isAuthenticated, isLoading: userLoading } = useUser();
  const { organization, loading: orgLoading, createOrganization } = useOrganization();
  const { staff, loading: staffLoading, createStaff, deleteStaff } = useStaff(organization?.id);
  const [searchTerm, setSearchTerm] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<string | null>(null);
  const [editingStaff, setEditingStaff] = useState<any>(null);

  if (userLoading || orgLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== UserRole.NURSE) {
    return <Navigate to="/login" />;
  }

  const getEmploymentBadgeVariant = (type: string | null) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
      full_time: 'default',
      part_time: 'secondary',
      contract: 'outline',
      per_diem: 'outline',
    };
    return variants[type || ''] || 'default';
  };

  const getEmploymentLabel = (type: string | null) => {
    const labels: Record<string, string> = {
      full_time: 'Full Time',
      part_time: 'Part Time',
      contract: 'Contract',
      per_diem: 'Per Diem',
    };
    return labels[type || ''] || type || 'Unknown';
  };

  const getInitials = (firstName: string | null, lastName: string | null) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const getBackgroundCheckBadge = (status: string | null) => {
    if (!status) return null;
    
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: any }> = {
      cleared: { variant: 'default', icon: CheckCircle },
      in_progress: { variant: 'secondary', icon: Clock },
      pending: { variant: 'outline', icon: Clock },
      flagged: { variant: 'destructive', icon: AlertTriangle },
      expired: { variant: 'destructive', icon: AlertTriangle },
    };
    
    return variants[status] || { variant: 'outline', icon: Shield };
  };

  const filteredStaff = staff.filter(member => {
    const fullName = `${member.first_name || ''} ${member.last_name || ''}`.toLowerCase();
    const jobTitle = (member.job_title || '').toLowerCase();
    const email = (member.email || '').toLowerCase();
    const search = searchTerm.toLowerCase();
    return fullName.includes(search) || jobTitle.includes(search) || email.includes(search);
  });

  const confirmDelete = (id: string) => {
    setStaffToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (staffToDelete) {
      await deleteStaff(staffToDelete);
      setDeleteDialogOpen(false);
      setStaffToDelete(null);
    }
  };

  const activeStaff = staff.filter(s => s.is_active).length;
  const avgRate = staff.length > 0 
    ? (staff.reduce((sum, s) => sum + (s.hourly_rate || 0), 0) / staff.length).toFixed(2)
    : '0.00';

  if (!organization) {
    return (
      <div className="container mx-auto p-6">
        <Card className="p-8 text-center space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome to Your Dashboard</h2>
            <p className="text-muted-foreground">
              Let's get started by setting up your organization.
            </p>
          </div>
          <div className="max-w-md mx-auto space-y-4">
            <p className="text-sm text-muted-foreground">
              Your organization is the foundation for managing staff, clients, and schedules.
            </p>
            <Button
              variant="nurse"
              size="lg"
              className="w-full"
              onClick={async () => {
                try {
                  await createOrganization({
                    name: `${user?.firstName || 'My'}'s Practice`,
                    email: user?.email || null,
                  });
                } catch (error) {
                  console.error('Failed to create organization:', error);
                }
              }}
            >
              Create My Organization
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
          <p className="text-muted-foreground">Manage your team members</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            icon={<Mail size={16} />}
            onClick={() => setInviteModalOpen(true)}
          >
            Invite Staff
          </Button>
          <Button 
            variant="nurse" 
            icon={<Plus size={16} />}
            onClick={() => setAddModalOpen(true)}
          >
            Add Staff Member
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Staff</p>
              <p className="text-2xl font-bold text-foreground">{activeStaff}</p>
            </div>
            <Award className="text-primary" size={32} />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Hourly Rate</p>
              <p className="text-2xl font-bold text-foreground">€{avgRate}</p>
            </div>
            <DollarSign className="text-primary" size={32} />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Staff</p>
              <p className="text-2xl font-bold text-foreground">{staff.length}</p>
            </div>
            <Clock className="text-primary" size={32} />
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search by name or job title..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Card>

      {/* Staff Table */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Staff Members</h3>
        
        {staffLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredStaff.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {searchTerm ? 'No staff members found matching your search.' : 'No staff members yet. Add your first staff member to get started.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff Member</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Employment</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Compliance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((member) => {
                  const badgeConfig = getBackgroundCheckBadge(member.background_check_status);
                  const BadgeIcon = badgeConfig?.icon;
                  
                  return (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.profile?.avatar_url || undefined} />
                          <AvatarFallback>
                            {getInitials(member.first_name || null, member.last_name || null)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {member.first_name} {member.last_name}
                          </p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{member.job_title || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant={getEmploymentBadgeVariant(member.employment_type)}>
                        {getEmploymentLabel(member.employment_type)}
                      </Badge>
                    </TableCell>
                    <TableCell>€{member.hourly_rate?.toFixed(2) || '0.00'}/hr</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {member.background_check_status && badgeConfig && (
                          <Badge variant={badgeConfig.variant} className="flex items-center gap-1 w-fit">
                            <BadgeIcon size={12} />
                            {member.background_check_status.replace('_', ' ')}
                          </Badge>
                        )}
                        {member.right_to_work_verified && (
                          <Badge variant="default" className="flex items-center gap-1 w-fit">
                            <CheckCircle size={12} />
                            Right to Work
                          </Badge>
                        )}
                        {member.license_expiry && new Date(member.license_expiry) < new Date() && (
                          <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                            <AlertTriangle size={12} />
                            License Expired
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={member.is_active ? 'default' : 'secondary'}>
                        {member.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-background">
                          <DropdownMenuItem onClick={() => setEditingStaff(member)}>
                            <Edit className="mr-2" size={16} />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2" size={16} />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="mr-2" size={16} />
                            Call
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => confirmDelete(member.id)}
                          >
                            <Trash2 className="mr-2" size={16} />
                            Remove Staff
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <AddStaffModal
        open={addModalOpen || !!editingStaff}
        onOpenChange={(open) => {
          setAddModalOpen(open);
          if (!open) setEditingStaff(null);
        }}
        onSuccess={createStaff}
        organizationId={organization.id}
        editingStaff={editingStaff}
      />

      <InviteStaffModal
        open={inviteModalOpen}
        onOpenChange={setInviteModalOpen}
        organizationId={organization.id}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Staff Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this staff member? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Staff;