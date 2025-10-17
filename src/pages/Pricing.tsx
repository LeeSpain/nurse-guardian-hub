import React, { useEffect } from 'react';
import Header from '../components/navigation/Header';
import Footer from '../components/layout/Footer';
import { Check } from 'lucide-react';
import Transition from '../components/ui-components/Transition';
import Button from '../components/ui-components/Button';
import { useNavigate } from 'react-router-dom';

const PricingPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const plans = [
    {
      name: 'Basic',
      id: 'basic',
      description: 'Essential features for independent nurses',
      price: '€29',
      billing: 'per month',
      featured: false,
      type: 'nurse',
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
      id: 'professional',
      description: 'Advanced tools for growing practices',
      price: '€79',
      billing: 'per month',
      featured: true,
      type: 'nurse',
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
      id: 'enterprise',
      description: 'Custom solutions for healthcare organizations',
      price: 'Custom',
      billing: 'pricing',
      featured: false,
      type: 'nurse',
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
    },
    {
      name: 'Client Basic',
      id: 'client-basic',
      description: 'Essential care monitoring for individuals',
      price: '€19',
      billing: 'per month',
      featured: false,
      type: 'client',
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
      name: 'Client Premium',
      id: 'client-premium',
      description: 'Enhanced care for families and caregivers',
      price: '€49',
      billing: 'per month',
      featured: true,
      type: 'client',
      features: [
        'Connect with multiple healthcare providers',
        'Advanced health tracking & analytics',
        'Unlimited video consultations',
        'Family dashboard access (up to 5 members)',
        'Medication & appointment reminders',
        'Priority scheduling',
        'Emergency support access'
      ]
    }
  ];

  // Handle plan selection
  const handlePlanSelection = (plan: any) => {
    if (plan.type === "nurse") {
      navigate(`/register/nurse?plan=${plan.id}`);
    } else {
      navigate(`/register/client?plan=${plan.id}`);
    }
  };

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
                  Flexible Plans
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800">
                  Find the Perfect Plan for Your Needs
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Our pricing is designed to scale with your practice. Choose the plan that works best for you with no hidden fees.
                </p>
              </div>
            </Transition>
          </div>
        </section>

        {/* Pricing Tabs - Nurse Plans */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <Transition animation="fade-up">
              <div className="mb-12 text-center">
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                  For Healthcare Providers
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Nurse Plans</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Powerful tools designed specifically for healthcare professionals to manage remote care.
                </p>
              </div>
            </Transition>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.filter(plan => plan.type === 'nurse').map((plan, index) => (
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
                          onClick={() => handlePlanSelection(plan)}
                          variant={plan.featured ? 'nurse' : 'outline'} 
                          fullWidth
                          className={plan.featured
                            ? 'bg-purple-600 text-white'
                            : 'border-purple-300 text-purple-700'
                          }
                        >
                          Join This Plan
                        </Button>
                      </div>
                    </div>
                  </div>
                </Transition>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Tabs - Client Plans */}
        <section className="py-16 md:py-24 relative overflow-hidden bg-gray-50">
          <div className="container mx-auto px-4">
            <Transition animation="fade-up">
              <div className="mb-12 text-center">
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted text-client">
                  For Care Recipients & Families
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Client Plans</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Stay connected with your healthcare providers and manage your care from anywhere.
                </p>
              </div>
            </Transition>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {plans.filter(plan => plan.type === 'client').map((plan, index) => (
                <Transition 
                  key={plan.name} 
                  animation="fade-up" 
                  delay={`delay-${(index % 2) * 100 + 100}` as any}
                >
                  <div className={`relative rounded-2xl overflow-hidden border ${plan.featured 
                    ? 'border-client shadow-xl' 
                    : 'border-gray-200 shadow-lg'}`}>
                    
                    {plan.featured && (
                      <div className="absolute top-0 right-0 bg-client text-white px-4 py-1 text-sm font-medium">
                        Recommended
                      </div>
                    )}
                    
                    <div className={`p-8 h-full flex flex-col ${plan.featured ? 'bg-client-muted' : 'bg-white'}`}>
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
                          onClick={() => handlePlanSelection(plan)}
                          variant={plan.featured ? (plan.type === "nurse" ? 'nurse' : 'client') : 'outline'} 
                          fullWidth
                          className={plan.featured
                            ? (plan.type === "nurse" ? 'bg-purple-600 text-white' : '')
                            : (plan.type === "nurse" ? 'border-purple-300 text-purple-700' : 'border-client-muted text-client')
                          }
                        >
                          Join This Plan
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
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <Transition animation="fade-up">
              <div className="mb-12 text-center">
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                  Frequently Asked Questions
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Common Questions About Our Pricing</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Find answers to the most common questions about our plans and pricing.
                </p>
              </div>
            </Transition>

            <div className="max-w-3xl mx-auto">
              <Transition animation="fade-up" delay="delay-100">
                <div className="mb-8 p-6 rounded-xl bg-white shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">Can I change my plan later?</h3>
                  <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be applied to your next billing cycle.</p>
                </div>
              </Transition>

              <Transition animation="fade-up" delay="delay-200">
                <div className="mb-8 p-6 rounded-xl bg-white shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">Do you offer a free trial?</h3>
                  <p className="text-gray-600">Yes, we offer a 14-day free trial on all plans so you can test the platform before committing.</p>
                </div>
              </Transition>

              <Transition animation="fade-up" delay="delay-300">
                <div className="mb-8 p-6 rounded-xl bg-white shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">Are there any setup fees?</h3>
                  <p className="text-gray-600">No, there are no setup fees for any of our plans. You only pay the advertised monthly fee.</p>
                </div>
              </Transition>

              <Transition animation="fade-up" delay="delay-400">
                <div className="p-6 rounded-xl bg-white shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">What happens if I need more clients than my plan allows?</h3>
                  <p className="text-gray-600">If you reach your client limit, you'll receive a notification to upgrade to a higher tier. We'll never cut off access to your existing clients.</p>
                </div>
              </Transition>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
