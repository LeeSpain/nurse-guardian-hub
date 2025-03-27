
import React from 'react';
import Transition from '../ui-components/Transition';
import GlassCard from '../ui-components/GlassCard';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "NurseSync changed how I run my practice. I can now support more clients remotely while maintaining the same quality of care.",
      author: "Sarah Johnson, RN",
      role: "Healthcare Professional",
      type: "nurse"
    },
    {
      quote: "Having a nurse available through video calls gives me peace of mind about my father's care, even though I live across the country.",
      author: "Michael Torres",
      role: "Family Member",
      type: "client"
    },
    {
      quote: "The AI assistant feels like it truly understands my needs as a healthcare provider. Documentation has never been this streamlined.",
      author: "Rebecca Chen, NP",
      role: "Nurse Practitioner",
      type: "nurse"
    },
    {
      quote: "I love how easy it is to share updates with my daughter through the family dashboard. The interface is so intuitive.",
      author: "Eleanor Davis",
      role: "Care Recipient",
      type: "client"
    }
  ];
  
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <Transition animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real experiences from healthcare professionals and care recipients on the NurseSync platform.
            </p>
          </div>
        </Transition>
        
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Transition 
              key={index} 
              animation="fade-up" 
              delay={`delay-${(index % 2) * 100 + 100}` as any}
            >
              <GlassCard 
                variant={testimonial.type as 'nurse' | 'client'} 
                className="h-full"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-6 flex-grow italic">{testimonial.quote}</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </GlassCard>
            </Transition>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
