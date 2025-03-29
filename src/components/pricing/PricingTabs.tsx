
import React from 'react';

interface PricingTabsProps {
  activeTab: 'career' | 'pricing';
  setActiveTab: (tab: 'career' | 'pricing') => void;
}

const PricingTabs: React.FC<PricingTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <section className="py-8 border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="inline-flex rounded-lg bg-gray-100 p-1 text-sm">
            <button
              className={`rounded-md px-4 py-2 font-medium transition-colors ${
                activeTab === 'career' 
                ? 'bg-white shadow text-purple-700' 
                : 'text-gray-600 hover:text-purple-600'
              }`}
              onClick={() => setActiveTab('career')}
            >
              Career Paths
            </button>
            <button
              className={`rounded-md px-4 py-2 font-medium transition-colors ${
                activeTab === 'pricing' 
                ? 'bg-white shadow text-purple-700' 
                : 'text-gray-600 hover:text-purple-600'
              }`}
              onClick={() => setActiveTab('pricing')}
            >
              Pricing Plans
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTabs;
