import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { CheckCircle, Star, CreditCard, Calendar, Users } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { toast } from 'sonner';

const NurseSubscription: React.FC = () => {
  const { subscription, checkSubscription, manageSubscription, user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check subscription status on page load
    checkSubscription();
  }, [checkSubscription]);

  const handleManageSubscription = async () => {
    setIsLoading(true);
    const result = await manageSubscription();
    
    if (result.error) {
      toast.error(result.error);
    } else if (result.url) {
      // Open Stripe customer portal in a new tab
      window.open(result.url, '_blank');
    }
    setIsLoading(false);
  };

  const handleRefreshSubscription = async () => {
    setIsLoading(true);
    await checkSubscription();
    setIsLoading(false);
    toast.success('Subscription status refreshed');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Subscription Management</h1>
          <p className="text-purple-600">Manage your healthcare professional subscription</p>
        </div>

        {/* Current Subscription Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Current Subscription</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshSubscription}
              disabled={isLoading}
            >
              {isLoading ? 'Refreshing...' : 'Refresh Status'}
            </Button>
          </div>

          {subscription?.subscribed ? (
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center">
                <CheckCircle className="text-green-600 mr-3" size={24} />
                <div>
                  <p className="font-medium text-green-800">
                    {subscription.subscription_tier} Plan Active
                  </p>
                  <p className="text-sm text-green-600">
                    {subscription.subscription_end 
                      ? `Renews on ${new Date(subscription.subscription_end).toLocaleDateString()}`
                      : 'Active subscription'
                    }
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleManageSubscription}
                disabled={isLoading}
              >
                Manage Subscription
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center">
                <CreditCard className="text-amber-600 mr-3" size={24} />
                <div>
                  <p className="font-medium text-amber-800">No Active Subscription</p>
                  <p className="text-sm text-amber-600">
                    Subscribe to access premium healthcare professional features
                  </p>
                </div>
              </div>
              <Button
                variant="nurse"
                size="sm"
                as={Link}
                to="/nurse/pricing"
              >
                View Plans
              </Button>
            </div>
          )}
        </div>

        {/* Subscription Benefits */}
        {subscription?.subscribed && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <h3 className="font-semibold text-gray-800 mb-4">Your Plan Benefits</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                <Users className="text-purple-600 mr-3" size={20} />
                <div>
                  <p className="font-medium text-gray-800">Unlimited Clients</p>
                  <p className="text-xs text-gray-600">Connect with unlimited care seekers</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                <Calendar className="text-purple-600 mr-3" size={20} />
                <div>
                  <p className="font-medium text-gray-800">Advanced Scheduling</p>
                  <p className="text-xs text-gray-600">Smart calendar management</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                <Star className="text-purple-600 mr-3" size={20} />
                <div>
                  <p className="font-medium text-gray-800">Premium Support</p>
                  <p className="text-xs text-gray-600">Priority customer assistance</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Available Plans */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Available Plans</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Basic</h4>
              <p className="text-2xl font-bold text-purple-600 mb-2">$9.99<span className="text-sm text-gray-500">/mo</span></p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Up to 5 clients</li>
                <li>• Basic scheduling</li>
                <li>• Email support</li>
              </ul>
            </div>
            
            <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
              <h4 className="font-medium text-gray-800 mb-2">Growth</h4>
              <p className="text-2xl font-bold text-purple-600 mb-2">$19.99<span className="text-sm text-gray-500">/mo</span></p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Up to 20 clients</li>
                <li>• Advanced scheduling</li>
                <li>• Priority support</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Professional</h4>
              <p className="text-2xl font-bold text-purple-600 mb-2">$49.99<span className="text-sm text-gray-500">/mo</span></p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Unlimited clients</li>
                <li>• All features</li>
                <li>• Premium support</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Team</h4>
              <p className="text-2xl font-bold text-purple-600 mb-2">$99.99<span className="text-sm text-gray-500">/mo</span></p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Team management</li>
                <li>• Analytics dashboard</li>
                <li>• White-label options</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button
              variant="nurse"
              size="md"
              as={Link}
              to="/nurse/pricing"
            >
              {subscription?.subscribed ? 'Change Plan' : 'Choose a Plan'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NurseSubscription;