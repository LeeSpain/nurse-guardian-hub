import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { Users, Search, Plus, MoreVertical, Calendar, Mail, Phone } from 'lucide-react';
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
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useClients } from '@/hooks/useClients';
import { AddClientModal } from '@/components/clients/AddClientModal';

const Clients: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const { clients, loading: clientsLoading, createClient } = useClients();
  const [searchTerm, setSearchTerm] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
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
    return fullName.includes(search) || email.includes(search);
  });
  
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clients</h1>
          <p className="text-muted-foreground">Manage your client relationships</p>
        </div>
        <Button 
          variant="nurse" 
          size="md" 
          icon={<Plus size={16} />}
          onClick={() => setAddModalOpen(true)}
        >
          Add Client
        </Button>
      </div>
      
      {/* Search Bar */}
      <Card className="p-6">
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
                          <AvatarImage src={client.avatar_url || undefined} />
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
    </div>
  );
};

export default Clients;