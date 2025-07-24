import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Button from '@/components/ui-components/Button';

const PaymentStatusHandler: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  
  const paymentStatus = searchParams.get('payment');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (paymentStatus === 'success' && sessionId) {
      // Handle successful payment
      toast.success('Payment successful! Your appointment has been booked.');
      setIsProcessing(false);
      
      // Clear URL parameters after a delay
      setTimeout(() => {
        navigate('/client/appointments', { replace: true });
      }, 3000);
    } else if (paymentStatus === 'cancelled') {
      // Handle cancelled payment
      toast.error('Payment was cancelled. Please try booking again.');
      setIsProcessing(false);
      
      // Clear URL parameters after a delay
      setTimeout(() => {
        navigate('/client/appointments', { replace: true });
      }, 2000);
    } else if (paymentStatus) {
      setIsProcessing(false);
    }
  }, [paymentStatus, sessionId, navigate]);

  if (!paymentStatus) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        {isProcessing ? (
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-teal-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Processing Payment...</h3>
            <p className="text-gray-600">Please wait while we confirm your payment.</p>
          </div>
        ) : paymentStatus === 'success' ? (
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-4">
              Your appointment has been booked successfully. You will receive a confirmation email shortly.
            </p>
            <Button 
              variant="client" 
              onClick={() => navigate('/client/appointments', { replace: true })}
            >
              View My Appointments
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Payment Cancelled</h3>
            <p className="text-gray-600 mb-4">
              Your payment was cancelled. You can try booking again when you're ready.
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/client/appointments', { replace: true })}
            >
              Back to Appointments
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentStatusHandler;