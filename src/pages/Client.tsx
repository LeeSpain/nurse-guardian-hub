
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SimpleAnimation from '../components/ui-components/SimpleAnimation';
import { Shield, CreditCard, Star, LifeBuoy, ArrowRight } from 'lucide-react';
import Button from '../components/ui-components/Button';

const Client: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-client-50 via-white to-client-50/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6TTI0IDQ4YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiIGZpbGw9InJnYmEoMCwxNTAsMTU2LDAuMSkiLz48L2c+PC9zdmc+')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative">
          <SimpleAnimation type="fade-up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-100 text-client-700">
                Care Seeker Portal
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-client-700 via-client-600 to-client-800">
                Welcome to Your AI Guardian
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Your dedicated platform for managing healthcare needs, connecting with providers, and ensuring the best care for you and your loved ones.
              </p>
            </div>
          </SimpleAnimation>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <SimpleAnimation type="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Quick Links</h2>
          </SimpleAnimation>
          
          <div className="grid md:grid-cols-4 gap-6">
            <SimpleAnimation type="fade-up" className="delay-100">
              <Link to="/client/features" className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-client-50 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-client" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Features</h3>
                <p className="text-sm text-gray-500 text-center mb-4">Explore our platform's capabilities</p>
                <ArrowRight className="h-5 w-5 text-client mt-auto" />
              </Link>
            </SimpleAnimation>
            
            <SimpleAnimation type="fade-up" className="delay-200">
              <Link to="/client/pricing" className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-client-50 rounded-full flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-client" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Pricing</h3>
                <p className="text-sm text-gray-500 text-center mb-4">View our subscription plans</p>
                <ArrowRight className="h-5 w-5 text-client mt-auto" />
              </Link>
            </SimpleAnimation>
            
            <SimpleAnimation type="fade-up" className="delay-300">
              <Link to="/client/testimonials" className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-client-50 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-client" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Testimonials</h3>
                <p className="text-sm text-gray-500 text-center mb-4">Read success stories from clients</p>
                <ArrowRight className="h-5 w-5 text-client mt-auto" />
              </Link>
            </SimpleAnimation>
            
            <SimpleAnimation type="fade-up" className="delay-400">
              <Link to="/client/support" className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-client-50 rounded-full flex items-center justify-center mb-4">
                  <LifeBuoy className="h-6 w-6 text-client" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Support</h3>
                <p className="text-sm text-gray-500 text-center mb-4">Get help and find resources</p>
                <ArrowRight className="h-5 w-5 text-client mt-auto" />
              </Link>
            </SimpleAnimation>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-client-50 to-client-100">
        <div className="container mx-auto px-4">
          <SimpleAnimation type="fade-up">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to get started?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Create your account today to connect with healthcare providers and manage your care needs effectively.
              </p>
              <Button 
                variant="client" 
                size="lg"
                className="shadow-md"
                to="/login"
              >
                Create Your Account
              </Button>
            </div>
          </SimpleAnimation>
        </div>
      </section>
    </div>
  );
};

export default Client;
