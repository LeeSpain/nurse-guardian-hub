import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { Heart, Search, Star, MapPin } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { useSavedProfessionals } from '@/hooks/useSavedProfessionals';
import NurseSearchCard from '@/components/dashboard/NurseSearchCard';

const SavedProfessionals: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const { savedProfessionals, loading: savedLoading } = useSavedProfessionals();
  
  if (isLoading || savedLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-teal-500 border-r-transparent border-b-teal-500 border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!isAuthenticated || user?.role !== UserRole.CLIENT) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Saved Professionals</h1>
          <p className="text-teal-600">Your favorite healthcare providers</p>
        </div>
        
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                <input 
                  type="text" 
                  placeholder="Search your saved professionals..." 
                  className="pl-10 w-full py-2 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
            <Button variant="client" size="md">
              Search
            </Button>
          </div>
        </div>
        
        {/* Saved Professionals List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Your Saved Professionals ({savedProfessionals.length})</h3>
          
          <div className="space-y-4">
            {savedProfessionals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedProfessionals.map(saved => (
                  <div key={saved.id} className="relative">
                    <NurseSearchCard
                      nurse={{
                        user_id: saved.nurse_id,
                        ...saved.nurse_profile,
                        id: saved.nurse_id,
                        profile_id: '',
                        license_number: '',
                        license_state: '',
                        license_expiry: '',
                        years_experience: 0,
                        specialties: saved.nurse_profile?.specialties || [],
                        certifications: [],
                        insurance_verified: false,
                        is_background_checked: false,
                        created_at: '',
                        updated_at: ''
                      } as any}
                    />
                    {saved.notes && (
                      <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          <strong>Notes:</strong> {saved.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center p-4 bg-teal-50 rounded-lg">
                <Heart className="text-teal-600 mr-3" size={20} />
                <div className="flex-grow">
                  <p className="font-medium text-gray-800">No saved professionals yet</p>
                  <p className="text-sm text-gray-600">Start exploring and save your favorite healthcare providers</p>
                </div>
                <Button variant="outline" size="sm">
                  Browse Professionals
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6">
          <Button variant="outline" as={Link} to="/client/dashboard">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SavedProfessionals;