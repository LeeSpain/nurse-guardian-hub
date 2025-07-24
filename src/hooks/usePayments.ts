import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface PaymentData {
  appointmentId?: string;
  amount: number;
  description?: string;
}

export const usePayments = () => {
  const [loading, setLoading] = useState(false);

  const processAppointmentPayment = async (appointmentData: any, amount: number) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-appointment-payment', {
        body: {
          appointmentData,
          amount
        }
      });

      if (error) {
        console.error('Payment processing error:', error);
        toast.error('Failed to process payment');
        return { success: false, error: error.message };
      }

      if (data?.url) {
        // Redirect to Stripe checkout
        window.open(data.url, '_blank');
        return { success: true, checkoutUrl: data.url, sessionId: data.sessionId };
      }

      return { success: false, error: 'No checkout URL received' };
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error('Payment processing failed');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (sessionId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { sessionId }
      });

      if (error) {
        console.error('Payment verification error:', error);
        return { verified: false, error: error.message };
      }

      return { verified: true, paymentData: data };
    } catch (error: any) {
      console.error('Payment verification error:', error);
      return { verified: false, error: error.message };
    }
  };

  return {
    loading,
    processAppointmentPayment,
    verifyPayment
  };
};