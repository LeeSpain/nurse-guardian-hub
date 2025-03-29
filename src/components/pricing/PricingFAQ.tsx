import React from 'react';
import Transition from '../ui-components/Transition';

const PricingFAQ: React.FC = () => {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4">
        <Transition animation="fade-up">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
              Frequently Asked Questions
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-3">Common Questions From Healthcare Providers</h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Find answers to the most common questions about our professional plans.
            </p>
          </div>
        </Transition>

        <div className="max-w-3xl mx-auto">
          <div className="grid gap-5 md:grid-cols-2">
            <Transition animation="fade-up" delay="delay-100">
              <div className="p-5 rounded-xl bg-white shadow-sm border border-gray-100">
                <h3 className="text-base font-semibold mb-2">How does the Growth Plan's commission model work?</h3>
                <p className="text-sm text-gray-600">With the Growth Plan, you pay a lower monthly fee (€20) plus 20% of all invoiced business through our platform. For example, if you invoice €500 to clients in a month, Nurse-Sync would receive €100, and you would keep €400.</p>
              </div>
            </Transition>

            <Transition animation="fade-up" delay="delay-200">
              <div className="p-5 rounded-xl bg-white shadow-sm border border-gray-100">
                <h3 className="text-base font-semibold mb-2">Can I switch between plans?</h3>
                <p className="text-sm text-gray-600">Yes, you can switch between plans at any time. If your practice grows, you can upgrade to a plan with more clients or features. Similarly, if you need to downsize, you can switch to a smaller plan.</p>
              </div>
            </Transition>

            <Transition animation="fade-up" delay="delay-300">
              <div className="p-5 rounded-xl bg-white shadow-sm border border-gray-100">
                <h3 className="text-base font-semibold mb-2">How does the Smart Matching system work?</h3>
                <p className="text-sm text-gray-600">Our AI-powered matching system connects you with care seekers based on your expertise, availability, and their specific needs. You'll receive connection requests from matched care seekers, and can decide whether to proceed with a free introductory call.</p>
              </div>
            </Transition>

            <Transition animation="fade-up" delay="delay-400">
              <div className="p-5 rounded-xl bg-white shadow-sm border border-gray-100">
                <h3 className="text-base font-semibold mb-2">What's included in the Team Plan?</h3>
                <p className="text-sm text-gray-600">The Team Plan is designed for small nursing practices with up to 5 nurses. It includes all Professional Plan features for each nurse, plus team collaboration tools like a shared client database, team scheduling calendar, and practice-wide analytics.</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingFAQ;
