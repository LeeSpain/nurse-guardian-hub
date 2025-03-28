import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import Transition from '../components/ui-components/Transition';
import Button from '../components/ui-components/Button';

const ClientPricingPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plans = [
    {
      name: 'Basic Care',
      description: 'Essential care monitoring for individuals',
      price: '$19',
      billing: 'per month',
      featured: false,
      features: [
        'Connect with 1 healthcare provider',
        'Basic health tracking',
        'Video consultations',
        'Secure messaging',
        'Appointment scheduling',
        'Care history documentation'
      ]
    },
    {
      name: 'Family Care',
      description: 'Enhanced care for families and caregivers',
      price: '$49',
      billing: 'per month',
      featured: true,
      features: [
        'Connect with multiple healthcare providers',
        'Advanced health tracking & analytics',
        'Unlimited video consultations',
        'Family dashboard access (up to 5 members)',
        'Medication & appointment reminders',
        'Priority scheduling',
        'Emergency support access'
      ]
    },
    {
      name: 'Premium Care',
      description: 'Comprehensive support for complex care needs',
      price: '$99',
      billing: 'per month',
      featured: false,
      features: [
        'All Family Care features',
        'Expanded family access (up to 10 members)',
        'Caregiver coordination tools',
        'Advanced health analytics',
        'Custom care plan builder',
        'Dedicated care coordinator',
        '24/7 emergency response'
      ]
    }
  ];

  return (
    <>
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-gray-50 via-client-muted/20 to-gray-50">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6TTI0IDQ4YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiIGZpbGw9InJnYmEoMTAwLDEwMCwxMDAsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
          
          <div className="container mx-auto px-4 relative">
            <Transition animation="fade-up">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted/20 text-client">
                  Client & Family Plans
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-client via-client to-client/80">
                  Pricing for Care Recipients & Families
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Stay connected with your healthcare team and manage your care with confidence using our secure platform.
                </p>
              </div>
            </Transition>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Transition 
                  key={plan.name} 
                  animation="fade-up" 
                  delay={`delay-${(index % 3) * 100 + 100}` as any}
                >
                  <div className={`relative rounded-2xl overflow-hidden border ${plan.featured 
                    ? 'border-client-muted shadow-xl' 
                    : 'border-gray-200 shadow-lg'}`}>
                    
                    {plan.featured && (
                      <div className="absolute top-0 right-0 bg-client text-white px-4 py-1 text-sm font-medium">
                        Most Popular
                      </div>
                    )}
                    
                    <div className={`p-8 h-full flex flex-col ${plan.featured ? 'bg-client-muted/10' : 'bg-white'}`}>
                      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-gray-600 mb-6">{plan.description}</p>
                      
                      <div className="mb-6">
                        <div className="flex items-end">
                          <span className="text-4xl font-bold">{plan.price}</span>
                          <span className="text-gray-500 ml-1">{plan.billing}</span>
                        </div>
                      </div>
                      
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <div className="flex-shrink-0 mr-2 mt-1">
                              <Check size={16} className="text-client" />
                            </div>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-auto">
                        <Button 
                          variant={plan.featured ? 'client' : 'outline'} 
                          fullWidth
                          className={plan.featured ? '' : 'border-client-muted text-client'}
                        >
                          Get Started
                        </Button>
                      </div>
                    </div>
                  </div>
                </Transition>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 relative overflow-hidden bg-gray-50">
          <div className="container mx-auto px-4">
            <Transition animation="fade-up">
              <div className="mb-12 text-center">
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted/20 text-client">
                  Frequently Asked Questions
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Common Questions From Clients & Families</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Find answers to the most common questions about our client plans.
                </p>
              </div>
            </Transition>

            <div className="max-w-3xl mx-auto">
              <Transition animation="fade-up" delay="delay-100">
                <div className="mb-8 p-6 rounded-xl bg-white shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">How do I find a nurse on your platform?</h3>
                  <p className="text-gray-600">You can search for available healthcare providers through our directory, or you may be invited by your existing healthcare provider if they use our platform.</p>
                </div>
              </Transition>

              <Transition animation="fade-up" delay="delay-200">
                <div className="mb-8 p-6 rounded-xl bg-white shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">How secure is my health data?</h3>
                  <p className="text-gray-600">We use industry-leading encryption and security protocols to ensure your health data remains private. Our platform is HIPAA-compliant and we never share your data without your explicit consent.</p>
                </div>
              </Transition>

              <Transition animation="fade-up" delay="delay-300">
                <div className="mb-8 p-6 rounded-xl bg-white shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">Can multiple family members access my care information?</h3>
                  <p className="text-gray-600">Yes, our Family Care and Premium Care plans allow you to grant secure access to family members or other caregivers, with customizable permission levels to control what information they can see.</p>
                </div>
              </Transition>

              <Transition animation="fade-up" delay="delay-400">
                <div className="p-6 rounded-xl bg-white shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">Is there a mobile app available?</h3>
                  <p className="text-gray-600">Yes, we offer mobile apps for both iOS and Android devices, allowing you to stay connected with your care team from anywhere.</p>
                </div>
              </Transition>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-client to-client/80 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-8 md:p-12 relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTAwIDEwMEgwVjBoMTAweiIvPjxwYXRoIGQ9Ik01MC41IDc1LjVjMTQgMCAyNS0xMS4wMSAyNS0yNXMtMTEtMjUtMjUtMjUtMjUgMTEuMDEtMjUgMjUgMTEuMDEgMjUgMjUgMjV6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
                <div className="relative text-center text-white">
                  <h2 className="text-2xl md:text-4xl font-bold mb-4">Start managing your care today</h2>
                  <p className="text-lg md:text-xl mb-8 opacity-90">Try our platform risk-free with a 14-day free trial.</p>
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-white text-client hover:bg-gray-100"
                    >
                      See How It Works
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white text-white hover:bg-white/20"
                    >
                      Start Free Trial
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ClientPricingPage;
