
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, FileText, Users, Calendar, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui-components/Button';
import { useUser } from '@/contexts/UserContext';

interface ClientMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClientMobileMenu: React.FC<ClientMobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, logout } = useUser();

  return (
    <div className={cn(
      "md:hidden fixed inset-0 z-40 bg-white/98 backdrop-blur-md transition-transform duration-300 ease-apple transform",
      isOpen ? "translate-x-0" : "translate-x-full"
    )}>
      <div className="relative h-full">
        <button
          className="absolute top-6 right-6 p-2 rounded-full bg-teal-50 text-teal-600 hover:bg-teal-100 transition-colors"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        
        <div className="pt-24 pb-6 px-6 space-y-2">
          <div className="rounded-lg bg-teal-50 text-teal-700 px-3 py-1 text-xs font-medium inline-block mb-4">
            Care Seeker Portal
          </div>
          
          <Link
            to="/client/home"
            className="block text-gray-600 hover:text-teal-600 px-3 py-3 text-lg font-medium border-b border-gray-100 flex items-center"
            onClick={onClose}
          >
            <Home size={20} className="mr-2" />
            Home
          </Link>
          
          <Link
            to="/client/features"
            className="block text-gray-600 hover:text-teal-600 px-3 py-3 text-lg font-medium border-b border-gray-100 flex items-center"
            onClick={onClose}
          >
            <FileText size={20} className="mr-2" />
            Features
          </Link>
          
          <Link
            to="/client/testimonials"
            className="block text-gray-600 hover:text-teal-600 px-3 py-3 text-lg font-medium border-b border-gray-100 flex items-center"
            onClick={onClose}
          >
            <Users size={20} className="mr-2" />
            Testimonials
          </Link>
          
          <Link
            to="/client/pricing"
            className="block text-gray-600 hover:text-teal-600 px-3 py-3 text-lg font-medium border-b border-gray-100 flex items-center"
            onClick={onClose}
          >
            <Calendar size={20} className="mr-2" />
            Pricing
          </Link>
          
          {isAuthenticated && (
            <Link
              to="/client/dashboard"
              className="block text-gray-600 hover:text-teal-600 px-3 py-3 text-lg font-medium border-b border-gray-100 flex items-center"
              onClick={onClose}
            >
              <User size={20} className="mr-2" />
              Dashboard
            </Link>
          )}
          
          <div className="pt-6 mt-4">
            {isAuthenticated ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-700">Signed in as <span className="font-medium">{user?.email}</span></p>
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  className="border-teal-200 text-teal-600 hover:bg-teal-50"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                >
                  <LogOut size={18} className="mr-2" />
                  Sign out
                </Button>
              </div>
            ) : (
              <Button
                variant="client"
                size="md"
                fullWidth
                as={Link}
                to="/login"
                onClick={onClose}
              >
                <User size={18} className="mr-2" />
                Sign in
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientMobileMenu;
