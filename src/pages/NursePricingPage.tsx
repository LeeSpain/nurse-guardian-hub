
import React, { useEffect, useState } from 'react';
import { Check, X, Info, ArrowRight, Briefcase, Users } from 'lucide-react';
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

        {/* Two Career Paths Section - REPLACING PREVIOUS PRICING PLANS SECTION */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Transition animation="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Two Paths to Professional Growth</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  At Nurse-Sync, we believe in empowering healthcare professionals with flexible career options. Choose your own path or combine both for maximum opportunity.
                </p>
              </Transition>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Independent Practice Path */}
              <Transition animation="slide-in-left" delay="delay-100">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-20"></div>
                  <Card className="relative h-full border-purple-100 hover:border-purple-200 transition-all duration-300 hover:shadow-xl z-10">
                    <CardHeader className="pb-2 text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Briefcase className="w-8 h-8 text-purple-700" />
                      </div>
                      <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-700">
                        Independent Practice
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        Build your own telehealth practice with our platform support
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <Check size={20} className="text-purple-600 mr-3 mt-1 flex-shrink-0" />
                          <p className="text-gray-700">Complete control over your schedule, services, and client base</p>
                        </div>
                        <div className="flex items-start">
                          <Check size={20} className="text-purple-600 mr-3 mt-1 flex-shrink-0" />
                          <p className="text-gray-700">Set your own rates and keep 100% of your earnings (minus platform fee)</p>
                        </div>
                        <div className="flex items-start">
                          <Check size={20} className="text-purple-600 mr-3 mt-1 flex-shrink-0" />
                          <p className="text-gray-700">Use our advanced telehealth tools, HIPAA-compliant messaging, and scheduling</p>
                        </div>
                        <div className="flex items-start">
                          <Check size={20} className="text-purple-600 mr-3 mt-1 flex-shrink-0" />
                          <p className="text-gray-700">Build your brand with a customizable profile and marketing support</p>
                        </div>
                        <div className="flex items-start">
                          <Check size={20} className="text-purple-600 mr-3 mt-1 flex-shrink-0" />
                          <p className="text-gray-700">Access to client matching algorithm to build your practice</p>
                        </div>
                      </div>
                      
                      <div className="mt-8 p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-bold text-purple-800 mb-1">Perfect For:</h4>
                        <p className="text-gray-700">Healthcare professionals wanting to build their own business with flexible hours and complete autonomy</p>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-0">
                      <Button
                        variant="primary"
                        fullWidth
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white group"
                      >
                        View Independent Plans
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </Transition>
              
              {/* Nurse-Sync Nurse Path */}
              <Transition animation="slide-in-right" delay="delay-200">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl blur opacity-20"></div>
                  <Card className="relative h-full border-indigo-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-xl z-10">
                    <CardHeader className="pb-2 text-center">
                      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-indigo-700" />
                      </div>
                      <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-700">
                        Nurse-Sync Professional
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        Join our network of healthcare providers and get assigned clients
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <Check size={20} className="text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                          <p className="text-gray-700">Steady stream of clients assigned to you based on your expertise</p>
                        </div>
                        <div className="flex items-start">
                          <Check size={20} className="text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                          <p className="text-gray-700">Guaranteed minimum hours and predictable income</p>
                        </div>
                        <div className="flex items-start">
                          <Check size={20} className="text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                          <p className="text-gray-700">No need to market yourself or find clients - we handle that for you</p>
                        </div>
                        <div className="flex items-start">
                          <Check size={20} className="text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                          <p className="text-gray-700">Professional development, training, and mentorship opportunities</p>
                        </div>
                        <div className="flex items-start">
                          <Check size={20} className="text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                          <p className="text-gray-700">Team collaboration and peer support network</p>
                        </div>
                      </div>
                      
                      <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
                        <h4 className="font-bold text-indigo-800 mb-1">Perfect For:</h4>
                        <p className="text-gray-700">Healthcare professionals seeking stable income and work-life balance without the challenges of running a business</p>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-0">
                      <Button
                        variant="primary"
                        fullWidth
                        className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white group"
                      >
                        Join Our Network
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </Transition>
            </div>
            
            {/* Combine Both Paths Box */}
            <Transition animation="fade-up" delay="delay-300">
              <div className="max-w-4xl mx-auto mt-16 p-8 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 shadow-lg">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22v-5" />
                        <path d="M9 8V2" />
                        <path d="M15 8V2" />
                        <path d="M18 8v4" />
                        <path d="M6 8v4" />
                        <path d="M20 13a8 8 0 1 1-16 0 8 8 0 0 1 16 0z" />
                        <path d="M9 22v-5" />
                        <path d="M15 22v-5" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-700">
                      Why Not Do Both?
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Many of our healthcare professionals combine both approaches—working with Nurse-Sync assigned clients while building their independent practice. This hybrid approach provides stability while you grow your own client base at your own pace.
                    </p>
                    <Button 
                      variant="outline"
                      className="border-purple-300 text-purple-700 hover:bg-purple-50"
                    >
                      Learn About Our Hybrid Approach
                    </Button>
                  </div>
                </div>
              </div>
            </Transition>
            
            {/* Testimonial */}
            <Transition animation="fade-up" delay="delay-400">
              <div className="max-w-4xl mx-auto mt-16 p-8 rounded-xl bg-white border border-gray-200 shadow-lg">
                <div className="flex flex-col items-center text-center">
                  <div className="inline-flex mb-6">
                    <svg width="45" height="36" className="text-purple-600 fill-current" viewBox="0 0 45 36" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.5 18H9C9 12.477 13.477 8 19 8V13.5C16.0147 13.5 13.5 16.0147 13.5 19V36H0V18H13.5ZM40.5 18H36C36 12.477 40.477 8 46 8V13.5C43.0147 13.5 40.5 16.0147 40.5 19V36H27V18H40.5Z" />
                    </svg>
                  </div>
                  <p className="text-lg md:text-xl text-gray-700 mb-6 italic">
                    "I started with Nurse-Sync as a network nurse, which gave me steady income while I learned the platform. After six months, I began building my independent practice on evenings and weekends. Now, two years later, I'm fully independent with a thriving telehealth practice of my own!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                      <span className="text-indigo-700 font-bold">ES</span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold">Emma Stevens, RN</h4>
                      <p className="text-gray-600 text-sm">Pediatric Nurse Specialist</p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
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
