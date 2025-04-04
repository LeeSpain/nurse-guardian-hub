
import React from 'react';
import Transition from '../ui-components/Transition';

const PricingHero: React.FC = () => {
  return (
    <section className="pt-16 pb-24 px-6 md:px-10 overflow-hidden relative bg-gradient-to-br from-[#EFF6FF] via-[#F0FDFA] to-[#ECFDF5]">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="md:grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
              Healthcare Provider Plans
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800">
              Flexible Pricing for Healthcare Professionals
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Choose the plan that best fits your practice. With options from free to team plans, you can start small and scale as your remote care capabilities grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors shadow-md">
                View Nurse Plans
              </button>
              <button className="px-8 py-3 rounded-lg border border-purple-300 text-purple-700 font-medium hover:bg-purple-50 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="aspect-video rounded-2xl overflow-hidden border border-[#10B981]/20 shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <img 
                src="/placeholder.svg" 
                alt="Pricing plans" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingHero;
