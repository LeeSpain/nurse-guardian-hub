
import React from 'react';
import GlassCard from '../ui-components/GlassCard';
import Transition from '../ui-components/Transition';

const Features: React.FC = () => {
  const nurseFeatures = [
    {
      title: "Client Management",
      description: "Organize and track all your remote clients in one intuitive interface."
    },
    {
      title: "Documentation",
      description: "Create legally-compliant care notes and plans with AI assistance."
    },
    {
      title: "Scheduling",
      description: "Manage your calendar and video sessions across multiple clients."
    },
    {
      title: "Invoicing",
      description: "Generate and track payments, automate billing reports."
    }
  ];
  
  const clientFeatures = [
    {
      title: "Care Access",
      description: "Connect with your assigned nurse through video calls and messaging."
    },
    {
      title: "Family Dashboard",
      description: "Share updates and information with approved family members."
    },
    {
      title: "Wellness Tracking",
      description: "Daily check-ins and AI-powered health summaries."
    },
    {
      title: "Emergency Support",
      description: "Quick access to help when needed most."
    }
  ];
  
  return (
    <section className="py-16 md:py-24 bg-gray-50">
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
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-nurse/10 text-nurse mb-4">
                For Healthcare Professionals
              </div>
              <h3 className="text-2xl font-bold mb-6 text-gradient-nurse">Nurse-Sync AI Assistant</h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {nurseFeatures.map((feature, index) => (
                  <Transition key={feature.title} animation="fade-up" delay={`delay-${(index + 1) * 100}` as any}>
                    <GlassCard variant="nurse" hover className="h-full">
                      <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </GlassCard>
                  </Transition>
                ))}
              </div>
            </div>
          </Transition>
          
          <Transition animation="slide-in-right">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-client/10 text-client mb-4">
                For Care Recipients & Families
              </div>
              <h3 className="text-2xl font-bold mb-6 text-gradient-client">AI Guardian</h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {clientFeatures.map((feature, index) => (
                  <Transition key={feature.title} animation="fade-up" delay={`delay-${(index + 1) * 100}` as any}>
                    <GlassCard variant="client" hover className="h-full">
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
