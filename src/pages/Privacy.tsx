
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/navigation/Header';
import Footer from '../components/layout/Footer';
import PageHero from '../components/ui-components/PageHero';
import { ArrowLeft } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageHero 
        title="Privacy Policy"
        subtitle="How we protect and use your data at NurseSync"
        badge="Legal"
        badgeColor="default"
      />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
          
          <div className="prose prose-purple max-w-4xl mx-auto">
            <h2>Privacy Policy</h2>
            <p className="lead text-lg text-gray-700">Last updated: April 21, 2025</p>
            
            <h3>1. Introduction</h3>
            <p>
              At NurseSync, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our platform. Please read this 
              privacy policy carefully. If you disagree with the terms of this privacy policy, please do 
              not access the platform.
            </p>
            
            <h3>2. Information We Collect</h3>
            <p>
              <strong>Personal Information:</strong> We may collect personally identifiable information, such as your:
            </p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Professional credentials (for healthcare providers)</li>
              <li>Health information (for care recipients)</li>
            </ul>
            
            <h3>3. How We Use Your Information</h3>
            <p>We may use the information we collect about you for various purposes, including to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Facilitate connections between healthcare providers and care recipients</li>
              <li>Process payments and transactions</li>
              <li>Send administrative information and service updates</li>
              <li>Respond to customer service requests</li>
              <li>Prevent fraudulent transactions and monitor against theft</li>
            </ul>
            
            <h3>4. Data Security</h3>
            <p>
              We implement appropriate security measures to protect your personal information. However, 
              please be aware that no security measures are perfect or impenetrable, and we cannot guarantee 
              the absolute security of your data.
            </p>
            
            <h3>5. HIPAA Compliance</h3>
            <p>
              As a platform facilitating healthcare services, NurseSync is committed to maintaining HIPAA 
              compliance. We have implemented necessary safeguards and policies to protect protected health 
              information (PHI) as required by law.
            </p>
            
            <h3>6. Contact Us</h3>
            <p>
              If you have questions or concerns about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@nursesync.com" className="text-purple-600 hover:text-purple-800">
                privacy@nursesync.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
