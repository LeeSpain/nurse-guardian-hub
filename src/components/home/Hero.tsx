
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Transition from '../ui-components/Transition';
import Button from '../ui-components/Button';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIGZpbGw9InJnYmEoMTAwLDEwMCwxMDAsMC4xKSIvPjwvZz48L3N2Zz4=')]  opacity-30"></div>
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
                <div className="absolute -inset-8 bg-gradient-to-r from-purple-600/20 to-client/20 opacity-70 blur-xl rounded-2xl"></div>
                <div className="relative glass-panel rounded-2xl overflow-hidden shadow-elevated border border-white/30">
                  <img 
                    src="/lovable-uploads/62e008c6-a46f-4835-93d0-3813f2c6561a.png" 
                    alt="Nurse providing virtual healthcare consultation" 
                    className="w-full h-auto rounded-2xl object-cover"
                  />
                  <div className="p-8 bg-white/80 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-2">Seamless Virtual Care</h3>
                    <p className="text-gray-700">Connect with healthcare professionals from the comfort of your home, bridging distances with technology.</p>
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
