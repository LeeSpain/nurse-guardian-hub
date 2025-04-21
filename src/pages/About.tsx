
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/navigation/Header';
import Footer from '../components/layout/Footer';
import PageHero from '../components/ui-components/PageHero';
import Transition from '../components/ui-components/Transition';
import { Briefcase, Award, Users, Heart } from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      bio: "Former ICU nurse with 15+ years experience who saw the need for better remote care solutions."
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      bio: "AI expert with background in healthcare technology and remote monitoring systems."
    },
    {
      name: "Priya Patel",
      role: "Director of Nursing Operations",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "Certified nursing administrator with expertise in telehealth and care coordination."
    },
    {
      name: "James Wilson",
      role: "Head of Client Services",
      image: "https://randomuser.me/api/portraits/men/29.jpg",
      bio: "Healthcare advocate with experience in patient support and family care coordination."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageHero 
        title="About NurseSync"
        subtitle="Our mission, vision, and the team behind the technology"
        badge="Our Story"
        badgeColor="purple"
      />
      
      <main className="flex-grow">
        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Transition animation="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Our Mission</h2>
                <p className="text-xl text-gray-700 leading-relaxed">
                  NurseSync aims to transform remote healthcare by connecting professional care providers 
                  with those who need them through intelligent technology, making quality care accessible 
                  to everyone regardless of location.
                </p>
              </Transition>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Transition animation="fade-up" delay="delay-100">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Compassionate Care</h3>
                  <p className="text-gray-600">
                    We believe that everyone deserves access to compassionate, personalized healthcare, regardless of their location.
                  </p>
                </div>
              </Transition>
              
              <Transition animation="fade-up" delay="delay-200">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <div className="h-12 w-12 rounded-full bg-client-muted flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-client" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Professional Excellence</h3>
                  <p className="text-gray-600">
                    We uphold the highest standards of professional practice and empower healthcare providers to deliver exceptional care.
                  </p>
                </div>
              </Transition>
              
              <Transition animation="fade-up" delay="delay-300">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Briefcase className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Technological Innovation</h3>
                  <p className="text-gray-600">
                    We leverage AI and cutting-edge technology to create tools that enhance, rather than replace, the human element of care.
                  </p>
                </div>
              </Transition>
              
              <Transition animation="fade-up" delay="delay-400">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <div className="h-12 w-12 rounded-full bg-client-muted flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-client" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Inclusive Community</h3>
                  <p className="text-gray-600">
                    We're building a supportive community where care providers and recipients can connect and thrive together.
                  </p>
                </div>
              </Transition>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Transition animation="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Meet Our Team</h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                  The passionate professionals behind NurseSync, bringing together expertise in healthcare, technology, and service.
                </p>
              </Transition>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Transition key={member.name} animation="fade-up" delay={`delay-${(index + 1) * 100}` as any}>
                  <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                    <div className="h-60 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                      <p className="text-purple-600 font-medium text-sm mb-3">{member.role}</p>
                      <p className="text-gray-600">{member.bio}</p>
                    </div>
                  </div>
                </Transition>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
