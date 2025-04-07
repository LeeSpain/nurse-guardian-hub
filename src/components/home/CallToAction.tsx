
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Transition from '../ui-components/Transition';
import Button from '../ui-components/Button';

const CallToAction: React.FC = () => {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-client-muted/30"></div>
      <div className="container mx-auto px-4 relative">
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-client opacity-90"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTAwIDEwMEgwVjBoMTAweiIvPjxwYXRoIGQ9Ik01MC41IDc1LjVjMTQgMCAyNS0xMS4wMSAyNS0yNXMtMTEtMjUtMjUtMjUtMjUgMTEuMDEtMjUgMjUgMTEuMDEgMjUgMjUgMjV6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMikiLz48L2c+PC9zdmc+')] opacity-20 will-change-transform"></div>
          <div className="relative py-12 px-6 md:p-16 flex flex-col items-center text-center">
            <Transition animation="fade-up">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">Ready to Transform Remote Healthcare?</h2>
            </Transition>
            
            <Transition animation="fade-up" delay="delay-100">
              <p className="text-lg text-white/90 mb-8 max-w-2xl">
                Join NurseSync today and experience the future of connected care with our intelligent AI assistant.
              </p>
            </Transition>
            
            <Transition animation="fade-up" delay="delay-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="primary" 
                  size="lg" 
                  icon={<ArrowRight size={18} />} 
                  iconPosition="right" 
                  className="bg-white text-purple-700 hover:bg-gray-100 shadow-lg"
                  as={Link}
                  to="/nurse"
                >
                  Join as Healthcare Pro
                </Button>
                <Button 
                  variant="primary" 
                  size="lg" 
                  icon={<ArrowRight size={18} />} 
                  iconPosition="right" 
                  className="bg-white text-client hover:bg-gray-100 shadow-lg"
                  as={Link}
                  to="/client/home"
                >
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
