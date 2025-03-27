
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Transition from '../ui-components/Transition';
import Button from '../ui-components/Button';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <Transition animation="fade-up">
              <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold bg-blue-50 text-blue-600 rounded-full">
                Remote Healthcare Platform
              </span>
            </Transition>
            <Transition animation="fade-up" delay="delay-100">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-balance">
                <span className="text-gradient-nurse">Nurses</span> and <span className="text-gradient-client">Care Seekers</span>, connected remotely.
              </h1>
            </Transition>
            <Transition animation="fade-up" delay="delay-200">
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                NurseSync bridges professional care providers with those who need them through an intelligent AI assistant, removing the need for in-person visits.
              </p>
            </Transition>
            <Transition animation="fade-up" delay="delay-300">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="nurse" size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
                  For Healthcare Pros
                </Button>
                <Button variant="client" size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
                  For Care Seekers
                </Button>
              </div>
            </Transition>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-16">
            <Transition animation="fade-in" delay="delay-400">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-nurse to-client opacity-20 blur-xl rounded-2xl"></div>
                <div className="relative glass-panel rounded-2xl overflow-hidden shadow-elevated">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80" 
                    alt="NurseSync in action" 
                    className="w-full h-auto rounded-t-2xl"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">NurseSync AI Brain</h3>
                    <p className="text-gray-600">Seamlessly adapts to both healthcare providers and care recipients for an intelligent, supportive experience.</p>
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
