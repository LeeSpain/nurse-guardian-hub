
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
    <section className="py-20 md:py-24 relative overflow-hidden bg-white">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative">
        <Transition animation="fade-up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
              Tailored Experience
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Customized For Everyone</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              NurseSync adapts to your specific role, providing tailored tools for both healthcare providers and care seekers.
            </p>
          </div>
        </Transition>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Nurse Experience Card */}
            <Transition animation="fade-up" delay="delay-100">
              <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                {/* Card gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800 will-change-transform"></div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-x-16 translate-y-16 blur-xl"></div>
                
                <div className="relative p-8 md:p-10 h-full z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-white/20 rounded-full p-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div className="text-sm font-medium text-white py-1.5 px-3 rounded-full bg-white/10">
                      For Healthcare Providers
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Nurse Experience</h3>
                  <p className="text-white/90 mb-6 text-lg">
                    Built with healthcare professionals in mind. Streamline your remote practice and focus on what matters: providing excellent care.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {nurseFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle size={20} className="text-white/80 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to="/features/nurse" 
                    className="inline-flex items-center mt-4 py-3 px-6 rounded-full bg-white text-purple-700 font-medium hover:bg-white/90 transition-all duration-300 shadow-md hover:shadow-lg group"
                  >
                    Explore Nurse Features
                    <ArrowRight size={18} className="ml-2 transform transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Transition>
            
            {/* Client Experience Card */}
            <Transition animation="fade-up" delay="delay-200">
              <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                {/* Card gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-700 will-change-transform"></div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-x-16 translate-y-16 blur-xl"></div>
                
                <div className="relative p-8 md:p-10 h-full z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-white/20 rounded-full p-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="text-sm font-medium text-white py-1.5 px-3 rounded-full bg-white/10">
                      For Care Seekers
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Client Experience</h3>
                  <p className="text-white/90 mb-6 text-lg">
                    Access quality healthcare from the comfort of your home. Connect with qualified nurses tailored to your specific needs.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {clientFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle size={20} className="text-white/80 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to="/features/client" 
                    className="inline-flex items-center mt-4 py-3 px-6 rounded-full bg-white text-emerald-600 font-medium hover:bg-white/90 transition-all duration-300 shadow-md hover:shadow-lg group"
                  >
                    Explore Client Features
                    <ArrowRight size={18} className="ml-2 transform transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Transition>
          </div>
          
          {/* Social proof stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Transition animation="fade-up" delay="delay-300">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 text-purple-600 mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-center text-gray-900">10,000+</h4>
                <p className="text-center text-gray-600">Healthcare professionals</p>
              </div>
            </Transition>
            
            <Transition animation="fade-up" delay="delay-400">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-center text-gray-900">25,000+</h4>
                <p className="text-center text-gray-600">Patients served</p>
              </div>
            </Transition>
            
            <Transition animation="fade-up" delay="delay-500">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600 mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-center text-gray-900">98%</h4>
                <p className="text-center text-gray-600">Satisfaction rate</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
