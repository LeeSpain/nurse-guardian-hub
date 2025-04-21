import React, { useEffect, useState } from 'react';
import { Check, X, Info, ArrowRight, Briefcase, Users, ChevronDown } from 'lucide-react';
import Transition from '../components/ui-components/Transition';
import Button from '../components/ui-components/Button';
import { Card, CardContent } from '@/components/ui/card';
import GlassCard from '../components/ui-components/GlassCard';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

const NursePricingPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'career' | 'pricing'>('career');
  const [expandedFeatures, setExpandedFeatures] = useState<Record<string, boolean>>({});

  const toggleTooltip = (planId: string) => {
    if (showTooltip === planId) {
      setShowTooltip(null);
    } else {
      setShowTooltip(planId);
    }
  };

  const toggleFeatures = (planId: string) => {
    setExpandedFeatures(prev => ({
      ...prev,
      [planId]: !prev[planId]
    }));
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
    <div className="bg-gradient-to-b from-white via-purple-50/30 to-white">
      {/* Hero Section - Refined to match main site */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6TTI0IDQ4YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiIGZpbGw9InJnYmEoMTAwLDEwMCwxMDAsMC4xKSIvPjwvZz48L3N2Zz4=')]"></div>
        
        <div className="container mx-auto px-4 max-w-6xl relative">
          <Transition animation="fade-up">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center px-4 py-2 mb-4 rounded-full text-sm font-medium bg-purple-100 text-purple-700 shadow-sm">
                Healthcare Provider Plans
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800">
                Flexible Pricing for Healthcare Professionals
              </h1>
              <p className="text-lg text-gray-600 mx-auto mb-8">
                Choose the plan that best fits your practice. With options from free to team plans, you can start small and scale as your remote care capabilities grow.
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md hover:shadow-lg transition-all"
                >
                  Start Free Trial
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  Compare Plans
                </Button>
              </div>
            </div>
          </Transition>
        </div>
      </section>

      {/* Tabs for Career Paths and Pricing Plans - Enhanced with better styling */}
      <section className="py-8 border-b border-gray-200 sticky top-20 z-20 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-center">
            <div className="inline-flex rounded-lg bg-gray-100 p-1 text-sm">
              <button
                className={`rounded-md px-6 py-2.5 font-medium transition-all duration-200 ${
                  activeTab === 'career' 
                  ? 'bg-white shadow-md text-purple-700' 
                  : 'text-gray-600 hover:text-purple-600'
                }`}
                onClick={() => setActiveTab('career')}
              >
                Career Paths
              </button>
              <button
                className={`rounded-md px-6 py-2.5 font-medium transition-all duration-200 ${
                  activeTab === 'pricing' 
                  ? 'bg-white shadow-md text-purple-700' 
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

      {/* Career Paths Section - Enhanced with more elevation and polish */}
      {activeTab === 'career' && (
        <section className="py-16 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-6xl">
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
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/40 to-indigo-600/40 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
                  <GlassCard
                    className="relative h-full border-purple-100 backdrop-blur-md hover:border-purple-200 transition-all duration-300 hover:shadow-lg z-10"
                    hover={true}
                    variant="nurse"
                  >
                    <div className="pb-2 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                        <Briefcase className="w-7 h-7 text-purple-700" />
                      </div>
                      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-700 mb-2">
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
                      
                      <div className="mt-6 p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg shadow-sm">
                        <h4 className="font-bold text-purple-800 text-sm mb-1">Perfect For:</h4>
                        <p className="text-xs text-gray-700">Healthcare professionals wanting to build their own business with flexible hours and complete autonomy</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 mt-4">
                      <Button
                        variant="primary"
                        fullWidth
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white group shadow-md hover:shadow-lg transition-all"
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
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/40 to-blue-600/40 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
                  <GlassCard
                    className="relative h-full border-indigo-100 backdrop-blur-md hover:border-indigo-200 transition-all duration-300 hover:shadow-lg z-10"
                    hover={true}
                    variant="nurse"
                  >
                    <div className="pb-2 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                        <Users className="w-7 h-7 text-indigo-700" />
                      </div>
                      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-700 mb-2">
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
                      
                      <div className="mt-6 p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg shadow-sm">
                        <h4 className="font-bold text-indigo-800 text-sm mb-1">Perfect For:</h4>
                        <p className="text-xs text-gray-700">Healthcare professionals seeking stable income and work-life balance without the challenges of running a business</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 mt-4">
                      <Button
                        variant="primary"
                        fullWidth
                        size="sm"
                        className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white group shadow-md hover:shadow-lg transition-all"
                      >
                        Join Our Network
                        <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </GlassCard>
                </div>
              </Transition>
            </div>
            
            {/* Combine Both Paths Box - Made more visually appealing */}
            <Transition animation="fade-up" delay="delay-300">
              <div className="max-w-3xl mx-auto mt-12 overflow-hidden">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-xl blur-md opacity-75 transition-opacity duration-300"></div>
                  <div className="relative p-8 rounded-xl bg-white/90 backdrop-blur-md border border-purple-100 shadow-md">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                        <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-700">
                          Why Not Do Both?
                        </h3>
                        <p className="text-gray-700 mb-6">
                          Many of our healthcare professionals combine both approaches—working with Nurse-Sync assigned clients while building their independent practice. This hybrid approach provides stability while you grow your own client base at your own pace.
                        </p>
                        <Button 
                          variant="outline"
                          size="md"
                          className="border-purple-300 text-purple-700 hover:bg-purple-50 shadow-sm"
                        >
                          Learn About Our Hybrid Approach
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
            
            {/* Testimonial - Made more elegant */}
            <Transition animation="fade-up" delay="delay-400">
              <div className="max-w-3xl mx-auto mt-12">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 border border-purple-100 shadow-md">
                  <div className="flex flex-col items-center text-center">
                    <div className="inline-flex mb-4">
                      <svg width="42" height="36" className="text-purple-600 fill-current" viewBox="0 0 45 36" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5 18H9C9 12.477 13.477 8 19 8V13.5C16.0147 13.5 13.5 16.0147 13.5 19V36H0V18H13.5ZM40.5 18H36C36 12.477 40.477 8 46 8V13.5C43.0147 13.5 40.5 16.0147 40.5 19V36H27V18H40.5Z" />
                      </svg>
                    </div>
                    <p className="text-lg text-gray-700 mb-6 italic leading-relaxed">
                      "I started with Nurse-Sync as a network nurse, which gave me steady income while I learned the platform. After six months, I began building my independent practice on evenings and weekends. Now, two years later, I'm fully independent with a thriving telehealth practice of my own!"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center mr-3 shadow-md">
                        <span className="text-indigo-700 font-bold text-sm">ES</span>
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-gray-900">Emma Stevens, RN</h4>
                        <p className="text-gray-600 text-sm">Pediatric Nurse Specialist</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </section>
      )}

      {/* Pricing Plans Section - Completely redesigned for better presentation */}
      {activeTab === 'pricing' && (
        <section className="py-16 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <Transition animation="fade-up">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Choose Your Perfect Plan</h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  All plans include our core telehealth platform and HIPAA-compliant tools. Select the option that best fits your practice size and needs.
                </p>
              </Transition>
            </div>
            
            {/* Pricing Cards - Completely redesigned for better visual appeal */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.slice(0, 3).map((plan, index) => (
                <Transition key={plan.id} animation="fade-up" delay={index === 0 ? "delay-100" : index === 1 ? "delay-200" : "delay-300"} className="h-full">
                  <div className="relative h-full group">
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-tl ${plan.color} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>
                    
                    <div className="absolute inset-x-0 -top-px h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/80 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl"></div>
                    
                    <div className="relative h-full bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm p-6 overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:translate-y-[-2px]">
                      {plan.featured && (
                        <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1 text-xs font-medium transform translate-x-2 -translate-y-0 shadow-md rounded-full">
                          Most Popular
                        </div>
                      )}
                      
                      <div className="mb-5">
                        <h3 className="text-xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                        <p className="text-sm text-gray-600 min-h-[40px]">{plan.description}</p>
                      </div>
                      
                      <div className="mb-6 pb-6 border-b border-gray-200">
                        <div className="flex items-end">
                          <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                          <span className="text-gray-500 ml-1.5 text-sm">{plan.billing}</span>
                        </div>
                      </div>
                      
                      <ul className="space-y-2.5 mb-6">
                        {plan.features.slice(0, 6).map((feature, i) => (
                          <li key={i} className="flex items-start">
                            {feature.included ? (
                              <Check size={16} className="text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                            ) : (
                              <X size={16} className="text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                            )}
                            <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                              {feature.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                      
                      {plan.features.length > 6 && (
                        <div className="mb-6">
                          <button 
                            onClick={() => toggleFeatures(plan.id)}
                            className="flex items-center text-sm text-purple-600 font-medium hover:text-purple-700 transition-colors"
                          >
                            {expandedFeatures[plan.id] ? 'Show less' : `+ ${plan.features.length - 6} more features`}
                            <ChevronDown 
                              size={16} 
                              className={`ml-1 transition-transform duration-200 ${expandedFeatures[plan.id] ? 'rotate-180' : ''}`} 
                            />
                          </button>
                          
                          {expandedFeatures[plan.id] && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <ul className="space-y-2.5">
                                {plan.features.slice(6).map((feature, i) => (
                                  <li key={i} className="flex items-start">
                                    {feature.included ? (
                                      <Check size={16} className="text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                                    ) : (
                                      <X size={16} className="text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                                    )}
                                    <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                                      {feature.text}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="mt-auto">
                        <Button
                          as="link"
                          to={`/register/nurse?plan=${plan.id}`}
                          variant={plan.featured ? 'primary' : 'outline'}
                          fullWidth
                          size="md"
                          className={plan.featured 
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md' 
                            : 'border-purple-200 text-purple-700 hover:bg-purple-50 shadow-sm'
                          }
                        >
                          {plan.id === 'free' ? 'Sign Up Free' : 'Join This Plan'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Transition>
              ))}
            </div>
            
            <div className="text-center mt-10 mb-16">
              <Button 
                variant="outline" 
                size="md"
                className="border-purple-300 text-purple-700 hover:bg-purple-50 px-6 shadow-sm"
              >
                View All Plans
              </Button>
            </div>
            
            {/* Plan Comparison - Improved table design */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-8 text-center">Compare Plan Features</h3>
              <div className="overflow-hidden bg-white rounded-xl shadow-md border border-purple-100">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-purple-50 to-indigo-50">
                        <TableHead className="w-[250px] py-4 text-left font-semibold text-gray-900">Plan Feature</TableHead>
                        <TableHead className="py-4 text-center font-semibold text-gray-900">Free</TableHead>
                        <TableHead className="py-4 text-center font-semibold text-gray-900">Growth</TableHead>
                        <TableHead className="py-4 text-center font-semibold text-gray-900">Basic</TableHead>
                        <TableHead className="py-4 text-center font-semibold text-gray-900">Pro</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-t border-gray-100">
                        <TableCell className="py-3 text-sm font-medium">Client Limit</TableCell>
                        <TableCell className="py-3 text-center text-sm">2</TableCell>
                        <TableCell className="py-3 text-center text-sm">10</TableCell>
                        <TableCell className="py-3 text-center text-sm">10</TableCell>
                        <TableCell className="py-3 text-center text-sm">Unlimited</TableCell>
                      </TableRow>
                      <TableRow className="border-t border-gray-100 bg-purple-50/30">
                        <TableCell className="py-3 text-sm font-medium">Voice-to-Text Notes</TableCell>
                        <TableCell className="py-3 text-center text-sm">10/month</TableCell>
                        <TableCell className="py-3 text-center text-sm">50/month</TableCell>
                        <TableCell className="py-3 text-center text-sm">50/month</TableCell>
                        <TableCell className="py-3 text-center text-sm">Unlimited</TableCell>
                      </TableRow>
                      <TableRow className="border-t border-gray-100">
                        <TableCell className="py-3 text-sm font-medium">Intro Messages to Clients</TableCell>
                        <TableCell className="py-3 text-center text-sm">None</TableCell>
                        <TableCell className="py-3 text-center text-sm">10/month</TableCell>
                        <TableCell className="py-3 text-center text-sm">5/month</TableCell>
                        <TableCell className="py-3 text-center text-sm">Unlimited</TableCell>
                      </TableRow>
                      <TableRow className="border-t border-gray-100 bg-purple-50/30">
                        <TableCell className="py-3 text-sm font-medium">Commission Rate</TableCell>
                        <TableCell className="py-3 text-center text-sm">N/A</TableCell>
                        <TableCell className="py-3 text-center text-sm">20%</TableCell>
                        <TableCell className="py-3 text-center text-sm">0%</TableCell>
                        <TableCell className="py-3 text-center text-sm">0%</TableCell>
                      </TableRow>
                      <TableRow className="border-t border-gray-100">
                        <TableCell className="py-3 text-sm font-medium">Analytics Dashboard</TableCell>
                        <TableCell className="py-3 text-center text-sm">
                          <X size={16} className="inline text-gray-400" />
                        </TableCell>
                        <TableCell className="py-3 text-center text-sm">
                          <X size={16} className="inline text-gray-400" />
                        </TableCell>
                        <TableCell className="py-3 text-center text-sm">
                          <Check size={16} className="inline text-purple-600" />
                        </TableCell>
                        <TableCell className="py-3 text-center text-sm">
                          <Check size={16} className="inline text-purple-600" />
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

      {/* FAQ Section - Made more professional */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-b from-gray-50 via-purple-50/30 to-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <Transition animation="fade-up">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center justify-center px-4 py-2 mb-4 rounded-full text-sm font-medium bg-purple-100 text-purple-700 shadow-sm">
                Frequently Asked Questions
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Common Questions From Healthcare Providers</h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                Find answers to the most common questions about our professional plans.
              </p>
            </div>
          </Transition>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2">
              <Transition animation="fade-up" delay="delay-100">
                <Card className="border-purple-100 shadow-md hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-3">How does the Growth Plan's commission model work?</h3>
                    <p className="text-gray-600">With the Growth Plan, you pay a lower monthly fee (€20) plus 20% of all invoiced business through our platform. For example, if you invoice €500 to clients in a month, Nurse-Sync would receive €100, and you would keep €400.</p>
                  </CardContent>
                </Card>
              </Transition>

              <Transition animation="fade-up" delay="delay-200">
                <Card className="border-purple-100 shadow-md hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-3">Can I switch between plans?</h3>
                    <p className="text-gray-600">Yes, you can switch between plans at any time. If your practice grows, you can upgrade to a plan with more clients or features. Similarly, if you need to downsize, you can switch to a smaller plan.</p>
                  </CardContent>
                </Card>
              </Transition>

              <Transition animation="fade-up" delay="delay-300">
                <Card className="border-purple-100 shadow-md hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-3">How does the Smart Matching system work?</h3>
                    <p className="text-gray-600">Our AI-powered matching system connects you with care seekers based on your expertise, availability, and their specific needs. You'll receive connection requests from matched care seekers, and can decide whether to proceed with a free introductory call.</p>
                  </CardContent>
                </Card>
              </Transition>

              <Transition animation="fade-up" delay="delay-400">
                <Card className="border-purple-100 shadow-md hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-3">What's included in the Team Plan?</h3>
                    <p className="text-gray-600">The Team Plan is designed for small nursing practices with up to 5 nurses. It includes all Professional Plan features for each nurse, plus team collaboration tools like a shared client database, team scheduling calendar, and practice-wide analytics.</p>
                  </CardContent>
                </Card>
              </Transition>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced with more professional design */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-4xl mx-auto relative rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
            <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6TTI0IDQ4YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiIGZpbGw9IndoaXRlIi8+PC9nPjwvc3ZnPg==')]"></div>
            <div className="relative p-10 md:p-12">
              <div className="text-center text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to enhance your practice?</h2>
                <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">Start your 14-day free trial with full access to all features. No credit card required.</p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white text-purple-700 hover:bg-gray-100 shadow-md px-8 font-medium"
                  >
                    Schedule a Demo
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/20 px-8 font-medium"
                  >
                    Start Free Trial
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NursePricingPage;
