import React, { useState, useEffect } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { ArrowLeft, Download, Send, AlertTriangle, FileText, Calendar, DollarSign } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useOrganization } from '@/hooks/useOrganization';

interface InvoiceData {
  id: string;
  invoice_number: string;
  client_id: string;
  billing_period_start: string;
  billing_period_end: string;
  due_date: string;
  total_hours: number;
  total_amount: number;
  status: string;
  notes: string;
  created_at: string;
  paid_date: string;
}

interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface ClientInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
}

const InvoiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: userLoading } = useUser();
  const { organization } = useOrganization();
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>([]);
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [sendingInvoice, setSendingInvoice] = useState(false);

  useEffect(() => {
    if (id && organization?.id) {
      fetchInvoiceData();
    }
  }, [id, organization?.id]);

  const fetchInvoiceData = async () => {
    try {
      setLoading(true);
      
      // Fetch invoice
      const { data: invoiceData, error: invoiceError } = await supabase
        .from('invoices')
        .select('*')
        .eq('id', id)
        .eq('organization_id', organization!.id)
        .single();

      if (invoiceError) throw invoiceError;
      setInvoice(invoiceData);

      // Fetch line items
      const { data: lineItemsData, error: lineItemsError } = await supabase
        .from('invoice_line_items')
        .select('*')
        .eq('invoice_id', id)
        .order('created_at', { ascending: true });

      if (lineItemsError) throw lineItemsError;
      setLineItems(lineItemsData || []);

      // Fetch client info
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('first_name, last_name, email, phone, address')
        .eq('id', invoiceData.client_id)
        .single();

      if (clientError) throw clientError;
      setClientInfo(clientData);

    } catch (error: any) {
      console.error('Error fetching invoice data:', error);
      toast.error('Failed to load invoice data');
    } finally {
      setLoading(false);
    }
  };

  const handleSendInvoice = async () => {
    if (!invoice || !clientInfo) return;

    try {
      setSendingInvoice(true);
      const { error } = await supabase.functions.invoke('send-invoice', {
        body: { invoiceId: invoice.id }
      });

      if (error) throw error;

      toast.success('Invoice sent successfully');
      await fetchInvoiceData();
    } catch (error: any) {
      console.error('Error sending invoice:', error);
      toast.error('Failed to send invoice');
    } finally {
      setSendingInvoice(false);
    }
  };

  const handleDownloadPDF = () => {
    // Generate PDF content
    const invoiceContent = `
INVOICE

${organization?.name || 'Organization'}
Invoice #: ${invoice?.invoice_number}
Date: ${invoice ? format(new Date(invoice.created_at), 'MMM d, yyyy') : ''}

BILL TO:
${clientInfo?.first_name} ${clientInfo?.last_name}
${clientInfo?.address || ''}
${clientInfo?.email || ''}
${clientInfo?.phone || ''}

BILLING PERIOD:
${invoice ? format(new Date(invoice.billing_period_start), 'MMM d, yyyy') : ''} - ${invoice ? format(new Date(invoice.billing_period_end), 'MMM d, yyyy') : ''}

LINE ITEMS:
${lineItems.map(item => `${item.description}: ${item.quantity} x £${item.rate} = £${item.amount}`).join('\n')}

TOTAL HOURS: ${invoice?.total_hours}
TOTAL AMOUNT: £${invoice?.total_amount}

DUE DATE: ${invoice ? format(new Date(invoice.due_date), 'MMM d, yyyy') : ''}
STATUS: ${invoice?.status.toUpperCase()}

${invoice?.notes ? `NOTES:\n${invoice.notes}` : ''}
    `.trim();

    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoice?.invoice_number}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.success('Invoice downloaded');
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== UserRole.NURSE) {
    return <Navigate to="/login" />;
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      paid: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/nurse/dashboard/billing')}>
            <ArrowLeft size={16} className="mr-2" />
            Back to Billing
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownloadPDF}>
            <Download size={16} className="mr-2" />
            Download
          </Button>
          {invoice?.status === 'draft' && (
            <Button variant="nurse" onClick={handleSendInvoice} disabled={sendingInvoice}>
              <Send size={16} className="mr-2" />
              {sendingInvoice ? 'Sending...' : 'Send Invoice'}
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="space-y-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      ) : !invoice ? (
        <Card className="p-12 text-center">
          <AlertTriangle className="text-muted-foreground mx-auto mb-4" size={48} />
          <h3 className="text-lg font-medium text-foreground mb-2">Invoice not found</h3>
          <p className="text-muted-foreground">The invoice you're looking for doesn't exist or has been removed.</p>
        </Card>
      ) : (
        <>
          {/* Invoice Header */}
          <Card className="p-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">INVOICE</h1>
                <p className="text-lg text-muted-foreground">#{invoice.invoice_number}</p>
              </div>
              <Badge className={getStatusColor(invoice.status)}>
                {invoice.status.toUpperCase()}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">FROM</h3>
                <p className="font-semibold text-lg">{organization?.name}</p>
                <p className="text-muted-foreground">{organization?.address}</p>
                <p className="text-muted-foreground">{organization?.phone}</p>
                <p className="text-muted-foreground">{organization?.email}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">BILL TO</h3>
                {clientInfo && (
                  <>
                    <p className="font-semibold text-lg">
                      {clientInfo.first_name} {clientInfo.last_name}
                    </p>
                    <p className="text-muted-foreground">{clientInfo.address}</p>
                    <p className="text-muted-foreground">{clientInfo.email}</p>
                    <p className="text-muted-foreground">{clientInfo.phone}</p>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Invoice Date</p>
                <p className="font-medium flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  {format(new Date(invoice.created_at), 'MMM d, yyyy')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Due Date</p>
                <p className="font-medium flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  {format(new Date(invoice.due_date), 'MMM d, yyyy')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Billing Period</p>
                <p className="font-medium">
                  {format(new Date(invoice.billing_period_start), 'MMM d')} - {format(new Date(invoice.billing_period_end), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          </Card>

          {/* Line Items */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText size={20} className="text-primary" />
              Line Items
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lineItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">£{item.rate.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-medium">£{item.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-end space-y-2">
                <div className="w-64">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Total Hours:</span>
                    <span className="font-medium">{invoice.total_hours}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t">
                    <span className="text-lg font-semibold">Total Amount:</span>
                    <span className="text-2xl font-bold text-primary flex items-center gap-1">
                      <DollarSign size={20} />
                      {invoice.total_amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Notes */}
          {invoice.notes && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Notes</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{invoice.notes}</p>
            </Card>
          )}

          {/* Payment Info */}
          {invoice.status === 'paid' && invoice.paid_date && (
            <Card className="p-6 bg-green-50 border-green-200">
              <div className="flex items-center gap-2 text-green-800">
                <DollarSign size={20} />
                <p className="font-medium">
                  Paid on {format(new Date(invoice.paid_date), 'MMM d, yyyy')}
                </p>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default InvoiceDetail;
