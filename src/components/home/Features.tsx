
import React from 'react';
import GlassCard from '../ui-components/GlassCard';
import Transition from '../ui-components/Transition';
import { Shield, Calendar, FileText, CreditCard, Video, Users, Activity, PhoneCall } from 'lucide-react';

const Features: React.FC = () => {
  const nurseFeatures = [
    {
      title: "Client Management",
      description: "Organize and track all your remote clients in one intuitive interface.",
      icon: <Users className="h-6 w-6 text-purple-500" />
    },
    {
      title: "Documentation",
      description: "Create legally-compliant care notes and plans with AI assistance.",
      icon: <FileText className="h-6 w-6 text-purple-500" />
    },
    {
      title: "Scheduling",
      description: "Manage your calendar and video sessions across multiple clients.",
      icon: <Calendar className="h-6 w-6 text-purple-500" />
    },
    {
      title: "Invoicing",
      description: "Generate and track payments, automate billing reports.",
      icon: <CreditCard className="h-6 w-6 text-purple-500" />
    }
  ];
  
  const clientFeatures = [
    {
      title: "Care Access",
      description: "Connect with your assigned nurse through video calls and messaging.",
      icon: <Video className="h-6 w-6 text-client" />
    },
    {
      title: "Family Dashboard",
      description: "Share updates and information with approved family members.",
      icon: <Users className="h-6 w-6 text-client" />
    },
    {
      title: "Wellness Tracking",
      description: "Daily check-ins and AI-powered health summaries.",
      icon: <Activity className="h-6 w-6 text-client" />
    },
    {
      title: "Emergency Support",
      description: "Quick access to help when needed most.",
      icon: <PhoneCall className="h-6 w-6 text-client" />
    }
  ];
  
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Transition animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">One Platform, Two Experiences</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              NurseSync adapts intelligently to provide the perfect tools for both healthcare providers and care recipients.
            </p>
          </div>
        </Transition>
        
        <div className="grid md:grid-cols-2 gap-12">
          <Transition animation="slide-in-left">
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 shadow-lg border border-purple-100">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-600 mb-6">
                For Healthcare Professionals
              </div>
              <h3 className="text-2xl font-bold mb-6 text-gradient-nurse">Nurse-Sync AI Assistant</h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {nurseFeatures.map((feature, index) => (
                  <Transition key={feature.title} animation="fade-up" delay={`delay-${(index + 1) * 100}` as any}>
                    <GlassCard variant="nurse" hover className="h-full">
                      <div className="mb-4">{feature.icon}</div>
                      <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </GlassCard>
                  </Transition>
                ))}
              </div>
            </div>
          </Transition>
          
          <Transition animation="slide-in-right">
            <div className="bg-gradient-to-br from-client-muted to-white rounded-2xl p-8 shadow-lg border border-client-muted">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-client/10 text-client mb-6">
                For Care Recipients & Families
              </div>
              <h3 className="text-2xl font-bold mb-6 text-gradient-client">AI Guardian</h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {clientFeatures.map((feature, index) => (
                  <Transition key={feature.title} animation="fade-up" delay={`delay-${(index + 1) * 100}` as any}>
                    <GlassCard variant="client" hover className="h-full">
                      <div className="mb-4">{feature.icon}</div>
                      <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </GlassCard>
                  </Transition>
                ))}
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>
  );
};

export default Features;
