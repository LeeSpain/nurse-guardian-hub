
import React from 'react';
import Transition from '../ui-components/Transition';
import GlassCard from '../ui-components/GlassCard';
import { UserPlus, UserCog, UsersRound, BrainCircuit } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Choose Your Role",
      description: "Sign up as either a healthcare professional or care seeker/family member.",
      icon: <UserPlus className="h-6 w-6 text-purple-500" />
    },
    {
      number: "02",
      title: "Set Up Your Profile",
      description: "Create your profile with relevant information and preferences.",
      icon: <UserCog className="h-6 w-6 text-purple-500" />
    },
    {
      number: "03",
      title: "Connect",
      description: "Nurses and clients connect through our smart matching system.",
      icon: <UsersRound className="h-6 w-6 text-purple-500" />
    },
    {
      number: "04",
      title: "AI-Assisted Care",
      description: "Our AI adapts to your role, providing the perfect interface and tools.",
      icon: <BrainCircuit className="h-6 w-6 text-purple-500" />
    }
  ];
  
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zMCAyMEgxMHYtMWgyMHYxeiIgZmlsbD0icmdiYSgxMDAsMTAwLDEwMCwwLjEpIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
      <div className="container mx-auto px-4 relative">
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
              <GlassCard hover className="relative h-full bg-white/70 border-purple-100/50 shadow-lg">
                <div className="absolute -top-4 -left-2 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-700 rounded-full shadow-elevated text-xl font-bold text-white">
                  {step.number}
                </div>
                <div className="pt-6">
                  <div className="flex justify-end mb-4">
                    {step.icon}
                  </div>
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
