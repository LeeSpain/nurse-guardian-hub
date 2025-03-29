import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Bot, 
  Calendar, 
  Video, 
  Shield, 
  MessageSquare, 
  Users, 
  CreditCard, 
  Check,
  FileText,
  BrainCircuit,
  Star,
  Sparkles,
  Lightbulb,
  Clock,
  Briefcase,
  Award
} from 'lucide-react';
import Transition from '../components/ui-components/Transition';
import Button from '../components/ui-components/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from '../components/navigation/Header';
import Footer from '../components/layout/Footer';

const Nurse: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero Section - Updated to match main homepage */}
        <section className="relative pt-32 pb-12 md:pt-40 md:pb-20 overflow-hidden bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIGZpbGw9InJnYmEoMTAwLDEwMCwxMDAsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-30 will-change-transform"></div>
          
          <div className="container px-4 mx-auto relative">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
                <Transition animation="fade-up">
                  <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold bg-purple-100 text-purple-600 rounded-full">
                    For Healthcare Professionals
                  </span>
                </Transition>
                <Transition animation="fade-up" delay="delay-100">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-balance">
                    Transform Your <span className="text-gradient-nurse">Healthcare Practice</span>
                  </h1>
                </Transition>
                <Transition animation="fade-up" delay="delay-200">
                  <p className="text-lg text-gray-700 mb-8 max-w-xl">
                    Nurse-Sync empowers you with cutting-edge AI tools and secure telehealth 
                    to deliver exceptional remote care while maximizing your income potential.
                  </p>
                </Transition>
                <Transition animation="fade-up" delay="delay-300">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      variant="nurse" 
                      size="lg" 
                      icon={<ArrowRight size={18} />} 
                      iconPosition="right" 
                      className="shadow-lg"
                      as={Link}
                      to="/login"
                    >
                      Start Free Trial
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      icon={<CreditCard size={18} />} 
                      iconPosition="right" 
                      className="border-purple-300 text-purple-700 hover:bg-purple-50"
                      as={Link}
                      to="/nurse/pricing"
                    >
                      View Pricing
                    </Button>
                  </div>
                </Transition>
              </div>
              
              <div className="w-full lg:w-1/2 lg:pl-16">
                <Transition animation="fade-in" delay="delay-400">
                  <div className="relative will-change-transform">
                    <div className="relative glass-panel rounded-2xl overflow-visible shadow-elevated border border-white/30">
                      <div className="absolute -inset-8 bg-gradient-to-r from-purple-600/20 to-purple-400/20 opacity-70 blur-xl rounded-2xl"></div>
                      
                      <div className="relative z-10 rounded-2xl overflow-hidden">
                        <img 
                          src="/lovable-uploads/2a1625f4-ddd4-42ed-8931-f0896ee3e2ee.png" 
                          alt="Nurse using digital healthcare platform" 
                          className="w-full h-auto object-cover"
                          loading="eager"
                        />
                      </div>
                      
                      {/* Success Rate card */}
                      <div className="absolute -bottom-8 -right-8 z-30 bg-white rounded-lg shadow-lg p-4 max-w-[200px] border border-purple-100">
                        <div className="flex items-center mb-2">
                          <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center mr-2">
                            <Award className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="font-semibold text-gray-800">Success Rate</div>
                        </div>
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold text-gray-900">95%</span>
                          <span className="ml-1 text-sm text-gray-500">client satisfaction</span>
                        </div>
                      </div>
                      
                      {/* AI-Powered card */}
                      <div className="absolute -top-8 -left-8 z-30 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg shadow-lg p-3 max-w-[180px]">
                        <div className="flex items-center">
                          <BrainCircuit className="h-5 w-5 mr-2" />
                          <div className="font-semibold">AI-Powered</div>
                        </div>
                        <div className="text-xs opacity-90 mt-1">
                          Streamline your workflow with intelligent assistance
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-8 border-y border-purple-100/50 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="font-bold text-3xl text-gray-900">5,000+</div>
                <div className="text-sm text-gray-500">Healthcare Professionals</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-3xl text-gray-900">100K+</div>
                <div className="text-sm text-gray-500">Remote Consultations</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-3xl text-gray-900">98%</div>
                <div className="text-sm text-gray-500">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-3xl text-gray-900">HIPAA</div>
                <div className="text-sm text-gray-500">Compliant</div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Showcase - Redesigned with Fixed Hover */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIGZpbGw9InJnYmEoMTI4LDkwLDIxMywwLjA1KSIvPjwvZz48L3N2Zz4=')] opacity-50"></div>
          
          <div className="container mx-auto px-4 relative">
            <Transition animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Tools for Your Practice</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Our platform is designed specifically for healthcare professionals, offering integrated tools that streamline your workflow.
                </p>
              </div>
            </Transition>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 - AI Documentation */}
              <Transition animation="fade-up" delay="delay-100">
                <div className="group bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="p-6 relative">
                    {/* Purple top border that animates on hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    
                    <div className="mb-5 flex items-center">
                      <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mr-4 group-hover:bg-purple-600 transition-colors duration-300">
                        <Bot className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">AI Documentation Assistant</h3>
                    </div>
                    
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      Create legally-compliant care notes with our AI that helps draft comprehensive documentation through voice-to-text transcription.
                    </p>
                    
                    <div className="mt-5 space-y-2">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3 group-hover:bg-purple-200 transition-colors duration-300">
                          <Check className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-gray-700">Voice-to-text transcription</span>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3 group-hover:bg-purple-200 transition-colors duration-300">
                          <Check className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-gray-700">Smart templates</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
              
              {/* Feature 2 - Client Management */}
              <Transition animation="fade-up" delay="delay-200">
                <div className="group bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="p-6 relative">
                    {/* Purple top border that animates on hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    
                    <div className="mb-5 flex items-center">
                      <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mr-4 group-hover:bg-purple-600 transition-colors duration-300">
                        <Users className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">Client Management</h3>
                    </div>
                    
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      Organize and track all your remote clients with our AI-powered smart matching system for a perfect fit.
                    </p>
                    
                    <div className="mt-5 space-y-2">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3 group-hover:bg-purple-200 transition-colors duration-300">
                          <Check className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-gray-700">Smart matching system</span>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3 group-hover:bg-purple-200 transition-colors duration-300">
                          <Check className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-gray-700">Session tracking</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
              
              {/* Feature 3 - Scheduling */}
              <Transition animation="fade-up" delay="delay-300">
                <div className="group bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="p-6 relative">
                    {/* Purple top border that animates on hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    
                    <div className="mb-5 flex items-center">
                      <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mr-4 group-hover:bg-purple-600 transition-colors duration-300">
                        <Calendar className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">Intelligent Scheduling</h3>
                    </div>
                    
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      Manage your calendar with intelligent scheduling tools that optimize your time and reduce no-shows.
                    </p>
                    
                    <div className="mt-5 space-y-2">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3 group-hover:bg-purple-200 transition-colors duration-300">
                          <Check className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-gray-700">Automated reminders</span>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3 group-hover:bg-purple-200 transition-colors duration-300">
                          <Check className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-gray-700">No-show reduction</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              {/* Feature 4 - HD Video */}
              <Transition animation="fade-up" delay="delay-400">
                <div className="group bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="p-6 relative">
                    {/* Purple top border that animates on hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    
                    <div className="mb-5 flex items-center">
                      <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mr-4 group-hover:bg-purple-600 transition-colors duration-300">
                        <Video className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">HD Video Consultations</h3>
                    </div>
                    
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      Conduct secure, HIPAA-compliant video consultations with recording capabilities (with client consent).
                    </p>
                    
                    <div className="mt-5 space-y-2">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3 group-hover:bg-purple-200 transition-colors duration-300">
                          <Check className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-gray-700">HIPAA-compliant video</span>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3 group-hover:bg-purple-200 transition-colors duration-300">
                          <Check className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-gray-700">Screen sharing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
              
              {/* Feature 5 - Messaging */}
              <Transition animation="fade-up" delay="delay-500">
                <div className="group bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="p-6 relative">
                    {/* Purple top border that animates on hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    
                    <div className="mb-5 flex items-center">
                      <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mr-4 group-hover:bg-purple-600 transition-colors duration-300">
                        <MessageSquare className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">Secure Messaging</h3>
                    </div>
                    
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      Communicate through our encrypted messaging system with read receipts and priority flags.
                    </p>
                    
                    <div className="mt-5 space-y-2">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3 group-hover:bg-purple-200 transition-colors duration-300">
                          <Check className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-gray-700">End-to-end encryption</span>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3 group-hover:bg-purple-200 transition-colors duration-300">
                          <Check className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-gray-700">Priority flags</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
              
              {/* Feature 6 - Billing */}
              <Transition animation="fade-up" delay="delay-500">
                <div className="group bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="p-6 relative">
                    {/* Purple top border that animates on hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    
                    <div className="mb-5 flex items-center">
                      <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mr-4 group-hover:bg-purple-600 transition-colors duration-300">
                        <CreditCard className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">Integrated Billing</h3>
                    </div>
                    
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      Generate invoices, track payments, and automate reporting with our intuitive financial tools.
                    </p>
                    
                    <div className="mt-5 space-y-2">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3 group-hover:bg-purple-200 transition-colors duration-300">
                          <Check className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-gray-700">Custom invoicing</span>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3 group-hover:bg-purple-200 transition-colors duration-300">
                          <Check className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-gray-700">Payment tracking</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
            
            <div className="text-center mt-12">
              <Button 
                variant="primary" 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 shadow-xl hover:shadow-purple-500/20 transition-all"
                to="/nurse/pricing"
              >
                View Pricing Plans
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Two Career Paths Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIGZpbGw9InJnYmEoMTI4LDkwLDIxMywwLjA1KSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
          
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Transition animation="fade-up">
                <div className="inline-flex items-center bg-purple-100 rounded-full px-3 py-1 mb-4">
                  <Sparkles className="h-4 w-4 text-purple-600 mr-2" />
                  <span className="text-purple-700 font-medium text-sm">Two Career Paths</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Path to Success</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Nurse-Sync offers healthcare professionals two flexible avenues to maximize their earning potential while delivering exceptional care.
                </p>
              </Transition>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Path 1: Independent Practice */}
              <Transition animation="slide-in-left">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
                  <div className="h-8 bg-gradient-to-r from-purple-500 to-purple-700"></div>
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="h-14 w-14 rounded-xl bg-purple-100 flex items-center justify-center mr-4">
                        <Briefcase className="h-8 w-8 text-purple-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Independent Practice</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-6">
                      Build your own healthcare practice using our platform's advanced tools while maintaining full autonomy over your schedule and client base.
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Complete Flexibility</h4>
                          <p className="text-gray-600 text-sm">Set your own rates, hours, and choose your clients</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Full Revenue</h4>
                          <p className="text-gray-600 text-sm">Keep 100% of your client fees (platform subscription applies)</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Brand Development</h4>
                          <p className="text-gray-600 text-sm">Build your own healthcare brand and reputation</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="md" 
                      className="text-purple-700 border-purple-200 hover:bg-purple-50 w-full"
                      to="/nurse/pricing"
                    >
                      Learn More
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </Transition>
              
              {/* Path 2: Contracted Work */}
              <Transition animation="slide-in-right" delay="delay-200">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
                  <div className="h-8 bg-gradient-to-r from-blue-500 to-blue-700"></div>
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center mr-4">
                        <Clock className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Contracted Work</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-6">
                      Join our network of on-demand healthcare professionals providing care through our platform to clients seeking immediate assistance.
                    </p>
