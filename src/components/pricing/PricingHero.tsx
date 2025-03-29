
import React from 'react';
import Transition from '../ui-components/Transition';

const PricingHero: React.FC = () => {
  return (
    <section className="relative pt-20 pb-12 md:pt-28 md:pb-20 overflow-hidden bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6TTI0IDQ4YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiIGZpbGw9InJnYmEoMTAwLDEwMCwxMDAsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-10 will-change-transform"></div>
      
      <div className="container mx-auto px-4 relative">
        <Transition animation="fade-up">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
              Healthcare Provider Plans
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800">
              Flexible Pricing for Healthcare Professionals
            </h1>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Choose the plan that best fits your practice. With options from free to team plans, you can start small and scale as your remote care capabilities grow.
            </p>
          </div>
        </Transition>
      </div>
    </section>
  );
};

export default PricingHero;
