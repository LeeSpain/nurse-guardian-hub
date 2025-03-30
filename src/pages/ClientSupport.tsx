
import React from 'react';
import { MessageSquare, Mail, Phone, FileQuestion, ExternalLink, LifeBuoy, HelpCircle, BookOpen, Link } from 'lucide-react';

const ClientSupport = () => {
  const faqs = [
    {
      question: "How do I connect with a healthcare provider?",
      answer: "After creating your account, you can browse available healthcare providers in your area or with specific specialties. Select a provider and request a connection. Once they accept, you'll be able to schedule appointments and communicate directly."
    },
    {
      question: "Is my health information secure on the platform?",
      answer: "Yes, we take security and privacy very seriously. Our platform is HIPAA-compliant and uses end-to-end encryption for all communications. Your health data is securely stored and only accessible to you and the healthcare providers you explicitly connect with."
    },
    {
      question: "Can family members access my healthcare information?",
      answer: "Yes, but only with your explicit permission. You can add family members as authorized users and specify exactly what information they can access. You maintain control and can revoke access at any time."
    },
    {
      question: "What should I do if I need immediate medical attention?",
      answer: "Our platform is not designed for emergency situations. If you're experiencing a medical emergency, please call emergency services (911 in the US) immediately. For urgent but non-emergency situations, you can use the urgent message feature to alert your healthcare provider."
    },
    {
      question: "How do I schedule a video consultation?",
      answer: "Navigate to your connected provider's profile, click on 'Schedule Appointment', select 'Video Consultation' as the appointment type, and choose from the available time slots. You'll receive a confirmation and reminder with the video link."
    }
  ];

  const resources = [
    {
      title: "Getting Started Guide",
      description: "A comprehensive walkthrough of all platform features",
      icon: BookOpen,
      link: "#"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step visual guides for common tasks",
      icon: ExternalLink,
      link: "#"
    },
    {
      title: "Knowledge Base",
      description: "Detailed articles on features and troubleshooting",
      icon: FileQuestion,
      link: "#"
    },
    {
      title: "Community Forum",
      description: "Connect with other users and share experiences",
      icon: MessageSquare,
      link: "#"
    }
  ];

  return (
    <div className="pt-32 pb-16 bg-gradient-to-br from-white via-client-muted/10 to-white">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-client-muted text-client">
            We're Here to Help
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Support & Resources
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get the help you need to make the most of your healthcare experience on our platform.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-client-muted/20 text-client mb-4">
              <MessageSquare size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Get instant help from our support team during business hours.</p>
            <button className="w-full px-4 py-2 rounded-lg bg-client text-white font-medium hover:bg-client/90 transition-colors">
              Start Chat
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-client-muted/20 text-client mb-4">
              <Mail size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">Send us an email and we'll respond within 24 hours.</p>
            <button className="w-full px-4 py-2 rounded-lg bg-client text-white font-medium hover:bg-client/90 transition-colors">
              Email Us
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-client-muted/20 text-client mb-4">
              <Phone size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
            <p className="text-gray-600 mb-4">Speak directly with our support team for urgent issues.</p>
            <button className="w-full px-4 py-2 rounded-lg bg-client text-white font-medium hover:bg-client/90 transition-colors">
              Call Us
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-client-muted/20 text-client mb-4">
              <HelpCircle size={24} />
            </div>
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold mb-2 flex items-start">
                  <span className="text-client mr-2">Q:</span>
                  {faq.question}
                </h3>
                <p className="text-gray-600 pl-5">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-client-muted/20 text-client mb-4">
              <Link size={24} />
            </div>
            <h2 className="text-3xl font-bold">Helpful Resources</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <a 
                  key={index} 
                  href={resource.link} 
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all hover:border-client-muted group"
                >
                  <IconComponent size={24} className="text-client mb-4" />
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-client transition-colors">{resource.title}</h3>
                  <p className="text-gray-600">{resource.description}</p>
                </a>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-client/90 to-client rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white mb-6">
            <LifeBuoy size={32} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Still Need Help?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Our dedicated support team is always ready to assist you with any questions or concerns about your healthcare journey.
          </p>
          <button className="px-8 py-3 rounded-lg bg-white text-client font-medium hover:bg-white/90 transition-colors shadow-md">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientSupport;
