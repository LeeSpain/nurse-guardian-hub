
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UserPlus, ShieldCheck, Video } from 'lucide-react';
import Transition from '../components/ui-components/Transition';
import Button from '../components/ui-components/Button';

const Client: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-br from-gray-50 via-client-muted/30 to-gray-50">
        <div className="container mx-auto px-4">
          <Transition animation="fade-up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted text-client">
                Care Seeker Portal
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-client via-client to-client-muted/80">
                Personalized Healthcare at Your Fingertips
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Access quality healthcare from anywhere. Connect with trusted nurses, manage your care plan, and stay on top of your health journey all in one place.
              </p>
            </div>
          </Transition>

          <Transition animation="fade-up" delay="delay-100">
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
              <Button 
                variant="client" 
                size="lg" 
                className="shadow-lg"
                icon={<UserPlus size={18} />}
              >
                Find a Nurse
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-client text-client"
                icon={<ArrowRight size={18} />}
              >
                Learn How It Works
              </Button>
            </div>
          </Transition>
        </div>
      </section>

      {/* Featured Benefits */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <Transition animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose Our Care Seeker Platform</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our platform offers unique benefits designed specifically for individuals seeking quality healthcare.
              </p>
            </div>
          </Transition>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Transition animation="fade-up" delay="delay-100">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-client rounded-lg mb-4 flex items-center justify-center">
                  <ShieldCheck className="text-white h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
                <p className="text-gray-600">
                  Every healthcare provider on our platform is thoroughly vetted and verified to ensure quality care.
                </p>
              </div>
            </Transition>

            <Transition animation="fade-up" delay="delay-200">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-client rounded-lg mb-4 flex items-center justify-center">
                  <Video className="text-white h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Virtual Consultations</h3>
                <p className="text-gray-600">
                  Access care from the comfort of your home with secure video consultations and messaging.
                </p>
              </div>
            </Transition>

            <Transition animation="fade-up" delay="delay-300">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-client rounded-lg mb-4 flex items-center justify-center">
                  <UserPlus className="text-white h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Care Coordination</h3>
                <p className="text-gray-600">
                  Easily coordinate care between multiple providers and family members with shared access.
                </p>
              </div>
            </Transition>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-client-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Transition animation="fade-up">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Take Control of Your Healthcare?</h2>
              <p className="text-gray-600 mb-8">
                Join thousands of users who have transformed their healthcare experience with our platform.
              </p>
              <Button 
                variant="client" 
                size="lg" 
                className="shadow-lg"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
                as={Link}
                to="/client/features"
              >
                Explore All Features
              </Button>
            </Transition>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Client;
