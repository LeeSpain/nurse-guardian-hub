import React, { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ClientHeader from '../components/navigation/ClientHeader';
import Footer from '../components/layout/Footer';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Button from '../components/ui-components/Button';
import { useUser, UserRole } from '../contexts/UserContext';

const clientRegistrationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(10, 'Please enter your full address'),
  careType: z.string().min(1, 'Please select the type of care needed'),
  careDescription: z.string().optional(),
  emergencyContact: z.string().min(2, 'Emergency contact name is required'),
  emergencyPhone: z.string().min(10, 'Emergency contact phone is required'),
  terms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
  privacy: z.boolean().refine(val => val === true, 'You must accept the privacy policy'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ClientRegistrationForm = z.infer<typeof clientRegistrationSchema>;

const careTypeOptions = [
  'Personal Care',
  'Medication Management',
  'Post-Surgery Recovery',
  'Chronic Condition Support',
  'Elderly Care',
  'Wound Care',
  'Physical Therapy Support',
  'Companionship',
  'Respite Care',
  'Other'
];

const ClientRegister: React.FC = () => {
  const { register: registerUser, isLoading, isAuthenticated, user } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('plan');

  const form = useForm<ClientRegistrationForm>({
    resolver: zodResolver(clientRegistrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
      careType: '',
      careDescription: '',
      emergencyContact: '',
      emergencyPhone: '',
      terms: false,
      privacy: false,
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/client/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  const onSubmit = async (data: ClientRegistrationForm) => {
    try {
      await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: UserRole.CLIENT,
      });
      
      // Success handled by UserContext
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ClientHeader />
      <main className="flex-grow py-12 pt-32 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  Join as a Care Seeker
                </h1>
                <p className="text-gray-600 mt-2">
                  Create your care portal account
                  {planId && (
                    <span className="block text-sm font-medium text-client mt-1">
                      Selected Plan: {planId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  )}
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="careType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type of Care Needed</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the type of care you need" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {careTypeOptions.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="careDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Care Details (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please describe any specific care needs or requirements..."
                            className="resize-none"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="emergencyContact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Emergency Contact Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="emergencyPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Emergency Contact Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-3 border-t pt-6">
                    <FormField
                      control={form.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm">
                              I agree to the{' '}
                              <Link to="/terms" className="text-client hover:underline">
                                Terms of Service
                              </Link>
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="privacy"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm">
                              I agree to the{' '}
                              <Link to="/privacy" className="text-client hover:underline">
                                Privacy Policy
                              </Link>
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="client"
                      fullWidth
                      isLoading={isLoading}
                    >
                      {isLoading ? 'Creating Account...' : 'Create Client Account'}
                    </Button>
                  </div>

                  <div className="text-center pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      Already have an account?{' '}
                      <Link
                        to="/login?service=client"
                        className="font-medium text-client hover:underline"
                      >
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClientRegister;