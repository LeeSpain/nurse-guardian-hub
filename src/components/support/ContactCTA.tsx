
import React from 'react';
import { LifeBuoy } from 'lucide-react';

const ContactCTA: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-client/90 to-client rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white mb-6">
        <LifeBuoy size={32} />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Still Need Help?
      </h2>
      <p className="text-white/90 mb-8 max-w-2xl mx-auto">
        Our dedicated support team is always ready to assist you with any questions or concerns about your healthcare journey.
      </p>
      <button className="px-8 py-3 rounded-lg bg-white text-client font-medium hover:bg-white/90 transition-colors shadow-md">
        Contact Support
      </button>
    </div>
  );
};

export default ContactCTA;
