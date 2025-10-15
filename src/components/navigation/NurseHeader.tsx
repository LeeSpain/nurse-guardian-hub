
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, CreditCard, Shield, Home, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '../ui-components/Logo';
import Button from '../ui-components/Button';
import { useUser } from '@/contexts/UserContext';

const NurseHeader: React.FC = () => {
  const { user, isAuthenticated, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const isActivePath = (path: string) => {
    if (path === '/nurse' && (location.pathname === '/nurse' || location.pathname === '/nurse/')) return true;
    if (path !== '/nurse' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300",
      scrolled 
        ? "bg-white/95 shadow-md border-purple-200" 
        : "bg-white/90 shadow-sm border-purple-100"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>
            <div className="ml-3 rounded-full bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 px-3 py-1 text-xs font-medium shadow-sm">
              Healthcare Professional
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/nurse"
              className={cn(
                "text-gray-600 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center group",
                isActivePath('/nurse') && !isActivePath('/nurse/pricing') && !isActivePath('/nurse/support') && !isActivePath('/nurse/dashboard') && "text-purple-700 font-semibold"
              )}
            >
              <Home size={18} className="mr-1.5 group-hover:text-purple-600 transition-colors" />
              Home
            </Link>
            <Link 
              to="/nurse/pricing"
              className={cn(
                "text-gray-600 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center group",
                isActivePath('/nurse/pricing') && "text-purple-700 font-semibold"
              )}
            >
              <CreditCard size={18} className="mr-1.5 group-hover:text-purple-600 transition-colors" />
              Pricing
            </Link>
            <Link 
              to="/nurse/support"
              className={cn(
                "text-gray-600 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center group",
                isActivePath('/nurse/support') && "text-purple-700 font-semibold"
              )}
            >
              <Shield size={18} className="mr-1.5 group-hover:text-purple-600 transition-colors" />
              Support
            </Link>
            {isAuthenticated && (
              <Link 
                to="/nurse/dashboard"
                className={cn(
                  "text-gray-600 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center group",
                  isActivePath('/nurse/dashboard') && "text-purple-700 font-semibold"
                )}
              >
                <User size={18} className="mr-1.5 group-hover:text-purple-600 transition-colors" />
                Go to Dashboard
              </Link>
            )}
          </nav>
          
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Hi, {user?.firstName || 'User'}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50"
                  onClick={logout}
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant="primary" 
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                as={Link}
                to="/login?service=nurse"
              >
                <User size={16} className="mr-2" />
                Login / Sign Up
              </Button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-gray-500 hover:text-purple-700 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden fixed inset-0 z-40 bg-white/98 backdrop-blur-md transition-transform duration-300 ease-apple transform",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="relative h-full">
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 hover:text-purple-700 transition-colors"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          
          <div className="pt-24 pb-6 px-6 space-y-6">
            <div className="rounded-full bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 px-3 py-1 text-xs font-medium inline-block mb-4 shadow-sm">
              Healthcare Professional
            </div>
            
            <Link
              to="/nurse"
              className={cn(
                "block text-gray-600 hover:text-purple-700 px-3 py-3 text-lg font-medium border-b border-gray-100 flex items-center",
                isActivePath('/nurse') && !isActivePath('/nurse/pricing') && !isActivePath('/nurse/support') && !isActivePath('/nurse/dashboard') && "text-purple-700"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={20} className="mr-2" />
              Home
            </Link>
            
            <Link
              to="/nurse/pricing"
              className={cn(
                "block text-gray-600 hover:text-purple-700 px-3 py-3 text-lg font-medium border-b border-gray-100 flex items-center",
                isActivePath('/nurse/pricing') && "text-purple-700"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <CreditCard size={20} className="mr-2" />
              Pricing
            </Link>
            
            <Link
              to="/nurse/support"
              className={cn(
                "block text-gray-600 hover:text-purple-700 px-3 py-3 text-lg font-medium border-b border-gray-100 flex items-center",
                isActivePath('/nurse/support') && "text-purple-700"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <Shield size={20} className="mr-2" />
              Support
            </Link>
            
            {isAuthenticated && (
              <Link
                to="/nurse/dashboard"
                className={cn(
                  "block text-gray-600 hover:text-purple-700 px-3 py-3 text-lg font-medium border-b border-gray-100 flex items-center",
                  isActivePath('/nurse/dashboard') && "text-purple-700"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={20} className="mr-2" />
                Go to Dashboard
              </Link>
            )}
            
            <div className="pt-6">
              {isAuthenticated ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-700">Signed in as <span className="font-medium">{user?.email}</span></p>
                  <Button 
                    variant="outline" 
                    size="md"
                    fullWidth
                    className="border-purple-200 text-purple-600 hover:bg-purple-50"
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut size={18} className="mr-2" />
                    Sign out
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="primary" 
                  size="md"
                  fullWidth
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-md"
                  as={Link}
                  to="/login?service=nurse"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} className="mr-2" />
                  Login / Sign Up
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NurseHeader;
