
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Transition from '../ui-components/Transition';
import Button from '../ui-components/Button';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-nurse to-client opacity-10"></div>
          <div className="relative bg-white bg-opacity-80 backdrop-blur-md py-16 px-8 md:p-16 flex flex-col items-center text-center">
            <Transition animation="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Remote Healthcare?</h2>
            </Transition>
            
            <Transition animation="fade-up" delay="delay-100">
              <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                Join NurseSync today and experience the future of connected care with our intelligent AI assistant.
              </p>
            </Transition>
            
            <Transition animation="fade-up" delay="delay-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="nurse" size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
                  Join as Healthcare Pro
                </Button>
                <Button variant="client" size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
                  Join as Care Seeker
                </Button>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
