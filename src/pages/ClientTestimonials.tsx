
import React from 'react';
import { Star, MessageSquare, Quote } from 'lucide-react';

const ClientTestimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Remote Patient",
      quote: "The platform has transformed how I manage my chronic condition. Having direct access to my nurse through video consultations has reduced my anxiety and hospital visits.",
      rating: 5,
      image: "/lovable-uploads/2a1625f4-ddd4-42ed-8931-f0896ee3e2ee.png"
    },
    {
      name: "Michael Chen",
      role: "Family Caregiver",
      quote: "Managing my father's care became so much easier with this platform. The family dashboard lets all of us stay updated on his treatment plan and appointments.",
      rating: 5,
      image: "/lovable-uploads/4d074511-0a62-4a13-9e21-2242fa85f08e.png"
    },
    {
      name: "Emily Rodriguez",
      role: "Post-Surgery Patient",
      quote: "After my surgery, I was worried about recovery at home. The daily check-ins with my nurse gave me confidence and helped catch a potential complication early.",
      rating: 5,
      image: "/lovable-uploads/62e008c6-a46f-4835-93d0-3813f2c6561a.png"
    },
    {
      name: "James Wilson",
      role: "Chronic Care Patient",
      quote: "The medication reminders and health tracking features have helped me stay on top of my diabetes management. My nurse can see my readings and advise me promptly.",
      rating: 4,
      image: "/lovable-uploads/d215d01f-93d6-423a-994e-1cb106f5b3ae.png"
    },
    {
      name: "Rachel Thompson",
      role: "New Parent",
      quote: "As a first-time mom with a premature baby, having a NICU nurse available for video consultations after discharge was invaluable. It gave us peace of mind during a stressful time.",
      rating: 5,
      image: "/lovable-uploads/254e5c47-1d67-4c2e-b540-b83c5515ee84.png"
    },
    {
      name: "David Patel",
      role: "Elderly Care Recipient",
      quote: "At 78, I was hesitant about using technology, but the interface is so simple. I love that my daughter can join my nurse consultations remotely from another state.",
      rating: 5,
      image: "/lovable-uploads/10dd0118-d393-4fd3-b587-7248faff0e56.png"
    }
  ];

  return (
    <div className="pt-32 pb-16 bg-gradient-to-br from-white via-client-muted/10 to-white">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted text-client">
            Our Clients Speak
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Stories from People We've Helped
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real experiences from clients who have transformed their healthcare journey with our platform.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 mb-16 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3">
              <div className="relative">
                <div className="absolute -top-4 -left-4 bg-client text-white rounded-full p-3">
                  <Quote size={24} />
                </div>
                <img 
                  src="/lovable-uploads/2a1625f4-ddd4-42ed-8931-f0896ee3e2ee.png" 
                  alt="Featured testimonial" 
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl font-medium text-gray-700 mb-6 italic">
                "The platform has transformed how I manage my chronic condition. Having direct access to my nurse through video consultations has reduced my anxiety and hospital visits."
              </blockquote>
              <div className="flex items-center">
                <div>
                  <p className="font-semibold text-lg">Sarah Johnson</p>
                  <p className="text-gray-600">Remote Patient</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(1).map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-gray-300" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who have transformed their healthcare experience with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-lg bg-client text-white font-medium hover:bg-client/90 transition-colors shadow-md">
              Get Started
            </button>
            <button className="px-8 py-3 rounded-lg border border-client text-client font-medium hover:bg-client-muted/10 transition-colors">
              <MessageSquare size={18} className="inline mr-2" />
              Talk to an Advisor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientTestimonials;
