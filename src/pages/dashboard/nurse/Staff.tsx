import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { Users, Plus, Search, Filter, UserPlus, Award, Calendar } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const Staff: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  
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

  // Mock data - will be replaced with actual data from Supabase
  const staffMembers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      job_title: 'Senior Care Assistant',
      employment_type: 'full_time',
      hourly_rate: 18.50,
      is_active: true,
      qualifications: ['NVQ Level 3', 'First Aid'],
      shifts_this_week: 5,
    },
    {
      id: '2',
      name: 'Michael Chen',
      job_title: 'Staff Nurse',
      employment_type: 'part_time',
      hourly_rate: 22.00,
      is_active: true,
      qualifications: ['RN License', 'Medication Management'],
      shifts_this_week: 3,
    },
  ];

  const filteredStaff = staffMembers.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.job_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEmploymentBadge = (type: string) => {
    const variants: Record<string, string> = {
      full_time: 'bg-green-100 text-green-800',
      part_time: 'bg-blue-100 text-blue-800',
      casual: 'bg-yellow-100 text-yellow-800',
      agency: 'bg-purple-100 text-purple-800',
    };
    return variants[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
            <p className="text-muted-foreground">Manage your care team and assignments</p>
          </div>
          
          <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
            <DialogTrigger asChild>
              <Button variant="nurse" size="md" icon={<UserPlus size={16} />}>
                Add Staff Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Staff Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input placeholder="Enter staff member's full name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Title</label>
                  <Input placeholder="e.g., Care Assistant, Staff Nurse" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Employment Type</label>
                    <select className="w-full rounded-md border border-input px-3 py-2">
                      <option value="full_time">Full Time</option>
                      <option value="part_time">Part Time</option>
                      <option value="casual">Casual</option>
                      <option value="agency">Agency</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Hourly Rate (£)</label>
                    <Input type="number" step="0.50" placeholder="0.00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="staff@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input type="tel" placeholder="+44 7XXX XXXXXX" />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="nurse" className="flex-1">
                    Add Staff Member
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddStaffOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-3 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search staff by name or job title..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" icon={<Filter size={16} />}>
              Filters
            </Button>
          </div>
        </Card>

        {/* Staff Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Staff</p>
                <p className="text-2xl font-bold text-foreground">{staffMembers.length}</p>
              </div>
              <Users className="text-purple-600" size={32} />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Today</p>
                <p className="text-2xl font-bold text-foreground">
                  {staffMembers.filter(s => s.is_active).length}
                </p>
              </div>
              <Calendar className="text-green-600" size={32} />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Full Time</p>
                <p className="text-2xl font-bold text-foreground">
                  {staffMembers.filter(s => s.employment_type === 'full_time').length}
                </p>
              </div>
              <Award className="text-blue-600" size={32} />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Part Time</p>
                <p className="text-2xl font-bold text-foreground">
                  {staffMembers.filter(s => s.employment_type === 'part_time').length}
                </p>
              </div>
              <Award className="text-orange-600" size={32} />
            </div>
          </Card>
        </div>

        {/* Staff List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStaff.length === 0 ? (
            <Card className="p-12 lg:col-span-2 text-center">
              <Users className="text-muted-foreground mx-auto mb-4" size={48} />
              <h3 className="text-lg font-medium text-foreground mb-2">No staff members found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Try adjusting your search' : 'Add your first staff member to get started'}
              </p>
            </Card>
          ) : (
            filteredStaff.map((staff) => (
              <Card key={staff.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{staff.name}</h3>
                      <p className="text-sm text-muted-foreground">{staff.job_title}</p>
                    </div>
                  </div>
                  <Badge className={getEmploymentBadge(staff.employment_type)}>
                    {staff.employment_type.replace('_', ' ')}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-t">
                    <span className="text-sm text-muted-foreground">Hourly Rate</span>
                    <span className="font-medium text-foreground">£{staff.hourly_rate.toFixed(2)}/hr</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t">
                    <span className="text-sm text-muted-foreground">Shifts This Week</span>
                    <span className="font-medium text-foreground">{staff.shifts_this_week}</span>
                  </div>
                  <div className="py-2 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Qualifications</p>
                    <div className="flex flex-wrap gap-2">
                      {staff.qualifications.map((qual, idx) => (
                        <Badge key={idx} variant="secondary">
                          <Award size={12} className="mr-1" />
                          {qual}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button variant="outline" className="flex-1" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm">
                    View Schedule
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
  );
};

export default Staff;