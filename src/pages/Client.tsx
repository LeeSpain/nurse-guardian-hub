
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  UserPlus, 
  ShieldCheck, 
  Video, 
  MessageSquare, 
  Users, 
  Activity, 
  PhoneCall, 
  Calendar, 
  Bell, 
  Lock, 
  Heart, 
  Check, 
  ChevronRight,
  Award,
  Clock,
  FileText,
  CircleCheck
} from 'lucide-react';
import Transition from '../components/ui-components/Transition';
import Button from '../components/ui-components/Button';
import GlassCard from '../components/ui-components/GlassCard';
import SimpleAnimation from '../components/ui-components/SimpleAnimation';

const Client: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "Video Consultations",
      description: "Connect with your healthcare providers through secure, high-quality video calls from the comfort of your home.",
      icon: <Video className="h-10 w-10 text-client" />,
      color: "from-client to-client-muted"
    },
    {
      title: "Family Dashboard",
      description: "Share updates and information with approved family members, ensuring everyone stays informed about your care.",
      icon: <Users className="h-10 w-10 text-client" />,
      color: "from-client-muted to-client"
    },
    {
      title: "Wellness Tracking",
      description: "Monitor your health with daily check-ins and receive AI-powered insights about your progress and well-being.",
      icon: <Activity className="h-10 w-10 text-client" />,
      color: "from-client to-client-muted"
    },
    {
      title: "Emergency Support",
      description: "Access immediate assistance when needed most with our emergency response system.",
      icon: <PhoneCall className="h-10 w-10 text-client" />,
      color: "from-client-muted to-client"
    }
  ];

  const detailedFeatures = [
    {
      title: "Secure Video Consultations",
      description: "Connect face-to-face with healthcare providers through our HIPAA-compliant video platform. Schedule, join, and review sessions all in one place.",
      icon: <Video className="h-12 w-12 text-white" />,
      benefits: [
        "HD quality video and audio for clear communication",
        "Built-in appointment scheduling and reminders",
        "Option to include family members in sessions",
        "Automatic session summaries and care notes"
      ]
    },
    {
      title: "Family Coordination Hub",
      description: "Keep everyone involved in your care on the same page with our comprehensive family coordination tools.",
      icon: <Users className="h-12 w-12 text-white" />,
      benefits: [
        "Customizable access levels for family members",
        "Shared calendar for appointments and medication schedules",
        "Care task assignments and completion tracking",
        "Secure messaging between all care team members"
      ]
    },
    {
      title: "AI-Powered Health Tracking",
      description: "Our intelligent monitoring tools help you stay on top of your health metrics and spot trends before they become problems.",
      icon: <Activity className="h-12 w-12 text-white" />,
      benefits: [
        "Daily health check-ins with personalized questions",
        "Visual dashboards of your health progress",
        "Early warning system for potential health issues",
        "Medication adherence tracking and reminders"
      ]
    }
  ];

  const careOptions = [
    {
      title: "General Health Monitoring",
      description: "Regular check-ins and preventative care to maintain your overall health and wellbeing.",
      icon: <Heart className="h-10 w-10 text-white" />,
      color: "bg-gradient-to-r from-pink-500 to-rose-500"
    },
    {
      title: "Chronic Condition Management",
      description: "Specialized support for ongoing conditions with personalized care plans and continuous monitoring.",
      icon: <Activity className="h-10 w-10 text-white" />,
      color: "bg-gradient-to-r from-client to-client-muted"
    },
    {
      title: "Post-Hospital Recovery",
      description: "Dedicated care during your recovery period after hospital stays or procedures.",
      icon: <Award className="h-10 w-10 text-white" />,
      color: "bg-gradient-to-r from-indigo-500 to-purple-500"
    },
    {
      title: "Senior Care Support",
      description: "Specialized care services designed to help seniors maintain independence and quality of life.",
      icon: <ShieldCheck className="h-10 w-10 text-white" />,
      color: "bg-gradient-to-r from-amber-500 to-orange-500"
    }
  ];

  const professionalTypes = [
    {
      title: "Registered Nurses",
      description: "Experienced RNs provide comprehensive assessments, care plans, and ongoing monitoring.",
      imageUrl: "/lovable-uploads/d215d01f-93d6-423a-994e-1cb106f5b3ae.png"
    },
    {
      title: "Nurse Practitioners",
      description: "Advanced practice nurses who can diagnose conditions, prescribe medications, and manage your care.",
      imageUrl: "/lovable-uploads/10dd0118-d393-4fd3-b587-7248faff0e56.png"
    },
    {
      title: "Care Coordinators",
      description: "Specialists who organize all aspects of your care plan and ensure smooth communication.",
      imageUrl: "/lovable-uploads/62e008c6-a46f-4835-93d0-3813f2c6561a.png"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section - Updated with more compact dashboard */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-br from-gray-50 via-client-muted/20 to-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left side - Text content */}
            <div className="w-full lg:w-1/2">
              <Transition animation="fade-up">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted/20 text-client">
                    Personalized Remote Healthcare
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                    Your Health Journey, <br className="hidden md:block" />Simplified
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600">
                    Connect with trusted healthcare professionals, manage your care plan, and coordinate with family members—all from the comfort of your home.
                  </p>
                </div>
              </Transition>

              <Transition animation="fade-up" delay="delay-100">
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button 
                    variant="client" 
                    size="lg" 
                    className="shadow-lg"
                    icon={<UserPlus size={18} />}
                  >
                    Find Your Care Professional
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-client text-client"
                    icon={<ArrowRight size={18} />}
                  >
                    View Demo
                  </Button>
                </div>
              </Transition>
            </div>

            {/* Right side - Dashboard mockup (Revised to be more compact) */}
            <div className="w-full lg:w-1/2">
              <Transition animation="fade-in" delay="delay-400">
                <div className="relative">
                  <div className="relative glass-panel rounded-2xl overflow-visible shadow-elevated border border-white/30">
                    <div className="absolute -inset-8 bg-gradient-to-r from-purple-600/20 to-client/20 opacity-70 blur-xl rounded-2xl"></div>
                    
                    {/* Compact Dashboard Mockup */}
                    <div className="relative z-10 rounded-2xl overflow-hidden bg-white p-2">
                      {/* Dashboard Header */}
                      <div className="bg-client rounded-t-lg p-2 flex items-center justify-between text-white">
                        <div className="flex items-center space-x-2">
                          <div className="h-2 w-2 rounded-full bg-white/30"></div>
                          <span className="font-medium text-sm">CareSync Dashboard</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Bell size={14} />
                          <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center text-xs">JS</div>
                        </div>
                      </div>
                      
                      {/* Dashboard Content */}
                      <div className="p-3">
                        {/* Welcome Section */}
                        <div className="mb-3 bg-client/10 rounded-lg p-3">
                          <h3 className="text-sm font-semibold text-gray-800">Welcome back, Jessica!</h3>
                          <p className="text-xs text-gray-600">Your next appointment is in 2 days</p>
                        </div>
                        
                        {/* Stats Cards - Simplified */}
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-gray-500">Blood Pressure</span>
                              <Activity size={12} className="text-client" />
                            </div>
                            <div className="font-bold">120/80</div>
                            <div className="text-xs text-green-600 flex items-center">
                              <ArrowRight size={10} className="transform rotate-45" />
                              Normal
                            </div>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-gray-500">Heart Rate</span>
                              <Heart size={12} className="text-client" />
                            </div>
                            <div className="font-bold">72 bpm</div>
                            <div className="text-xs text-green-600 flex items-center">
                              <ArrowRight size={10} className="transform rotate-45" />
                              Normal
                            </div>
                          </div>
                        </div>
                        
                        {/* Upcoming Appointments - Simplified */}
                        <div className="mb-3">
                          <h4 className="font-medium text-xs mb-1 text-gray-700">Upcoming Appointments</h4>
                          <div className="bg-white border border-gray-100 rounded-lg p-2 mb-2 flex items-center">
                            <div className="h-8 w-8 rounded-full bg-client/20 flex items-center justify-center mr-2">
                              <Video size={12} className="text-client" />
                            </div>
                            <div className="flex-1">
                              <div className="text-xs font-medium">Dr. Sarah Johnson</div>
                              <div className="text-xs text-gray-500">Wed, Jun 15 • 10:00 AM</div>
                            </div>
                            <Button variant="outline" size="sm" className="text-xs h-6 px-2 border-client text-client">
                              Join
                            </Button>
                          </div>
                        </div>
                        
                        {/* Medication Reminder - Simplified */}
                        <div className="bg-client/5 rounded-lg p-2">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-xs text-gray-700">Today's Medications</h4>
                            <span className="text-xs text-client">View all</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-white rounded-md mb-1 border border-gray-100">
                            <div className="flex items-center">
                              <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center mr-2">
                                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                              </div>
                              <div>
                                <div className="text-xs font-medium">Vitamin D</div>
                                <div className="text-xs text-gray-500">Morning</div>
                              </div>
                            </div>
                            <div className="h-4 w-4 rounded border border-client flex items-center justify-center">
                              <Check size={10} className="text-client" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Time saved card - kept from original design but made smaller */}
                    <div className="absolute -bottom-6 -right-6 z-30 bg-white rounded-lg shadow-lg p-3 max-w-[180px] border border-purple-100">
                      <div className="flex items-center mb-1">
                        <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                        </div>
                        <div className="font-semibold text-sm text-gray-800">Time Saved</div>
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-xl font-bold text-gray-900">70%</span>
                        <span className="ml-1 text-xs text-gray-500">on documentation</span>
                      </div>
                    </div>
                    
                    {/* Smart Matching card - kept from original design but made smaller */}
                    <div className="absolute -top-6 -left-6 z-30 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg shadow-lg p-2 max-w-[160px]">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <div className="font-semibold text-sm">Smart Matching</div>
                      </div>
                      <div className="text-xs opacity-90 mt-0.5">
                        Find your perfect provider
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section - Enhanced with more visual elements */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-client/5 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-client-muted/5 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <Transition animation="fade-up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted/20 text-client border border-client/10">
                <span className="mr-2">✦</span>
                Care Designed For You
                <span className="ml-2">✦</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">Comprehensive Remote Care Solutions</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our platform offers unique features specifically for individuals seeking quality remote healthcare.
              </p>
            </div>
          </Transition>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line between cards */}
            <div className="absolute top-28 left-0 right-0 h-0.5 bg-gradient-to-r from-client/10 via-client/30 to-client/10 hidden lg:block"></div>
            
            {features.map((feature, index) => (
              <Transition key={feature.title} animation="fade-up" delay={`delay-${(index) * 100}` as any}>
                <div className="relative group">
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-client-muted to-client opacity-0 group-hover:opacity-100 rounded-xl blur-sm transition duration-700"></div>
                  
                  <div className="relative bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 z-10">
                    <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                    <div className="p-8">
                      <div className="bg-gradient-to-br from-client-muted/20 to-client/10 rounded-xl w-16 h-16 flex items-center justify-center mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-client transition-colors duration-300">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                      
                      {/* Added subtle indicator/button */}
                      <div className="mt-6 flex items-center text-client/80 group-hover:text-client transition-colors duration-300">
                        <span className="text-sm font-medium">Learn more</span>
                        <ArrowRight size={14} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            ))}
          </div>
          
          {/* Added testimonial/stat cards */}
          <div className="mt-20 grid md:grid-cols-3 gap-6">
            <Transition animation="fade-up" delay="delay-100">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100 shadow-lg">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-client/10 flex items-center justify-center text-client mr-4">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">95%</h4>
                    <p className="text-gray-600">Patient satisfaction rate</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"The remote care features have transformed how I manage my health. I feel more connected than ever."</p>
              </div>
            </Transition>
            
            <Transition animation="fade-up" delay="delay-200">
              <div className="bg-gradient-to-br from-client/5 to-white rounded-xl p-6 border border-client/10 shadow-lg">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-client/10 flex items-center justify-center text-client mr-4">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">24/7</h4>
                    <p className="text-gray-600">Access to care services</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"Knowing I can reach out any time of day or night gives me peace of mind I never had before."</p>
              </div>
            </Transition>
            
            <Transition animation="fade-up" delay="delay-300">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100 shadow-lg">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-client/10 flex items-center justify-center text-client mr-4">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">85%</h4>
                    <p className="text-gray-600">Reduction in paperwork</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"The digital documentation system saves me time and helps everyone stay on the same page with my care plan."</p>
              </div>
            </Transition>
          </div>
          
          {/* Added visual CTA */}
          <Transition animation="fade-up">
            <div className="mt-16 text-center">
              <Button 
                variant="client" 
                size="lg" 
                className="shadow-lg"
                icon={<UserPlus size={18} />}
              >
                Get Started With Your Care Plan
              </Button>
            </div>
          </Transition>
        </div>
      </section>

      {/* How It Works Section - Enhanced and Upgraded */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-client-muted/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zMCAyMEgxMHYtMWgyMHYxeiIgZmlsbD0icmdiYSgxMDAsMTAwLDEwMCwwLjEpIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-40 left-10 w-72 h-72 rounded-full bg-client/5 blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Transition animation="fade-up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted/20 text-client border border-client/10">
                <span className="mr-2">✦</span>
                Simple Three-Step Process
                <span className="ml-2">✦</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">How NurseSync Works For You</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Getting started with remote healthcare has never been easier. Our streamlined process connects you with the care you need in just a few simple steps.
              </p>
            </div>
          </Transition>

          {/* Process steps - Enhanced with better visuals */}
          <div className="max-w-6xl mx-auto relative">
            {/* Timeline connector */}
            <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-gradient-to-r from-client-muted/30 via-client/60 to-client-muted/30 z-0"></div>
            
            <div className="grid md:grid-cols-3 gap-10 lg:gap-16 relative z-10">
              {[
                {
                  step: "01",
                  title: "Create Your Profile",
                  description: "Sign up and complete your health profile with your medical history, preferences, and specific care needs.",
                  icon: <UserPlus className="h-8 w-8 text-white" />,
                  action: "Get Started"
                },
                {
                  step: "02",
                  title: "Match With Care Provider",
                  description: "Our AI technology connects you with healthcare professionals who specialize in your specific needs.",
                  icon: <Users className="h-8 w-8 text-white" />,
                  action: "View Providers"
                },
                {
                  step: "03",
                  title: "Begin Your Care Plan",
                  description: "Start your personalized care journey with video consultations, monitoring, and continuous support.",
                  icon: <CircleCheck className="h-8 w-8 text-white" />,
                  action: "Learn More"
                }
              ].map((step, index) => (
                <Transition key={step.step} animation="fade-up" delay={`delay-${index * 100}` as any}>
                  <div className="group relative">
                    {/* Step number with glow effect */}
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-client blur-md opacity-30 group-hover:opacity-70 group-hover:scale-110 transition-all duration-500"></div>
                        <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-client to-client-muted rounded-full shadow-lg border border-white/20 relative">
                          <span className="text-2xl font-bold text-white">{step.step}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Card with content */}
                    <GlassCard variant="client" hover className="pt-14 mt-10 relative z-10 h-full transition-transform duration-500 group-hover:-translate-y-2">
                      {/* Icon */}
                      <div className="absolute -right-5 -top-5 w-16 h-16 rounded-xl bg-gradient-to-br from-client to-client-muted shadow-lg flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-all duration-500">
                        {step.icon}
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-client transition-colors duration-300">{step.title}</h3>
                      <p className="text-gray-600 mb-6">{step.description}</p>
                      
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <button className="flex items-center text-client font-medium group/btn">
                          <span>{step.action}</span>
                          <ChevronRight size={18} className="ml-1 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </GlassCard>
                    
                    {/* Circle connector for desktop */}
                    {index < 2 && (
                      <div className="hidden lg:block absolute -right-8 top-1/2 transform -translate-y-1/2 translate-x-1/2 z-10">
                        <div className="w-4 h-4 rounded-full bg-white border-2 border-client"></div>
                      </div>
                    )}
                  </div>
                </Transition>
              ))}
            </div>
            
            {/* Call to action - Added to maintain consistency with other sections */}
            <Transition animation="fade-up" delay="delay-300">
              <div className="mt-20 text-center">
                <Button 
                  variant="client" 
                  size="lg" 
                  className="shadow-lg"
                  icon={<ArrowRight size={18} />}
                >
                  Start Your Care Journey Today
                </Button>
              </div>
            </Transition>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Available Care Options */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="container mx-auto px-4">
          <Transition animation="fade-up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted/20 text-client">
                Tailored Solutions
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Personalized Care Options</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We offer a variety of specialized care services to meet your specific healthcare needs, no matter your situation.
              </p>
            </div>
          </Transition>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {careOptions.map((option, index) => (
              <Transition key={option.title} animation="fade-up" delay={`delay-${index * 100}` as any}>
                <div className="rounded-xl shadow-lg overflow-hidden h-full flex flex-col hover:shadow-xl transition-all transform hover:-translate-y-1">
                  <div className={`p-6 ${option.color} relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-x-8 -translate-y-8 blur-lg"></div>
                    <div className="relative z-10">
                      {option.icon}
                      <h3 className="text-xl font-bold mt-4 text-white">{option.title}</h3>
                    </div>
                  </div>
                  <div className="p-6 bg-white border border-gray-100 border-t-0 flex-1">
                    <p className="text-gray-600">{option.description}</p>
                    <button className="mt-4 text-sm font-medium text-client flex items-center hover:underline">
                      Learn more
                      <ArrowRight size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
              </Transition>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: Our Healthcare Professionals */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-client-muted/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="container mx-auto px-4">
          <Transition animation="fade-up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted/20 text-client">
                Expert Care Team
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Healthcare Professionals</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our network includes verified, experienced healthcare providers dedicated to delivering personalized care.
              </p>
            </div>
          </Transition>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {professionalTypes.map((professional, index) => (
              <Transition key={professional.title} animation="fade-up" delay={`delay-${index * 100}` as any}>
                <div className="relative group">
                  <div className="relative rounded-xl overflow-hidden mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <div className="aspect-w-4 aspect-h-3">
                      <img 
                        src={professional.imageUrl} 
                        alt={professional.title}
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white">{professional.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600">{professional.description}</p>
                  <button className="mt-4 text-sm font-medium text-client flex items-center group-hover:underline">
                    Learn more about our {professional.title.toLowerCase()}
                    <ArrowRight size={14} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </Transition>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Client;
