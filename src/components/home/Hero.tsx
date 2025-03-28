
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Transition from '../ui-components/Transition';
import Button from '../ui-components/Button';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIGZpbGw9InJnYmEoMTAwLDEwMCwxMDAsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
      <div className="container px-4 mx-auto relative">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <Transition animation="fade-up">
              <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold bg-purple-100 text-purple-600 rounded-full">
                Remote Healthcare Platform
              </span>
            </Transition>
            <Transition animation="fade-up" delay="delay-100">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-balance">
                <span className="text-gradient-nurse">Nurses</span> and <span className="text-gradient-client">Care Seekers</span>, connected remotely.
              </h1>
            </Transition>
            <Transition animation="fade-up" delay="delay-200">
              <p className="text-lg text-gray-700 mb-8 max-w-xl">
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
          <div className="w-full lg:w-1/2 lg:pl-16">
            <Transition animation="fade-in" delay="delay-400">
              <div className="relative">
                {/* Fix: Moved the blur effect and gradient inside the glass-panel to ensure proper layering */}
                <div className="relative glass-panel rounded-2xl overflow-hidden shadow-elevated border border-white/30">
                  {/* Add gradient overlay inside the panel with proper z-index */}
                  <div className="absolute -inset-8 bg-gradient-to-r from-purple-600/20 to-client/20 opacity-70 blur-xl rounded-2xl"></div>
                  
                  <img 
                    src="/lovable-uploads/254e5c47-1d67-4c2e-b540-b83c5515ee84.png" 
                    alt="Nurse providing virtual healthcare consultation" 
                    className="relative z-10 w-full h-auto rounded-2xl object-cover"
                  />
                  <div className="relative z-20 p-8 bg-white/80 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-2">Seamless Virtual Care</h3>
                    <p className="text-gray-700">Connect with healthcare professionals from the comfort of your home, bridging distances with technology.</p>
                  </div>
                  
                  {/* Time saved card - positioned correctly with proper z-index */}
                  <div className="absolute -bottom-6 -right-6 z-30 bg-white rounded-lg shadow-lg p-4 max-w-[200px] border border-purple-100">
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
                  
                  {/* AI-powered card - positioned correctly with proper z-index */}
                  <div className="absolute -top-5 -left-5 z-30 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg shadow-lg p-3 max-w-[180px]">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a8 8 0 0 0-8 8c0 .9.25 1.75.7 2.5L12 22l7.3-9.5c.45-.75.7-1.6.7-2.5a8 8 0 0 0-8-8Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <div className="font-semibold">AI-Powered</div>
                    </div>
                    <div className="text-xs opacity-90 mt-1">
                      Streamline your workflow with intelligent assistance
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

