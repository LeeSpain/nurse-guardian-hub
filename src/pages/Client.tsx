
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
  FileText
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
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-br from-gray-50 via-client-muted/20 to-gray-50">
        <div className="container mx-auto px-4">
          <Transition animation="fade-up">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted/20 text-client">
                Personalized Remote Healthcare
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-client via-client to-client-muted">
                Your Health Journey, <br className="hidden md:block" />Simplified
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Connect with trusted healthcare professionals, manage your care plan, and coordinate with family members—all from the comfort of your home.
              </p>
            </div>
          </Transition>

          <Transition animation="fade-up" delay="delay-100">
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
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

          <Transition animation="fade-up" delay="delay-200">
            <div className="mt-16 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10"></div>
              <div className="bg-gradient-to-br from-client-muted/40 to-client/30 rounded-xl overflow-hidden shadow-2xl mx-auto max-w-5xl aspect-video relative">
                <img 
                  src="/lovable-uploads/d215d01f-93d6-423a-994e-1cb106f5b3ae.png"
                  alt="Remote healthcare consultation" 
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-white/90 backdrop-blur-sm p-5 shadow-xl">
                    <Video className="h-16 w-16 text-client" />
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="container mx-auto px-4">
          <Transition animation="fade-up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted/20 text-client">
                Care Designed For You
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Comprehensive Remote Care Solutions</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our platform offers unique features designed specifically for individuals seeking quality remote healthcare.
              </p>
            </div>
          </Transition>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Transition key={feature.title} animation="fade-up" delay={`delay-${(index) * 100}` as any}>
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 group">
                  <div className={`h-3 bg-gradient-to-r ${feature.color}`}></div>
                  <div className="p-6">
                    <div className="bg-client-muted/20 rounded-full w-16 h-16 flex items-center justify-center mb-5">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-client transition-colors">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </Transition>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="container mx-auto px-4">
          <Transition animation="fade-up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted/20 text-client">
                Simple Three-Step Process
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How NurseSync Works For You</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Getting started with remote healthcare has never been easier. Our streamlined process connects you with the care you need in just a few steps.
              </p>
            </div>
          </Transition>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-client-muted/30 to-client/40 -translate-y-1/2 hidden md:block"></div>
            
            <Transition animation="fade-up" delay="delay-0">
              <div className="bg-white rounded-xl shadow-md p-8 relative z-10">
                <div className="w-12 h-12 bg-client rounded-full text-white flex items-center justify-center font-bold text-lg mb-6">1</div>
                <h3 className="text-xl font-bold mb-4">Create Your Profile</h3>
                <p className="text-gray-600 mb-6">Sign up and complete your health profile with your medical history, preferences, and care needs.</p>
                <div className="text-client font-medium flex items-center">
                  <span>Get Started</span>
                  <ChevronRight size={16} className="ml-1" />
                </div>
              </div>
            </Transition>
            
            <Transition animation="fade-up" delay="delay-100">
              <div className="bg-white rounded-xl shadow-md p-8 relative z-10">
                <div className="w-12 h-12 bg-client rounded-full text-white flex items-center justify-center font-bold text-lg mb-6">2</div>
                <h3 className="text-xl font-bold mb-4">Match With Care Provider</h3>
                <p className="text-gray-600 mb-6">We'll connect you with healthcare professionals who specialize in your specific care needs.</p>
                <div className="text-client font-medium flex items-center">
                  <span>View Providers</span>
                  <ChevronRight size={16} className="ml-1" />
                </div>
              </div>
            </Transition>
            
            <Transition animation="fade-up" delay="delay-200">
              <div className="bg-white rounded-xl shadow-md p-8 relative z-10">
                <div className="w-12 h-12 bg-client rounded-full text-white flex items-center justify-center font-bold text-lg mb-6">3</div>
                <h3 className="text-xl font-bold mb-4">Begin Your Care Plan</h3>
                <p className="text-gray-600 mb-6">Start your personalized care plan with video consultations, monitoring, and continuous support.</p>
                <div className="text-client font-medium flex items-center">
                  <span>Learn More</span>
                  <ChevronRight size={16} className="ml-1" />
                </div>
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
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="container mx-auto px-4">
          <Transition animation="fade-up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted/20 text-client">
                Expert Care Team
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Healthcare Professionals</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Meet the dedicated team of healthcare experts ready to provide personalized care through our remote platform.
              </p>
            </div>
          </Transition>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {professionalTypes.map((prof, index) => (
              <Transition key={prof.title} animation="fade-up" delay={`delay-${index * 100}` as any}>
                <GlassCard variant="client" hover className="h-full flex flex-col">
                  <div className="w-full h-56 rounded-lg overflow-hidden mb-5 bg-gray-100">
                    <img
                      src={prof.imageUrl}
                      alt={prof.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{prof.title}</h3>
                  <p className="text-gray-600 mb-4">{prof.description}</p>
                  <div className="mt-auto pt-4">
                    <Button 
                      variant="outline" 
                      className="border-client text-client hover:bg-client/5 w-full"
                    >
                      View Available Professionals
                    </Button>
                  </div>
                </GlassCard>
              </Transition>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="container mx-auto px-4">
          <Transition animation="fade-up">
            <div className="text-center mb-20">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted/20 text-client">
                Advanced Capabilities
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Powerful Features for Complete Care</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover how our innovative platform transforms the way you receive and manage healthcare.
              </p>
            </div>
          </Transition>

          <div className="space-y-24">
            {detailedFeatures.map((feature, index) => (
              <div key={feature.title} className="relative">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <Transition animation={index % 2 === 0 ? "fade-left" : "fade-right"}>
                    <div className={`order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                      <div className="bg-gradient-to-br from-client to-client-muted rounded-xl overflow-hidden shadow-xl p-8">
                        <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                          {feature.icon}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{feature.title}</h3>
                        <p className="text-white/90 text-lg mb-8">{feature.description}</p>
                        <ul className="space-y-3">
                          {feature.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start">
                              <div className="flex-shrink-0 mr-2 mt-1.5">
                                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                                  <Check size={12} className="text-client" />
                                </div>
                              </div>
                              <span className="text-white/90">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Transition>
                  
                  <Transition animation={index % 2 === 0 ? "fade-right" : "fade-left"}>
                    <div className={`order-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                      <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg">
                        <img
                          src={index === 0 
                            ? "/lovable-uploads/d215d01f-93d6-423a-994e-1cb106f5b3ae.png"
                            : index === 1 
                            ? "/lovable-uploads/62e008c6-a46f-4835-93d0-3813f2c6561a.png"
                            : "/lovable-uploads/10dd0118-d393-4fd3-b587-7248faff0e56.png"
                          }
                          alt={feature.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: Benefits of Remote Healthcare */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="container mx-auto px-4">
          <Transition animation="fade-up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted/20 text-client">
                Why Choose Remote Care
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Benefits of Personalized Remote Healthcare</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover how our approach to remote healthcare offers advantages that traditional in-person care cannot match.
              </p>
            </div>
          </Transition>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Transition animation="fade-right">
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 h-full">
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <div className="w-14 h-14 rounded-full bg-client-muted/20 flex items-center justify-center">
                        <Clock className="h-7 w-7 text-client" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Convenience & Accessibility</h3>
                    <div className="space-y-4 mb-6 flex-grow">
                      <p className="text-gray-600">
                        Access healthcare from the comfort of your home without the hassle of travel, waiting rooms, or scheduling conflicts.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check size={18} className="text-client mr-2 flex-shrink-0 mt-1" />
                          <span>No travel time or transportation concerns</span>
                        </li>
                        <li className="flex items-start">
                          <Check size={18} className="text-client mr-2 flex-shrink-0 mt-1" />
                          <span>Extended availability including evenings and weekends</span>
                        </li>
                        <li className="flex items-start">
                          <Check size={18} className="text-client mr-2 flex-shrink-0 mt-1" />
                          <span>Reduced exposure to other illnesses in waiting rooms</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Transition>

              <Transition animation="fade-left">
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 h-full">
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <div className="w-14 h-14 rounded-full bg-client-muted/20 flex items-center justify-center">
                        <FileText className="h-7 w-7 text-client" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Personalized Attention</h3>
                    <div className="space-y-4 mb-6 flex-grow">
                      <p className="text-gray-600">
                        Enjoy a more personalized healthcare experience with dedicated professionals focused on your specific needs.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check size={18} className="text-client mr-2 flex-shrink-0 mt-1" />
                          <span>More one-on-one time with your care provider</span>
                        </li>
                        <li className="flex items-start">
                          <Check size={18} className="text-client mr-2 flex-shrink-0 mt-1" />
                          <span>Continuity of care with the same healthcare team</span>
                        </li>
                        <li className="flex items-start">
                          <Check size={18} className="text-client mr-2 flex-shrink-0 mt-1" />
                          <span>Care plans tailored to your home environment</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Brief */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="container mx-auto px-4">
          <Transition animation="fade-up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted/20 text-client">
                Success Stories
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Hear From Our Care Community</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Thousands of individuals and families have transformed their healthcare experience with NurseSync.
              </p>
            </div>
          </Transition>

          <div className="max-w-5xl mx-auto">
            <Transition animation="fade-up">
              <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 border border-gray-200 relative">
                <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-client-muted to-client rounded-t-xl"></div>
                <div className="text-4xl text-client-muted mb-6">"</div>
                <p className="text-lg md:text-xl text-gray-700 mb-8">
                  NurseSync has completely transformed how our family manages my father's care. The ability to coordinate between multiple caregivers and healthcare providers has eliminated so much stress and confusion. We feel connected and informed, even when we can't be there in person.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-client-muted/20 flex items-center justify-center text-client font-bold">
                    JD
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Jennifer Davis</h4>
                    <p className="text-gray-500 text-sm">Family Caregiver, Chicago</p>
                  </div>
                </div>
              </div>
            </Transition>

            <div className="text-center mt-10">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-client text-client"
                as={Link}
                to="/client/testimonials"
              >
                View All Testimonials
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-client to-client-muted text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Transition animation="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Healthcare Experience?</h2>
              <p className="text-lg md:text-xl text-white/90 mb-10">
                Join thousands of care recipients who have discovered a simpler, more connected way to manage their healthcare journey.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-white text-client hover:bg-gray-100"
                  icon={<UserPlus size={18} />}
                >
                  Start Your Free Trial
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/10"
                  as={Link}
                  to="/client/pricing"
                  icon={<ArrowRight size={18} />}
                >
                  View Pricing Plans
                </Button>
              </div>
            </Transition>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Client;
