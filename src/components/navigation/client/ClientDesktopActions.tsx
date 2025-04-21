
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, LogOut } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { useUser } from '@/contexts/UserContext';

const ClientDesktopActions: React.FC = () => {
  const { user, isAuthenticated, logout } = useUser();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <button
        type="button"
        className="p-2 rounded-md text-gray-500 hover:text-client hover:bg-client-muted/10 transition-colors"
        aria-label="Search"
      >
        <Search size={20} />
      </button>
      
      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Hi, {user?.firstName || 'User'}</span>
          <Button 
            variant="outline" 
            size="sm"
            className="border-teal-200 text-teal-600 hover:bg-teal-50"
            onClick={logout}
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      ) : (
        <Button
          variant="client"
          size="sm"
          className="font-medium"
          as={Link}
          to="/login"
        >
          <User size={16} className="mr-2" />
          Sign in
        </Button>
      )}
    </div>
  );
};

export default ClientDesktopActions;
