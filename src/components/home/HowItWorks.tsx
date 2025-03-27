
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
      icon: <UserPlus className="h-7 w-7 text-white" />
    },
    {
      number: "02",
      title: "Set Up Your Profile",
      description: "Create your profile with relevant information and preferences.",
      icon: <UserCog className="h-7 w-7 text-white" />
    },
    {
      number: "03",
      title: "Connect",
      description: "Nurses and clients connect through our smart matching system.",
      icon: <UsersRound className="h-7 w-7 text-white" />
    },
    {
      number: "04",
      title: "AI-Assisted Care",
      description: "Our AI adapts to your role, providing the perfect interface and tools.",
      icon: <BrainCircuit className="h-7 w-7 text-white" />
    }
  ];
  
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-purple-50"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zMCAyMEgxMHYtMWgyMHYxeiIgZmlsbD0icmdiYSgxMDAsMTAwLDEwMCwwLjEpIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      {/* Connected dots animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-purple-300/30 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <Transition animation="fade-up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
              Simple Process
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800">How NurseSync Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A simple four-step process that creates powerful connections between care providers and recipients.
            </p>
          </div>
        </Transition>
        
        <div className="relative">
          {/* Timeline connector */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-300 to-client-muted"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {steps.map((step, index) => (
              <Transition 
                key={step.number} 
                animation="fade-up" 
                delay={`delay-${(index + 1) * 100}` as any}
              >
                <div className="relative group">
                  {/* Step number - elevated effect */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-purple-600 rounded-full blur-md opacity-30 scale-110 group-hover:opacity-60 transition-all duration-300"></div>
                      <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800 rounded-full shadow-xl text-xl font-bold text-white relative">
                        {step.number}
                      </div>
                    </div>
                  </div>
                  
                  {/* Card with information */}
                  <div className="relative mt-8 bg-white rounded-2xl p-6 shadow-xl border border-purple-100/30 group-hover:shadow-2xl group-hover:border-purple-200/50 transition-all duration-300">
                    <div className="flex justify-end mb-4">
                      <div className="bg-gradient-to-br from-purple-600 to-purple-800 w-12 h-12 rounded-lg shadow-lg flex items-center justify-center">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </Transition>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
