
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Bell, Search, ChevronDown, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '../ui-components/Logo';
import Button from '../ui-components/Button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>
          </div>
          
          {/* Desktop Navigation - No additional links */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <Button 
                variant="primary" 
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                icon={<User size={16} />}
                as={Link}
                to="/nurse"
              >
                For Healthcare Pros
              </Button>
              <Button 
                variant="client" 
                size="sm"
                className="rounded-lg shadow-md hover:shadow-lg transition-all"
                as={Link}
                to="/client/home"
              >
                For Care Seekers
              </Button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-md transition-transform duration-300 ease-apple transform",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="relative h-full">
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 text-gray-400 hover:text-gray-500"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={24} />
          </button>
          
          <div className="pt-24 pb-6 px-6 space-y-6">
            {/* Removed additional links - now only buttons */}
            <div className="pt-6 space-y-4">
              <Button 
                variant="primary" 
                size="md"
                fullWidth
                icon={<User size={18} />}
                className="bg-purple-600 hover:bg-purple-700 text-white shadow-md"
                as={Link}
                to="/nurse"
                onClick={() => setIsMenuOpen(false)}
              >
                For Healthcare Pros
              </Button>
              <Button 
                variant="client" 
                size="md"
                fullWidth
                className="shadow-md"
                as={Link}
                to="/client/home"
                onClick={() => setIsMenuOpen(false)}
              >
                For Care Seekers
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
