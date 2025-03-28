
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClientHeader from '../components/navigation/ClientHeader';
import Footer from '../components/layout/Footer';
import Transition from '../components/ui-components/Transition';
import Button from '../components/ui-components/Button';
import GlassCard from '../components/ui-components/GlassCard';
import { Check, ArrowRight, User, Users, Calendar, MessageSquare, Activity, LifeBuoy, Smartphone, Shield } from 'lucide-react';

const ClientDetailedOverview: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Feature sets for each plan
  const standardPlanFeatures = [
    {
      icon: <User size={20} className="text-client" />,
      title: "Connection Process",
      description: "Smart matching provides a shortlist of 3–5 nurses based on your profile. Book a free, 15-minute intro call with any nurse (once per nurse, separate from call limit). Browse the nurse directory manually if desired. Confirm your nurse with a legally binding agreement to pay for services."
    },
    {
      icon: <Calendar size={20} className="text-client" />,
      title: "4 HD Video Calls/Month",
      description: "Schedule up to 4 calls with your nurse (e.g., weekly check-ins), each HIPAA-compliant with screen sharing (e.g., show symptoms or review documents). Unused calls don't roll over."
    },
    {
      icon: <MessageSquare size={20} className="text-client" />,
      title: "Secure Messaging",
      description: "Unlimited text messaging with your nurse, HIPAA-compliant, for quick questions or updates (e.g., "Is this rash normal?")."
    },
    {
      icon: <User size={20} className="text-client" />,
      title: "Family Dashboard",
      description: "Self-view only—log in to see your appointment schedule, care plan (e.g., medication list), and AI-generated health summaries. No family sharing at this tier."
    },
    {
      icon: <Activity size={20} className="text-client" />,
      title: "Wellness Tracking",
      description: "Log daily health data (e.g., symptoms, mood, vitals) via the platform or mobile app. AI compiles weekly summaries sent to you and your nurse for review."
    },
    {
      icon: <LifeBuoy size={20} className="text-client" />,
      title: "Emergency Support",
      description: "A button in the app/dashboard to flag urgent issues to your nurse (response based on nurse availability)."
    },
    {
      icon: <Smartphone size={20} className="text-client" />,
      title: "Mobile App Access",
      description: "Full functionality—book calls, message, track wellness, and view your dashboard on the go."
    }
  ];

  const familyPlanFeatures = [
    {
      icon: <Users size={20} className="text-client" />,
      title: "Connection Process",
      description: "Smart matching for up to 4 care seekers, with a shortlist of 3–5 nurses per person. Book a free intro call for each care seeker with any nurse (once per nurse per care seeker). Browse the nurse directory manually. Confirm nurses with a legally binding agreement per care seeker (up to 4 nurses if each chooses differently)."
    },
    {
      icon: <Users size={20} className="text-client" />,
      title: "Up to 4 Care Seekers",
      description: "Add 4 individuals (e.g., self + 3 family members), each with their own profile and nurse access."
    },
    {
      icon: <Calendar size={20} className="text-client" />,
      title: "4 HD Video Calls/Month per Care Seeker",
      description: "16 total calls across the family (e.g., 4 calls for Grandma, 4 for Dad), HIPAA-compliant with screen sharing. Calls are per care seeker, not shared."
    },
    {
      icon: <MessageSquare size={20} className="text-client" />,
      title: "Secure Messaging",
      description: "Unlimited messaging with assigned nurses for all care seekers (e.g., message Grandma's nurse separately from Dad's)."
    },
    {
      icon: <Users size={20} className="text-client" />,
      title: "Enhanced Family Dashboard",
      description: "Centralized interface—log in to view/update schedules, care plans, and health summaries for all 4 care seekers. Approved family members (e.g., a daughter) can access and share updates securely."
    },
    {
      icon: <Activity size={20} className="text-client" />,
      title: "Wellness Tracking",
      description: "Each care seeker logs daily data; AI generates individual weekly summaries and an aggregated family report (e.g., "Family Health Overview") sent to you and nurses."
    },
    {
      icon: <LifeBuoy size={20} className="text-client" />,
      title: "Family-Wide Emergency Alerts",
      description: "Urgent issues flagged by any care seeker trigger notifications to all linked family members and their nurses."
    },
    {
      icon: <Smartphone size={20} className="text-client" />,
      title: "Multi-User Mobile App",
      description: "Separate logins for each care seeker or family member, with full access to their features."
    }
  ];

  // How it works steps
  const connectionSteps = [
    {
      number: "01",
      title: "Profile Setup",
      description: "Complete a profile specifying healthcare needs, preferences, and optional location details. Family Plan users add up to 4 care seeker profiles."
    },
    {
      number: "02",
      title: "Smart Matching System",
      description: "Our AI analyzes your profile and generates a shortlist of 3–5 compatible nurses based on needs, expertise, and availability."
    },
    {
      number: "03",
      title: "Free Introductory Video Call",
      description: "Book a free 15-minute video call with any nurse from your shortlist to discuss needs and determine fit."
    },
    {
      number: "04",
      title: "Care Seeker Commitment",
      description: "Select your preferred nurse and confirm via a "Commit to Nurse" button, establishing a legally binding agreement."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <ClientHeader />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-gray-50 via-client-muted/20 to-gray-50">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6TTI0IDQ4YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiIGZpbGw9InJnYmEoMTAwLDEwMCwxMDAsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
          
          <div className="container mx-auto px-4 relative">
            <Transition animation="fade-up">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted/20 text-client">
                  For Care Seekers & Families
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-client via-client to-client/80">
                  Detailed Overview for Care Seekers
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Nurse-Sync connects you with professional nurses for remote healthcare, offering a convenient alternative to in-person visits.
                </p>
              </div>
            </Transition>
          </div>
        </section>

        {/* Purpose and Value Proposition */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <Transition animation="fade-up">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Purpose and Value Proposition</h2>
                <div className="prose prose-lg max-w-none text-gray-600">
                  <p>
                    Nurse-Sync connects care seekers—individuals or families—with professional nurses for remote healthcare, offering a convenient alternative to in-person visits. Through a secure, HIPAA-compliant platform, care seekers access nurse-led care via video calls, messaging, and AI-powered wellness tracking, with family coordination tools to keep loved ones informed.
                  </p>
                  <p>
                    Priced as a premium service (€50–€100/month), Nurse-Sync reflects the value of nurses' expertise, providing tailored support for ongoing health needs, from chronic condition management to elderly care, with a legally binding commitment process to ensure trust and reliability.
                  </p>
                </div>
              </div>
            </Transition>
          </div>
        </section>

        {/* How Care Seekers Connect with Nurses */}
        <section className="py-16 md:py-24 relative overflow-hidden bg-gray-50">
          <div className="container mx-auto px-4">
            <Transition animation="fade-up">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted/20 text-client">
                  Simple Process
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">How Care Seekers Connect with Nurses</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Find and choose nurses through a clear, structured process that combines AI-driven matching with personal choice, finalized by a formal agreement.
                </p>
              </div>
            </Transition>

            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                {connectionSteps.map((step, index) => (
                  <Transition 
                    key={step.number} 
                    animation="fade-up" 
                    delay={`delay-${(index + 1) * 100}`}
                  >
                    <div className="relative group">
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="relative">
                          <div className="absolute inset-0 bg-client rounded-full blur-md opacity-30 scale-110 group-hover:opacity-60 transition-all duration-300"></div>
                          <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-client to-client/80 rounded-full shadow-xl text-xl font-bold text-white relative">
                            {step.number}
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative mt-8 bg-white rounded-2xl p-6 shadow-xl border border-client-muted/30 group-hover:shadow-2xl group-hover:border-client-muted/50 transition-all duration-300">
                        <h3 className="text-xl font-semibold mb-3 text-gray-800 mt-4">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </Transition>
                ))}
              </div>
              
              <Transition animation="fade-up" delay="delay-500">
                <div className="mt-12 text-center">
                  <p className="text-gray-600 mb-6">
                    Care seekers can also browse a nurse directory (filtered by specialty, language, etc.) to explore beyond the AI-generated shortlist.
                  </p>
                  <Button
                    variant="client"
                    size="lg"
                    as={Link}
                    to="/client/pricing"
                    icon={<ArrowRight size={18} />}
                    iconPosition="right"
                  >
                    View Pricing Plans
                  </Button>
                </div>
              </Transition>
            </div>
          </div>
        </section>

        {/* Pricing Structure */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <Transition animation="fade-up">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted/20 text-client">
                  Pricing & Features
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Pricing Structure and Detailed Features</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Care seekers have two pricing tiers, designed for individual or family use, with premium rates reflecting nurse-led care and advanced features.
                </p>
              </div>
            </Transition>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Standard Plan */}
              <Transition animation="fade-up" delay="delay-100">
                <GlassCard
                  variant="client"
                  hover={true}
                  className="h-full border border-client-muted/30"
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">Standard Plan</h3>
                    <div className="flex items-end mb-4">
                      <span className="text-4xl font-bold">€50</span>
                      <span className="text-gray-500 ml-1">/month</span>
                    </div>
                    <p className="text-gray-600">
                      Target: Individuals needing periodic nurse support (e.g., managing a chronic condition).
                    </p>
                  </div>
                  
                  <div className="space-y-6 mb-8">
                    {standardPlanFeatures.map((feature, index) => (
                      <div key={index} className="flex">
                        <div className="flex-shrink-0 mt-1 mr-3">
                          <div className="h-8 w-8 rounded-lg bg-client-muted/20 flex items-center justify-center">
                            {feature.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium mb-1">{feature.title}</h4>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-auto">
                    <p className="text-gray-700 font-medium mb-4">
                      How It Works: Sign up, set up your profile, get matched, and book intro calls to choose your nurse. After committing, schedule 4 calls/month, message freely, and track your health, with all data securely stored and accessible.
                    </p>
                    <Button
                      variant="client"
                      fullWidth
                      size="lg"
                    >
                      Get Started
                    </Button>
                  </div>
                </GlassCard>
              </Transition>

              {/* Family Plan */}
              <Transition animation="fade-up" delay="delay-200">
                <GlassCard
                  variant="client"
                  hover={true}
                  className="h-full border-2 border-client shadow-lg"
                >
                  <div className="absolute top-0 right-0 translate-x-2 -translate-y-2 bg-client text-white px-3 py-1 text-sm font-medium rounded-full shadow-md">
                    Most Popular
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">Family Plan</h3>
                    <div className="flex items-end mb-4">
                      <span className="text-4xl font-bold">€100</span>
                      <span className="text-gray-500 ml-1">/month</span>
                    </div>
                    <p className="text-gray-600">
                      Target: Families or caregivers managing care for multiple individuals (e.g., elderly parents, children).
                    </p>
                  </div>
                  
                  <div className="space-y-6 mb-8">
                    {familyPlanFeatures.map((feature, index) => (
                      <div key={index} className="flex">
                        <div className="flex-shrink-0 mt-1 mr-3">
                          <div className="h-8 w-8 rounded-lg bg-client-muted/20 flex items-center justify-center">
                            {feature.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium mb-1">{feature.title}</h4>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-auto">
                    <p className="text-gray-700 font-medium mb-4">
                      How It Works: Sign up, add up to 4 profiles, get matched, and book intro calls to choose nurses. After committing, schedule 16 calls/month across the family, message nurses, track wellness individually, and manage everything via the dashboard or app, with family-wide visibility.
                    </p>
                    <Button
                      variant="client"
                      fullWidth
                      size="lg"
                      className="shadow-md"
                    >
                      Get Started
                    </Button>
                  </div>
                </GlassCard>
              </Transition>
            </div>
          </div>
        </section>

        {/* Launch Strategy */}
        <section className="py-16 md:py-24 relative overflow-hidden bg-client text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTAwIDEwMEgwVjBoMTAweiIvPjxwYXRoIGQ9Ik01MC41IDc1LjVjMTQgMCAyNS0xMS4wMSAyNS0yNXMtMTEtMjUtMjUtMjUtMjUgMTEuMDEtMjUgMjUgMTEuMDEgMjUgMjUgMjV6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
          
          <div className="container mx-auto px-4 relative">
            <Transition animation="fade-up">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Launch Promotion</h2>
                <div className="prose prose-lg max-w-none text-white/90">
                  <p>
                    As part of our launch strategy, care seekers get first-month intro calls without impacting limits, plus 20% off paid plans for 3 months.
                  </p>
                  <p>
                    Our premium pricing (€50–€100/month) reflects the value of nurse-specific care, unlimited messaging, and family tools, with intro calls building trust. This exceeds standard telehealth platforms because we provide dedicated nurse expertise and comprehensive family coordination.
                  </p>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white text-client hover:bg-gray-100"
                  >
                    Learn More About Launch Offers
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/20"
                  >
                    Compare to Other Solutions
                  </Button>
                </div>
              </div>
            </Transition>
          </div>
        </section>

        {/* Security & Trust */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <Transition animation="slide-in-left">
                  <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center shadow-xl">
                    <Shield size={120} className="text-client" />
                  </div>
                </Transition>
                
                <Transition animation="slide-in-right">
                  <div>
                    <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted/20 text-client">
                      Security First
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">Trust & Security</h2>
                    <p className="text-lg text-gray-600 mb-6">
                      Our platform is built with HIPAA compliance at its core, ensuring your health data remains private and secure.
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mr-2 mt-1">
                          <Check size={18} className="text-client" />
                        </div>
                        <span className="text-gray-700">End-to-end encrypted video calls and messaging</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mr-2 mt-1">
                          <Check size={18} className="text-client" />
                        </div>
                        <span className="text-gray-700">Legally binding commitment process</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mr-2 mt-1">
                          <Check size={18} className="text-client" />
                        </div>
                        <span className="text-gray-700">Fine-grained privacy controls for family sharing</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mr-2 mt-1">
                          <Check size={18} className="text-client" />
                        </div>
                        <span className="text-gray-700">Your data is never sold or shared without consent</span>
                      </li>
                    </ul>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-gray-50 via-client-muted/10 to-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Transition animation="fade-up">
                <h2 className="text-2xl md:text-4xl font-bold mb-6">Ready to transform how you receive care?</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                  Join Nurse-Sync today and experience healthcare designed around your needs, with dedicated nurse support and family coordination.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <Button
                    variant="client"
                    size="lg"
                    icon={<ArrowRight size={18} />}
                    iconPosition="right"
                  >
                    Sign Up Now
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-client-muted text-client"
                  >
                    Schedule a Demo
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

export default ClientDetailedOverview;
