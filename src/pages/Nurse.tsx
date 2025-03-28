
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

const Nurse: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero Section with Modern Design - Moved up to match main homepage */}
      <section className="relative pt-20 pb-20 overflow-hidden bg-gradient-to-r from-purple-50 via-white to-purple-50">
        {/* Layered Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-white to-purple-50"></div>
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-20">
          <svg viewBox="0 0 1000 1000" className="absolute h-full w-auto min-w-full max-w-none" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(130, 94, 194, 0.3)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <Transition animation="fade-up">
                <div className="inline-flex items-center bg-gradient-to-r from-purple-600/10 to-purple-800/10 rounded-full px-3 py-1 mb-6">
                  <span className="bg-purple-600 rounded-full w-3 h-3 mr-2"></span>
                  <span className="text-purple-800 font-medium text-sm">For Healthcare Professionals</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
                  <span className="text-gray-900">Transform Your</span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                    Healthcare Practice
                  </span>
                </h1>
                
                <p className="text-lg text-gray-700 mb-8 max-w-2xl">
                  Nurse-Sync empowers you with cutting-edge AI tools and secure telehealth 
                  to deliver exceptional remote care while maximizing your income potential.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 shadow-xl hover:shadow-purple-500/20 transition-all"
                    to="/login"
                  >
                    Start Free Trial
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-purple-300 text-purple-700 hover:bg-purple-50"
                    to="/nurse/pricing"
                  >
                    View Pricing
                    <CreditCard size={18} className="ml-2" />
                  </Button>
                </div>
                
                <div className="mt-8 flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    <img src="/lovable-uploads/4d074511-0a62-4a13-9e21-2242fa85f08e.png" alt="Nurse" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                    <div className="w-10 h-10 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-purple-700 font-bold">S</div>
                    <div className="w-10 h-10 rounded-full bg-purple-700 border-2 border-white flex items-center justify-center text-white font-bold">M</div>
                  </div>
                  <div className="text-gray-500 text-sm">
                    Join <span className="font-semibold text-purple-700">5,000+</span> healthcare professionals
                  </div>
                </div>
              </Transition>
            </div>
            
            <div className="lg:col-span-5">
              <Transition animation="fade-in" delay="delay-200">
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                  <div className="absolute top-0 left-10 w-20 h-20 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                  <div className="absolute bottom-0 right-10 w-24 h-24 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                  
                  {/* Main image container with overflow visible to allow boxes to extend beyond */}
                  <div className="relative bg-white border border-purple-100 rounded-2xl overflow-visible shadow-2xl p-1">
                    {/* Inner image container with overflow hidden to keep the image properly contained */}
                    <div className="rounded-xl overflow-hidden">
                      <img 
                        src="/lovable-uploads/2a1625f4-ddd4-42ed-8931-f0896ee3e2ee.png" 
                        alt="Nurse using digital healthcare platform" 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    
                    {/* Changed this card to something different */}
                    <div className="absolute -bottom-8 -right-8 bg-white rounded-lg shadow-lg p-4 max-w-[200px] border border-purple-100 z-30">
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
                    
                    {/* Floating AI card */}
                    <div className="absolute -top-8 -left-8 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg shadow-lg p-3 max-w-[180px] z-30">
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
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Ready-Made Clientele</h4>
                        <p className="text-gray-600 text-sm">Access our existing client base with no marketing needed</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Predictable Income</h4>
                        <p className="text-gray-600 text-sm">Stable pay rates and regular work opportunities</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Simplified Operations</h4>
                        <p className="text-gray-600 text-sm">No need to handle billing or administrative tasks</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="md" 
                    className="text-blue-700 border-blue-200 hover:bg-blue-50 w-full"
                    to="/nurse/pricing"
                  >
                    Learn More
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIGZpbGw9InJnYmEoMTI4LDkwLDIxMywwLjA1KSIvPjwvZz48L3N2Zz4=')] opacity-50"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <Transition animation="fade-up">
              <div className="inline-flex items-center bg-purple-100 rounded-full px-3 py-1 mb-4">
                <Star className="h-4 w-4 text-purple-600 mr-2" />
                <span className="text-purple-700 font-medium text-sm">Success Stories</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Hear From Healthcare Professionals</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover how Nurse-Sync has transformed careers and improved patient outcomes for healthcare professionals around the world.
              </p>
            </Transition>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Testimonial 1 */}
            <Transition animation="fade-up" delay="delay-100">
              <div className="bg-white rounded-xl shadow-md p-6 border border-purple-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xl">J</div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Jessica R.</h4>
                    <p className="text-sm text-gray-500">Nurse Practitioner</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "Since using Nurse-Sync, I've doubled my client base while cutting my administrative work in half. The AI documentation feature is a game-changer for my practice."
                </p>
                <div className="flex text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
            </Transition>
            
            {/* Testimonial 2 */}
            <Transition animation="fade-up" delay="delay-200">
              <div className="bg-white rounded-xl shadow-md p-6 border border-purple-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">M</div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Michael T.</h4>
                    <p className="text-sm text-gray-500">Registered Nurse</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "Working as a contracted nurse on Nurse-Sync gives me consistent income while maintaining flexibility. The scheduling tools help me manage my time efficiently."
                </p>
                <div className="flex text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
            </Transition>
            
            {/* Testimonial 3 */}
            <Transition animation="fade-up" delay="delay-300">
              <div className="bg-white rounded-xl shadow-md p-6 border border-purple-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl">S</div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah K.</h4>
                    <p className="text-sm text-gray-500">Healthcare Consultant</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "The platform's HIPAA compliance and security features give me peace of mind, and my clients appreciate the professional telehealth experience."
                </p>
                <div className="flex text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-purple-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 mix-blend-soft-light opacity-10">
          <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Transition animation="fade-up">
              <div className="inline-flex items-center bg-white/20 rounded-full px-3 py-1 mb-4 backdrop-blur-sm">
                <Lightbulb className="h-4 w-4 text-yellow-300 mr-2" />
                <span className="text-white font-medium text-sm">Start Your Journey Today</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Healthcare Career?</h2>
              <p className="text-lg text-white/90 mb-8">
                Join thousands of healthcare professionals who have elevated their practice and increased their income using Nurse-Sync's powerful platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-white text-purple-700 hover:bg-gray-100 shadow-xl"
                  to="/login"
                >
                  Start Free Trial
                  <ArrowRight size={18} className="ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/10"
                  to="/nurse/pricing"
                >
                  View Pricing
                  <CreditCard size={18} className="ml-2" />
                </Button>
              </div>
              
              <p className="mt-6 text-white/80 text-sm">
                No credit card required. 14-day free trial with full access to all features.
              </p>
            </Transition>
          </div>
        </div>
      </section>
    </>
  );
};

export default Nurse;
