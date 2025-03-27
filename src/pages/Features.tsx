
import React, { useEffect } from 'react';
import Header from '../components/navigation/Header';
import Footer from '../components/layout/Footer';
import Transition from '../components/ui-components/Transition';
import GlassCard from '../components/ui-components/GlassCard';
import { 
  FileText, Video, Users, Calendar, Bell, Shield, 
  Activity, Brain, MessageSquare, ClipboardList, 
  Clock, CreditCard, Settings, Smartphone
} from 'lucide-react';
import Button from '../components/ui-components/Button';

const FeaturesPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "AI-Powered Documentation",
      subtitle: "Save time with intelligent clinical documentation",
      description: "Our AI assistant helps nurses create comprehensive, compliant documentation in a fraction of the time, allowing more focus on patient care.",
      image: "/lovable-uploads/10dd0118-d393-4fd3-b587-7248faff0e56.png",
      imagePosition: "right",
      features: [
        {
          title: "Smart Templates",
          description: "Pre-built templates for common documentation needs that adapt to your workflow.",
          icon: <FileText className="text-purple-600" />
        },
        {
          title: "Voice-to-Documentation",
          description: "Speak naturally and watch as the AI converts your speech into structured clinical notes.",
          icon: <Brain className="text-purple-600" />
        },
        {
          title: "Compliance Checking",
          description: "Automatic verification against regulatory requirements to ensure documentation meets standards.",
          icon: <ClipboardList className="text-purple-600" />
        }
      ]
    },
    {
      title: "Virtual Care Platform",
      subtitle: "Connect with clients through secure video consultations",
      description: "Provide personalized care remotely with our secure, HIPAA-compliant video platform designed specifically for healthcare providers.",
      image: "/placeholder.svg",
      imagePosition: "left",
      features: [
        {
          title: "HD Video Consultations",
          description: "Crystal-clear video and audio quality for effective remote assessments.",
          icon: <Video className="text-client" />
        },
        {
          title: "Screen Sharing",
          description: "Share educational materials, test results, or care plans during consultations.",
          icon: <Smartphone className="text-client" />
        },
        {
          title: "Consultation Recording",
          description: "Record sessions (with client permission) for reference or training purposes.",
          icon: <Clock className="text-client" />
        }
      ]
    },
    {
      title: "Care Coordination",
      subtitle: "Streamline communication between care team members",
      description: "Enhance collaboration with tools designed to keep everyone informed and aligned on client care.",
      image: "/placeholder.svg",
      imagePosition: "right",
      features: [
        {
          title: "Family Dashboard",
          description: "Share updates, appointments, and care plans with family members.",
          icon: <Users className="text-purple-600" />
        },
        {
          title: "Secure Messaging",
          description: "HIPAA-compliant messaging between care providers, clients, and approved family members.",
          icon: <MessageSquare className="text-purple-600" />
        },
        {
          title: "Care Alerts",
          description: "Automated notifications for medication reminders, appointments, and health metrics.",
          icon: <Bell className="text-purple-600" />
        }
      ]
    },
    {
      title: "Practice Management",
      subtitle: "Efficiently manage your healthcare practice",
      description: "Streamline administrative tasks with intuitive tools designed specifically for independent healthcare providers.",
      image: "/placeholder.svg",
      imagePosition: "left",
      features: [
        {
          title: "Intelligent Scheduling",
          description: "AI-powered scheduling system that optimizes your availability and reduces no-shows.",
          icon: <Calendar className="text-client" />
        },
        {
          title: "Automated Billing",
          description: "Generate professional invoices, track payments, and manage insurance claims.",
          icon: <CreditCard className="text-client" />
        },
        {
          title: "Business Analytics",
          description: "Gain insights into your practice with comprehensive reporting and analytics.",
          icon: <Activity className="text-client" />
        }
      ]
    }
  ];

  const additionalFeatures = [
    {
      title: "Enterprise-Grade Security",
      description: "HIPAA-compliant platform with end-to-end encryption and robust security measures.",
      icon: <Shield size={24} />
    },
    {
      title: "Client Health Tracking",
      description: "Monitor vital signs, symptoms, and health metrics between appointments.",
      icon: <Activity size={24} />
    },
    {
      title: "Customizable Workflows",
      description: "Tailor the platform to match your specific clinical and administrative processes.",
      icon: <Settings size={24} />
    },
    {
      title: "Mobile Experience",
      description: "Access all features on the go with our fully-responsive mobile application.",
      icon: <Smartphone size={24} />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6TTI0IDQ4YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiIGZpbGw9InJnYmEoMTAwLDEwMCwxMDAsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
          
          <div className="container mx-auto px-4 relative">
            <Transition animation="fade-up">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                  Powerful Features
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800">
                  Transforming Remote Healthcare Delivery
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  NurseSync combines cutting-edge technology with healthcare expertise to create a platform that empowers both providers and clients.
                </p>
              </div>
            </Transition>
          </div>
        </section>

        {/* Feature Sections */}
        {sections.map((section, index) => (
          <section key={section.title} className={`py-16 md:py-24 relative ${index % 2 !== 0 ? 'bg-gray-50' : ''}`}>
            <div className="container mx-auto px-4">
              <div className={`flex flex-col ${section.imagePosition === 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                <Transition animation={section.imagePosition === 'right' ? 'slide-in-left' : 'slide-in-right'} className="w-full lg:w-1/2">
                  <div className="space-y-6">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                      {section.subtitle}
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold">{section.title}</h2>
                    <p className="text-lg text-gray-600">{section.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mt-8">
                      {section.features.map((feature) => (
                        <div key={feature.title} className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
                          <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center mb-3">
                            {feature.icon}
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                          <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Transition>
                
                <Transition animation={section.imagePosition === 'right' ? 'slide-in-right' : 'slide-in-left'} className="w-full lg:w-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-client-muted rounded-3xl transform rotate-3 scale-95 opacity-30 blur-xl"></div>
                    <img 
                      src={section.image} 
                      alt={section.title} 
                      className="relative z-10 w-full h-auto rounded-2xl shadow-xl"
                    />
                  </div>
                </Transition>
              </div>
            </div>
          </section>
        ))}

        {/* Additional Features Grid */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <Transition animation="fade-up">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                  And More
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Additional Powerful Features</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Discover even more tools and capabilities designed to enhance your healthcare experience.
                </p>
              </div>
            </Transition>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {additionalFeatures.map((feature, index) => (
                <Transition 
                  key={feature.title} 
                  animation="fade-up" 
                  delay={`delay-${(index % 4) * 100 + 100}` as any}
                >
                  <GlassCard className="h-full flex flex-col items-center text-center p-8" hover variant={index % 2 === 0 ? 'nurse' : 'client'}>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${index % 2 === 0 ? 'bg-purple-100 text-purple-600' : 'bg-client-muted text-client'}`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </GlassCard>
                </Transition>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800 opacity-10"></div>
          
          <div className="container mx-auto px-4 relative">
            <Transition animation="fade-up">
              <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Healthcare Practice?</h2>
                  <p className="text-gray-600">
                    Join thousands of healthcare professionals using NurseSync to deliver exceptional remote care.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="nurse" 
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Start Free Trial
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-purple-200 text-purple-700"
                  >
                    Request Demo
                  </Button>
                </div>
              </div>
            </Transition>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
