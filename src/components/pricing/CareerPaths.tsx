import React from 'react';
import { ArrowRight, Briefcase, Users, Check } from 'lucide-react';
import Transition from '../ui-components/Transition';
import GlassCard from '../ui-components/GlassCard';
import Button from '../ui-components/Button';

const CareerPaths: React.FC = () => {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Two Paths to Professional Growth</h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            At Nurse-Sync, we believe in empowering healthcare professionals with flexible career options. Choose your own path or combine both for maximum opportunity.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Independent Practice Path */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-2xl blur opacity-80"></div>
            <GlassCard
              className="relative h-full border-purple-100 backdrop-blur-md hover:border-purple-200 transition-all duration-300 hover:shadow-lg z-10"
              hover={true}
              variant="nurse"
            >
              <div className="pb-2 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Briefcase className="w-6 h-6 text-purple-700" />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-700">
                  Independent Practice
                </h3>
                <p className="text-sm mt-2 text-gray-600">
                  Build your own telehealth practice with our platform support
                </p>
              </div>
              
              <div className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Check size={16} className="text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Complete control over your schedule, services, and client base</p>
                  </div>
                  <div className="flex items-start">
                    <Check size={16} className="text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Set your own rates and keep 100% of your earnings (minus platform fee)</p>
                  </div>
                  <div className="flex items-start">
                    <Check size={16} className="text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Use our advanced telehealth tools, HIPAA-compliant messaging, and scheduling</p>
                  </div>
                  <div className="flex items-start">
                    <Check size={16} className="text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Build your brand with a customizable profile and marketing support</p>
                  </div>
                </div>
                
                <div className="mt-6 p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-bold text-purple-800 text-sm mb-1">Perfect For:</h4>
                  <p className="text-xs text-gray-700">Healthcare professionals wanting to build their own business with flexible hours and complete autonomy</p>
                </div>
              </div>
              
              <div className="pt-4 mt-4">
                <Button
                  variant="primary"
                  fullWidth
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white group"
                >
                  View Independent Plans
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </GlassCard>
          </div>
          
          {/* Nurse-Sync Nurse Path */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/30 to-blue-600/30 rounded-2xl blur opacity-80"></div>
            <GlassCard
              className="relative h-full border-indigo-100 backdrop-blur-md hover:border-indigo-200 transition-all duration-300 hover:shadow-lg z-10"
              hover={true}
              variant="nurse"
            >
              <div className="pb-2 text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-indigo-700" />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-700">
                  Nurse-Sync Professional
                </h3>
                <p className="text-sm mt-2 text-gray-600">
                  Join our network of healthcare providers and get assigned clients
                </p>
              </div>
              
              <div className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Check size={16} className="text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Steady stream of clients assigned to you based on your expertise</p>
                  </div>
                  <div className="flex items-start">
                    <Check size={16} className="text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Guaranteed minimum hours and predictable income</p>
                  </div>
                  <div className="flex items-start">
                    <Check size={16} className="text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">No need to market yourself or find clients - we handle that for you</p>
                  </div>
                  <div className="flex items-start">
                    <Check size={16} className="text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Professional development, training, and mentorship opportunities</p>
                  </div>
                </div>
                
                <div className="mt-6 p-3 bg-indigo-50 rounded-lg">
                  <h4 className="font-bold text-indigo-800 text-sm mb-1">Perfect For:</h4>
                  <p className="text-xs text-gray-700">Healthcare professionals seeking stable income and work-life balance without the challenges of running a business</p>
                </div>
              </div>
              
              <div className="pt-4 mt-4">
                <Button
                  variant="primary"
                  fullWidth
                  size="sm"
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white group"
                >
                  Join Our Network
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
        
        {/* Combine Both Paths Box */}
        <div className="max-w-3xl mx-auto mt-12 p-6 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 shadow-md">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22v-5" />
                  <path d="M9 8V2" />
                  <path d="M15 8V2" />
                  <path d="M18 8v4" />
                  <path d="M6 8v4" />
                  <path d="M20 13a8 8 0 1 1-16 0 8 8 0 0 1 16 0z" />
                  <path d="M9 22v-5" />
                  <path d="M15 22v-5" />
                </svg>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-700">
                Why Not Do Both?
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Many of our healthcare professionals combine both approaches—working with Nurse-Sync assigned clients while building their independent practice. This hybrid approach provides stability while you grow your own client base at your own pace.
              </p>
              <Button 
                variant="outline"
                size="sm"
                className="border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                Learn About Our Hybrid Approach
              </Button>
            </div>
          </div>
        </div>
        
        {/* Testimonial */}
        <div className="max-w-3xl mx-auto mt-12 p-6 rounded-xl bg-white border border-gray-200 shadow-md">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex mb-4">
              <svg width="36" height="28" className="text-purple-600 fill-current" viewBox="0 0 45 36" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 18H9C9 12.477 13.477 8 19 8V13.5C16.0147 13.5 13.5 16.0147 13.5 19V36H0V18H13.5ZM40.5 18H36C36 12.477 40.477 8 46 8V13.5C43.0147 13.5 40.5 16.0147 40.5 19V36H27V18H40.5Z" />
              </svg>
            </div>
            <p className="text-base text-gray-700 mb-4 italic">
              "I started with Nurse-Sync as a network nurse, which gave me steady income while I learned the platform. After six months, I began building my independent practice on evenings and weekends. Now, two years later, I'm fully independent with a thriving telehealth practice of my own!"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                <span className="text-indigo-700 font-bold text-sm">ES</span>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-sm">Emma Stevens, RN</h4>
                <p className="text-gray-600 text-xs">Pediatric Nurse Specialist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerPaths;
