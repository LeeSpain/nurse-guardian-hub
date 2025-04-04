import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageSquare, FileQuestion, ExternalLink, Clock } from 'lucide-react';
import PageHero from '../components/ui-components/PageHero';

const NurseSupport = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <PageHero
          title="Healthcare Professional Support"
          subtitle="We're here to help you succeed in your healthcare career journey. Find the assistance you need."
          badge="We're Here to Help"
          badgeColor="purple"
          image="/placeholder.svg"
        >
          <Button className="bg-purple-600 hover:bg-purple-700">
            Contact Support
          </Button>
        </PageHero>

        {/* Contact Options Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white/80 backdrop-blur-sm border border-purple-100 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-700">
                    <Phone className="mr-2 h-5 w-5" />
                    Phone Support
                  </CardTitle>
                  <CardDescription>Talk to our support team directly</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Our dedicated support team is available Monday through Friday, 8am to 8pm EST.</p>
                  <p className="font-semibold text-lg text-purple-700 mb-4">1-800-NURSE-HELP</p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Phone className="mr-2 h-4 w-4" /> Call Now
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm border border-purple-100 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-700">
                    <Mail className="mr-2 h-5 w-5" />
                    Email Support
                  </CardTitle>
                  <CardDescription>Get help via email</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Send us an email with your questions or concerns and we'll respond within 24 hours.</p>
                  <p className="font-semibold text-lg text-purple-700 mb-4">support@healthcare.com</p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Mail className="mr-2 h-4 w-4" /> Email Us
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm border border-purple-100 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-700">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Live Chat
                  </CardTitle>
                  <CardDescription>Chat with our support team</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Get immediate assistance with our live chat support available 24/7.</p>
                  <p className="font-semibold text-lg text-purple-700 mb-4">Average response time: 2 minutes</p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <MessageSquare className="mr-2 h-4 w-4" /> Start Chat
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <Card className="bg-white border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-800 text-lg">
                      <FileQuestion className="mr-2 h-5 w-5 text-purple-600" />
                      How do I update my professional profile?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      You can update your professional profile by logging into your account, navigating to "My Profile" in the dashboard, and clicking the "Edit" button. From there, you can update your credentials, experience, certifications, and availability.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-800 text-lg">
                      <FileQuestion className="mr-2 h-5 w-5 text-purple-600" />
                      How do I set my availability for assignments?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Setting your availability is easy. From your dashboard, go to "Availability" and you can set your preferred working hours, days, and locations. This helps us match you with opportunities that fit your schedule.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-800 text-lg">
                      <FileQuestion className="mr-2 h-5 w-5 text-purple-600" />
                      How does the payment process work?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Payments are processed biweekly for all completed assignments. You can track your earnings in the "Payments" section of your dashboard. Direct deposit is our standard payment method, but you can update your preferences in account settings.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-800 text-lg">
                      <FileQuestion className="mr-2 h-5 w-5 text-purple-600" />
                      What credentials do I need to upload?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Required credentials include your nursing license, certifications, immunization records, BLS/ACLS certification, and identification documents. You can upload these in the "Documents" section of your profile.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-12 text-center">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <ExternalLink className="mr-2 h-4 w-4" /> View All FAQs
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Support Resources Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Additional Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-white border border-purple-100 shadow-md">
                <CardHeader>
                  <CardTitle className="text-purple-700">Resource Center</CardTitle>
                  <CardDescription>Access guides, tutorials and documentation</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Browse our comprehensive knowledge base for answers to common questions and detailed guides on using our platform.</p>
                  <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
                    Visit Resource Center
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-purple-100 shadow-md">
                <CardHeader>
                  <CardTitle className="text-purple-700">Training Webinars</CardTitle>
                  <CardDescription>Join live or watch recorded sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Our expert team hosts regular webinars to help you maximize your experience and success on our platform.</p>
                  <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
                    View Upcoming Webinars
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-purple-100 shadow-md">
                <CardHeader>
                  <CardTitle className="text-purple-700">Community Forum</CardTitle>
                  <CardDescription>Connect with other healthcare professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Join discussions, share experiences, and learn from other healthcare professionals in our community forum.</p>
                  <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
                    Join Community
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-purple-100 shadow-md">
                <CardHeader>
                  <CardTitle className="text-purple-700">Support Hours</CardTitle>
                  <CardDescription>When we're available to help</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-purple-600" /> Phone Support
                    </span>
                    <span>Mon-Fri, 8am-8pm EST</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-purple-600" /> Email Support
                    </span>
                    <span>24/7 (24hr response)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-purple-600" /> Live Chat
                    </span>
                    <span>24/7</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NurseSupport;
