import React from 'react';
import { MapPin, Star, Heart, Calendar, DollarSign } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { NurseProfile } from '@/hooks/useNurseProfiles';
import { useSavedProfessionals } from '@/hooks/useSavedProfessionals';

interface NurseSearchCardProps {
  nurse: NurseProfile;
  onBookAppointment?: (nurseId: string) => void;
  onMessage?: (nurseId: string) => void;
}

const NurseSearchCard: React.FC<NurseSearchCardProps> = ({ 
  nurse, 
  onBookAppointment,
  onMessage 
}) => {
  const { saveProfessional, unsaveProfessional, isNurseSaved } = useSavedProfessionals();
  const isSaved = isNurseSaved(nurse.user_id);

  const handleSaveToggle = () => {
    if (isSaved) {
      unsaveProfessional(nurse.user_id);
    } else {
      saveProfessional(nurse.user_id);
    }
  };

  const formatRate = (rate?: number) => {
    if (!rate) return 'Rate not specified';
    return `$${rate}/hour`;
  };

  const formatLocation = () => {
    if (nurse.city && nurse.state) {
      return `${nurse.city}, ${nurse.state}`;
    }
    return nurse.city || nurse.state || 'Location not specified';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={nurse.profile_image_url || '/api/placeholder/64/64'}
              alt={`${nurse.first_name} ${nurse.last_name}`}
              className="w-16 h-16 rounded-full object-cover"
            />
            {nurse.is_verified && (
              <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                <Star className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {nurse.first_name} {nurse.last_name}
            </h3>
            <div className="flex items-center text-gray-600 text-sm mb-1">
              <MapPin className="w-4 h-4 mr-1" />
              {formatLocation()}
            </div>
            <div className="flex items-center text-teal-600 text-sm font-medium">
              <DollarSign className="w-4 h-4 mr-1" />
              {formatRate(nurse.hourly_rate)}
            </div>
          </div>
        </div>
        
        <button
          onClick={handleSaveToggle}
          className={`p-2 rounded-full transition-colors ${
            isSaved 
              ? 'bg-red-100 text-red-600 hover:bg-red-200' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>
      
      {/* Specialties */}
      {nurse.specialties && nurse.specialties.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {nurse.specialties.slice(0, 3).map((specialty, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full"
              >
                {specialty}
              </span>
            ))}
            {nurse.specialties.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{nurse.specialties.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
      
      {/* Bio */}
      {nurse.bio && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {nurse.bio}
        </p>
      )}
      
      {/* Experience */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <span>Experience: {nurse.years_experience || 0} years</span>
        {nurse.insurance_verified && (
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
            Insurance Verified
          </span>
        )}
      </div>
      
      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="client"
          size="sm"
          className="flex-1"
          icon={<Calendar className="w-4 h-4" />}
          onClick={() => onBookAppointment?.(nurse.user_id)}
        >
          Book
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onMessage?.(nurse.user_id)}
        >
          Message
        </Button>
      </div>
    </div>
  );
};

export default NurseSearchCard;