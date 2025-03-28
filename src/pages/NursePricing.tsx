import React, { useEffect, useState } from 'react';
import { Check, X, Info, Sparkles, CheckCircle2, Users, ShieldCheck, BadgeCheck, PenLine } from 'lucide-react';
import Transition from '../components/ui-components/Transition';
import Button from '../components/ui-components/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GlassCard from '../components/ui-components/GlassCard';

const NursePricingPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');

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
      icon: <PenLine className="h-10 w-10 text-purple-400" />,
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
      icon: <Sparkles className="h-10 w-10 text-purple-500" />,
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
      icon: <CheckCircle2 className="h-10 w-10 text-purple-500" />,
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
      icon: <BadgeCheck className="h-10 w-10 text-purple-600" />,
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
      icon: <Users className="h-10 w-10 text-purple-700" />,
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
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-purple-50 via-purple-100/30 to-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6TTI0IDQ4YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiIGZpbGw9InJnYmEoMTAwLDEwMCwxMDAsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
          
          <div className="container mx-auto px-4 relative">
            <Transition animation="fade-up">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                  Healthcare Provider Plans
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800">
                  Flexible Pricing for Healthcare Professionals
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                  Choose the plan that best fits your practice. With options from free to team plans, 
                  you can start small and scale as your remote care capabilities grow.
                </p>
              </div>
            </Transition>
            
            <div className="max-w-md mx-auto">
              <GlassCard 
                variant="nurse"
                className="text-center py-8 px-6"
              >
                <ShieldCheck className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-xl font-semibold mb-2">HIPAA Compliant</h3>
                <p className="text-gray-600">All our plans include enterprise-grade security and HIPAA compliance</p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Pricing Plans Selector */}
        <section className="py-12 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Transition animation="fade-up">
                <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                  Select the plan that fits your practice needs and growth stage. All plans include our core platform features.
                </p>
                
                <div className="inline-flex p-1 rounded-lg bg-purple-50 mb-8">
                  <button 
                    className={`px-4 py-2 rounded-md ${view === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-purple-100/50'}`}
                    onClick={() => setView('grid')}
                  >
                    Grid View
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-md ${view === 'list' ? 'bg-white shadow-sm' : 'hover:bg-purple-100/50'}`}
                    onClick={() => setView('list')}
                  >
                    List View
                  </button>
                </div>
              </Transition>
            </div>
            
            {view === 'grid' ? (
              <div className="grid gap-8 max-w-6xl mx-auto">
                {/* Featured Plan */}
                <Transition animation="fade-up" delay="delay-100">
                  <Card className="relative shadow-xl hover:shadow-2xl transition-shadow duration-300 border-2 border-purple-400 bg-gradient-to-br from-white to-purple-50">
                    <div className="absolute -top-4 inset-x-0 mx-auto w-40 bg-purple-600 text-white px-3 py-1 text-sm font-medium rounded-full text-center">
                      Most Popular
                    </div>
                    
                    <CardHeader className="p-8">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center">
                            <Sparkles className="h-8 w-8 text-purple-500 mr-3" />
                            <CardTitle className="text-2xl font-bold">Growth Plan</CardTitle>
                          </div>
                          <CardDescription className="text-gray-600 mt-2 text-base">
                            Nurses starting out, seeking lower upfront costs with revenue tied to their earnings.
                          </CardDescription>
                        </div>
                        <button 
                          onClick={() => toggleTooltip('growth')}
                          className="ml-2 text-gray-400 hover:text-purple-600 transition-colors"
                          aria-label="More info about Growth Plan"
                        >
                          <Info size={18} />
                        </button>
                      </div>
                      
                      {showTooltip === 'growth' && (
                        <div className="mt-4 p-4 bg-white rounded-md shadow-lg border border-gray-200 text-sm text-gray-600">
                          Lower upfront cost with 20% commission on invoiced business, perfect for nurses growing their practice.
                        </div>
                      )}
                      
                      <div className="mt-6 border-t border-purple-100 pt-6">
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold text-purple-700">€20</span>
                          <span className="text-gray-500 ml-2 text-lg">per month + 20% commission</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="px-8 pb-0">
                      <h4 className="font-semibold text-sm uppercase text-gray-500 mb-4">What's included:</h4>
                      <div className="space-y-4">
                        {plans[1].features.slice(0, 6).map((feature, i) => (
                          <div key={i} className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                                <Check size={12} className="text-purple-700" />
                              </div>
                            </div>
                            <span className="text-gray-700 ml-3">
                              {feature.text}
                            </span>
                          </div>
                        ))}
                        {plans[1].features.length > 6 && (
                          <p className="text-purple-600 font-medium">+{plans[1].features.length - 6} more features</p>
                        )}
                      </div>
                    </CardContent>
                    
                    <CardFooter className="p-8">
                      <Button 
                        variant="primary" 
                        fullWidth
                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 text-base"
                      >
                        Get Started
                      </Button>
                    </CardFooter>
                  </Card>
                </Transition>
                
                {/* Other Plans in 2x2 Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  {[plans[0], plans[2], plans[3], plans[4]].map((plan, index) => (
                    <Transition 
                      key={plan.id} 
                      animation="fade-up" 
                      delay={`delay-${(index % 4) * 100 + 200}` as any}
                    >
                      <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                        <CardHeader className="p-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center">
                                {plan.icon}
                                <CardTitle className="text-xl font-bold ml-3">{plan.name}</CardTitle>
                              </div>
                              <CardDescription className="text-gray-600 mt-2">{plan.description}</CardDescription>
                            </div>
                            <button 
                              onClick={() => toggleTooltip(plan.id)}
                              className="ml-2 text-gray-400 hover:text-purple-600 transition-colors"
                              aria-label={`More info about ${plan.name}`}
                            >
                              <Info size={16} />
                            </button>
                          </div>
                          
                          {showTooltip === plan.id && (
                            <div className="mt-4 p-3 bg-white rounded-md shadow-lg border border-gray-200 text-sm text-gray-600">
                              {plan.tooltip}
                            </div>
                          )}
                          
                          <div className="mt-6 border-t border-gray-100 pt-4">
                            <div className="flex items-baseline">
                              <span className="text-3xl font-bold text-purple-700">{plan.price}</span>
                              <span className="text-gray-500 ml-2">{plan.billing}</span>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="p-6 pt-0">
                          <h4 className="font-semibold text-sm uppercase text-gray-500 mb-4">Top features:</h4>
                          <div className="space-y-3">
                            {plan.features.slice(0, 4).map((feature, i) => (
                              <div key={i} className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                  <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                                    <Check size={12} className="text-purple-700" />
                                  </div>
                                </div>
                                <span className="text-sm ml-3 text-gray-700">
                                  {feature.text}
                                </span>
                              </div>
                            ))}
                            {plan.features.length > 4 && (
                              <p className="text-purple-600 text-sm font-medium">+{plan.features.length - 4} more features</p>
                            )}
                          </div>
                        </CardContent>
                        
                        <CardFooter className="p-6 bg-gray-50 rounded-b-lg">
                          <Button 
                            variant="outline" 
                            fullWidth
                            className="border-purple-300 text-purple-700 hover:bg-purple-50 font-medium"
                          >
                            {plan.price === '€0' ? 'Start Free' : 'Get Started'}
                          </Button>
                        </CardFooter>
                      </Card>
                    </Transition>
                  ))}
                </div>
              </div>
            ) : (
              // List View
              <div className="max-w-5xl mx-auto">
                {plans.map((plan, index) => (
                  <Transition 
                    key={plan.id} 
                    animation="fade-up" 
                    delay={`delay-${index * 100 + 100}` as any}
                  >
                    <div className={`mb-6 rounded-xl overflow-hidden border ${
                      plan.featured ? 'border-2 border-purple-400 shadow-lg' : 'border-gray-200'
                    }`}>
                      <div className={`p-6 ${plan.featured ? 'bg-purple-50' : 'bg-white'}`}>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex items-center mb-4 md:mb-0">
                            {plan.icon}
                            <div className="ml-4">
                              <h3 className="text-xl font-bold">{plan.name}</h3>
                              <p className="text-gray-600">{plan.description}</p>
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                            <div className="mb-4 md:mb-0 md:text-right">
                              <div className="text-2xl font-bold text-purple-700">{plan.price}</div>
                              <div className="text-sm text-gray-500">{plan.billing}</div>
                            </div>
                            <Button 
                              variant={plan.featured ? 'primary' : 'outline'} 
                              className={plan.featured 
                                ? 'bg-purple-600 hover:bg-purple-700 text-white font-medium' 
                                : 'border-purple-300 text-purple-700 hover:bg-purple-50 font-medium'
                              }
                            >
                              {plan.price === '€0' ? 'Start Free' : 'Get Started'}
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {plan.features.slice(0, 6).map((feature, i) => (
                              <div key={i} className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                  {feature.included ? (
                                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                                      <Check size={12} className="text-purple-700" />
                                    </div>
                                  ) : (
                                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                                      <X size={12} className="text-gray-400" />
                                    </div>
                                  )}
                                </div>
                                <span className={`text-sm ml-3 ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                                  {feature.text}
                                </span>
                              </div>
                            ))}
                          </div>
                          {plan.features.length > 6 && (
                            <button className="mt-4 text-purple-600 text-sm font-medium hover:text-purple-800">
                              + Show {plan.features.length - 6} more features
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Transition>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Plan Comparison Tabs */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <Transition animation="fade-up">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-6">Compare Our Plans</h2>
                <p className="text-lg text-gray-600">
                  Find the perfect plan for your professional needs with our detailed comparison.
                </p>
              </div>
            </Transition>

            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="features" className="w-full">
                <TabsList className="w-full bg-white mb-8 p-1 border rounded-lg">
                  <TabsTrigger value="features" className="flex-1">Features</TabsTrigger>
                  <TabsTrigger value="clients" className="flex-1">Client Limits</TabsTrigger>
                  <TabsTrigger value="messaging" className="flex-1">Messaging</TabsTrigger>
                  <TabsTrigger value="pricing" className="flex-1">Pricing Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="features" className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr className="bg-purple-50">
                          <th scope="col" className="px-6 py-4 text-left font-semibold text-gray-700">Feature</th>
                          <th scope="col" className="px-4 py-4 text-center font-semibold text-gray-700">Free</th>
                          <th scope="col" className="px-4 py-4 text-center font-semibold text-purple-700 bg-purple-50/80">Growth</th>
                          <th scope="col" className="px-4 py-4 text-center font-semibold text-gray-700">Basic</th>
                          <th scope="col" className="px-4 py-4 text-center font-semibold text-gray-700">Pro</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-700">Smart Matching</td>
                          <td className="px-4 py-4 text-center text-sm">Passive</td>
                          <td className="px-4 py-4 text-center text-sm bg-purple-50/30 font-medium">Full</td>
                          <td className="px-4 py-4 text-center text-sm">Full</td>
                          <td className="px-4 py-4 text-center text-sm">Full+</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-700">AI Templates</td>
                          <td className="px-4 py-4 text-center text-sm">Basic</td>
                          <td className="px-4 py-4 text-center text-sm bg-purple-50/30 font-medium">Basic</td>
                          <td className="px-4 py-4 text-center text-sm">Basic</td>
                          <td className="px-4 py-4 text-center text-sm">Custom</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-700">Mobile App</td>
                          <td className="px-4 py-4 text-center text-sm">Limited</td>
                          <td className="px-4 py-4 text-center text-sm bg-purple-50/30 font-medium">Full</td>
                          <td className="px-4 py-4 text-center text-sm">Full</td>
                          <td className="px-4 py-4 text-center text-sm">Full</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-700">Analytics</td>
                          <td className="px-4 py-4 text-center text-sm">
                            <X size={16} className="inline text-gray-400" />
                          </td>
                          <td className="px-4 py-4 text-center text-sm bg-purple-50/30 font-medium">
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
                </TabsContent>
                
                <TabsContent value="clients" className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr className="bg-purple-50">
                          <th scope="col" className="px-6 py-4 text-left font-semibold text-gray-700">Plan</th>
                          <th scope="col" className="px-6 py-4 text-center font-semibold text-gray-700">Client Limit</th>
                          <th scope="col" className="px-6 py-4 text-center font-semibold text-gray-700">Notes per Month</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-700">Free</td>
                          <td className="px-6 py-4 text-center text-sm">2 active clients</td>
                          <td className="px-6 py-4 text-center text-sm">10 voice-to-text</td>
                        </tr>
                        <tr className="bg-purple-50/30">
                          <td className="px-6 py-4 text-sm font-medium text-purple-700">Growth</td>
                          <td className="px-6 py-4 text-center text-sm font-medium">10 active clients</td>
                          <td className="px-6 py-4 text-center text-sm font-medium">50 voice-to-text</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-700">Basic</td>
                          <td className="px-6 py-4 text-center text-sm">10 active clients</td>
                          <td className="px-6 py-4 text-center text-sm">50 voice-to-text</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-700">Professional</td>
                          <td className="px-6 py-4 text-center text-sm">Unlimited clients</td>
                          <td className="px-6 py-4 text-center text-sm">Unlimited notes</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-700">Team</td>
                          <td className="px-6 py-4 text-center text-sm">Unlimited (5 nurses)</td>
                          <td className="px-6 py-4 text-center text-sm">Unlimited notes</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="messaging" className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr className="bg-purple-50">
                          <th scope="col" className="px-6 py-4 text-left font-semibold text-gray-700">Plan</th>
                          <th scope="col" className="px-6 py-4 text-center font-semibold text-gray-700">Intro Messages</th>
                          <th scope="col" className="px-6 py-4 text-center font-semibold text-gray-700">Video Consultations</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-700">Free</td>
                          <td className="px-6 py-4 text-center text-sm">None</td>
                          <td className="px-6 py-4 text-center text-sm">HD Video</td>
                        </tr>
                        <tr className="bg-purple-50/30">
                          <td className="px-6 py-4 text-sm font-medium text-purple-700">Growth</td>
                          <td className="px-6 py-4 text-center text-sm font-medium">10/month</td>
                          <td className="px-6 py-4 text-center text-sm font-medium">HD Video</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-700">Basic</td>
                          <td className="px-6 py-4 text-center text-sm">5/month</td>
                          <td className="px-6 py-4 text-center text-sm">HD Video</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-700">Professional</td>
                          <td className="px-6 py-4 text-center text-sm">Unlimited</td>
                          <td className="px-6 py-4 text-center text-sm">HD + Recording</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-700">Team</td>
                          <td className="px-6 py-4 text-center text-sm">Unlimited</td>
                          <td className="px-6 py-4 text-center text-sm">HD + Recording</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="pricing" className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr className="bg-purple-50">
                          <th scope="col" className="px-6 py-4 text-left font-semibold text-gray-700">Plan</th>
                          <th scope="col" className="px-6 py-4 text-center font-semibold text-gray-700">Monthly Fee</th>
                          <th scope="col" className="px-6 py-4 text-center font-semibold text-gray-700">Commission</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-700">Free</td>
                          <td className="px-6 py-4 text-center text-sm">€0</td>
                          <td className="px-6 py-4 text-center text-sm">N/A</td>
                        </tr>
                        <tr className="bg-purple-50/30">
                          <td className="px-6 py-4 text-sm font-medium text-purple-700">Growth</td>
                          <td className="px-6 py-4 text-center text-sm font-medium">€20</td>
                          <td className="px-6 py-4 text-center text-sm font-medium">20%</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-700">Basic</td>
                          <td className="px-6 py-4 text-center text-sm">€60</td>
                          <td className="px-6 py-4 text-center text-sm">0%</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-700">Professional</td>
                          <td className="px-6 py-4 text-center text-sm">€100</td>
                          <td className="px-6 py-4 text-center text-sm">0%</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-700">Team</td>
                          <td className="px-6 py-4 text-center text-sm">€200</td>
                          <td className="px-6 py-4 text-center text-sm">0%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* FAQ Section with Cards */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4">
            <Transition animation="fade-up">
              <div className="mb-16 text-center">
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                  Frequently Asked Questions
                </div>
                <h2 className="text-3xl font-bold mb-4">Common Questions From Healthcare Providers</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Find answers to the most common questions about our professional plans.
                </p>
              </div>
            </Transition>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
              <Transition animation="fade-up" delay="delay-100">
                <GlassCard variant="nurse" className="h-full">
                  <h3 className="text-lg font-semibold mb-3 text-purple-700">How does the Growth Plan's commission model work?</h3>
                  <p className="text-gray-600">With the Growth Plan, you pay a lower monthly fee (€20) plus 20% of all invoiced business through our platform. For example, if you invoice €500 to clients in a month, Nurse-Sync would receive €100, and you would keep €400.</p>
                </GlassCard>
              </Transition>

              <Transition animation="fade-up" delay="delay-200">
                <GlassCard variant="nurse" className="h-full">
                  <h3 className="text-lg font-semibold mb-3 text-purple-700">Can I switch between plans?</h3>
                  <p className="text-gray-600">Yes, you can switch between plans at any time. If your practice grows, you can upgrade to a plan with more clients or features. Changes take effect at the start of your next billing cycle.</p>
                </GlassCard>
              </Transition>

              <Transition animation="fade-up" delay="delay-300">
                <GlassCard variant="nurse" className="h-full">
                  <h3 className="text-lg font-semibold mb-3 text-purple-700">How does the Smart Matching system work?</h3>
                  <p className="text-gray-600">Our AI-powered matching system connects you with care seekers based on your expertise, availability, and their specific needs. You'll receive connection requests from matched care seekers, and can decide whether to proceed with a free introductory call.</p>
                </GlassCard>
              </Transition>

              <Transition animation="fade-up" delay="delay-400">
                <GlassCard variant="nurse" className="h-full">
                  <h3 className="text-lg font-semibold mb-3 text-purple-700">What's included in the Team Plan?</h3>
                  <p className="text-gray-600">The Team Plan is designed for small nursing practices with up to 5 nurses. It includes all Professional Plan features for each nurse, plus team collaboration tools like a shared client database, team scheduling calendar, and practice-wide analytics.</p>
                </GlassCard>
              </Transition>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-purple-50 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-8 md:p-12 relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTAwIDEwMEgwVjBoMTAweiIvPjxwYXRoIGQ9Ik01MC41IDc1LjVjMTQgMCAyNS0xMS4wMSAyNS0yNXMtMTEtMjUtMjUtMjUtMjUgMTEuMDEtMjUgMjUgMTEuMDEgMjUgMjUgMjV6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
                <div className="relative text-center text-white">
                  <h2 className="text-2xl md:text-4xl font-bold mb-6">Ready to enhance your healthcare practice?</h2>
                  <p className="text-lg md:text-xl mb-8 opacity-90">Start your 14-day free trial with full access to all features. No credit card required.</p>
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-white text-purple-700 hover:bg-gray-100 font-medium shadow-lg"
                    >
                      Schedule a Demo
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-white text-white hover:bg-white/20 font-medium"
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
