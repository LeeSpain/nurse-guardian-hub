
import React from 'react';
import Transition from '../ui-components/Transition';
import GlassCard from '../ui-components/GlassCard';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Choose Your Role",
      description: "Sign up as either a healthcare professional or care seeker/family member."
    },
    {
      number: "02",
      title: "Set Up Your Profile",
      description: "Create your profile with relevant information and preferences."
    },
    {
      number: "03",
      title: "Connect",
      description: "Nurses and clients connect through our smart matching system."
    },
    {
      number: "04",
      title: "AI-Assisted Care",
      description: "Our AI adapts to your role, providing the perfect interface and tools."
    }
  ];
  
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Transition animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How NurseSync Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A simple process that creates powerful connections between care providers and recipients.
            </p>
          </div>
        </Transition>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Transition 
              key={step.number} 
              animation="fade-up" 
              delay={`delay-${(index + 1) * 100}` as any}
            >
              <GlassCard hover className="relative h-full">
                <div className="absolute -top-4 -left-2 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-elevated text-xl font-bold">
                  {step.number}
                </div>
                <div className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </GlassCard>
            </Transition>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
