import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Button from '@/components/ui-components/Button';
import FileUploadZone from '@/components/ui-components/FileUploadZone';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAppointments } from '@/hooks/useAppointments';
import { Calendar, Clock, MapPin, User, DollarSign, CreditCard, Paperclip } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const bookingSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  nurseId: z.string().min(1, 'Please select a nurse'),
  appointmentDate: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  serviceType: z.string().min(1, 'Service type is required'),
  address: z.string().min(1, 'Address is required'),
  description: z.string().optional(),
  specialInstructions: z.string().optional(),
  hourlyRate: z.string().min(1, 'Hourly rate is required'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  nurseId?: string;
  nurseName?: string;
}

const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  isOpen,
  onClose,
  nurseId: preSelectedNurseId,
  nurseName
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ url?: string; path?: string; name?: string }[]>([]);
  const { createAppointment } = useAppointments();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      title: 'Healthcare Appointment',
      nurseId: preSelectedNurseId || '',
      appointmentDate: '',
      startTime: '',
      endTime: '',
      serviceType: '',
      address: '',
      description: '',
      specialInstructions: '',
      hourlyRate: '75',
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const startDateTime = new Date(`${data.appointmentDate}T${data.startTime}`);
      const endDateTime = new Date(`${data.appointmentDate}T${data.endTime}`);
      const durationMinutes = Math.round((endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60));
      const totalCost = (durationMinutes / 60) * parseFloat(data.hourlyRate);

      const appointmentData = {
        title: data.title,
        nurse_id: data.nurseId,
        appointment_date: data.appointmentDate,
        start_time: data.startTime,
        end_time: data.endTime,
        service_type: data.serviceType,
        address: data.address,
        description: data.description,
        special_instructions: data.specialInstructions,
        hourly_rate: parseFloat(data.hourlyRate),
        duration_minutes: durationMinutes,
        total_cost: totalCost,
        status: 'pending'
      };

      // Process payment first
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-appointment-payment', {
        body: {
          appointmentData,
          amount: totalCost
        }
      });

      if (paymentError) {
        throw new Error('Payment processing failed');
      }

      // Redirect to Stripe checkout
      if (paymentData?.url) {
        window.open(paymentData.url, '_blank');
        toast.success('Redirecting to payment...');
        form.reset();
        setUploadedFiles([]);
        onClose();
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to process appointment booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUploaded = (result: { url?: string; path?: string }) => {
    if (result.path) {
      setUploadedFiles(prev => [...prev, { 
        ...result, 
        name: result.path?.split('/').pop() 
      }]);
      toast.success('File uploaded successfully');
    }
  };

  const removeUploadedFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const serviceTypes = [
    'Home Care',
    'Medication Management',
    'Wound Care',
    'Post-Surgery Care',
    'Chronic Disease Management',
    'Health Assessment',
    'Physical Therapy',
    'Companionship',
    'Other'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-600" />
            Book Appointment
            {nurseName && <span className="text-teal-600">with {nurseName}</span>}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Appointment Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Healthcare Appointment" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {!preSelectedNurseId && (
              <FormField
                control={form.control}
                name="nurseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Select Nurse
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a healthcare provider" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="nurse1">Sarah Johnson, RN</SelectItem>
                        <SelectItem value="nurse2">Michael Chen, RN</SelectItem>
                        <SelectItem value="nurse3">Emily Rodriguez, LPN</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="appointmentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="date" min={new Date().toISOString().split('T')[0]} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Start Time
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="time" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input {...field} type="time" />
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
                  <FormLabel className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Street address, city, state, zip" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hourlyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Hourly Rate ($)
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="0" step="0.01" placeholder="75.00" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Describe the care needed..."
                      className="min-h-[80px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Instructions</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Any special instructions or requirements..."
                      className="min-h-[60px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File Upload Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Attachments (Optional)</label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFileUpload(!showFileUpload)}
                  icon={<Paperclip className="w-4 h-4" />}
                >
                  Add Files
                </Button>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm text-gray-600">📎 {file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeUploadedFile(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {showFileUpload && (
                <FileUploadZone
                  onFileUploaded={handleFileUploaded}
                  options={{
                    bucket: 'appointment-files',
                    maxSizeBytes: 10 * 1024 * 1024, // 10MB
                    allowedTypes: [
                      'application/pdf',
                      'image/jpeg',
                      'image/png',
                      'text/plain',
                      'application/msword',
                      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    ]
                  }}
                  accept=".pdf,.jpg,.jpeg,.png,.txt,.doc,.docx"
                  className="h-32"
                />
              )}
            </div>

            <div className="bg-teal-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-teal-600" />
                <h4 className="font-medium text-teal-800">Payment Information</h4>
              </div>
              <p className="text-sm text-teal-700">
                Total Cost: <span className="font-semibold">${(() => {
                  const startTime = form.watch('startTime') || '00:00';
                  const endTime = form.watch('endTime') || '00:00';
                  const hourlyRate = parseFloat(form.watch('hourlyRate') || '0');
                  const startDate = new Date(`2000-01-01T${startTime}`);
                  const endDate = new Date(`2000-01-01T${endTime}`);
                  const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
                  return (hours * hourlyRate).toFixed(2);
                })()}</span>
              </p>
              <p className="text-xs text-teal-600 mt-1">
                Secure payment will be processed through Stripe after booking confirmation.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                variant="client" 
                type="submit" 
                disabled={isSubmitting}
                className="min-w-[150px]"
                icon={<CreditCard className="w-4 h-4" />}
              >
                {isSubmitting ? 'Processing...' : 'Book & Pay'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentBookingModal;