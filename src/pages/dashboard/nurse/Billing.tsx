import React, { useState } from 'react';
import { Calendar, DollarSign, FileText, Send, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Billing: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pending');

  // Mock data - will be replaced with real data
  const invoices = [
    {
      id: 'INV-001',
      clientName: 'John Smith',
      amount: 450.00,
      hoursWorked: 15,
      status: 'pending',
      dueDate: '2025-01-20',
      billingPeriod: 'Jan 1-15, 2025',
      staffMembers: ['Sarah Johnson', 'Mike Williams'],
    },
    {
      id: 'INV-002',
      clientName: 'Mary Johnson',
      amount: 720.00,
      hoursWorked: 24,
      status: 'sent',
      dueDate: '2025-01-18',
      billingPeriod: 'Jan 1-15, 2025',
      staffMembers: ['Sarah Johnson'],
    },
    {
      id: 'INV-003',
      clientName: 'Robert Davis',
      amount: 300.00,
      hoursWorked: 10,
      status: 'paid',
      paidDate: '2025-01-10',
      billingPeriod: 'Dec 16-31, 2024',
      staffMembers: ['Mike Williams', 'Emily Brown'],
    },
  ];

  const stats = {
    pendingInvoices: 3,
    totalPending: 1450.00,
    paidThisMonth: 3200.00,
    overdueInvoices: 1,
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; icon: any }> = {
      pending: { variant: 'secondary', icon: Clock },
      sent: { variant: 'default', icon: Send },
      paid: { variant: 'default', icon: CheckCircle },
      overdue: { variant: 'destructive', icon: AlertCircle },
    };
    
    const { variant, icon: Icon } = variants[status] || variants.pending;
    
    return (
      <Badge variant={variant} className="gap-1">
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredInvoices = invoices.filter(inv => 
    activeTab === 'all' ? true : inv.status === activeTab
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Billing & Invoices</h1>
          <p className="text-muted-foreground mt-1">Manage client billing and payment tracking</p>
        </div>
        <Button className="gap-2">
          <FileText className="w-4 h-4" />
          Generate Invoice
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Invoices</CardDescription>
            <CardTitle className="text-2xl">{stats.pendingInvoices}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              ${stats.totalPending.toFixed(2)} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Paid This Month</CardDescription>
            <CardTitle className="text-2xl text-green-600">
              ${stats.paidThisMonth.toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Overdue</CardDescription>
            <CardTitle className="text-2xl text-red-600">{stats.overdueInvoices}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Payment Time</CardDescription>
            <CardTitle className="text-2xl">5 days</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Within terms
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>Track and manage client invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredInvoices.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No invoices found
                </div>
              ) : (
                filteredInvoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{invoice.id}</h3>
                              {getStatusBadge(invoice.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Client: {invoice.clientName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Period: {invoice.billingPeriod}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Staff: {invoice.staffMembers.join(', ')}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:items-end gap-2">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-foreground">
                            ${invoice.amount.toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {invoice.hoursWorked} hours worked
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          {invoice.status === 'pending' && (
                            <Button size="sm" className="gap-1">
                              <Send className="w-4 h-4" />
                              Send Invoice
                            </Button>
                          )}
                          {invoice.status === 'sent' && (
                            <Button size="sm" variant="secondary" className="gap-1">
                              <DollarSign className="w-4 h-4" />
                              Charge Now
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;
