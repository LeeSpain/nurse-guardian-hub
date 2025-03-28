
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Shield, Bot, Calendar, FileText, Users, Video } from 'lucide-react';
import Transition from '../components/ui-components/Transition';
import Button from '../components/ui-components/Button';

const Nurse: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero Section with Gradient Background */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-purple-100"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIGZpbGw9InJnYmEoMTAwLDEwMCwxMDAsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Transition animation="fade-up">
              <div>
                <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full">
                  For Healthcare Professionals
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Empower Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-500">Remote Practice</span>
                </h1>
                <p className="text-lg text-gray-700 mb-8 max-w-lg">
                  Nurse-Sync helps you deliver exceptional remote healthcare while growing your income with AI-powered tools and secure telehealth.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
                    to="/nurse/pricing"
                  >
                    View Pricing Plans
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-purple-200 text-purple-700"
                    to="/nurse/features"
                  >
                    Explore Features
                  </Button>
                </div>
              </div>
            </Transition>
            
            <Transition animation="fade-in" delay="delay-200">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-purple-300/20 opacity-70 blur-xl rounded-2xl"></div>
                <div className="relative overflow-hidden rounded-xl border border-purple-100 shadow-xl">
                  <img 
                    src="/lovable-uploads/10dd0118-d393-4fd3-b587-7248faff0e56.png" 
                    alt="Nurse using Nurse-Sync platform" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Transition animation="fade-up">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Healthcare Professionals Choose Nurse-Sync</h2>
              <p className="text-lg text-gray-600">
                Our platform is designed specifically for nurses, offering powerful tools to streamline your workflow, enhance patient care, and grow your remote practice.
              </p>
            </div>
          </Transition>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <Transition animation="fade-up" delay="delay-100">
              <div className="relative bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border border-purple-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 opacity-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="bg-purple-100 p-3 rounded-lg inline-block mb-4">
                    <Bot className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">AI Documentation Assistant</h3>
                  <p className="text-gray-600">
                    Create legally-compliant care notes through voice-to-text transcription, with smart templates and advanced compliance checking.
                  </p>
                </div>
              </div>
            </Transition>
            
            <Transition animation="fade-up" delay="delay-200">
              <div className="relative bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border border-purple-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 opacity-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="bg-purple-100 p-3 rounded-lg inline-block mb-4">
                    <Video className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">HD Video Consultations</h3>
                  <p className="text-gray-600">
                    Conduct secure, HIPAA-compliant video consultations with clients, with optional recording for later review.
                  </p>
                </div>
              </div>
            </Transition>
            
            <Transition animation="fade-up" delay="delay-300">
              <div className="relative bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border border-purple-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 opacity-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="bg-purple-100 p-3 rounded-lg inline-block mb-4">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Intelligent Scheduling</h3>
                  <p className="text-gray-600">
                    Manage your calendar with smart tools that optimize your time, reduce no-shows, and automate reminders.
                  </p>
                </div>
              </div>
            </Transition>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-purple-200 text-purple-700"
              to="/nurse/features"
            >
              See All Features
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Connection Process Overview */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-purple-800 text-white">
        <div className="container mx-auto px-4">
          <Transition animation="fade-up">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How You'll Connect With Care Seekers</h2>
              <p className="text-lg opacity-90">
                Nurse-Sync makes it easy to build your client base through smart matching and active outreach opportunities.
              </p>
            </div>
          </Transition>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Transition animation="fade-up" delay="delay-100">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/20 mb-5">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">1. Profile Setup</h3>
                <p className="opacity-90">
                  Create a detailed profile with credentials, expertise, availability, and a video introduction.
                </p>
              </div>
            </Transition>
            
            <Transition animation="fade-up" delay="delay-200">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/20 mb-5">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">2. Smart Matching</h3>
                <p className="opacity-90">
                  Our AI matches you with care seekers based on your expertise and their specific needs.
                </p>
              </div>
            </Transition>
            
            <Transition animation="fade-up" delay="delay-300">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/20 mb-5">
                  <Video className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">3. Free Intro Calls</h3>
                <p className="opacity-90">
                  Connect with potential clients through free 15-minute video calls to assess fit.
                </p>
              </div>
            </Transition>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white text-purple-700 hover:bg-gray-100"
              to="/nurse/features"
            >
              Learn More About the Process
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Transition animation="fade-up">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Flexible Plans for Every Stage</h2>
              <p className="text-lg text-gray-600">
                From free entry options to premium team plans, our pricing is designed to grow with your practice.
              </p>
            </div>
          </Transition>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Transition animation="fade-up" delay="delay-100">
              <div className="bg-white rounded-2xl border border-purple-100 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
                  <p className="text-purple-700 text-lg font-semibold mb-4">€0/month</p>
                  <p className="text-gray-600 mb-6">
                    Perfect for nurses who are just getting started with remote care.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Manage up to 2 active clients</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Basic AI documentation tools</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>HD HIPAA-compliant video calls</span>
                    </li>
                  </ul>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    fullWidth
                    className="border-purple-200 text-purple-700"
                    to="/nurse/pricing"
                  >
                    Get Started Free
                  </Button>
                </div>
              </div>
            </Transition>
            
            <Transition animation="fade-up" delay="delay-200">
              <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-200 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 relative">
                <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">Growth Plan</h3>
                  <p className="text-purple-700 text-lg font-semibold mb-4">€20/month + 20% commission</p>
                  <p className="text-gray-600 mb-6">
                    Low upfront cost with revenue tied to your earnings.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Manage up to 10 active clients</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Smart matching + active outreach</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Full invoicing system</span>
                    </li>
                  </ul>
                  <Button 
                    variant="primary" 
                    size="lg" 
                    fullWidth
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    to="/nurse/pricing"
                  >
                    Select Plan
                  </Button>
                </div>
              </div>
            </Transition>
            
            <Transition animation="fade-up" delay="delay-300">
              <div className="bg-white rounded-2xl border border-purple-100 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">Professional</h3>
                  <p className="text-purple-700 text-lg font-semibold mb-4">€100/month</p>
                  <p className="text-gray-600 mb-6">
                    Full suite of tools for scaling your practice.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Unlimited active clients</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Advanced AI documentation</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Full analytics dashboard</span>
                    </li>
                  </ul>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    fullWidth
                    className="border-purple-200 text-purple-700"
                    to="/nurse/pricing"
                  >
                    Select Plan
                  </Button>
                </div>
              </div>
            </Transition>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-purple-200 text-purple-700"
              to="/nurse/pricing"
            >
              Compare All Plans
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Transition animation="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Remote Practice?</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                Join thousands of healthcare professionals delivering exceptional care remotely with Nurse-Sync.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  to="/nurse/pricing"
                >
                  Start Your Free Trial
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-purple-200 text-purple-700"
                  to="/contact"
                >
                  Schedule a Demo
                </Button>
              </div>
            </Transition>
          </div>
        </div>
      </section>
    </>
  );
};

export default Nurse;
