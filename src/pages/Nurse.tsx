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
  Briefcase
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
      {/* Hero Section with Modern Design */}
      <section className="relative pt-28 pb-20 overflow-hidden">
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
                  
                  <div className="relative bg-white border border-purple-100 rounded-2xl overflow-hidden shadow-2xl p-1">
                    <div className="rounded-xl overflow-hidden">
                      <img 
                        src="/lovable-uploads/10dd0118-d393-4fd3-b587-7248faff0e56.png" 
                        alt="Nurse using digital healthcare platform" 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    
                    {/* Floating stats card */}
                    <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 max-w-[200px] border border-purple-100">
                      <div className="flex items-center mb-2">
                        <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center mr-2">
                          <Clock className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="font-semibold text-gray-800">Time Saved</div>
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-gray-900">70%</span>
                        <span className="ml-1 text-sm text-gray-500">on documentation</span>
                      </div>
                    </div>
                    
                    {/* Floating AI card */}
                    <div className="absolute -top-5 -left-5 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg shadow-lg p-3 max-w-[180px]">
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

      {/* Feature Showcase - Redesigned */}
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
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500"></div>
                <Card className="relative h-full border-purple-100 overflow-hidden group-hover:border-transparent transition-all duration-300 hover:shadow-xl z-10">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <CardContent className="p-6">
                    <div className="mb-5 flex items-center">
                      <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mr-4 group-hover:bg-white/20 transition-colors duration-300">
                        <Bot className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">AI Documentation Assistant</h3>
                    </div>
                    <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                      Create legally-compliant care notes with our AI that helps draft comprehensive documentation through voice-to-text transcription.
                    </p>
                    <div className="mt-5 space-y-2">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5 group-hover:text-purple-200 transition-colors duration-300" />
                        <span className="text-gray-700 group-hover:text-white/90 transition-colors duration-300">Voice-to-text transcription</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5 group-hover:text-purple-200 transition-colors duration-300" />
                        <span className="text-gray-700 group-hover:text-white/90 transition-colors duration-300">Smart templates</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Transition>
            
            {/* Feature 2 - Client Management */}
            <Transition animation="fade-up" delay="delay-200">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500"></div>
                <Card className="relative h-full border-purple-100 overflow-hidden group-hover:border-transparent transition-all duration-300 hover:shadow-xl z-10">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <CardContent className="p-6">
                    <div className="mb-5 flex items-center">
                      <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mr-4 group-hover:bg-white/20 transition-colors duration-300">
                        <Users className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">Client Management</h3>
                    </div>
                    <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                      Organize and track all your remote clients with our AI-powered smart matching system for a perfect fit.
                    </p>
                    <div className="mt-5 space-y-2">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5 group-hover:text-purple-200 transition-colors duration-300" />
                        <span className="text-gray-700 group-hover:text-white/90 transition-colors duration-300">Smart matching system</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5 group-hover:text-purple-200 transition-colors duration-300" />
                        <span className="text-gray-700 group-hover:text-white/90 transition-colors duration-300">Session tracking</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Transition>
            
            {/* Feature 3 - Scheduling */}
            <Transition animation="fade-up" delay="delay-300">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500"></div>
                <Card className="relative h-full border-purple-100 overflow-hidden group-hover:border-transparent transition-all duration-300 hover:shadow-xl z-10">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <CardContent className="p-6">
                    <div className="mb-5 flex items-center">
                      <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mr-4 group-hover:bg-white/20 transition-colors duration-300">
                        <Calendar className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">Intelligent Scheduling</h3>
                    </div>
                    <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                      Manage your calendar with intelligent scheduling tools that optimize your time and reduce no-shows.
                    </p>
                    <div className="mt-5 space-y-2">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5 group-hover:text-purple-200 transition-colors duration-300" />
                        <span className="text-gray-700 group-hover:text-white/90 transition-colors duration-300">Automated reminders</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5 group-hover:text-purple-200 transition-colors duration-300" />
                        <span className="text-gray-700 group-hover:text-white/90 transition-colors duration-300">No-show reduction</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Transition>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {/* Feature 4 - HD Video */}
            <Transition animation="fade-up" delay="delay-400">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500"></div>
                <Card className="relative h-full border-purple-100 overflow-hidden group-hover:border-transparent transition-all duration-300 hover:shadow-xl z-10">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <CardContent className="p-6">
                    <div className="mb-5 flex items-center">
                      <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mr-4 group-hover:bg-white/20 transition-colors duration-300">
                        <Video className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">HD Video Consultations</h3>
                    </div>
                    <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                      Conduct secure, HIPAA-compliant video consultations with recording capabilities (with client consent).
                    </p>
                    <div className="mt-5 space-y-2">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5 group-hover:text-purple-200 transition-colors duration-300" />
                        <span className="text-gray-700 group-hover:text-white/90 transition-colors duration-300">HIPAA-compliant video</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5 group-hover:text-purple-200 transition-colors duration-300" />
                        <span className="text-gray-700 group-hover:text-white/90 transition-colors duration-300">Screen sharing</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Transition>
            
            {/* Feature 5 - Messaging */}
            <Transition animation="fade-up" delay="delay-500">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500"></div>
                <Card className="relative h-full border-purple-100 overflow-hidden group-hover:border-transparent transition-all duration-300 hover:shadow-xl z-10">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <CardContent className="p-6">
                    <div className="mb-5 flex items-center">
                      <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mr-4 group-hover:bg-white/20 transition-colors duration-300">
                        <MessageSquare className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">Secure Messaging</h3>
                    </div>
                    <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                      Communicate through our encrypted messaging system with read receipts and priority flags.
                    </p>
                    <div className="mt-5 space-y-2">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5 group-hover:text-purple-200 transition-colors duration-300" />
                        <span className="text-gray-700 group-hover:text-white/90 transition-colors duration-300">End-to-end encryption</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5 group-hover:text-purple-200 transition-colors duration-300" />
                        <span className="text-gray-700 group-hover:text-white/90 transition-colors duration-300">Priority flags</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Transition>
            
            {/* Feature 6 - Billing - Here we need to change delay-600 to delay-500 */}
            <Transition animation="fade-up" delay="delay-500">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500"></div>
                <Card className="relative h-full border-purple-100 overflow-hidden group-hover:border-transparent transition-all duration-300 hover:shadow-xl z-10">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <CardContent className="p-6">
                    <div className="mb-5 flex items-center">
                      <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mr-4 group-hover:bg-white/20 transition-colors duration-300">
                        <CreditCard className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">Integrated Billing</h3>
                    </div>
                    <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                      Generate invoices, track payments, and automate reporting with our intuitive financial tools.
                    </p>
                    <div className="mt-5 space-y-2">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5 group-hover:text-purple-200 transition-colors duration-300" />
                        <span className="text-gray-700 group-hover:text-white/90 transition-colors duration-300">Custom invoicing</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5 group-hover:text-purple-200 transition-colors duration-300" />
                        <span className="text-gray-700 group-hover:text-white/90 transition-colors duration-300">Payment tracking</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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

      {/* Connection Process Overview */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 mix-blend-multiply">
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(128,90,213,0.1)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#smallGrid)" />
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <Transition animation="fade-up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-purple-100 rounded-full px-3 py-1 mb-4">
                <Sparkles className="h-4 w-4 text-purple-600 mr-2" />
                <span className="text-purple-700 font-medium text-sm">How It Works</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How You'll Connect With Care Seekers</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Nurse-Sync makes it easy to build your client base through our structured process that balances passive discovery with active outreach.
              </p>
            </div>
          </Transition>
          
          <div className="relative">
            {/* Connection step timeline */}
            <div className="hidden md:block absolute left-1/2 h-full w-1 bg-gradient-to-b from-purple-300 via-purple-500 to-purple-300 rounded-full transform -translate-x-1/2"></div>
            
            <div className="space-y-12 relative">
              {/* Step 1 */}
              <Transition animation="fade-up" delay="delay-100">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 text-right">
                    <div className="inline-flex mb-3 text-sm font-semibold text-purple-700 items-center">
                      <Lightbulb className="h-4 w-4 mr-1" />
                      STEP 1
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Profile Setup</h3>
                    <p className="text-gray-600">
                      Create a detailed profile with verified credentials, areas of expertise, 
                      availability, and a short video introduction to showcase your approach to care.
                    </p>
                  </div>
                  <div className="md:w-16 relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 md:static md:transform-none">
                      <div className="relative">
                        <div className="absolute -inset-3 rounded-full bg-purple-200 opacity-50 animate-pulse"></div>
                        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold text-xl z-10 shadow-lg">
                          1
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-16 hidden md:block">
                    {/* Placeholder for right side on larger screens */}
                  </div>
                </div>
              </Transition>
              
              {/* Step 2 */}
              <Transition animation="fade-up" delay="delay-200">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 hidden md:block">
                    {/* Placeholder for left side on larger screens */}
                  </div>
                  <div className="md:w-16 relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 md:static md:transform-none">
                      <div className="relative">
                        <div className="absolute -inset-3 rounded-
