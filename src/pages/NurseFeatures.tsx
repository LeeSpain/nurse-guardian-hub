
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
  Clipboard, 
  Bot,
  Headphones,
  BookOpen,
  CheckCircle,
  Smartphone,
  PieChart
} from 'lucide-react';
import Button from '../components/ui-components/Button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NurseFeatures: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "AI Documentation Assistant",
      description: "Create legally-compliant care notes and plans with our AI assistant that helps draft comprehensive documentation through voice-to-text transcription.",
      icon: <Bot className="h-10 w-10 text-purple-600" />,
      image: "/placeholder.svg"
    },
    {
      title: "Client Management",
      description: "Organize and track all your remote clients in one intuitive interface with our AI-powered smart matching system.",
      icon: <Users className="h-10 w-10 text-purple-600" />,
      image: "/placeholder.svg"
    },
    {
      title: "Intelligent Scheduling",
      description: "Manage your calendar with intelligent scheduling tools that optimize your time and reduce no-shows.",
      icon: <Calendar className="h-10 w-10 text-purple-600" />,
      image: "/placeholder.svg"
    },
    {
      title: "HD Video Consultations",
      description: "Conduct secure, HIPAA-compliant video consultations with your clients. Record sessions (with permission) for later review.",
      icon: <Video className="h-10 w-10 text-purple-600" />,
      image: "/placeholder.svg"
    },
    {
      title: "Secure Messaging",
      description: "Communicate with clients and their approved family members through our encrypted messaging system with read receipts and priority flags.",
      icon: <MessageSquare className="h-10 w-10 text-purple-600" />,
      image: "/placeholder.svg"
    },
    {
      title: "Integrated Billing",
      description: "Generate invoices, track payments, and automate reporting for your practice with our intuitive financial tools.",
      icon: <CreditCard className="h-10 w-10 text-purple-600" />,
      image: "/placeholder.svg"
    },
    {
      title: "Analytics Dashboard",
      description: "Gain insights into your practice with comprehensive analytics on client engagement, clinical outcomes, and business performance.",
      icon: <LineChart className="h-10 w-10 text-purple-600" />,
      image: "/placeholder.svg"
    },
    {
      title: "Mobile App Access",
      description: "Access all features on the go with our dedicated mobile app for managing your remote nursing practice from anywhere.",
      icon: <Smartphone className="h-10 w-10 text-purple-600" />,
      image: "/placeholder.svg"
    },
    {
      title: "Compliance & Security",
      description: "Rest easy knowing your practice meets all regulatory requirements with our built-in compliance features and enterprise-grade security.",
      icon: <Shield className="h-10 w-10 text-purple-600" />,
      image: "/placeholder.svg"
    }
  ];

  const connectionProcess = [
    {
      title: "Profile Setup",
      description: "Create a detailed profile including verified credentials, areas of expertise, availability, and a short bio or video introduction.",
      icon: <FileText className="h-16 w-16 text-purple-600" />
    },
    {
      title: "Smart Matching",
      description: "Our AI matches you with care seekers based on your expertise, availability, and their specific needs.",
      icon: <CheckCircle className="h-16 w-16 text-purple-600" />
    },
    {
      title: "Free Intro Calls",
      description: "Connect with potential clients through free, 15-minute introductory video calls to discuss needs and assess fit.",
      icon: <Headphones className="h-16 w-16 text-purple-600" />
    },
    {
      title: "Care Seeker Commitment",
      description: "After the call, care seekers confirm their choice via a legally binding agreement, committing to pay for ongoing services.",
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
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6TTI0IDQ4YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiIGZpbGw9InJnYmEoMTAwLDEwMCwxMDAsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
          
          <div className="container mx-auto px-4 relative">
            <Transition animation="fade-up">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                  For Healthcare Professionals
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800">
                  Advanced Tools for Remote Care Providers
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Nurse-Sync empowers professional nurses to deliver remote healthcare and manage their practice efficiently, leveraging cutting-edge technology to enhance their workflow and income potential.
                </p>
              </div>
            </Transition>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <Transition animation="fade-up">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold mb-6">Why Choose Nurse-Sync</h2>
                <p className="text-lg text-gray-600">
                  Designed specifically for nurses, our platform offers AI-powered tools like voice-to-text documentation, intelligent scheduling, and invoicing, alongside a secure, HIPAA-compliant telehealth system for video consultations.
                </p>
              </div>
            </Transition>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
              {features.map((feature, index) => (
                <Transition 
                  key={feature.title} 
                  animation="fade-up" 
                  delay={`delay-${(index % 3) * 100 + 100}` as any}
                >
                  <div className="relative">
                    <div className="absolute -top-6 left-0 bg-purple-100 rounded-2xl p-4">
                      {feature.icon}
                    </div>
                    <div className="pt-12 pl-4">
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </Transition>
              ))}
            </div>
          </div>
        </section>

        {/* Connection Process */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-purple-50 to-gray-50">
          <div className="container mx-auto px-4">
            <Transition animation="fade-up">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold mb-6">How Nurses Connect with Care Seekers</h2>
                <p className="text-lg text-gray-600">
                  Nurse-Sync helps you find and serve care seekers through a structured process that balances passive discovery with active outreach, ensuring you can build your client base effectively.
                </p>
              </div>
            </Transition>
            
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {connectionProcess.map((step, index) => (
                  <Transition 
                    key={step.title} 
                    animation="fade-up" 
                    delay={`delay-${(index % 3) * 100 + 100}` as any}
                  >
                    <Card className="bg-white h-full border-purple-100 hover:shadow-md transition-shadow">
                      <CardHeader className="text-center pb-2">
                        <div className="mx-auto mb-4">
                          {step.icon}
                        </div>
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-center">{step.description}</p>
                      </CardContent>
                    </Card>
                  </Transition>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlight */}
        <section className="py-16 md:py-24 bg-purple-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTAwIDEwMEgwVjBoMTAweiIvPjxwYXRoIGQ9Ik01MC41IDc1LjVjMTQgMCAyNS0xMS4wMSAyNS0yNXMtMTEtMjUtMjUtMjUtMjUgMTEuMDEtMjUgMjUgMTEuMDEgMjUgMjUgMjV6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <Transition animation="slide-in-left">
                  <div>
                    <h2 className="text-2xl md:text-4xl font-bold mb-6">AI Documentation Assistant</h2>
                    <p className="text-lg mb-6 opacity-90">
                      Our AI Documentation Assistant is designed specifically for healthcare providers, helping you create comprehensive, compliant documentation in a fraction of the time.
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mr-2 mt-1">
                          <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                            <FileText size={12} className="text-white" />
                          </div>
                        </div>
                        <span className="opacity-90">Voice-to-text transcription for quick and accurate note taking</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mr-2 mt-1">
                          <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                            <FileText size={12} className="text-white" />
                          </div>
                        </div>
                        <span className="opacity-90">Smart templates for common documentation needs</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mr-2 mt-1">
                          <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                            <FileText size={12} className="text-white" />
                          </div>
                        </div>
                        <span className="opacity-90">Advanced compliance checking to ensure all documentation meets regulatory standards</span>
                      </li>
                    </ul>
                    <Button 
                      variant="secondary"
                      className="bg-white text-purple-700 hover:bg-gray-100"
                      as={Link}
                      to="/nurse/pricing"
                    >
                      View Pricing Plans
                    </Button>
                  </div>
                </Transition>
                
                <Transition animation="slide-in-right">
                  <div className="aspect-video rounded-xl overflow-hidden bg-purple-800 flex items-center justify-center">
                    <Bot size={120} className="text-purple-300" />
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Transition animation="fade-up">
                <h2 className="text-2xl md:text-4xl font-bold mb-6">Ready to transform your remote practice?</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                  Join thousands of healthcare professionals who are delivering exceptional care remotely with Nurse-Sync. Start with our Free Plan and upgrade as your practice grows.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-purple-600 text-white"
                    as={Link}
                    to="/nurse/pricing"
                  >
                    View Pricing Plans
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-purple-200 text-purple-700"
                  >
                    Schedule a Demo
                  </Button>
                </div>
              </Transition>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default NurseFeatures;
