
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
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">About</Link>
            <Link to="/features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</Link>
            <Link to="/pricing" className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</Link>
            
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
              <Button
                variant="outline"
                size="sm"
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
                as={Link}
                to="/login"
              >
                Login
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
            <div className="space-y-1">
              <Link 
                to="/about" 
                className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/features" 
                className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/pricing" 
                className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
            </div>
            
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
              <Button 
                variant="outline" 
                size="md"
                fullWidth
                className="border-gray-200"
                as={Link}
                to="/login"
                onClick={() => setIsMenuOpen(false)}
              >
                Login / Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
