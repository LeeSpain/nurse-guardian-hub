import React, { useEffect } from 'react';
import { Check, Award, Shield, Star } from 'lucide-react';
import Transition from '../components/ui-components/Transition';
import Button from '../components/ui-components/Button';
import GlassCard from '../components/ui-components/GlassCard';
import PageHero from '../components/ui-components/PageHero';

const ClientPricingPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plans = [
    {
      name: 'Standard Plan',
      description: 'Individual care monitoring and support',
      price: '€50',
      billing: 'per month',
      featured: false,
      features: [
        'Smart matching with compatible nurses',
        'Free 15-minute intro calls with nurses',
        '4 HD Video Calls/Month',
        'Unlimited secure messaging',
        'Personal dashboard access',
        'Wellness tracking with AI summaries',
        'Emergency support',
        'Mobile app access'
      ]
    },
    {
      name: 'Family Plan',
      description: 'Enhanced care for up to 4 family members',
      price: '€100',
      billing: 'per month',
      featured: true,
      features: [
        'Smart matching for up to 4 care seekers',
        'Free intro calls for each care seeker',
        '16 total HD video calls/month (4 per person)',
        'Unlimited messaging with assigned nurses',
        'Enhanced family dashboard with shared access',
        'Individual & family wellness tracking',
        'Family-wide emergency alerts',
        'Multi-user mobile app access'
      ]
    }
  ];

  return (
    <main className="flex-grow">
      <PageHero
        title="Pricing for Care Recipients & Families"
        subtitle="Stay connected with your healthcare team and manage your care with confidence using our secure platform."
        badge="Client & Family Plans"
        badgeColor="client"
        image="/placeholder.svg"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="client" size="lg">
            View All Plans
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-client-muted text-client"
          >
            Contact Sales
          </Button>
        </div>
      </PageHero>

      {/* Pricing Plans */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Transition 
                key={plan.name} 
                animation="fade-up" 
                delay={index === 0 ? "delay-100" : "delay-200"}
              >
                <GlassCard
                  variant="client"
                  hover={true}
                  className={`h-full ${plan.featured ? 'border-client border-opacity-30 shadow-lg' : ''}`}
                >
                  <div className="relative p-1">
                    {plan.featured && (
                      <div className="absolute -top-4 -right-4 bg-client text-white px-3 py-1 text-xs font-medium rounded-full shadow-md">
                        Most Popular
                      </div>
                    )}
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-gray-600 text-sm">{plan.description}</p>
                    </div>
                    
                    <div className="mb-6 bg-client/5 p-4 rounded-lg">
                      <div className="flex items-end">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-gray-500 ml-2 text-sm">{plan.billing}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <div className="flex-shrink-0 mr-2 mt-1 bg-client/10 rounded-full p-0.5">
                            <Check size={14} className="text-client" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Update CTA to link to registration for client with selected plan */}
                    <Button 
                      as="link"
                      to={`/register/client?plan=${plan.id}`}
                      variant={plan.featured ? 'client' : 'outline'} 
                      fullWidth
                      className={plan.featured ? 'shadow-md' : 'border-client-muted text-client'}
                    >
                      Join This Plan
                    </Button>
                  </div>
                </GlassCard>
              </Transition>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6TTI0IDQ4YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiIGZpbGw9InJnYmEoMTAwLDEwMCwxMDAsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-5"></div>
        
        <div className="container mx-auto px-4 relative">
          <Transition animation="fade-up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted/20 text-client">
                Why Choose Us
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Benefits of NurseSync for Clients
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our platform offers unique advantages designed specifically for care recipients and their families.
              </p>
            </div>
          </Transition>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Transition animation="fade-up" delay="delay-100">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="w-12 h-12 bg-client/10 rounded-full flex items-center justify-center mb-4">
                  <Shield className="text-client" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
                <p className="text-gray-600">
                  Enterprise-grade security with HIPAA compliance ensures your health data remains confidential and protected.
                </p>
              </div>
            </Transition>
            
            <Transition animation="fade-up" delay="delay-200">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="w-12 h-12 bg-client/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="text-client" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Verified Professionals</h3>
                <p className="text-gray-600">
                  Connect with vetted, qualified nurses who have been thoroughly screened and matched to your specific needs.
                </p>
              </div>
            </Transition>
            
            <Transition animation="fade-up" delay="delay-300">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="w-12 h-12 bg-client/10 rounded-full flex items-center justify-center mb-4">
                  <Star className="text-client" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Superior Experience</h3>
                <p className="text-gray-600">
                  Enjoy an intuitive interface with seamless video calls, messaging, and health tracking in one centralized platform.
                </p>
              </div>
            </Transition>
          </div>
        </div>
      </section>

      {/* Launch Strategy Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <Transition animation="fade-up">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted/20 text-client">
                  Limited Time Offer
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Launch Promotion</h2>
              </div>
              
              <div className="bg-gradient-to-br from-white to-client/5 rounded-xl shadow-lg p-8 border border-client-muted/20">
                <div className="prose prose-lg max-w-none text-gray-600">
                  <p>
                    <strong>As part of our launch strategy:</strong>
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mr-2 mt-1 text-client">
                        <Check size={18} />
                      </div>
                      <span>Get free introductory calls in your first month without impacting your monthly call limits</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mr-2 mt-1 text-client">
                        <Check size={18} />
                      </div>
                      <span>Enjoy 20% off any paid plan for the first 3 months</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mr-2 mt-1 text-client">
                        <Check size={18} />
                      </div>
                      <span>Experience premium nurse-led care with unlimited messaging and family tools</span>
                    </li>
                  </ul>
                  <p className="mt-4">
                    Our pricing reflects the value of dedicated nurse expertise and comprehensive family coordination, providing superior service compared to standard telehealth platforms.
                  </p>
                </div>
                
                <div className="mt-8 text-center">
                  <Button
                    variant="client"
                    size="lg"
                    className="shadow-md"
                  >
                    Take Advantage Now
                  </Button>
                </div>
              </div>
            </div>
          </Transition>
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
              <div className="mb-6 p-6 rounded-xl bg-white shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-client/10 flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-client font-medium text-sm">Q</span>
                  </span>
                  How do I find a nurse on your platform?
                </h3>
                <p className="text-gray-600 pl-8">You can use our Smart Matching system which provides a shortlist of 3-5 nurses based on your needs, or browse our nurse directory manually filtered by specialty, language, and other preferences.</p>
              </div>
            </Transition>

            <Transition animation="fade-up" delay="delay-200">
              <div className="mb-6 p-6 rounded-xl bg-white shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-client/10 flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-client font-medium text-sm">Q</span>
                  </span>
                  How secure is my health data?
                </h3>
                <p className="text-gray-600 pl-8">We use industry-leading encryption and security protocols to ensure your health data remains private. Our platform is HIPAA-compliant and we never share your data without your explicit consent.</p>
              </div>
            </Transition>

            <Transition animation="fade-up" delay="delay-300">
              <div className="mb-6 p-6 rounded-xl bg-white shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-client/10 flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-client font-medium text-sm">Q</span>
                  </span>
                  Can multiple family members access my care information?
                </h3>
                <p className="text-gray-600 pl-8">Yes, our Family Plan allows you to grant secure access to up to 4 family members or other caregivers, with customizable permission levels to control what information they can see.</p>
              </div>
            </Transition>

            <Transition animation="fade-up" delay="delay-400">
              <div className="p-6 rounded-xl bg-white shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-client/10 flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-client font-medium text-sm">Q</span>
                  </span>
                  Is there a mobile app available?
                </h3>
                <p className="text-gray-600 pl-8">Yes, we offer mobile apps for both iOS and Android devices, allowing you to stay connected with your care team from anywhere. The app includes full functionality for video calls, messaging, wellness tracking, and dashboard access.</p>
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
                    className="bg-white text-client hover:bg-gray-100 shadow-md"
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
  );
};

export default ClientPricingPage;
