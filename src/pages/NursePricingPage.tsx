
import React, { useEffect, useState } from 'react';
import PricingHero from '../components/pricing/PricingHero';
import PricingTabs from '../components/pricing/PricingTabs';
import CareerPaths from '../components/pricing/CareerPaths';
import PricingPlans from '../components/pricing/PricingPlans';
import PricingFAQ from '../components/pricing/PricingFAQ';
import PricingCTA from '../components/pricing/PricingCTA';

const NursePricingPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState<'career' | 'pricing'>('career');

  return (
    <main className="flex-grow">
      <PricingHero />
      <PricingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'career' && <CareerPaths />}
      {activeTab === 'pricing' && <PricingPlans />}
      <PricingFAQ />
      <PricingCTA />
    </main>
  );
};

export default NursePricingPage;
