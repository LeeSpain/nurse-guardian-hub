import React, { lazy, Suspense } from 'react';
import { MessageSquare, Mail, Phone, FileQuestion, ExternalLink, BookOpen } from 'lucide-react';
import PageHero from '../components/ui-components/PageHero';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load components
const FAQSection = lazy(() => import('../components/support/FAQSection'));
const ResourcesSection = lazy(() => import('../components/support/ResourcesSection'));
const ContactCTA = lazy(() => import('../components/support/ContactCTA'));

// Loading fallback
const SectionLoader = () => (
  <div className="w-full py-8">
    <div className="container mx-auto px-4">
      <Skeleton className="h-8 w-1/3 mx-auto mb-6" />
      <div className="grid md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    </div>
  </div>
);

// Create the FAQ and Resources data
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

const ClientSupport = () => {
  return (
    <div>
      <PageHero
        title="Support & Resources"
        subtitle="Get the help you need to make the most of your healthcare experience on our platform."
        badge="We're Here to Help"
        badgeColor="client"
        image="/placeholder.svg"
      >
        <button className="px-8 py-3 rounded-lg bg-client text-white font-medium hover:bg-client/90 transition-colors shadow-md">
          Contact Support
        </button>
      </PageHero>

      <div className="container mx-auto px-4 py-12">
        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
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

        {/* Lazy loaded sections */}
        <Suspense fallback={<SectionLoader />}>
          <FAQSection faqs={faqs} />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ResourcesSection resources={resources} />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ContactCTA />
        </Suspense>
      </div>
    </div>
  );
};

export default ClientSupport;
