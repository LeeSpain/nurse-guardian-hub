
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/navigation/Header';
import Footer from '../components/layout/Footer';
import PageHero from '../components/ui-components/PageHero';
import { ArrowLeft } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageHero 
        title="Terms of Service"
        subtitle="Guidelines for using the NurseSync platform"
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
            <h2>Terms of Service</h2>
            <p className="lead text-lg text-gray-700">Last updated: April 21, 2025</p>
            
            <h3>1. Agreement to Terms</h3>
            <p>
              By accessing and using the NurseSync platform, you agree to be bound by these Terms of Service.
              If you do not agree to these terms, you must not access or use our services.
            </p>
            
            <h3>2. Description of Service</h3>
            <p>
              NurseSync provides a platform connecting healthcare professionals with individuals seeking remote
              healthcare services. Our AI-assisted tools help facilitate documentation, communication, and care coordination.
            </p>
            
            <h3>3. User Accounts</h3>
            <p>
              Users must register for an account to access most features of NurseSync. You are responsible for
              maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
            
            <h3>4. Healthcare Provider Responsibilities</h3>
            <p>
              Healthcare providers using NurseSync must:
            </p>
            <ul>
              <li>Maintain current professional credentials and licensure</li>
              <li>Adhere to all applicable laws and regulations regarding telehealth</li>
              <li>Maintain professional standards of care</li>
              <li>Not use the platform in any way that could compromise patient safety</li>
            </ul>
            
            <h3>5. Care Recipient Responsibilities</h3>
            <p>
              Care recipients using NurseSync must:
            </p>
            <ul>
              <li>Provide accurate information about their health and condition</li>
              <li>Understand that NurseSync is not a substitute for emergency medical services</li>
              <li>Follow through with recommendations for in-person care when advised</li>
            </ul>
            
            <h3>6. Limitation of Liability</h3>
            <p>
              NurseSync is a platform provider and is not responsible for the professional advice, treatment decisions,
              or healthcare services provided by healthcare professionals using our platform.
            </p>
            
            <h3>7. Termination</h3>
            <p>
              We reserve the right to suspend or terminate your access to NurseSync for violations of these terms or
              for any other reason at our discretion.
            </p>
            
            <h3>8. Contact Us</h3>
            <p>
              If you have questions about these Terms of Service, please contact us at:
              <br />
              <a href="mailto:legal@nursesync.com" className="text-purple-600 hover:text-purple-800">
                legal@nursesync.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
