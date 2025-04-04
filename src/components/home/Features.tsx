
import React from 'react';
import { CheckCircle, ArrowRight, Shield, Award, User, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Transition from '../ui-components/Transition';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
    <section className="py-20 md:py-28 relative overflow-hidden bg-white">
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
              <div className="h-full">
                <div className="relative rounded-2xl overflow-hidden h-full">
                  {/* Glass card with gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 to-purple-800/90"></div>
                  
                  {/* Glass effect overlay */}
                  <div className="absolute inset-0 backdrop-blur-[2px]"></div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-x-48 -translate-y-48 blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-300/10 rounded-full translate-x-20 translate-y-20 blur-xl"></div>
                  
                  <div className="relative p-8 md:p-10 z-10">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-8">
                        <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                          <User size={28} className="text-white" />
                        </div>
                        <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                          Healthcare Providers
                        </span>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Nurse Experience</h3>
                        <p className="text-white/90 mb-8 text-lg leading-relaxed">
                          Built with healthcare professionals in mind. Streamline your remote practice and focus on what matters: providing excellent care.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-10">
                        {nurseFeatures.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle size={18} className="text-white/90 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-white/90 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Link 
                        to="/features/nurse" 
                        className="mt-auto inline-flex items-center px-6 py-3 rounded-full bg-white text-purple-700 font-medium hover:bg-white/90 transition-all duration-300 shadow-md hover:shadow-lg group"
                      >
                        Explore Nurse Features
                        <ArrowRight size={18} className="ml-2 transform transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
            
            {/* Client Experience Card */}
            <Transition animation="fade-up" delay="delay-200">
              <div className="h-full">
                <div className="relative rounded-2xl overflow-hidden h-full">
                  {/* Glass card with gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/90 to-emerald-700/90"></div>
                  
                  {/* Glass effect overlay */}
                  <div className="absolute inset-0 backdrop-blur-[2px]"></div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-x-48 -translate-y-48 blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-300/10 rounded-full translate-x-20 translate-y-20 blur-xl"></div>
                  
                  <div className="relative p-8 md:p-10 z-10">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-8">
                        <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                          <Users size={28} className="text-white" />
                        </div>
                        <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                          Care Seekers
                        </span>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Client Experience</h3>
                        <p className="text-white/90 mb-8 text-lg leading-relaxed">
                          Access quality healthcare from the comfort of your home. Connect with qualified nurses tailored to your specific needs.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-10">
                        {clientFeatures.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle size={18} className="text-white/90 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-white/90 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Link 
                        to="/features/client" 
                        className="mt-auto inline-flex items-center px-6 py-3 rounded-full bg-white text-emerald-600 font-medium hover:bg-white/90 transition-all duration-300 shadow-md hover:shadow-lg group"
                      >
                        Explore Client Features
                        <ArrowRight size={18} className="ml-2 transform transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
          
          {/* Social proof stats - redesigned with soft shadows and gradients */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <Transition animation="fade-up" delay="delay-300">
              <div className="relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white rounded-xl"></div>
                <Card className="relative border-0 shadow-md hover:shadow-lg transition-shadow bg-transparent h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 text-purple-600 mb-2 mx-auto">
                      <Award className="h-6 w-6" />
                    </div>
                  </CardHeader>
                  <CardContent className="text-center pb-6">
                    <h4 className="text-2xl font-bold text-gray-900 mb-1">10,000+</h4>
                    <p className="text-gray-600">Healthcare professionals</p>
                  </CardContent>
                </Card>
              </div>
            </Transition>
            
            <Transition animation="fade-up" delay="delay-400">
              <div className="relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white rounded-xl"></div>
                <Card className="relative border-0 shadow-md hover:shadow-lg transition-shadow bg-transparent h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mb-2 mx-auto">
                      <Users className="h-6 w-6" />
                    </div>
                  </CardHeader>
                  <CardContent className="text-center pb-6">
                    <h4 className="text-2xl font-bold text-gray-900 mb-1">25,000+</h4>
                    <p className="text-gray-600">Patients served</p>
                  </CardContent>
                </Card>
              </div>
            </Transition>
            
            <Transition animation="fade-up" delay="delay-500">
              <div className="relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-xl"></div>
                <Card className="relative border-0 shadow-md hover:shadow-lg transition-shadow bg-transparent h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600 mb-2 mx-auto">
                      <Shield className="h-6 w-6" />
                    </div>
                  </CardHeader>
                  <CardContent className="text-center pb-6">
                    <h4 className="text-2xl font-bold text-gray-900 mb-1">98%</h4>
                    <p className="text-gray-600">Satisfaction rate</p>
                  </CardContent>
                </Card>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
