
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '../ui-components/Logo';
import Button from '../ui-components/Button';

const NurseHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const isActivePath = (path: string) => {
    if (path === '/nurse' && (location.pathname === '/nurse' || location.pathname === '/nurse/')) return true;
    if (path !== '/nurse' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>
            <div className="ml-3 rounded-full bg-purple-100 text-purple-700 px-3 py-1 text-xs font-medium">
              Healthcare Professional
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/nurse"
              className={cn(
                "text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200",
                isActivePath('/nurse') && "text-purple-700"
              )}
            >
              Home
            </Link>
            <Link 
              to="/nurse/features"
              className={cn(
                "text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200",
                isActivePath('/nurse/features') && "text-purple-700"
              )}
            >
              Features
            </Link>
            <Link 
              to="/nurse/pricing"
              className={cn(
                "text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200",
                isActivePath('/nurse/pricing') && "text-purple-700"
              )}
            >
              Pricing
            </Link>
            <Link 
              to="/nurse/testimonials"
              className={cn(
                "text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200",
                isActivePath('/nurse/testimonials') && "text-purple-700"
              )}
            >
              Testimonials
            </Link>
            <Link 
              to="/nurse/support"
              className={cn(
                "text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200",
                isActivePath('/nurse/support') && "text-purple-700"
              )}
            >
              Support
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <button className="text-gray-500 hover:text-gray-700 transition-colors bg-gray-100 p-2 rounded-full">
                <Search size={18} />
              </button>
            </div>
            
            <div className="flex items-center">
              <Button 
                variant="primary" 
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                icon={<User size={16} />}
              >
                Login / Sign Up
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
            <div className="rounded-full bg-purple-100 text-purple-700 px-3 py-1 text-xs font-medium inline-block mb-4">
              Healthcare Professional
            </div>
            
            <Link
              to="/nurse"
              className={cn(
                "block text-gray-600 hover:text-gray-900 px-3 py-3 text-lg font-medium border-b border-gray-100",
                isActivePath('/nurse') && "text-purple-700"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/nurse/features"
              className={cn(
                "block text-gray-600 hover:text-gray-900 px-3 py-3 text-lg font-medium border-b border-gray-100",
                isActivePath('/nurse/features') && "text-purple-700"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/nurse/pricing"
              className={cn(
                "block text-gray-600 hover:text-gray-900 px-3 py-3 text-lg font-medium border-b border-gray-100",
                isActivePath('/nurse/pricing') && "text-purple-700"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/nurse/testimonials"
              className={cn(
                "block text-gray-600 hover:text-gray-900 px-3 py-3 text-lg font-medium border-b border-gray-100",
                isActivePath('/nurse/testimonials') && "text-purple-700"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              to="/nurse/support"
              className={cn(
                "block text-gray-600 hover:text-gray-900 px-3 py-3 text-lg font-medium border-b border-gray-100",
                isActivePath('/nurse/support') && "text-purple-700"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Support
            </Link>
            
            <div className="pt-6">
              <Button 
                variant="primary" 
                size="md"
                fullWidth
                icon={<User size={18} />}
                className="bg-purple-600 hover:bg-purple-700 text-white shadow-md"
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

export default NurseHeader;
