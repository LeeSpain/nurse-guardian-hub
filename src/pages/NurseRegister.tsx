import React, { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import NurseHeader from '../components/navigation/NurseHeader';
import Footer from '../components/layout/Footer';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Button from '../components/ui-components/Button';
import { useUser, UserRole } from '../contexts/UserContext';
import { toast } from 'sonner';

const nurseRegistrationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  licenseNumber: z.string().min(1, 'License number is required'),
  specialties: z.array(z.string()).min(1, 'Please select at least one specialty'),
  terms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
  privacy: z.boolean().refine(val => val === true, 'You must accept the privacy policy'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type NurseRegistrationForm = z.infer<typeof nurseRegistrationSchema>;

const specialtyOptions = [
  'Home Care',
  'Elderly Care', 
  'Wound Care',
  'Medication Management',
  'Post-Surgery Care',
  'Chronic Disease Management',
  'Pediatric Care',
  'Mental Health Support',
  'Physical Therapy Assistance',
  'Palliative Care'
];

const NurseRegister: React.FC = () => {
  const { register: registerUser, isLoading, isAuthenticated, user } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('plan');

  const form = useForm<NurseRegistrationForm>({
    resolver: zodResolver(nurseRegistrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      licenseNumber: '',
      specialties: [],
      terms: false,
      privacy: false,
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/nurse/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  const onSubmit = async (data: NurseRegistrationForm) => {
    try {
      await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: UserRole.NURSE,
        specialties: data.specialties,
      });
      
      // Success handled by UserContext
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NurseHeader />
      <main className="flex-grow py-12 pt-32 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  Join as a Nurse Professional
                </h1>
                <p className="text-gray-600 mt-2">
                  Create your professional healthcare account
                  {planId && (
                    <span className="block text-sm font-medium text-purple-600 mt-1">
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

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nursing License Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your license number" {...field} />
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
                    name="specialties"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Areas of Expertise (Select all that apply)</FormLabel>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                          {specialtyOptions.map((specialty) => {
                            const isChecked = field.value.includes(specialty);
                            return (
                              <div
                                key={specialty}
                                className="flex items-center space-x-2 p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                              >
                                <Checkbox
                                  checked={isChecked}
                                  onCheckedChange={(checked) => {
                                    const newSpecialties = checked
                                      ? [...field.value, specialty]
                                      : field.value.filter(s => s !== specialty);
                                    field.onChange(newSpecialties);
                                  }}
                                />
                                <Label 
                                  className="text-sm flex-1 cursor-pointer"
                                  onClick={() => {
                                    const isCurrentlyChecked = field.value.includes(specialty);
                                    const newSpecialties = isCurrentlyChecked
                                      ? field.value.filter(s => s !== specialty)
                                      : [...field.value, specialty];
                                    field.onChange(newSpecialties);
                                  }}
                                >
                                  {specialty}
                                </Label>
                              </div>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                              <Link to="/terms" className="text-purple-600 hover:underline">
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
                              <Link to="/privacy" className="text-purple-600 hover:underline">
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
                      variant="primary"
                      fullWidth
                      isLoading={isLoading}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {isLoading ? 'Creating Account...' : 'Create Nurse Account'}
                    </Button>
                  </div>

                  <div className="text-center pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      Already have an account?{' '}
                      <Link
                        to="/login?service=nurse"
                        className="font-medium text-purple-600 hover:underline"
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

export default NurseRegister;