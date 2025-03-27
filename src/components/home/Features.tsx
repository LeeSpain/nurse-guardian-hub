
import React from 'react';
import GlassCard from '../ui-components/GlassCard';
import Transition from '../ui-components/Transition';
import { Shield, Calendar, FileText, CreditCard, Video, Users, Activity, PhoneCall, Check } from 'lucide-react';

const Features: React.FC = () => {
  const nurseFeatures = [
    {
      title: "Client Management",
      description: "Organize and track all your remote clients in one intuitive interface.",
      icon: <Users className="h-6 w-6 text-white" />
    },
    {
      title: "Documentation",
      description: "Create legally-compliant care notes and plans with AI assistance.",
      icon: <FileText className="h-6 w-6 text-white" />
    },
    {
      title: "Scheduling",
      description: "Manage your calendar and video sessions across multiple clients.",
      icon: <Calendar className="h-6 w-6 text-white" />
    },
    {
      title: "Invoicing",
      description: "Generate and track payments, automate billing reports.",
      icon: <CreditCard className="h-6 w-6 text-white" />
    }
  ];
  
  const clientFeatures = [
    {
      title: "Care Access",
      description: "Connect with your assigned nurse through video calls and messaging.",
      icon: <Video className="h-6 w-6 text-white" />
    },
    {
      title: "Family Dashboard",
      description: "Share updates and information with approved family members.",
      icon: <Users className="h-6 w-6 text-white" />
    },
    {
      title: "Wellness Tracking",
      description: "Daily check-ins and AI-powered health summaries.",
      icon: <Activity className="h-6 w-6 text-white" />
    },
    {
      title: "Emergency Support",
      description: "Quick access to help when needed most.",
      icon: <PhoneCall className="h-6 w-6 text-white" />
    }
  ];
  
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 via-white to-purple-50 opacity-80"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNEgyNHYtMmgxMnYyeiIgZmlsbD0icmdiYSgxMDAsMTAwLDEwMCwwLjEpIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      <div className="container mx-auto px-4 relative">
        <Transition animation="fade-up">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
              Tailored Experience
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800">One Platform, Two Experiences</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              NurseSync adapts intelligently to provide the perfect tools for both healthcare providers and care recipients.
            </p>
          </div>
        </Transition>
        
        <div className="grid md:grid-cols-2 gap-16">
          <Transition animation="slide-in-left">
            <div className="relative rounded-3xl overflow-hidden">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-700 to-purple-500"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTAwIDEwMEgwVjBoMTAweiIvPjxwYXRoIGQ9Ik01MC41IDc1LjVjMTQgMCAyNS0xMS4wMSAyNS0yNXMtMTEtMjUtMjUtMjUtMjUgMTEuMDEtMjUgMjUgMTEuMDEgMjUgMjUgMjV6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
              
              {/* Content container */}
              <div className="relative p-8 md:p-10 h-full">
                <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm mb-6">
                  For Healthcare Professionals
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white">Nurse-Sync AI Assistant</h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {nurseFeatures.map((feature, index) => (
                    <Transition key={feature.title} animation="fade-up" delay={`delay-${(index + 1) * 100}` as any}>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                        <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                          {feature.icon}
                        </div>
                        <h4 className="text-lg font-semibold mb-2 text-white">{feature.title}</h4>
                        <p className="text-white/80">{feature.description}</p>
                      </div>
                    </Transition>
                  ))}
                </div>
              </div>
            </div>
          </Transition>
          
          <Transition animation="slide-in-right">
            <div className="relative rounded-3xl overflow-hidden">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-client to-client/80"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTAwIDEwMEgwVjBoMTAweiIvPjxwYXRoIGQ9Ik01MC41IDc1LjVjMTQgMCAyNS0xMS4wMSAyNS0yNXMtMTEtMjUtMjUtMjUtMjUgMTEuMDEtMjUgMjUgMTEuMDEgMjUgMjUgMjV6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
              
              {/* Content container */}
              <div className="relative p-8 md:p-10 h-full">
                <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm mb-6">
                  For Care Recipients & Families
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white">AI Guardian</h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {clientFeatures.map((feature, index) => (
                    <Transition key={feature.title} animation="fade-up" delay={`delay-${(index + 1) * 100}` as any}>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                        <div className="bg-client-muted w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                          {feature.icon}
                        </div>
                        <h4 className="text-lg font-semibold mb-2 text-white">{feature.title}</h4>
                        <p className="text-white/80">{feature.description}</p>
                      </div>
                    </Transition>
                  ))}
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>
  );
};

export default Features;
