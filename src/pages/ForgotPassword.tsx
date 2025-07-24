import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Header from '../components/navigation/Header';
import NurseHeader from '../components/navigation/NurseHeader';
import ClientHeader from '../components/navigation/ClientHeader';
import Footer from '../components/layout/Footer';
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Button from '../components/ui-components/Button';
import { toast } from 'sonner';
import { CheckCircle, Mail } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const serviceType = searchParams.get('service');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [sentToEmail, setSentToEmail] = useState('');

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would send a reset email via backend
      setSentToEmail(data.email);
      setEmailSent(true);
      toast.success('Password reset email sent!');
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Determine which header to display based on service type
  const renderHeader = () => {
    if (serviceType === 'nurse') {
      return <NurseHeader />;
    } else if (serviceType === 'client') {
      return <ClientHeader />;
    } else {
      return <Header />;
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex flex-col">
        {renderHeader()}
        <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
          <div className="w-full max-w-md mx-4">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Check Your Email
                </h1>
                
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-center justify-center space-x-2 text-sm bg-gray-50 rounded-lg p-3">
                    <Mail className="w-4 h-4" />
                    <span>{sentToEmail}</span>
                  </div>
                  
                  <p className="text-sm">
                    We've sent a password reset link to your email address. 
                    Please check your inbox and follow the instructions to reset your password.
                  </p>
                  
                  <p className="text-xs text-gray-500">
                    Don't see the email? Check your spam folder or try again in a few minutes.
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  <Button
                    onClick={() => {
                      setEmailSent(false);
                      setSentToEmail('');
                      form.reset();
                    }}
                    variant="outline"
                    fullWidth
                  >
                    Try Different Email
                  </Button>
                  
                  <div className="text-center">
                    <Link
                      to={serviceType ? `/login?service=${serviceType}` : "/login"}
                      className={`text-sm font-medium ${serviceType === 'client' ? 'text-client' : 'text-purple-600'} hover:underline`}
                    >
                      Back to Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {renderHeader()}
      <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
        <div className="w-full max-w-md mx-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  Reset Your Password
                </h1>
                <p className="text-gray-600 mt-2">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    variant={serviceType === 'client' ? 'client' : 'primary'}
                    fullWidth
                    isLoading={isLoading}
                    className={serviceType === 'client' ? '' : 'bg-purple-600 hover:bg-purple-700'}
                  >
                    {isLoading ? 'Sending Reset Email...' : 'Send Reset Email'}
                  </Button>

                  <div className="text-center">
                    <Link
                      to={serviceType ? `/login?service=${serviceType}` : "/login"}
                      className={`text-sm font-medium ${serviceType === 'client' ? 'text-client' : 'text-purple-600'} hover:underline`}
                    >
                      Back to Sign In
                    </Link>
                  </div>
                </form>
              </Form>

              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account yet?{' '}
                  <Link
                    to={serviceType ? `/pricing?service=${serviceType}` : "/pricing"}
                    className={`font-medium ${serviceType === 'client' ? 'text-client' : 'text-purple-600'} hover:underline`}
                  >
                    View pricing & plans
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;