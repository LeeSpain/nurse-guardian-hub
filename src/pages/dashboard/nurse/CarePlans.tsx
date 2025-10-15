import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { FileText, Plus, Search, Filter, AlertTriangle, Edit, Eye } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { useCarePlans } from '@/hooks/useCarePlans';

const CarePlans: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const { carePlans, templates, stats, loading: plansLoading } = useCarePlans();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('active');
  
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

  const filteredPlans = carePlans.filter(plan =>
    plan.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      review_needed: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category: string) => {
    return <FileText size={20} className="text-purple-600" />;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Care Plans</h1>
            <p className="text-muted-foreground">Manage client care plans and documentation</p>
          </div>
          
          <Button variant="nurse" icon={<Plus size={16} />}>
            Create Care Plan
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Plans</p>
                {plansLoading ? <Skeleton className="h-8 w-12" /> : (
                  <p className="text-2xl font-bold text-foreground">{stats.activeCount}</p>
                )}
              </div>
              <FileText className="text-green-600" size={32} />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Need Review</p>
                {plansLoading ? <Skeleton className="h-8 w-12" /> : (
                  <p className="text-2xl font-bold text-foreground">{stats.reviewNeededCount}</p>
                )}
              </div>
              <AlertTriangle className="text-yellow-600" size={32} />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Plans</p>
                {plansLoading ? <Skeleton className="h-8 w-12" /> : (
                  <p className="text-2xl font-bold text-foreground">{carePlans.length}</p>
                )}
              </div>
              <FileText className="text-blue-600" size={32} />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Templates</p>
                {plansLoading ? <Skeleton className="h-8 w-12" /> : (
                  <p className="text-2xl font-bold text-foreground">{templates.length}</p>
                )}
              </div>
              <FileText className="text-purple-600" size={32} />
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active Plans</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {/* Search */}
            <Card className="p-4">
              <div className="flex gap-4">
                <div className="flex-grow relative">
                  <Search className="absolute left-3 top-3 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search care plans..."
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" icon={<Filter size={16} />}>
                  Filter
                </Button>
              </div>
            </Card>

            {/* Care Plans List */}
            {filteredPlans.length === 0 ? (
              <Card className="p-12 text-center">
                <FileText className="text-muted-foreground mx-auto mb-4" size={48} />
                <h3 className="text-lg font-medium text-foreground mb-2">No care plans found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? 'Try adjusting your search' : 'Create your first care plan to get started'}
                </p>
              </Card>
            ) : (
              filteredPlans.map((plan) => (
                <Card key={plan.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        {getCategoryIcon(plan.category)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{plan.title}</h3>
                        <p className="text-sm text-muted-foreground">Client: {plan.client_name}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(plan.status)}>
                      {plan.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 py-3 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground">Start Date</p>
                        <p className="font-medium">{format(plan.start_date, 'MMM d, yyyy')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Review Date</p>
                        <p className="font-medium">{format(plan.review_date, 'MMM d, yyyy')}</p>
                      </div>
                    </div>

                    <div className="py-3 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Goals</p>
                      <ul className="list-disc list-inside space-y-1">
                        {plan.goals.map((goal, idx) => (
                          <li key={idx} className="text-sm">{goal}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm" icon={<Eye size={16} />} className="flex-1">
                      View
                    </Button>
                    <Button variant="outline" size="sm" icon={<Edit size={16} />} className="flex-1">
                      Edit
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <Card key={template.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FileText size={20} className="text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-foreground">{template.name}</h3>
                  </div>
                  <Badge variant="secondary" className="mb-4">
                    {template.category}
                  </Badge>
                  <Button variant="outline" size="sm" className="w-full">
                    Use Template
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="archived" className="space-y-4">
            <Card className="p-12 text-center">
              <FileText className="text-muted-foreground mx-auto mb-4" size={48} />
              <h3 className="text-lg font-medium text-foreground mb-2">No archived care plans</h3>
              <p className="text-muted-foreground">Archived care plans will appear here</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  );
};

export default CarePlans;