
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Transition from '../ui-components/Transition';
import Button from '../ui-components/Button';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 pb-8 md:pt-24 md:pb-16 px-4 md:px-10 overflow-hidden bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIGZpbGw9InJnYmEoMTAwLDEwMCwxMDAsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-30 will-change-transform"></div>
      
      <div className="container mx-auto relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
              <Transition animation="fade-up">
                <span className="inline-block py-1 px-3 mb-3 text-xs font-semibold bg-purple-100 text-purple-600 rounded-full">
                  Remote Healthcare Platform
                </span>
              </Transition>
              <Transition animation="fade-up" delay="delay-100">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight text-balance">
                  <span className="text-gradient-nurse">Nurses</span> and <span className="text-gradient-client">Care Seekers</span>, connected remotely.
                </h1>
              </Transition>
              <Transition animation="fade-up" delay="delay-200">
                <p className="text-lg text-gray-700 mb-6 max-w-xl">
                  NurseSync bridges professional care providers with those who need them through an intelligent AI assistant, removing the need for in-person visits.
                </p>
              </Transition>
              <Transition animation="fade-up" delay="delay-300">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="nurse" 
                    size="lg" 
                    icon={<ArrowRight size={18} />} 
                    iconPosition="right" 
                    className="shadow-lg"
                    as={Link}
                    to="/nurse"
                  >
                    For Healthcare Pros
                  </Button>
                  <Button 
                    variant="client" 
                    size="lg" 
                    icon={<ArrowRight size={18} />} 
                    iconPosition="right" 
                    className="shadow-lg"
                    as={Link}
                    to="/client"
                  >
                    For Care Seekers
                  </Button>
                </div>
              </Transition>
            </div>
            
            <div className="w-full lg:w-1/2">
              <Transition animation="fade-in" delay="delay-400">
                <div className="relative will-change-transform">
                  <div className="relative glass-panel rounded-2xl overflow-visible shadow-elevated border border-white/30">
                    <div className="absolute -inset-8 bg-gradient-to-r from-purple-600/20 to-client/20 opacity-70 blur-xl rounded-2xl"></div>
                    
                    <div className="relative z-10 rounded-2xl overflow-hidden">
                      <img 
                        src="/lovable-uploads/d215d01f-93d6-423a-994e-1cb106f5b3ae.png" 
                        alt="Nurse providing virtual healthcare consultation" 
                        className="w-full h-auto object-cover"
                        loading="eager"
                        width="800"
                        height="520"
                        fetchpriority="high"
                      />
                    </div>
                    
                    {/* Time saved card */}
                    <div className="absolute -bottom-8 -right-8 z-30 bg-white rounded-lg shadow-lg p-4 max-w-[200px] border border-purple-100">
                      <div className="flex items-center mb-2">
                        <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                        </div>
                        <div className="font-semibold text-gray-800">Time Saved</div>
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-gray-900">70%</span>
                        <span className="ml-1 text-sm text-gray-500">on documentation</span>
                      </div>
                    </div>
                    
                    {/* Smart Matching card */}
                    <div className="absolute -top-8 -left-8 z-30 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg shadow-lg p-3 max-w-[180px]">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <div className="font-semibold">Smart Matching</div>
                      </div>
                      <div className="text-xs opacity-90 mt-1">
                        Find the perfect care provider match
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
