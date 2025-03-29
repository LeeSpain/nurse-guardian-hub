
import React from 'react';
import Transition from '../ui-components/Transition';
import { UserPlus, UserCog, UsersRound, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Choose Your Role",
      description: "Sign up as either a healthcare professional or care seeker/family member.",
      icon: <UserPlus className="h-7 w-7 text-white" />,
      bgColor: "from-purple-100 to-purple-200",
      iconBg: "from-purple-600 to-purple-800"
    },
    {
      number: "02",
      title: "Set Up Your Profile",
      description: "Create your profile with relevant information and preferences.",
      icon: <UserCog className="h-7 w-7 text-white" />,
      bgColor: "from-client-muted to-client/20",
      iconBg: "from-client to-client/80"
    },
    {
      number: "03",
      title: "Connect",
      description: "Nurses and clients connect through our smart matching system.",
      icon: <UsersRound className="h-7 w-7 text-white" />,
      bgColor: "from-purple-300 to-purple-400",
      iconBg: "from-purple-600 to-purple-800"
    },
    {
      number: "04",
      title: "AI-Assisted Care",
      description: "Our AI adapts to your role, providing the perfect interface and tools.",
      icon: <BrainCircuit className="h-7 w-7 text-white" />,
      bgColor: "from-client/30 to-client/50",
      iconBg: "from-client to-client/80"
    }
  ];
  
  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      {/* Background with gentle gradient that includes both purple and green tones */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-purple-50/50"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 via-white to-client-muted/30 mix-blend-multiply"></div>
      
      <div className="container mx-auto px-4 relative">
        <Transition animation="fade-up">
          <div className="text-center mb-14">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-client-muted text-purple-700">
              Simple Process
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-purple-600 to-client">How NurseSync Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A simple four-step process that creates powerful connections between care providers and recipients.
            </p>
          </div>
        </Transition>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {steps.map((step, index) => (
            <Transition 
              key={step.number} 
              animation="fade-up" 
              delay={`delay-${(index + 1) * 100}` as any}
            >
              <div className="relative group">
                {/* Step number with alternating colors */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
                  <div className={cn(
                    "w-16 h-16 flex items-center justify-center bg-gradient-to-br rounded-full shadow-lg text-xl font-bold text-white",
                    index % 2 === 0 ? "from-purple-600 to-purple-800" : "from-client to-client/80"
                  )}>
                    {step.number}
                  </div>
                </div>
                
                {/* Card with enhanced styling and alternating colors */}
                <div className={cn(
                  "relative mt-8 rounded-2xl p-6 shadow-xl border transition-all duration-300 hover:shadow-2xl bg-gradient-to-br",
                  step.bgColor,
                  index % 2 === 0 ? "border-purple-100/50" : "border-client/30"
                )}>
                  <div className="flex justify-end mb-4">
                    <div className={cn(
                      "bg-gradient-to-br w-12 h-12 rounded-lg shadow-md flex items-center justify-center",
                      step.iconBg
                    )}>
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </div>
            </Transition>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
