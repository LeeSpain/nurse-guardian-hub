
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/navigation/Header';
import Footer from '../components/layout/Footer';
import Transition from '../components/ui-components/Transition';
import GlassCard from '../components/ui-components/GlassCard';
import { User, Users, ArrowRight, Check } from 'lucide-react';
import Button from '../components/ui-components/Button';
import Features from '../components/home/Features';

const FeaturesPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-purple-50">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6TTI0IDQ4YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiIGZpbGw9InJnYmEoMTAwLDEwMCwxMDAsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
          
          <div className="container mx-auto px-4 relative">
            <Transition animation="fade-up">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                  Platform Features
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800">
                  Discover What NurseSync Can Do
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Our platform offers specialized tools designed for both healthcare providers and care recipients.
                </p>
              </div>
            </Transition>
          </div>
        </section>

        {/* User Type Selection */}
        <section className="py-16 md:py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              <Transition animation="slide-in-left">
                <div className="relative rounded-3xl overflow-hidden h-full">
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-700 to-purple-500"></div>
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTAwIDEwMEgwVjBoMTAweiIvPjxwYXRoIGQ9Ik01MC41IDc1LjVjMTQgMCAyNS0xMS4wMSAyNS0yNXMtMTEtMjUtMjUtMjUtMjUgMTEuMDEtMjUgMjUgMTEuMDEgMjUgMjUgMjV6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
                  
                  {/* Content container */}
                  <div className="relative p-8 md:p-10 h-full flex flex-col">
                    <div className="flex items-center mb-6">
                      <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm">
                        For Healthcare Professionals
                      </div>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Nurse-Sync AI Assistant</h3>
                    <p className="text-lg text-white/90 mb-8">
                      Advanced tools designed specifically for healthcare providers to manage remote care efficiently, document effectively, and grow your practice.
                    </p>
                    
                    <ul className="mb-10 space-y-3">
                      <li className="flex items-center text-white/90">
                        <div className="mr-2 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </div>
                        AI documentation assistant
                      </li>
                      <li className="flex items-center text-white/90">
                        <div className="mr-2 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </div>
                        Client management tools
                      </li>
                      <li className="flex items-center text-white/90">
                        <div className="mr-2 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </div>
                        Billing and scheduling
                      </li>
                    </ul>
                    
                    <Link 
                      to="/nurse/features" 
                      className="mt-auto inline-flex items-center justify-center gap-2 bg-white text-purple-700 hover:bg-gray-100 transition-colors font-medium px-6 py-3 rounded-lg"
                    >
                      Explore Provider Features
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </Transition>
              
              <Transition animation="slide-in-right">
                <div className="relative rounded-3xl overflow-hidden h-full">
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-client to-client/80"></div>
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTAwIDEwMEgwVjBoMTAweiIvPjxwYXRoIGQ9Ik01MC41IDc1LjVjMTQgMCAyNS0xMS4wMSAyNS0yNXMtMTEtMjUtMjUtMjUtMjUgMTEuMDEtMjUgMjUgMTEuMDEgMjUgMjUgMjV6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
                  
                  {/* Content container */}
                  <div className="relative p-8 md:p-10 h-full flex flex-col">
                    <div className="flex items-center mb-6">
                      <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm">
                        For Care Recipients & Families
                      </div>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">AI Guardian</h3>
                    <p className="text-lg text-white/90 mb-8">
                      Intuitive tools that help you stay connected with your healthcare providers, manage your care plan, and keep your family informed.
                    </p>
                    
                    <ul className="mb-10 space-y-3">
                      <li className="flex items-center text-white/90">
                        <div className="mr-2 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </div>
                        Family coordination hub
                      </li>
                      <li className="flex items-center text-white/90">
                        <div className="mr-2 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </div>
                        Video consultations
                      </li>
                      <li className="flex items-center text-white/90">
                        <div className="mr-2 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </div>
                        Wellness tracking
                      </li>
                    </ul>
                    
                    <Link 
                      to="/client/features" 
                      className="mt-auto inline-flex items-center justify-center gap-2 bg-white text-client hover:bg-gray-100 transition-colors font-medium px-6 py-3 rounded-lg"
                    >
                      Explore Client Features
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <Features />

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Transition animation="fade-up">
                <h2 className="text-2xl md:text-4xl font-bold mb-6">Ready to experience NurseSync?</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                  Whether you're a healthcare provider or care recipient, our platform is designed to make remote care easier and more effective.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-purple-600 text-white"
                    as={Link}
                    to="/pricing"
                  >
                    Start Your Free Trial
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-gray-300 text-gray-700"
                    as={Link}
                    to="/contact"
                  >
                    Contact Sales
                  </Button>
                </div>
              </Transition>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
