
import React from 'react';
import { Search, User } from 'lucide-react';
import Button from '../../ui-components/Button';

const ClientDesktopActions: React.FC = () => {
  return (
    <div className="hidden md:flex items-center space-x-6">
      <div className="relative">
        <button className="text-gray-500 hover:text-client transition-colors bg-gray-100 p-2 rounded-full">
          <Search size={18} />
        </button>
      </div>
      
      <Button 
        variant="client" 
        size="sm"
        className="rounded-lg shadow-md hover:shadow-lg transition-all"
        to="/login"
      >
        <User size={16} className="mr-2" />
        Login / Sign Up
      </Button>
    </div>
  );
};

export default ClientDesktopActions;
