
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Calendar, FileText, Video, Shield, MessageSquare, Users, CreditCard, Check } from 'lucide-react';
import Transition from '../components/ui-components/Transition';
import Button from '../components/ui-components/Button';

const Nurse: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "AI Documentation Assistant",
      description: "Create legally-compliant care notes through voice-to-text transcription, with smart templates and advanced compliance checking.",
      icon: <Bot size={24} className="text-white" />
    },
    {
      title: "HD Video Consultations",
      description: "Conduct secure, HIPAA-compliant video consultations with clients, with optional recording for later review.",
      icon: <Video size={24} className="text-white" />
    },
    {
      title: "Intelligent Scheduling",
      description: "Manage your calendar with smart tools that optimize your time, reduce no-shows, and automate reminders.",
      icon: <Calendar size={24} className="text-white" />
    },
    {
      title: "Client Management",
      description: "Organize and track all your remote clients with our AI-powered smart matching system for a perfect fit.",
      icon: <Users size={24} className="text-white" />
    },
    {
      title: "Secure Messaging",
      description: "Communicate through our encrypted messaging system with read receipts and priority flags.",
      icon: <MessageSquare size={24} className="text-white" />
    },
    {
      title: "Integrated Billing",
      description: "Generate invoices, track payments, and automate reporting with our intuitive financial tools.",
      icon: <CreditCard size={24} className="text-white" />
    }
  ];

  return (
    <>
      {/* Hero Section with Gradient Background */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-800"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Transition animation="fade-up">
              <div className="text-white">
                <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold bg-white/20 text-white rounded-full backdrop-blur-sm">
                  For Healthcare Professionals
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                  Empower Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-200">Remote Practice</span>
                </h1>
                <p className="text-lg text-white/90 mb-8 max-w-lg">
                  Nurse-Sync helps you deliver exceptional remote healthcare while growing your income with AI-powered tools and secure telehealth.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="bg-white hover:bg-gray-100 text-purple-700 shadow-lg"
                    to="/nurse/pricing"
                  >
                    View Pricing Plans
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white/30 text-white hover:bg-white/10"
                    to="/login"
                  >
                    Get Started Free
                  </Button>
                </div>
              </div>
            </Transition>
            
            <Transition animation="fade-in" delay="delay-200">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/20 to-pink-300/20 opacity-70 blur-xl rounded-2xl"></div>
                <div className="relative overflow-hidden rounded-xl shadow-2xl">
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
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <Transition animation="fade-up">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Healthcare Professionals Choose Nurse-Sync</h2>
              <p className="text-lg text-gray-600">
                Our platform is designed specifically for nurses, offering powerful tools to streamline your workflow, enhance patient care, and grow your remote practice.
              </p>
            </div>
          </Transition>
          
          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <Transition 
                key={feature.title} 
                animation="fade-up" 
                delay={`delay-${(index % 3) * 100 + 100}` as any}
              >
                <div className="group hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start gap-5">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Transition>
            ))}
          </div>
        </div>
      </section>

      {/* Connection Process Overview */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-100/50 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <Transition animation="fade-up">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How You'll Connect With Care Seekers</h2>
              <p className="text-lg text-gray-600">
                Nurse-Sync makes it easy to build your client base through smart matching and active outreach opportunities.
              </p>
            </div>
          </Transition>
          
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-200 via-purple-400 to-indigo-300 rounded-full"></div>
            
            {/* Step 1 */}
            <Transition animation="fade-up" delay="delay-100">
              <div className="relative mb-16 md:ml-8 md:pl-20">
                <div className="absolute top-0 left-0 md:left-10 w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transform -translate-x-1/2 md:-translate-x-5 z-10">1</div>
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold mb-3">Profile Setup</h3>
                  <p className="text-gray-600 mb-4">
                    Create a detailed profile with verified credentials, areas of expertise, availability, and a video introduction that showcases your approach to care.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Verified Credentials</span>
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Specialty Areas</span>
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Video Introduction</span>
                  </div>
                </div>
              </div>
            </Transition>
            
            {/* Step 2 */}
            <Transition animation="fade-up" delay="delay-200">
              <div className="relative mb-16 md:mr-8 md:text-right md:pr-20">
                <div className="absolute top-0 left-0 md:left-auto md:right-10 w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transform -translate-x-1/2 md:translate-x-5 z-10">2</div>
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold mb-3">Smart Matching</h3>
                  <p className="text-gray-600 mb-4">
                    Our AI matches you with care seekers based on your expertise and their specific needs, ensuring compatibility from the start.
                  </p>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">AI-Driven Matches</span>
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Client Compatibility</span>
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Needs-Based Pairing</span>
                  </div>
                </div>
              </div>
            </Transition>
            
            {/* Step 3 */}
            <Transition animation="fade-up" delay="delay-300">
              <div className="relative mb-16 md:ml-8 md:pl-20">
                <div className="absolute top-0 left-0 md:left-10 w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transform -translate-x-1/2 md:-translate-x-5 z-10">3</div>
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold mb-3">Free Intro Calls</h3>
                  <p className="text-gray-600 mb-4">
                    Connect with potential clients through free 15-minute video calls to discuss needs and assess fit before committing to ongoing care.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">No Obligation</span>
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">HIPAA-Compliant Video</span>
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Needs Assessment</span>
                  </div>
                </div>
              </div>
            </Transition>
            
            {/* Step 4 */}
            <Transition animation="fade-up" delay="delay-400">
              <div className="relative md:mr-8 md:text-right md:pr-20">
                <div className="absolute top-0 left-0 md:left-auto md:right-10 w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transform -translate-x-1/2 md:translate-x-5 z-10">4</div>
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold mb-3">Care Seeker Commitment</h3>
                  <p className="text-gray-600 mb-4">
                    Care seekers confirm their choice via a legally binding agreement, committing to pay for your ongoing professional services.
                  </p>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Secure Payments</span>
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Legal Agreements</span>
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Ongoing Relationship</span>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </section>

      {/* AI Documentation Assistant Highlight */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Transition animation="slide-in-left">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="relative bg-gradient-to-br from-purple-600 to-indigo-700 p-8 rounded-2xl shadow-xl">
                  <Bot className="h-16 w-16 text-white/80 mb-6" />
                  <h3 className="text-2xl font-bold mb-4 text-white">AI Documentation Assistant</h3>
                  <p className="text-white/90 mb-6">
                    Our AI Documentation Assistant helps you create comprehensive, compliant documentation in a fraction of the time.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start text-white/90">
                      <Check className="h-5 w-5 text-purple-300 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Voice-to-text transcription for quick note taking</span>
                    </li>
                    <li className="flex items-start text-white/90">
                      <Check className="h-5 w-5 text-purple-300 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Smart templates for common documentation</span>
                    </li>
                    <li className="flex items-start text-white/90">
                      <Check className="h-5 w-5 text-purple-300 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Advanced compliance checking for regulations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Transition>
            
            <Transition animation="slide-in-right">
              <div>
                <h2 className="text-3xl font-bold mb-6">Save Time With AI-Powered Tools</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Our advanced AI tools help you focus on what matters most - providing exceptional care to your clients, rather than paperwork.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  With features like voice-to-text transcription, smart templates, and compliance checking, you can create professional documentation in minutes, not hours.
                </p>
                <Button 
                  variant="primary" 
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  to="/nurse/pricing"
                >
                  View Pricing Plans
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </Transition>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <Transition animation="fade-up">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Flexible Plans for Every Stage</h2>
              <p className="text-lg text-gray-600">
                From free entry options to premium team plans, our pricing is designed to grow with your practice.
              </p>
            </div>
          </Transition>
          
          <div className="flex overflow-x-auto pb-8 space-x-6 snap-x snap-mandatory no-scrollbar">
            {/* Free Plan */}
            <Transition animation="fade-up" delay="delay-100">
              <div className="flex-shrink-0 w-full sm:w-80 snap-center">
                <div className="h-full bg-white rounded-2xl border border-purple-100 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
                    <p className="text-purple-700 text-lg font-semibold mb-4">€0/month</p>
                    <p className="text-gray-600 mb-6">
                      Perfect for nurses who are just getting started with remote care.
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Manage up to 2 active clients</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Basic AI documentation tools</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
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
              </div>
            </Transition>
            
            {/* Growth Plan */}
            <Transition animation="fade-up" delay="delay-200">
              <div className="flex-shrink-0 w-full sm:w-80 snap-center">
                <div className="h-full bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-200 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 relative">
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
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Manage up to 10 active clients</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Smart matching + active outreach</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
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
              </div>
            </Transition>
            
            {/* Professional Plan */}
            <Transition animation="fade-up" delay="delay-300">
              <div className="flex-shrink-0 w-full sm:w-80 snap-center">
                <div className="h-full bg-white rounded-2xl border border-purple-100 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2">Professional</h3>
                    <p className="text-purple-700 text-lg font-semibold mb-4">€100/month</p>
                    <p className="text-gray-600 mb-6">
                      Full suite of tools for scaling your practice.
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Unlimited active clients</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Advanced AI documentation</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
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
              </div>
            </Transition>
          </div>
          
          <div className="text-center mt-8">
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
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700 to-indigo-800"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }}></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Transition animation="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Start Your Remote Practice?</h2>
              <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
                Join thousands of healthcare professionals delivering exceptional care remotely with Nurse-Sync.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white hover:bg-gray-100 text-purple-700"
                  to="/login"
                >
                  Start Your Free Trial
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                  to="/nurse/contact"
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
