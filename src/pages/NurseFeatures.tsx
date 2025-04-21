import React, { useEffect } from 'react';
import Transition from '../components/ui-components/Transition';
import { 
  Users, 
  FileText, 
  Calendar, 
  CreditCard, 
  Video, 
  MessageSquare, 
  LineChart, 
  Shield, 
  Bot,
  Headphones,
  BookOpen,
  CheckCircle,
  Smartphone,
  PieChart,
  ArrowRight
} from 'lucide-react';
import Button from '../components/ui-components/Button';
import { Link } from 'react-router-dom';

const NurseFeatures: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "AI Documentation Assistant",
      description: "Create legally-compliant care notes with our AI that helps draft comprehensive documentation through voice-to-text transcription.",
      icon: <Bot className="h-10 w-10 text-white" />,
      color: "from-purple-600 to-purple-700"
    },
    {
      title: "Client Management",
      description: "Organize and track all your remote clients with our AI-powered smart matching system for a perfect fit.",
      icon: <Users className="h-10 w-10 text-white" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Intelligent Scheduling",
      description: "Manage your calendar with intelligent scheduling tools that optimize your time and reduce no-shows.",
      icon: <Calendar className="h-10 w-10 text-white" />,
      color: "from-purple-600 to-purple-700"
    },
    {
      title: "HD Video Consultations",
      description: "Conduct secure, HIPAA-compliant video consultations with recording capabilities (with client consent).",
      icon: <Video className="h-10 w-10 text-white" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Secure Messaging",
      description: "Communicate through our encrypted messaging system with read receipts and priority flags.",
      icon: <MessageSquare className="h-10 w-10 text-white" />,
      color: "from-purple-600 to-purple-700"
    },
    {
      title: "Integrated Billing",
      description: "Generate invoices, track payments, and automate reporting with our intuitive financial tools.",
      icon: <CreditCard className="h-10 w-10 text-white" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Analytics Dashboard",
      description: "Gain insights into client engagement, clinical outcomes, and business performance metrics.",
      icon: <LineChart className="h-10 w-10 text-white" />,
      color: "from-purple-600 to-purple-700"
    },
    {
      title: "Mobile App Access",
      description: "Access all features on the go with our dedicated mobile app for managing your practice from anywhere.",
      icon: <Smartphone className="h-10 w-10 text-white" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Compliance & Security",
      description: "Rest easy with built-in compliance features and enterprise-grade security for your practice.",
      icon: <Shield className="h-10 w-10 text-white" />,
      color: "from-purple-600 to-purple-700"
    }
  ];

  const connectionProcess = [
    {
      title: "Profile Setup",
      description: "Create a detailed profile with verified credentials, areas of expertise, availability, and a video introduction.",
      icon: <FileText className="h-16 w-16 text-purple-600" />
    },
    {
      title: "Smart Matching",
      description: "Our AI matches you with care seekers based on your expertise and their specific needs.",
      icon: <CheckCircle className="h-16 w-16 text-purple-600" />
    },
    {
      title: "Free Intro Calls",
      description: "Connect with potential clients through free 15-minute video calls to discuss needs and assess fit.",
      icon: <Headphones className="h-16 w-16 text-purple-600" />
    },
    {
      title: "Care Seeker Commitment",
      description: "Care seekers confirm their choice via a legally binding agreement, committing to pay for ongoing services.",
      icon: <BookOpen className="h-16 w-16 text-purple-600" />
    },
    {
      title: "Active Outreach",
      description: "On paid plans, browse anonymized care seeker needs and send introductory messages to pitch your services.",
      icon: <Users className="h-16 w-16 text-purple-600" />
    },
    {
      title: "Ongoing Management",
      description: "Manage all your clients via a comprehensive dashboard with tools tailored to your subscription plan.",
      icon: <PieChart className="h-16 w-16 text-purple-600" />
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6TTI0IDQ4YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiIGZpbGw9InJnYmEoMTAwLDEwMCwxMDAsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative">
          <Transition animation="fade-up">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                Platform Features
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800">
                Advanced Tools for Remote Care
              </h1>
              <p className="text-lg text-gray-600">
                Nurse-Sync empowers you with everything needed to deliver exceptional remote healthcare while growing your practice.
              </p>
            </div>
          </Transition>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Transition 
                key={feature.title} 
                animation="fade-up" 
                delay={`delay-${(index % 3) * 100 + 100}` as any}
              >
                <div className={`relative h-full overflow-hidden rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg group`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="p-8 relative h-full flex flex-col">
                    <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                    <p className="text-white/90">{feature.description}</p>
                  </div>
                </div>
              </Transition>
            ))}
          </div>
        </div>
      </section>

      {/* Connection Process Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <Transition animation="fade-up">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How You'll Connect with Clients</h2>
              <p className="text-lg text-gray-600">
                Nurse-Sync helps you build your client base through a structured process that balances passive discovery with active outreach.
              </p>
            </div>
          </Transition>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {connectionProcess.map((step, index) => (
              <Transition 
                key={step.title} 
                animation="fade-up" 
                delay={`delay-${(index % 3) * 100 + 100}` as any}
              >
                <div className="bg-white rounded-2xl border border-purple-100 p-8 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                  <div className="flex justify-center mb-6">
                    <div className="bg-purple-50 p-4 rounded-xl">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-center">{step.description}</p>
                </div>
              </Transition>
            ))}
          </div>
        </div>
      </section>

      {/* AI Documentation Assistant Highlight */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Transition animation="slide-in-left">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-purple-300/20 opacity-70 blur-xl rounded-2xl"></div>
                <div className="relative bg-gradient-to-br from-purple-900 to-purple-700 p-8 rounded-2xl shadow-xl">
                  <Bot className="h-20 w-20 text-white/80 mb-6" />
                  <h3 className="text-2xl font-bold mb-4 text-white">AI Documentation Assistant</h3>
                  <p className="text-white/90 mb-6">
                    Our AI Documentation Assistant helps you create comprehensive, compliant documentation in a fraction of the time.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start text-white/90">
                      <CheckCircle className="h-5 w-5 text-purple-300 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Voice-to-text transcription for quick note taking</span>
                    </li>
                    <li className="flex items-start text-white/90">
                      <CheckCircle className="h-5 w-5 text-purple-300 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Smart templates for common documentation</span>
                    </li>
                    <li className="flex items-start text-white/90">
                      <CheckCircle className="h-5 w-5 text-purple-300 mr-2 flex-shrink-0 mt-0.5" />
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
                  as={Link}
                >
                  View Pricing Plans
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </Transition>
          </div>
        </div>
      </section>

      {/* Client Management Highlight */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Transition animation="slide-in-left">
              <div>
                <h2 className="text-3xl font-bold mb-6">Build Your Client Base Effectively</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Nurse-Sync's smart matching system helps connect you with care seekers who need your specific expertise.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  On paid plans, you can actively browse client opportunities and send introduction messages to extend your reach beyond passive matching.
                </p>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-purple-200 text-purple-700"
                  to="/nurse/pricing"
                  as={Link}
                >
                  Compare All Plans
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </Transition>
            
            <Transition animation="slide-in-right">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-300/20 to-purple-600/20 opacity-70 blur-xl rounded-2xl"></div>
                <div className="relative bg-white p-8 rounded-2xl border border-purple-100 shadow-xl">
                  <Users className="h-20 w-20 text-purple-600 mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Client Management</h3>
                  <p className="text-gray-600 mb-6">
                    Organize and track all your remote clients in one intuitive interface with our smart matching system.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start text-gray-600">
                      <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Client profiles with health history and preferences</span>
                    </li>
                    <li className="flex items-start text-gray-600">
                      <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Session tracking and care plan management</span>
                    </li>
                    <li className="flex items-start text-gray-600">
                      <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Secure family sharing for approved contacts</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-900 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Transition animation="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Remote Practice?</h2>
              <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
                Join thousands of healthcare professionals who are delivering exceptional care remotely with Nurse-Sync.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-purple-700 hover:bg-gray-100"
                  to="/nurse/pricing"
                  as={Link}
                >
                  View Pricing Plans
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                  to="/contact"
                  as={Link}
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

export default NurseFeatures;
