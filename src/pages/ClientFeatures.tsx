
import React, { useEffect } from 'react';
import Header from '../components/navigation/Header';
import Footer from '../components/layout/Footer';
import Transition from '../components/ui-components/Transition';
import { 
  Video, 
  Users, 
  Activity, 
  PhoneCall, 
  Calendar, 
  MessageSquare, 
  Bell, 
  Lock, 
  Heart 
} from 'lucide-react';
import Button from '../components/ui-components/Button';

const ClientFeatures: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "Video Consultations",
      description: "Connect with your healthcare providers through secure, high-quality video calls from the comfort of your home.",
      icon: <Video className="h-10 w-10 text-client" />,
      image: "/placeholder.svg"
    },
    {
      title: "Family Dashboard",
      description: "Share updates and information with approved family members, ensuring everyone stays informed about your care.",
      icon: <Users className="h-10 w-10 text-client" />,
      image: "/placeholder.svg"
    },
    {
      title: "Wellness Tracking",
      description: "Monitor your health with daily check-ins and receive AI-powered insights about your progress and well-being.",
      icon: <Activity className="h-10 w-10 text-client" />,
      image: "/placeholder.svg"
    },
    {
      title: "Emergency Support",
      description: "Access immediate assistance when needed most with our emergency response system.",
      icon: <PhoneCall className="h-10 w-10 text-client" />,
      image: "/placeholder.svg"
    },
    {
      title: "Appointment Management",
      description: "Schedule, reschedule, or cancel appointments with ease. Receive reminders to ensure you never miss important care sessions.",
      icon: <Calendar className="h-10 w-10 text-client" />,
      image: "/placeholder.svg"
    },
    {
      title: "Secure Messaging",
      description: "Communicate directly with your care team through our encrypted messaging platform for non-urgent questions and updates.",
      icon: <MessageSquare className="h-10 w-10 text-client" />,
      image: "/placeholder.svg"
    },
    {
      title: "Medication Reminders",
      description: "Set up customizable alerts and never miss a dose with our medication reminder system.",
      icon: <Bell className="h-10 w-10 text-client" />,
      image: "/placeholder.svg"
    },
    {
      title: "Privacy Controls",
      description: "Manage your data with granular privacy settings that give you complete control over who can access your health information.",
      icon: <Lock className="h-10 w-10 text-client" />,
      image: "/placeholder.svg"
    },
    {
      title: "Wellness Resources",
      description: "Access a library of educational materials, wellness tips, and self-care resources tailored to your specific health needs.",
      icon: <Heart className="h-10 w-10 text-client" />,
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-gray-50 via-client-muted/10 to-gray-50">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6TTI0IDQ4YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiIGZpbGw9InJnYmEoMTAwLDEwMCwxMDAsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
          
          <div className="container mx-auto px-4 relative">
            <Transition animation="fade-up">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted/20 text-client">
                  For Care Recipients & Families
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-client via-client to-client/80">
                  Stay Connected to Your Care Team
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  NurseSync provides you with the tools to manage your health and stay connected with your healthcare providers, no matter where you are.
                </p>
              </div>
            </Transition>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
              {features.map((feature, index) => (
                <Transition 
                  key={feature.title} 
                  animation="fade-up" 
                  delay={`delay-${(index % 3) * 100 + 100}` as any}
                >
                  <div className="relative">
                    <div className="absolute -top-6 left-0 bg-client-muted/20 rounded-2xl p-4">
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

        {/* Feature Highlight */}
        <section className="py-16 md:py-24 bg-client text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTAwIDEwMEgwVjBoMTAweiIvPjxwYXRoIGQ9Ik01MC41IDc1LjVjMTQgMCAyNS0xMS4wMSAyNS0yNXMtMTEtMjUtMjUtMjUtMjUgMTEuMDEtMjUgMjUgMTEuMDEgMjUgMjUgMjV6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <Transition animation="slide-in-left">
                  <div className="aspect-video rounded-xl overflow-hidden bg-client-dark flex items-center justify-center">
                    <Users size={120} className="text-client-muted" />
                  </div>
                </Transition>
                
                <Transition animation="slide-in-right">
                  <div>
                    <h2 className="text-2xl md:text-4xl font-bold mb-6">Family Coordination Hub</h2>
                    <p className="text-lg mb-6 opacity-90">
                      Our Family Coordination Hub makes it easy to keep everyone involved in your care on the same page, ensuring consistent support.
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mr-2 mt-1">
                          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                            <Users size={12} className="text-client" />
                          </div>
                        </div>
                        <span className="opacity-90">Share updates with family members or caregivers</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mr-2 mt-1">
                          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                            <Users size={12} className="text-client" />
                          </div>
                        </div>
                        <span className="opacity-90">Customize access levels for different family members</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mr-2 mt-1">
                          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                            <Users size={12} className="text-client" />
                          </div>
                        </div>
                        <span className="opacity-90">Coordinate care tasks among multiple supporters</span>
                      </li>
                    </ul>
                    <Button 
                      variant="secondary"
                      className="bg-white text-client hover:bg-gray-100"
                    >
                      Learn More
                    </Button>
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
                <h2 className="text-2xl md:text-4xl font-bold mb-6">Experience better care management</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                  Join thousands of families who are staying connected to their healthcare providers and managing their care more effectively.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <Button
                    variant="client"
                    size="lg"
                  >
                    Start Your Free Trial
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-client-muted text-client"
                  >
                    View Demo
                  </Button>
                </div>
              </Transition>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ClientFeatures;
