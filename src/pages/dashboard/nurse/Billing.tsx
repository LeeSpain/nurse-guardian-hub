import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { Calendar, DollarSign, FileText, Send, CheckCircle, Clock, AlertCircle, Eye, CreditCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useInvoices } from '@/hooks/useInvoices';
import { format } from 'date-fns';
import { GenerateInvoiceModal } from '@/components/billing/GenerateInvoiceModal';
import { supabase } from '@/integrations/supabase/client';
import { toast as sonnerToast } from 'sonner';

const Billing: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const { invoices, stats, loading: invoicesLoading, error, refetch } = useInvoices();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [sendingInvoice, setSendingInvoice] = useState<string | null>(null);
  const [chargingInvoice, setChargingInvoice] = useState<string | null>(null);

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

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-destructive">Error loading invoices: {error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; icon: any }> = {
      pending: { variant: 'secondary', icon: Clock },
      sent: { variant: 'default', icon: Send },
      paid: { variant: 'default', icon: CheckCircle },
      draft: { variant: 'secondary', icon: FileText },
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

  const handleSendInvoice = async (invoiceId: string) => {
    try {
      setSendingInvoice(invoiceId);
      const { data, error } = await supabase.functions.invoke('send-invoice', {
        body: { invoice_id: invoiceId },
      });

      if (error) throw error;

      sonnerToast.success('Invoice sent successfully');
      await refetch();
    } catch (error: any) {
      console.error('Error sending invoice:', error);
      sonnerToast.error('Failed to send invoice');
    } finally {
      setSendingInvoice(null);
    }
  };

  const handleChargeNow = async (invoiceId: string) => {
    try {
      setChargingInvoice(invoiceId);
      // This would integrate with Stripe - for now just show toast
      sonnerToast.info('Payment processing feature coming soon');
      // TODO: Integrate with Stripe to charge client
    } catch (error: any) {
      console.error('Error charging invoice:', error);
      sonnerToast.error('Failed to process payment');
    } finally {
      setChargingInvoice(null);
    }
  };

  const filteredInvoices = activeTab === 'all' 
    ? invoices 
    : invoices.filter(inv => inv.status === activeTab);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Billing & Invoices</h1>
          <p className="text-muted-foreground mt-1">Manage client billing and payment tracking</p>
        </div>
        <Button className="gap-2" onClick={() => setIsGenerateModalOpen(true)}>
          <FileText className="w-4 h-4" />
          Generate Invoice
        </Button>
      </div>

      <GenerateInvoiceModal 
        open={isGenerateModalOpen} 
        onOpenChange={setIsGenerateModalOpen}
        onSuccess={() => refetch()}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Invoices</CardDescription>
            {invoicesLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <CardTitle className="text-2xl">{stats.pendingCount}</CardTitle>
            )}
          </CardHeader>
          <CardContent>
            {invoicesLoading ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              <p className="text-sm text-muted-foreground">
                €{stats.pendingAmount.toFixed(2)} total
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Paid This Month</CardDescription>
            {invoicesLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <CardTitle className="text-2xl text-green-600">
                €{stats.paidThisMonth.toFixed(2)}
              </CardTitle>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Successfully collected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Overdue</CardDescription>
            {invoicesLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <CardTitle className="text-2xl text-red-600">{stats.overdueCount}</CardTitle>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Invoices</CardDescription>
            {invoicesLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <CardTitle className="text-2xl">{invoices.length}</CardTitle>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              All time
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
              {invoicesLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full" />)}
                </div>
              ) : filteredInvoices.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No {activeTab === 'all' ? '' : activeTab} invoices found</p>
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
                              <h3 className="font-semibold text-lg">{invoice.invoice_number}</h3>
                              {getStatusBadge(invoice.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Client: {invoice.client_name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Period: {format(new Date(invoice.billing_period_start), 'MMM d')} - {format(new Date(invoice.billing_period_end), 'MMM d, yyyy')}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Due: {format(new Date(invoice.due_date), 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:items-end gap-2">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-foreground">
                            €{invoice.total_amount.toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {invoice.total_hours} hours • {invoice.line_items_count} items
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/nurse/dashboard/invoices/${invoice.id}`)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          {invoice.status === 'pending' && (
                            <Button 
                              size="sm" 
                              className="gap-1"
                              onClick={() => handleSendInvoice(invoice.id)}
                              disabled={sendingInvoice === invoice.id}
                            >
                              <Send className="w-4 h-4" />
                              {sendingInvoice === invoice.id ? 'Sending...' : 'Send Invoice'}
                            </Button>
                          )}
                          {invoice.status === 'sent' && (
                            <Button 
                              size="sm" 
                              variant="secondary" 
                              className="gap-1"
                              onClick={() => handleChargeNow(invoice.id)}
                              disabled={chargingInvoice === invoice.id}
                            >
                              <CreditCard className="w-4 h-4" />
                              {chargingInvoice === invoice.id ? 'Processing...' : 'Charge Now'}
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
