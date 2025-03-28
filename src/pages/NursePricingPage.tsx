
import React, { useEffect, useState } from 'react';
import { Check, X, Info, ArrowRight, Briefcase, Users } from 'lucide-react';
import Transition from '../components/ui-components/Transition';
import Button from '../components/ui-components/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import GlassCard from '../components/ui-components/GlassCard';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

const NursePricingPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'career' | 'pricing'>('career');

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
      color: 'from-gray-200 to-gray-50',
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
      color: 'from-purple-200 to-indigo-100',
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
      color: 'from-blue-100 to-purple-100',
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
      color: 'from-indigo-200 to-purple-100',
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
      color: 'from-violet-200 to-fuchsia-100',
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
        <section className="relative pt-20 pb-12 md:pt-28 md:pb-20 overflow-hidden bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6TTI0IDQ4YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiIGZpbGw9InJnYmEoMTAwLDEwMCwxMDAsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
          
          <div className="container mx-auto px-4 relative">
            <Transition animation="fade-up">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                  Healthcare Provider Plans
                </div>
                <h1 className="text-2xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800">
                  Flexible Pricing for Healthcare Professionals
                </h1>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  Choose the plan that best fits your practice. With options from free to team plans, you can start small and scale as your remote care capabilities grow.
                </p>
              </div>
            </Transition>
          </div>
        </section>

        {/* Tabs for Career Paths and Pricing Plans */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="inline-flex rounded-lg bg-gray-100 p-1 text-sm">
                <button
                  className={`rounded-md px-4 py-2 font-medium transition-colors ${
                    activeTab === 'career' 
                    ? 'bg-white shadow text-purple-700' 
                    : 'text-gray-600 hover:text-purple-600'
                  }`}
                  onClick={() => setActiveTab('career')}
                >
                  Career Paths
                </button>
                <button
                  className={`rounded-md px-4 py-2 font-medium transition-colors ${
                    activeTab === 'pricing' 
                    ? 'bg-white shadow text-purple-700' 
                    : 'text-gray-600 hover:text-purple-600'
                  }`}
                  onClick={() => setActiveTab('pricing')}
                >
                  Pricing Plans
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Career Paths Section */}
        {activeTab === 'career' && (
          <section className="py-12 md:py-16 relative overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <Transition animation="fade-up">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Two Paths to Professional Growth</h2>
                  <p className="text-base text-gray-600 max-w-2xl mx-auto">
                    At Nurse-Sync, we believe in empowering healthcare professionals with flexible career options. Choose your own path or combine both for maximum opportunity.
                  </p>
                </Transition>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Independent Practice Path */}
                <Transition animation="slide-in-left" delay="delay-100">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-2xl blur opacity-80"></div>
                    <GlassCard
                      className="relative h-full border-purple-100 backdrop-blur-md hover:border-purple-200 transition-all duration-300 hover:shadow-lg z-10"
                      hover={true}
                      variant="nurse"
                    >
                      <div className="pb-2 text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Briefcase className="w-6 h-6 text-purple-700" />
                        </div>
                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-700">
                          Independent Practice
                        </h3>
                        <p className="text-sm mt-2 text-gray-600">
                          Build your own telehealth practice with our platform support
                        </p>
                      </div>
                      
                      <div className="pt-4">
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <Check size={16} className="text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700">Complete control over your schedule, services, and client base</p>
                          </div>
                          <div className="flex items-start">
                            <Check size={16} className="text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700">Set your own rates and keep 100% of your earnings (minus platform fee)</p>
                          </div>
                          <div className="flex items-start">
                            <Check size={16} className="text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700">Use our advanced telehealth tools, HIPAA-compliant messaging, and scheduling</p>
                          </div>
                          <div className="flex items-start">
                            <Check size={16} className="text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700">Build your brand with a customizable profile and marketing support</p>
                          </div>
                        </div>
                        
                        <div className="mt-6 p-3 bg-purple-50 rounded-lg">
                          <h4 className="font-bold text-purple-800 text-sm mb-1">Perfect For:</h4>
                          <p className="text-xs text-gray-700">Healthcare professionals wanting to build their own business with flexible hours and complete autonomy</p>
                        </div>
                      </div>
                      
                      <div className="pt-4 mt-4">
                        <Button
                          variant="primary"
                          fullWidth
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white group"
                        >
                          View Independent Plans
                          <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </GlassCard>
                  </div>
                </Transition>
                
                {/* Nurse-Sync Nurse Path */}
                <Transition animation="slide-in-right" delay="delay-200">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/30 to-blue-600/30 rounded-2xl blur opacity-80"></div>
                    <GlassCard
                      className="relative h-full border-indigo-100 backdrop-blur-md hover:border-indigo-200 transition-all duration-300 hover:shadow-lg z-10"
                      hover={true}
                      variant="nurse"
                    >
                      <div className="pb-2 text-center">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Users className="w-6 h-6 text-indigo-700" />
                        </div>
                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-700">
                          Nurse-Sync Professional
                        </h3>
                        <p className="text-sm mt-2 text-gray-600">
                          Join our network of healthcare providers and get assigned clients
                        </p>
                      </div>
                      
                      <div className="pt-4">
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <Check size={16} className="text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700">Steady stream of clients assigned to you based on your expertise</p>
                          </div>
                          <div className="flex items-start">
                            <Check size={16} className="text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700">Guaranteed minimum hours and predictable income</p>
                          </div>
                          <div className="flex items-start">
                            <Check size={16} className="text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700">No need to market yourself or find clients - we handle that for you</p>
                          </div>
                          <div className="flex items-start">
                            <Check size={16} className="text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700">Professional development, training, and mentorship opportunities</p>
                          </div>
                        </div>
                        
                        <div className="mt-6 p-3 bg-indigo-50 rounded-lg">
                          <h4 className="font-bold text-indigo-800 text-sm mb-1">Perfect For:</h4>
                          <p className="text-xs text-gray-700">Healthcare professionals seeking stable income and work-life balance without the challenges of running a business</p>
                        </div>
                      </div>
                      
                      <div className="pt-4 mt-4">
                        <Button
                          variant="primary"
                          fullWidth
                          size="sm"
                          className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white group"
                        >
                          Join Our Network
                          <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </GlassCard>
                  </div>
                </Transition>
              </div>
              
              {/* Combine Both Paths Box */}
              <Transition animation="fade-up" delay="delay-300">
                <div className="max-w-3xl mx-auto mt-12 p-6 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 shadow-md">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      <h3 className="text-lg font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-700">
                        Why Not Do Both?
                      </h3>
                      <p className="text-sm text-gray-700 mb-3">
                        Many of our healthcare professionals combine both approaches—working with Nurse-Sync assigned clients while building their independent practice. This hybrid approach provides stability while you grow your own client base at your own pace.
                      </p>
                      <Button 
                        variant="outline"
                        size="sm"
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
                <div className="max-w-3xl mx-auto mt-12 p-6 rounded-xl bg-white border border-gray-200 shadow-md">
                  <div className="flex flex-col items-center text-center">
                    <div className="inline-flex mb-4">
                      <svg width="36" height="28" className="text-purple-600 fill-current" viewBox="0 0 45 36" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5 18H9C9 12.477 13.477 8 19 8V13.5C16.0147 13.5 13.5 16.0147 13.5 19V36H0V18H13.5ZM40.5 18H36C36 12.477 40.477 8 46 8V13.5C43.0147 13.5 40.5 16.0147 40.5 19V36H27V18H40.5Z" />
                      </svg>
                    </div>
                    <p className="text-base text-gray-700 mb-4 italic">
                      "I started with Nurse-Sync as a network nurse, which gave me steady income while I learned the platform. After six months, I began building my independent practice on evenings and weekends. Now, two years later, I'm fully independent with a thriving telehealth practice of my own!"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                        <span className="text-indigo-700 font-bold text-sm">ES</span>
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-sm">Emma Stevens, RN</h4>
                        <p className="text-gray-600 text-xs">Pediatric Nurse Specialist</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </section>
        )}

        {/* Pricing Plans Section */}
        {activeTab === 'pricing' && (
          <section className="py-12 md:py-16 relative overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <Transition animation="fade-up">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Choose Your Perfect Plan</h2>
                  <p className="text-base text-gray-600 max-w-2xl mx-auto">
                    All plans include our core telehealth platform and HIPAA-compliant tools. Select the option that best fits your practice size and needs.
                  </p>
                </Transition>
              </div>
              
              {/* Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {plans.slice(0, 3).map((plan, index) => (
                  <Transition key={plan.id} animation="fade-up" delay={index === 0 ? "delay-100" : index === 1 ? "delay-200" : "delay-300"} className="h-full">
                    <div className="relative h-full group">
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-tl ${plan.color} opacity-40 group-hover:opacity-60 transition-opacity duration-300`}></div>
                      
                      <div className="absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/80 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl"></div>
                      
                      <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm p-5 overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:translate-y-[-2px]">
                        {plan.featured && (
                          <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 text-xs font-medium transform translate-x-2 -translate-y-1/2 shadow-md rounded-full">
                            Most Popular
                          </div>
                        )}
                        
                        <div className="mb-4">
                          <h3 className="text-lg font-bold mb-1 text-gray-900">{plan.name}</h3>
                          <p className="text-xs text-gray-600 h-8">{plan.description}</p>
                        </div>
                        
                        <div className="mb-5 pb-5 border-b border-gray-200">
                          <div className="flex items-end">
                            <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                            <span className="text-gray-500 ml-1 text-xs">{plan.billing}</span>
                          </div>
                        </div>
                        
                        <ul className="space-y-2 mb-6 min-h-[220px]">
                          {plan.features.slice(0, 6).map((feature, i) => (
                            <li key={i} className="flex items-start">
                              {feature.included ? (
                                <Check size={14} className="text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                              ) : (
                                <X size={14} className="text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                              )}
                              <span className={`text-xs ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                                {feature.text}
                              </span>
                            </li>
                          ))}
                          {plan.features.length > 6 && (
                            <li className="text-xs text-purple-600 font-medium cursor-pointer" onClick={() => toggleTooltip(plan.id)}>
                              + {plan.features.length - 6} more features
                            </li>
                          )}
                        </ul>
                        
                        <div className="mt-auto">
                          <Button
                            variant={plan.featured ? 'primary' : 'outline'}
                            fullWidth
                            size="sm"
                            className={plan.featured ? 'bg-purple-600 hover:bg-purple-700' : 'border-purple-200 text-purple-700 hover:bg-purple-50'}
                          >
                            {plan.id === 'free' ? 'Sign Up Free' : 'Subscribe Now'}
                          </Button>
                          
                          {/* Tooltip */}
                          {showTooltip === plan.id && (
                            <div className="absolute z-10 left-0 right-0 bottom-full mb-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200 text-xs">
                              <h4 className="font-bold mb-2">All Features:</h4>
                              <ul className="space-y-1.5">
                                {plan.features.map((feature, i) => (
                                  <li key={i} className="flex items-start">
                                    {feature.included ? (
                                      <Check size={12} className="text-purple-600 mr-1.5 mt-0.5 flex-shrink-0" />
                                    ) : (
                                      <X size={12} className="text-gray-400 mr-1.5 mt-0.5 flex-shrink-0" />
                                    )}
                                    <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                                      {feature.text}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                              <button 
                                className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowTooltip(null);
                                }}
                              >
                                <X size={14} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Transition>
                ))}
              </div>
              
              <div className="text-center mt-6 mb-6">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-purple-300 text-purple-700"
                >
                  View All Plans
                </Button>
              </div>
              
              {/* Plan Comparison */}
              <div className="mt-16">
                <h3 className="text-xl font-bold mb-6 text-center">Compare Plan Features</h3>
                <div className="overflow-hidden bg-white rounded-xl shadow-md border border-purple-100">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-purple-50/80">
                          <TableHead className="w-[250px] py-3 text-left font-semibold text-purple-900">Plan Feature</TableHead>
                          <TableHead className="py-3 text-center font-semibold text-purple-900">Free</TableHead>
                          <TableHead className="py-3 text-center font-semibold text-purple-900">Growth</TableHead>
                          <TableHead className="py-3 text-center font-semibold text-purple-900">Basic</TableHead>
                          <TableHead className="py-3 text-center font-semibold text-purple-900">Pro</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="border-t border-gray-100">
                          <TableCell className="py-2.5 text-sm">Client Limit</TableCell>
                          <TableCell className="py-2.5 text-center text-sm">2</TableCell>
                          <TableCell className="py-2.5 text-center text-sm">10</TableCell>
                          <TableCell className="py-2.5 text-center text-sm">10</TableCell>
                          <TableCell className="py-2.5 text-center text-sm">Unlimited</TableCell>
                        </TableRow>
                        <TableRow className="border-t border-gray-100 bg-purple-50/30">
                          <TableCell className="py-2.5 text-sm">Voice-to-Text Notes</TableCell>
                          <TableCell className="py-2.5 text-center text-sm">10/month</TableCell>
                          <TableCell className="py-2.5 text-center text-sm">50/month</TableCell>
                          <TableCell className="py-2.5 text-center text-sm">50/month</TableCell>
                          <TableCell className="py-2.5 text-center text-sm">Unlimited</TableCell>
                        </TableRow>
                        <TableRow className="border-t border-gray-100">
                          <TableCell className="py-2.5 text-sm">Intro Messages to Clients</TableCell>
                          <TableCell className="py-2.5 text-center text-sm">None</TableCell>
                          <TableCell className="py-2.5 text-center text-sm">10/month</TableCell>
                          <TableCell className="py-2.5 text-center text-sm">5/month</TableCell>
                          <TableCell className="py-2.5 text-center text-sm">Unlimited</TableCell>
                        </TableRow>
                        <TableRow className="border-t border-gray-100 bg-purple-50/30">
                          <TableCell className="py-2.5 text-sm">Commission Rate</TableCell>
                          <TableCell className="py-2.5 text-center text-sm">N/A</TableCell>
                          <TableCell className="py-2.5 text-center text-sm">20%</TableCell>
                          <TableCell className="py-2.5 text-center text-sm">0%</TableCell>
                          <TableCell className="py-2.5 text-center text-sm">0%</TableCell>
                        </TableRow>
                        <TableRow className="border-t border-gray-100">
                          <TableCell className="py-2.5 text-sm">Analytics Dashboard</TableCell>
                          <TableCell className="py-2.5 text-center text-sm">
                            <X size={14} className="inline text-gray-400" />
                          </TableCell>
                          <TableCell className="py-2.5 text-center text-sm">
                            <X size={14} className="inline text-gray-400" />
                          </TableCell>
                          <TableCell className="py-2.5 text-center text-sm">
                            <Check size={14} className="inline text-purple-600" />
                          </TableCell>
                          <TableCell className="py-2.5 text-center text-sm">
                            <Check size={14} className="inline text-purple-600" />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="py-12 md:py-16 relative overflow-hidden bg-gray-50">
          <div className="container mx-auto px-4">
            <Transition animation="fade-up">
              <div className="mb-10 text-center">
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                  Frequently Asked Questions
                </div>
                <h2 className="text-xl md:text-2xl font-bold mb-3">Common Questions From Healthcare Providers</h2>
                <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                  Find answers to the most common questions about our professional plans.
                </p>
              </div>
            </Transition>

            <div className="max-w-3xl mx-auto">
              <div className="grid gap-5 md:grid-cols-2">
                <Transition animation="fade-up" delay="delay-100">
                  <div className="p-5 rounded-xl bg-white shadow-sm border border-gray-100">
                    <h3 className="text-base font-semibold mb-2">How does the Growth Plan's commission model work?</h3>
                    <p className="text-sm text-gray-600">With the Growth Plan, you pay a lower monthly fee (€20) plus 20% of all invoiced business through our platform. For example, if you invoice €500 to clients in a month, Nurse-Sync would receive €100, and you would keep €400.</p>
                  </div>
                </Transition>

                <Transition animation="fade-up" delay="delay-200">
                  <div className="p-5 rounded-xl bg-white shadow-sm border border-gray-100">
                    <h3 className="text-base font-semibold mb-2">Can I switch between plans?</h3>
                    <p className="text-sm text-gray-600">Yes, you can switch between plans at any time. If your practice grows, you can upgrade to a plan with more clients or features. Similarly, if you need to downsize, you can switch to a smaller plan.</p>
                  </div>
                </Transition>

                <Transition animation="fade-up" delay="delay-300">
                  <div className="p-5 rounded-xl bg-white shadow-sm border border-gray-100">
                    <h3 className="text-base font-semibold mb-2">How does the Smart Matching system work?</h3>
                    <p className="text-sm text-gray-600">Our AI-powered matching system connects you with care seekers based on your expertise, availability, and their specific needs. You'll receive connection requests from matched care seekers, and can decide whether to proceed with a free introductory call.</p>
                  </div>
                </Transition>

                <Transition animation="fade-up" delay="delay-400">
                  <div className="p-5 rounded-xl bg-white shadow-sm border border-gray-100">
                    <h3 className="text-base font-semibold mb-2">What's included in the Team Plan?</h3>
                    <p className="text-sm text-gray-600">The Team Plan is designed for small nursing practices with up to 5 nurses. It includes all Professional Plan features for each nurse, plus team collaboration tools like a shared client database, team scheduling calendar, and practice-wide analytics.</p>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto relative rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
              <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6TTI0IDQ4YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiIGZpbGw9IndoaXRlIi8+PC9nPjwvc3ZnPg==')]"></div>
              <div className="relative p-8 md:p-10">
                <div className="text-center text-white">
                  <h2 className="text-xl md:text-2xl font-bold mb-3">Ready to enhance your practice?</h2>
                  <p className="text-base mb-6 opacity-90">Start your 14-day free trial with full access to all features.</p>
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                    <Button
                      variant="secondary"
                      size="md"
                      className="bg-white text-purple-700 hover:bg-gray-100 shadow-md"
                    >
                      Schedule a Demo
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
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

