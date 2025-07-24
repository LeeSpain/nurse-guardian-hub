import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { Search, Filter, MapPin, Star } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { useNurseProfiles } from '@/hooks/useNurseProfiles';
import NurseSearchCard from '@/components/dashboard/NurseSearchCard';

const NurseSearch: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const { nurses, loading, searchNurses } = useNurseProfiles();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-teal-500 border-r-transparent border-b-teal-500 border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== UserRole.CLIENT) {
    return <Navigate to="/login" />;
  }

  const handleSearch = () => {
    searchNurses({
      searchTerm: searchTerm || undefined,
      specialty: selectedSpecialty || undefined,
      location: selectedLocation || undefined,
      maxRate: maxRate ? parseFloat(maxRate) : undefined
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSpecialty('');
    setSelectedLocation('');
    setMaxRate('');
    searchNurses();
  };

  const specialties = [
    'Registered Nurse',
    'Licensed Practical Nurse',
    'Home Health Aide',
    'Certified Nursing Assistant',
    'Pediatric Nurse',
    'Geriatric Care',
    'Mental Health',
    'Physical Therapy',
    'Occupational Therapy',
    'Speech Therapy',
    'Wound Care',
    'IV Therapy'
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Find Healthcare Professionals</h1>
          <p className="text-teal-600">Connect with qualified nurses and healthcare providers</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by name, specialty, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full py-2 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
            <Button
              variant="outline"
              size="md"
              icon={<Filter size={16} />}
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? 'bg-teal-50 border-teal-300' : ''}
            >
              Filters
            </Button>
            <Button variant="client" size="md" onClick={handleSearch}>
              Search
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialty
                  </label>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">All Specialties</option>
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="City or State"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="pl-10 w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Rate ($/hour)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 50"
                    value={maxRate}
                    onChange={(e) => setMaxRate(e.target.value)}
                    className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="client" size="sm" onClick={handleSearch}>
                  Apply Filters
                </Button>
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-800">
              Healthcare Professionals ({nurses.length} found)
            </h3>
            {nurses.length > 0 && (
              <div className="flex items-center text-sm text-gray-600">
                <Star className="w-4 h-4 mr-1 text-yellow-400" />
                Verified professionals available
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-t-teal-500 border-r-transparent border-b-teal-500 border-l-transparent rounded-full animate-spin"></div>
            </div>
          ) : nurses.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {nurses.map(nurse => (
                <NurseSearchCard
                  key={nurse.id}
                  nurse={nurse}
                  onBookAppointment={(nurseId) => {
                    // TODO: Navigate to booking page
                    console.log('Book appointment with:', nurseId);
                  }}
                  onMessage={(nurseId) => {
                    // TODO: Navigate to messages
                    console.log('Message nurse:', nurseId);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No professionals found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or removing some filters.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NurseSearch;