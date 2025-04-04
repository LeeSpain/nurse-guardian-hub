
import React from 'react';
import { HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-client-muted/20 text-client mb-4">
          <HelpCircle size={24} />
        </div>
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
      </div>

      <div className="max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-2 flex items-start">
              <span className="text-client mr-2">Q:</span>
              {faq.question}
            </h3>
            <p className="text-gray-600 pl-5">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
