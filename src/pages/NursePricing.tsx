
import React, { useEffect } from 'react';
import Header from '../components/navigation/Header';
import Footer from '../components/layout/Footer';
import { Check } from 'lucide-react';
import Transition from '../components/ui-components/Transition';
import Button from '../components/ui-components/Button';

const NursePricingPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plans = [
    {
      name: 'Basic',
      description: 'Essential features for independent nurses',
      price: '$29',
      billing: 'per month',
      featured: false,
      features: [
        'Up to 10 client profiles',
        'Basic AI documentation assistant',
        'Video consultations',
        'Client messaging',
        'Calendar management',
        'Basic invoicing tools'
      ]
    },
    {
      name: 'Professional',
      description: 'Advanced tools for growing practices',
      price: '$79',
      billing: 'per month',
      featured: true,
      features: [
        'Up to 50 client profiles',
        'Advanced AI documentation assistant',
        'Unlimited video consultations',
        'Client messaging & family sharing',
        'Automated scheduling system',
        'Advanced invoicing & reports',
        'White-label client portal',
        'Priority support'
      ]
    },
    {
      name: 'Enterprise',
      description: 'Custom solutions for healthcare organizations',
      price: 'Custom',
      billing: 'pricing',
      featured: false,
      features: [
        'Unlimited client profiles',
        'Enterprise-grade AI assistance',
        'Custom integrations',
        'Team collaboration tools',
        'Advanced analytics dashboard',
        'Custom branding',
        'Dedicated account manager',
        'SLA & compliance support'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6TTI0IDQ4YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiIGZpbGw9InJnYmEoMTAwLDEwMCwxMDAsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
          
          <div className="container mx-auto px-4 relative">
            <Transition animation="fade-up">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                  Healthcare Provider Plans
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800">
                  Pricing for Healthcare Professionals
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Choose the plan that best fits your practice. Scale your remote care capabilities with our flexible pricing options.
                </p>
              </div>
            </Transition>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Transition 
                  key={plan.name} 
                  animation="fade-up" 
                  delay={`delay-${(index % 3) * 100 + 100}` as any}
                >
                  <div className={`relative rounded-2xl overflow-hidden border ${plan.featured 
                    ? 'border-purple-200 shadow-xl' 
                    : 'border-gray-200 shadow-lg'}`}>
                    
                    {plan.featured && (
                      <div className="absolute top-0 right-0 bg-purple-600 text-white px-4 py-1 text-sm font-medium">
                        Most Popular
                      </div>
                    )}
                    
                    <div className={`p-8 h-full flex flex-col ${plan.featured ? 'bg-purple-50' : 'bg-white'}`}>
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
                              <Check size={16} className="text-purple-600" />
                            </div>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-auto">
                        <Button 
                          variant={plan.featured ? 'primary' : 'outline'} 
                          fullWidth
                          className={plan.featured ? 'bg-purple-600 text-white' : 'border-purple-300 text-purple-700'}
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
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                  Frequently Asked Questions
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Common Questions From Healthcare Providers</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Find answers to the most common questions about our professional plans.
                </p>
              </div>
            </Transition>

            <div className="max-w-3xl mx-auto">
              <Transition animation="fade-up" delay="delay-100">
                <div className="mb-8 p-6 rounded-xl bg-white shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">How does the client limit work?</h3>
                  <p className="text-gray-600">Client limits refer to the number of active client profiles you can manage simultaneously. You can always upgrade if you need to manage more clients.</p>
                </div>
              </Transition>

              <Transition animation="fade-up" delay="delay-200">
                <div className="mb-8 p-6 rounded-xl bg-white shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">Is the platform HIPAA compliant?</h3>
                  <p className="text-gray-600">Yes, all our plans include HIPAA-compliant messaging, video calls, and documentation. We take healthcare data security seriously.</p>
                </div>
              </Transition>

              <Transition animation="fade-up" delay="delay-300">
                <div className="mb-8 p-6 rounded-xl bg-white shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">Can I integrate with my existing EHR system?</h3>
                  <p className="text-gray-600">Our Professional and Enterprise plans offer integration options with popular EHR systems. Custom integrations are available for Enterprise customers.</p>
                </div>
              </Transition>

              <Transition animation="fade-up" delay="delay-400">
                <div className="p-6 rounded-xl bg-white shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">What training is provided for new users?</h3>
                  <p className="text-gray-600">All plans include access to our knowledge base and video tutorials. Professional and Enterprise plans also include personalized onboarding sessions.</p>
                </div>
              </Transition>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-8 md:p-12 relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTAwIDEwMEgwVjBoMTAweiIvPjxwYXRoIGQ9Ik01MC41IDc1LjVjMTQgMCAyNS0xMS4wMSAyNS0yNXMtMTEtMjUtMjUtMjUtMjUgMTEuMDEtMjUgMjUgMTEuMDEgMjUgMjUgMjV6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
                <div className="relative text-center text-white">
                  <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to enhance your practice?</h2>
                  <p className="text-lg md:text-xl mb-8 opacity-90">Start your 14-day free trial with full access to all features.</p>
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-white text-purple-700 hover:bg-gray-100"
                    >
                      Schedule a Demo
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
      <Footer />
    </div>
  );
};

export default NursePricingPage;
