import React, { useState } from 'react';
import { Check, X, Info } from 'lucide-react';
import Transition from '../ui-components/Transition';
import Button from '../ui-components/Button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

const PricingPlans: React.FC = () => {
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
  );
};

export default PricingPlans;
