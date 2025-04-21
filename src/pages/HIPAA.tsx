
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/navigation/Header';
import Footer from '../components/layout/Footer';
import PageHero from '../components/ui-components/PageHero';
import { ArrowLeft } from 'lucide-react';

const HIPAA: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageHero 
        title="HIPAA Compliance"
        subtitle="How NurseSync ensures healthcare data security and privacy"
        badge="Legal"
        badgeColor="purple"
      />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
          
          <div className="prose prose-purple max-w-4xl mx-auto">
            <h2>HIPAA Compliance Policy</h2>
            <p className="lead text-lg text-gray-700">Last updated: April 21, 2025</p>
            
            <h3>1. Our Commitment to HIPAA Compliance</h3>
            <p>
              NurseSync is committed to ensuring the security and privacy of protected health information (PHI) 
              in accordance with the Health Insurance Portability and Accountability Act (HIPAA). We adhere to 
              all requirements of the HIPAA Privacy Rule, Security Rule, and Breach Notification Rule.
            </p>
            
            <h3>2. Protected Health Information (PHI)</h3>
            <p>
              We understand the sensitive nature of healthcare data. NurseSync implements strict protocols for 
              handling Protected Health Information, which includes:
            </p>
            <ul>
              <li>Medical records and health conditions</li>
              <li>Treatment information</li>
              <li>Healthcare payment information</li>
              <li>Personally identifiable information when used in context of health services</li>
            </ul>
            
            <h3>3. Security Measures</h3>
            <p>
              NurseSync employs the following measures to protect PHI:
            </p>
            <ul>
              <li>End-to-end encryption for all data transmission</li>
              <li>Role-based access control limiting PHI access to authorized personnel only</li>
              <li>Secure, compliant cloud infrastructure with regular security audits</li>
              <li>Automatic logging of all PHI access attempts</li>
              <li>Regular security training for all staff members</li>
            </ul>
            
            <h3>4. Business Associate Agreements</h3>
            <p>
              As a service provider that handles PHI on behalf of healthcare providers, NurseSync enters into 
              Business Associate Agreements (BAAs) with covered entities as required by HIPAA. These agreements 
              outline our obligations to maintain the privacy and security of PHI.
            </p>
            
            <h3>5. Data Breach Procedures</h3>
            <p>
              In the unlikely event of a data breach involving PHI, NurseSync will:
            </p>
            <ul>
              <li>Promptly identify and investigate the breach</li>
              <li>Mitigate any potential harm from the breach</li>
              <li>Notify affected individuals, covered entities, and when required, the Department of Health and Human Services</li>
              <li>Implement corrective measures to prevent future breaches</li>
            </ul>
            
            <h3>6. Patient Rights</h3>
            <p>
              NurseSync respects all patient rights established under HIPAA, including:
            </p>
            <ul>
              <li>The right to access their health information</li>
              <li>The right to request corrections to their health information</li>
              <li>The right to know how their information is shared</li>
              <li>The right to request limits on sharing of their information</li>
            </ul>
            
            <h3>7. Contact For HIPAA Matters</h3>
            <p>
              For questions or concerns regarding our HIPAA compliance or to report a potential violation:
              <br />
              <a href="mailto:hipaa@nursesync.com" className="text-purple-600 hover:text-purple-800">
                hipaa@nursesync.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HIPAA;
