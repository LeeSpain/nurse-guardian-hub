
import React, { useEffect, useState } from 'react';
import { Check, X, Info } from 'lucide-react';
import Transition from '../components/ui-components/Transition';
import Button from '../components/ui-components/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const NursePricingPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const toggleTooltip = (planId: string) => {
    if (showTooltip === planId) {
      setShowTooltip(null);
    } else {
      setShowTooltip(planId);
    }
  };

  const plans = [
    {
      id: "free",
      name: 'Free Plan',
      description: 'Nurses new to Nurse-Sync or managing 1–2 clients, testing the platform.',
      price: '€0',
      billing: 'per month',
      featured: false,
      features: [
        { text: 'Passive smart matching only', included: true },
        { text: 'Up to 2 active clients', included: true },
        { text: 'Basic AI documentation templates', included: true },
        { text: 'Voice-to-text (10 notes/month)', included: true },
        { text: 'HD Video Consultations', included: true },
        { text: 'Secure HIPAA-compliant messaging', included: true },
        { text: 'Limited mobile app access', included: true },
        { text: 'Basic calendar management', included: true },
        { text: 'Advanced invoicing tools', included: false },
        { text: 'Client Opportunities access', included: false },
        { text: 'Analytics dashboard', included: false },
      ],
      tooltip: 'Perfect for nurses new to the platform, allowing you to test our core features with up to 2 clients.'
    },
    {
      id: "growth",
      name: 'Growth Plan',
      description: 'Nurses starting out, seeking lower upfront costs with revenue tied to their earnings.',
      price: '€20',
      billing: 'per month + 20% commission',
      featured: true,
      features: [
        { text: 'Smart matching + Client Opportunities', included: true },
        { text: 'Up to 10 active clients', included: true },
        { text: 'Basic AI documentation templates', included: true },
        { text: 'Voice-to-text (50 notes/month)', included: true },
        { text: 'HD Video Consultations', included: true },
        { text: 'Secure HIPAA-compliant messaging', included: true },
        { text: 'Full mobile app access', included: true },
        { text: 'Intelligent scheduling', included: true },
        { text: 'Invoicing (20% commission)', included: true },
        { text: 'Send up to 10 intro messages/month', included: true },
        { text: 'Analytics dashboard', included: false },
      ],
      tooltip: 'Lower upfront cost with 20% commission on invoiced business, perfect for nurses growing their practice.'
    },
    {
      id: "basic",
      name: 'Basic Plan',
      description: 'Solo nurses with a small practice preferring a fixed cost over commission.',
      price: '€60',
      billing: 'per month',
      featured: false,
      features: [
        { text: 'Smart matching + Client Opportunities', included: true },
        { text: 'Up to 10 active clients', included: true },
        { text: 'Basic AI documentation templates', included: true },
        { text: 'Voice-to-text (50 notes/month)', included: true },
        { text: 'HD Video Consultations', included: true },
        { text: 'Secure HIPAA-compliant messaging', included: true },
        { text: 'Full mobile app access', included: true },
        { text: 'Intelligent scheduling', included: true },
        { text: 'Invoicing (0% commission)', included: true },
        { text: 'Send up to 5 intro messages/month', included: true },
        { text: 'Basic analytics dashboard', included: true },
      ],
      tooltip: 'Fixed monthly fee with no commission, ideal for nurses who prefer cost predictability.'
    },
    {
      id: "professional",
      name: 'Professional Plan',
      description: 'Independent nurses scaling their practice with unlimited clients.',
      price: '€100',
      billing: 'per month',
      featured: false,
      features: [
        { text: 'Smart matching + full Client Opportunities', included: true },
        { text: 'Unlimited active clients', included: true },
        { text: 'Customizable AI templates', included: true },
        { text: 'Unlimited voice-to-text transcription', included: true },
        { text: 'HD Video Consultations with recording', included: true },
        { text: 'Secure HIPAA-compliant messaging', included: true },
        { text: 'Full mobile app access', included: true },
        { text: 'Advanced intelligent scheduling', included: true },
        { text: 'Full invoicing system (0% commission)', included: true },
        { text: 'Unlimited intro messages', included: true },
        { text: 'Advanced analytics dashboard', included: true },
        { text: 'Priority support', included: true },
        { text: 'Customizable workflows', included: true },
      ],
      tooltip: 'For serious practitioners, offering unlimited clients and advanced features for a growing practice.'
    },
    {
      id: "team",
      name: 'Team Plan',
      description: 'Small nursing teams collaborating on client care.',
      price: '€200',
      billing: 'per month',
      featured: false,
      features: [
        { text: 'Team-wide Client Opportunities', included: true },
        { text: 'Unlimited clients (up to 5 nurses)', included: true },
        { text: 'Customizable AI templates', included: true },
        { text: 'Unlimited voice-to-text transcription', included: true },
        { text: 'HD Video Consultations with recording', included: true },
        { text: 'Team messaging & coordination', included: true },
        { text: 'Full mobile app for all team members', included: true },
        { text: 'Team scheduling calendar', included: true },
        { text: 'Full team invoicing system (0% commission)', included: true },
        { text: 'Unlimited intro messages', included: true },
        { text: 'Team analytics dashboard', included: true },
        { text: 'Priority support', included: true },
        { text: 'Centralized client database', included: true },
        { text: 'Enterprise security features', included: true },
      ],
      tooltip: 'Perfect for small nursing teams (up to 5 nurses) collaborating on client care under a unified system.'
    }
  ];

  return (
    <>
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
                  Flexible Pricing for Healthcare Professionals
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Choose the plan that best fits your practice. With options from free to team plans, you can start small and scale as your remote care capabilities grow.
                </p>
              </div>
            </Transition>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
              {plans.map((plan, index) => (
                <Transition 
                  key={plan.name} 
                  animation="fade-up" 
                  delay={`delay-${(index % 5) * 100 + 100}` as any}
                >
                  <Card className={`relative h-full ${plan.featured 
                    ? 'border-purple-200 shadow-xl' 
                    : 'border-gray-200 shadow-lg'}`}>
                    
                    {plan.featured && (
                      <div className="absolute top-0 right-0 bg-purple-600 text-white px-4 py-1 text-sm font-medium">
                        Most Popular
                      </div>
                    )}
                    
                    <CardHeader className={`p-6 ${plan.featured ? 'bg-purple-50' : 'bg-white'}`}>
                      <div className="relative">
                        <CardTitle className="text-xl font-bold flex items-center">
                          {plan.name}
                          <button 
                            onClick={() => toggleTooltip(plan.id)}
                            className="ml-2 text-gray-400 hover:text-purple-600 transition-colors"
                          >
                            <Info size={16} />
                          </button>
                        </CardTitle>
                        {showTooltip === plan.id && (
                          <div className="absolute z-10 mt-2 p-3 bg-white rounded-md shadow-lg border border-gray-200 text-sm text-gray-600 w-56">
                            {plan.tooltip}
                          </div>
                        )}
                      </div>
                      <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                      
                      <div className="mt-4">
                        <div className="flex items-end">
                          <span className="text-3xl font-bold">{plan.price}</span>
                          <span className="text-gray-500 ml-1">{plan.billing}</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <div key={i} className="flex items-start">
                            <div className="flex-shrink-0 mr-2 mt-1">
                              {feature.included ? (
                                <Check size={16} className="text-purple-600" />
                              ) : (
                                <X size={16} className="text-gray-300" />
                              )}
                            </div>
                            <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    
                    <CardFooter className="p-6 pt-0">
                      <Button 
                        variant={plan.featured ? 'primary' : 'outline'} 
                        fullWidth
                        className={plan.featured ? 'bg-purple-600 text-white' : 'border-purple-300 text-purple-700'}
                      >
                        Get Started
                      </Button>
                    </CardFooter>
                  </Card>
                </Transition>
              ))}
            </div>
          </div>
        </section>

        {/* Plan Comparison */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <Transition animation="fade-up">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold mb-6">Pick Your Perfect Plan</h2>
                <p className="text-lg text-gray-600">
                  All plans include our core telehealth platform and HIPAA-compliant tools. Choose the option that best fits your practice size and needs.
                </p>
              </div>
            </Transition>

            <div className="max-w-5xl mx-auto">
              <div className="overflow-hidden bg-white rounded-xl shadow-lg border border-gray-200">
                <table className="w-full">
                  <thead>
                    <tr className="bg-purple-50">
                      <th className="px-6 py-4 text-left font-semibold">Plan Feature</th>
                      <th className="px-4 py-4 text-center font-semibold">Free</th>
                      <th className="px-4 py-4 text-center font-semibold">Growth</th>
                      <th className="px-4 py-4 text-center font-semibold">Basic</th>
                      <th className="px-4 py-4 text-center font-semibold">Professional</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="px-6 py-4 text-sm">Client Limit</td>
                      <td className="px-4 py-4 text-center text-sm">2</td>
                      <td className="px-4 py-4 text-center text-sm">10</td>
                      <td className="px-4 py-4 text-center text-sm">10</td>
                      <td className="px-4 py-4 text-center text-sm">Unlimited</td>
                    </tr>
                    <tr className="border-t border-gray-200 bg-purple-50/30">
                      <td className="px-6 py-4 text-sm">Voice-to-Text Notes</td>
                      <td className="px-4 py-4 text-center text-sm">10/month</td>
                      <td className="px-4 py-4 text-center text-sm">50/month</td>
                      <td className="px-4 py-4 text-center text-sm">50/month</td>
                      <td className="px-4 py-4 text-center text-sm">Unlimited</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-6 py-4 text-sm">Intro Messages to Clients</td>
                      <td className="px-4 py-4 text-center text-sm">None</td>
                      <td className="px-4 py-4 text-center text-sm">10/month</td>
                      <td className="px-4 py-4 text-center text-sm">5/month</td>
                      <td className="px-4 py-4 text-center text-sm">Unlimited</td>
                    </tr>
                    <tr className="border-t border-gray-200 bg-purple-50/30">
                      <td className="px-6 py-4 text-sm">Commission Rate</td>
                      <td className="px-4 py-4 text-center text-sm">N/A</td>
                      <td className="px-4 py-4 text-center text-sm">20%</td>
                      <td className="px-4 py-4 text-center text-sm">0%</td>
                      <td className="px-4 py-4 text-center text-sm">0%</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-6 py-4 text-sm">Mobile App</td>
                      <td className="px-4 py-4 text-center text-sm">Limited</td>
                      <td className="px-4 py-4 text-center text-sm">Full</td>
                      <td className="px-4 py-4 text-center text-sm">Full</td>
                      <td className="px-4 py-4 text-center text-sm">Full</td>
                    </tr>
                    <tr className="border-t border-gray-200 bg-purple-50/30">
                      <td className="px-6 py-4 text-sm">Analytics Dashboard</td>
                      <td className="px-4 py-4 text-center text-sm">
                        <X size={16} className="inline text-gray-400" />
                      </td>
                      <td className="px-4 py-4 text-center text-sm">
                        <X size={16} className="inline text-gray-400" />
                      </td>
                      <td className="px-4 py-4 text-center text-sm">
                        <Check size={16} className="inline text-purple-600" />
                      </td>
                      <td className="px-4 py-4 text-center text-sm">
                        <Check size={16} className="inline text-purple-600" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Common Questions From Healthcare Providers</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Find answers to the most common questions about our professional plans.
                </p>
              </div>
            </Transition>

            <div className="max-w-3xl mx-auto">
              <Transition animation="fade-up" delay="delay-100">
                <div className="mb-8 p-6 rounded-xl bg-white shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">How does the Growth Plan's commission model work?</h3>
                  <p className="text-gray-600">With the Growth Plan, you pay a lower monthly fee (€20) plus 20% of all invoiced business through our platform. For example, if you invoice €500 to clients in a month, Nurse-Sync would receive €100, and you would keep €400. This model is designed to reduce upfront costs while tying our revenue to your success.</p>
                </div>
              </Transition>

              <Transition animation="fade-up" delay="delay-200">
                <div className="mb-8 p-6 rounded-xl bg-white shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">Can I switch between plans?</h3>
                  <p className="text-gray-600">Yes, you can switch between plans at any time. If your practice grows, you can upgrade to a plan with more clients or features. Similarly, if you need to downsize, you can switch to a smaller plan. Changes take effect at the start of your next billing cycle.</p>
                </div>
              </Transition>

              <Transition animation="fade-up" delay="delay-300">
                <div className="mb-8 p-6 rounded-xl bg-white shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">How does the Smart Matching system work?</h3>
                  <p className="text-gray-600">Our AI-powered matching system connects you with care seekers based on your expertise, availability, and their specific needs. As a nurse, you'll receive connection requests from matched care seekers, and can decide whether to proceed with a free introductory call to discuss their needs.</p>
                </div>
              </Transition>

              <Transition animation="fade-up" delay="delay-400">
                <div className="p-6 rounded-xl bg-white shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">What's included in the Team Plan?</h3>
                  <p className="text-gray-600">The Team Plan is designed for small nursing practices with up to 5 nurses. It includes all Professional Plan features for each nurse, plus team collaboration tools like a shared client database, team scheduling calendar, group messaging, and practice-wide analytics to help manage your collective workflow.</p>
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
    </>
  );
};

export default NursePricingPage;
