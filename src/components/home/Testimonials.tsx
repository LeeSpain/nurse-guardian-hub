
import React from 'react';
import Transition from '../ui-components/Transition';
import GlassCard from '../ui-components/GlassCard';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "NurseSync changed how I run my practice. I can now support more clients remotely while maintaining the same quality of care.",
      author: "Sarah Johnson, RN",
      role: "Healthcare Professional",
      type: "nurse",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      stars: 5
    },
    {
      quote: "Having a nurse available through video calls gives me peace of mind about my father's care, even though I live across the country.",
      author: "Michael Torres",
      role: "Family Member",
      type: "client",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      stars: 5
    },
    {
      quote: "The AI assistant feels like it truly understands my needs as a healthcare provider. Documentation has never been this streamlined.",
      author: "Rebecca Chen, NP",
      role: "Nurse Practitioner",
      type: "nurse",
      avatar: "https://randomuser.me/api/portraits/women/66.jpg",
      stars: 4
    },
    {
      quote: "I love how easy it is to share updates with my daughter through the family dashboard. The interface is so intuitive.",
      author: "Eleanor Davis",
      role: "Care Recipient",
      type: "client",
      avatar: "https://randomuser.me/api/portraits/women/78.jpg",
      stars: 5
    }
  ];
  
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>
      <div className="container mx-auto px-4 relative">
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
                  <div className="mb-4 flex">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 flex-grow italic">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.author} 
                        className={`h-12 w-12 rounded-full border-2 ${testimonial.type === 'nurse' ? 'border-purple-300' : 'border-client'}`}
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
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
