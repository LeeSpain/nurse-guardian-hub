import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Transition from '../ui-components/Transition';

const Features: React.FC = () => {
  const nurseFeatures = [
    "Smart matching with care seekers",
    "AI documentation templates",
    "Voice-to-text consultation notes",
    "Secure HIPAA-compliant messaging",
    "Automatic billing and invoicing",
    "Calendar integration and scheduling"
  ];
  
  const clientFeatures = [
    "On-demand healthcare consultations",
    "Find the perfect healthcare match",
    "Family member access management",
    "Symptom and history tracking",
    "Medical document organization",
    "Secure video consultations"
  ];
  
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Simplified background elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 via-white to-purple-50 opacity-80"></div>
      
      <div className="container mx-auto px-4 relative">
        <Transition animation="fade-up">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
              Tailored Experience
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Customized For Everyone</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              NurseSync adapts to your specific role, providing tailored tools for both healthcare providers and care seekers.
            </p>
          </div>
        </Transition>
        
        <div className="grid md:grid-cols-2 gap-10">
          {/* Nurse Experience Box */}
          <Transition animation="slide-in-left">
            <div className="relative rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 h-full">
              {/* Solid purple background */}
              <div className="absolute inset-0 bg-purple-600"></div>
              
              {/* Content container */}
              <div className="relative p-8 md:p-10 h-full z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="rounded-full bg-white/20 p-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="text-xs font-medium text-white/70 bg-white/10 px-3 py-1 rounded-full">
                    For Healthcare Providers
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Nurse Experience</h3>
                <p className="text-white/90 mb-6">
                  Built with healthcare professionals in mind. Streamline your remote practice and focus on what matters: providing excellent care.
                </p>
                
                <ul className="space-y-2.5 mb-8">
                  {nurseFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle size={18} className="text-white/80 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to="/features/nurse" 
                  className="inline-flex items-center mt-4 py-3 px-6 rounded-full bg-white text-purple-700 font-medium hover:bg-white/90 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Explore Nurse Features
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Transition>
          
          {/* Client Experience Box - Solid Green */}
          <Transition animation="slide-in-right">
            <div className="relative rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 h-full">
              {/* Solid green background */}
              <div className="absolute inset-0 bg-emerald-500"></div>
              
              {/* Content container */}
              <div className="relative p-8 md:p-10 h-full z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="rounded-full bg-white/20 p-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="text-xs font-medium text-white/70 bg-white/10 px-3 py-1 rounded-full">
                    For Care Seekers
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Client Experience</h3>
                <p className="text-white/90 mb-6">
                  Access quality healthcare from the comfort of your home. Connect with qualified nurses tailored to your specific needs.
                </p>
                
                <ul className="space-y-2.5 mb-8">
                  {clientFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle size={18} className="text-white/80 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to="/features/client" 
                  className="inline-flex items-center mt-4 py-3 px-6 rounded-full bg-white text-emerald-600 font-medium hover:bg-white/90 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Explore Client Features
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>
  );
};

export default Features;
