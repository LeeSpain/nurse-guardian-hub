import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { Users, Search, Plus, MoreVertical, Calendar, Mail, Phone, RefreshCw } from 'lucide-react';
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
import { useClients, ClientStatus } from '@/hooks/useClients';
import { AddClientModal } from '@/components/clients/AddClientModal';
import { InviteClientModal } from '@/components/clients/InviteClientModal';

const Clients: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const { clients, loading: clientsLoading, createClient, updateClient, refetch } = useClients();
  const [searchTerm, setSearchTerm] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<ClientStatus | 'all'>('all');
  const navigate = useNavigate();
  
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

  const getInitials = (firstName: string | null, lastName: string | null) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const filteredClients = clients.filter(client => {
    const fullName = `${client.first_name || ''} ${client.last_name || ''}`.toLowerCase();
    const email = (client.email || '').toLowerCase();
    const search = searchTerm.toLowerCase();
    const matchesSearch = fullName.includes(search) || email.includes(search);
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusCounts = () => {
    return {
      all: clients.length,
      active: clients.filter(c => c.status === 'active').length,
      potential: clients.filter(c => c.status === 'potential').length,
      'on-hold': clients.filter(c => c.status === 'on-hold').length,
      discharged: clients.filter(c => c.status === 'discharged').length,
      archived: clients.filter(c => c.status === 'archived').length,
    };
  };

  const statusCounts = getStatusCounts();

  const getStatusBadgeVariant = (status: ClientStatus | null): 'default' | 'secondary' | 'outline' => {
    switch (status) {
      case 'active': return 'default';
      case 'potential': return 'secondary';
      default: return 'outline';
    }
  };

  const handleStatusChange = async (clientId: string, newStatus: ClientStatus) => {
    try {
      await updateClient(clientId, { status: newStatus });
    } catch (error) {
      // Error handled in hook
    }
  };
  
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clients</h1>
          <p className="text-muted-foreground">Manage your client relationships</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="md"
            onClick={() => setInviteModalOpen(true)}
          >
            <Mail size={16} className="mr-2" />
            Invite Client
          </Button>
          <Button 
            variant="nurse" 
            size="md" 
            icon={<Plus size={16} />}
            onClick={() => setAddModalOpen(true)}
          >
            Add Client
          </Button>
        </div>
      </div>
      
      {/* Status Filter Tabs */}
      <Card className="p-6">
        <div className="flex gap-2 mb-4 flex-wrap">
          <Button 
            variant={statusFilter === 'all' ? 'nurse' : 'outline'}
            onClick={() => setStatusFilter('all')}
            size="sm"
          >
            All <Badge variant="secondary" className="ml-2">{statusCounts.all}</Badge>
          </Button>
          <Button 
            variant={statusFilter === 'active' ? 'nurse' : 'outline'}
            onClick={() => setStatusFilter('active')}
            size="sm"
          >
            Active <Badge variant="secondary" className="ml-2">{statusCounts.active}</Badge>
          </Button>
          <Button 
            variant={statusFilter === 'potential' ? 'nurse' : 'outline'}
            onClick={() => setStatusFilter('potential')}
            size="sm"
          >
            Potential <Badge variant="secondary" className="ml-2">{statusCounts.potential}</Badge>
          </Button>
          <Button 
            variant={statusFilter === 'on-hold' ? 'nurse' : 'outline'}
            onClick={() => setStatusFilter('on-hold')}
            size="sm"
          >
            On Hold <Badge variant="secondary" className="ml-2">{statusCounts['on-hold']}</Badge>
          </Button>
          <Button 
            variant={statusFilter === 'discharged' ? 'nurse' : 'outline'}
            onClick={() => setStatusFilter('discharged')}
            size="sm"
          >
            Discharged <Badge variant="secondary" className="ml-2">{statusCounts.discharged}</Badge>
          </Button>
          <Button 
            variant={statusFilter === 'archived' ? 'nurse' : 'outline'}
            onClick={() => setStatusFilter('archived')}
            size="sm"
          >
            Archived <Badge variant="secondary" className="ml-2">{statusCounts.archived}</Badge>
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 text-muted-foreground h-5 w-5" />
          <Input 
            type="text" 
            placeholder="Search clients by name or email..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Card>
      
      {/* Clients List */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Your Clients</h3>
        
        {clientsLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="flex items-center justify-center p-8 bg-muted/20 rounded-lg">
            <div className="text-center">
              <Users className="text-muted-foreground mx-auto mb-3" size={48} />
              <p className="font-medium text-foreground">
                {searchTerm ? 'No clients found' : 'No clients yet'}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                {searchTerm ? 'Try a different search term' : 'Start building your client base'}
              </p>
              {!searchTerm && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setAddModalOpen(true)}
                >
                  Add Your First Client
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Appointments</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                         <Avatar>
                          <AvatarImage src={client.profile_image_url || undefined} />
                          <AvatarFallback>
                            {getInitials(client.first_name, client.last_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {client.first_name} {client.last_name}
                          </p>
                          <p className="text-sm text-muted-foreground">{client.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {client.phone && (
                          <p className="text-sm">{client.phone}</p>
                        )}
                      </div>
                    </TableCell>
                     <TableCell>
                       {client.city && client.state ? (
                         <p className="text-sm">{client.city}, {client.state}</p>
                       ) : (
                         <span className="text-sm text-muted-foreground">Not specified</span>
                       )}
                     </TableCell>
                     <TableCell>
                       <Badge variant={getStatusBadgeVariant(client.status)}>
                         {client.status || 'active'}
                       </Badge>
                     </TableCell>
                     <TableCell>
                       <Badge variant="outline">
                         {client.appointmentCount || 0} appointments
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
                          <DropdownMenuItem onClick={() => navigate('/nurse/dashboard/calendar')}>
                            <Calendar className="mr-2" size={16} />
                            Book Appointment
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
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <RefreshCw className="mr-2" size={16} />
                                Change Status
                              </DropdownMenuItem>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right" className="bg-background">
                              <DropdownMenuItem onClick={() => handleStatusChange(client.id, 'active')}>
                                Active
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(client.id, 'potential')}>
                                Potential
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(client.id, 'on-hold')}>
                                On Hold
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(client.id, 'discharged')}>
                                Discharged
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(client.id, 'archived')}>
                                Archived
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <AddClientModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onSuccess={createClient}
      />

      <InviteClientModal
        open={inviteModalOpen}
        onOpenChange={setInviteModalOpen}
        onSuccess={refetch}
      />
    </div>
  );
};

export default Clients;