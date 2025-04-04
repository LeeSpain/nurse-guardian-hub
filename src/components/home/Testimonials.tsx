
import React from 'react';
import Transition from '../ui-components/Transition';
import { Star, Quote } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "NurseSync changed how I run my practice. I can now support more clients remotely while maintaining the same quality of care.",
      author: "Sarah Johnson, RN",
      role: "Healthcare Professional",
      type: "nurse" as const,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      stars: 5
    },
    {
      quote: "Having a nurse available through video calls gives me peace of mind about my father's care, even though I live across the country.",
      author: "Michael Torres",
      role: "Family Member",
      type: "client" as const,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      stars: 5
    },
    {
      quote: "The AI assistant feels like it truly understands my needs as a healthcare provider. Documentation has never been this streamlined.",
      author: "Rebecca Chen, NP",
      role: "Nurse Practitioner",
      type: "nurse" as const,
      avatar: "https://randomuser.me/api/portraits/women/66.jpg",
      stars: 4
    },
    {
      quote: "I love how easy it is to share updates with my daughter through the family dashboard. The interface is so intuitive.",
      author: "Eleanor Davis",
      role: "Care Recipient",
      type: "client" as const,
      avatar: "https://randomuser.me/api/portraits/women/78.jpg",
      stars: 5
    }
  ];
  
  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-purple-50"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNEgyNHYtMmgxMnYyeiIgZmlsbD0icmdiYSgxMDAsMTAwLDEwMCwwLjA1KSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      {/* Large quote mark decoration */}
      <div className="absolute top-20 left-10 opacity-5">
        <Quote size={200} />
      </div>
      <div className="absolute bottom-20 right-10 opacity-5 transform rotate-180">
        <Quote size={200} />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <Transition animation="fade-up">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real experiences from healthcare professionals and care recipients on the NurseSync platform.
            </p>
          </div>
        </Transition>
        
        {/* Mobile view - stacked cards */}
        <div className="md:hidden">
          {testimonials.map((testimonial, index) => (
            <Transition 
              key={index} 
              animation="fade-up" 
              delay={`delay-${(index % 2) * 100 + 100}` as any}
              className="mb-5"
            >
              <TestimonialCard testimonial={testimonial} />
            </Transition>
          ))}
        </div>
        
        {/* Desktop view - carousel */}
        <div className="hidden md:block">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 p-2">
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="relative static translate-y-0 left-0 mr-4" />
              <CarouselNext className="relative static translate-y-0 right-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  testimonial: {
    quote: string;
    author: string;
    role: string;
    type: 'nurse' | 'client';
    avatar: string;
    stars: number;
  };
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const gradientBg = testimonial.type === 'nurse' 
    ? 'from-purple-600 to-purple-800' 
    : 'from-client to-client-muted';
    
  return (
    <div className="relative h-full">
      {/* Decorative background gradient */}
      <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${gradientBg} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl`}></div>
      
      {/* Card content */}
      <div className="relative bg-white rounded-xl p-6 shadow-lg border border-gray-100 h-full z-10 backdrop-blur-sm">
        {/* Quote icon */}
        <div className={`absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-white bg-gradient-to-br ${gradientBg}`}>
          <Quote size={16} />
        </div>
        
        {/* Star rating */}
        <div className="mb-3 flex">
          {[...Array(testimonial.stars)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
          ))}
          {[...Array(5 - testimonial.stars)].map((_, i) => (
            <Star key={i + testimonial.stars} className="h-4 w-4 text-gray-200" />
          ))}
        </div>
        
        {/* Quote text */}
        <p className="text-gray-700 mb-5 font-medium italic text-sm">{testimonial.quote}</p>
        
        {/* Author info */}
        <div className="flex items-center">
          <div className="mr-3 relative">
            <div className={`absolute inset-0 rounded-full border-2 ${testimonial.type === 'nurse' ? 'border-purple-300' : 'border-client'} scale-110 opacity-50`}></div>
            <img 
              src={testimonial.avatar} 
              alt={testimonial.author} 
              className={`h-12 w-12 rounded-full border-2 ${testimonial.type === 'nurse' ? 'border-purple-300' : 'border-client'} object-cover`}
            />
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-sm">{testimonial.author}</p>
            <p className={`text-xs ${testimonial.type === 'nurse' ? 'text-purple-600' : 'text-client'}`}>
              {testimonial.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
