
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, CreditCard, Shield, Home, Search, Star, LifeBuoy, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '../ui-components/Logo';
import Button from '../ui-components/Button';

const ClientHeader: React.FC = () => {
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
    if (path === '/client' && (location.pathname === '/client' || location.pathname === '/client/')) return true;
    if (path !== '/client' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300",
      scrolled 
        ? "bg-white/95 shadow-md border-client-muted/30" 
        : "bg-white/90 shadow-sm border-client-muted/20"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>
            <div className="ml-3 rounded-full bg-gradient-to-r from-client-muted/20 to-client-muted/30 text-client px-3 py-1 text-xs font-medium shadow-sm">
              Care Seeker Portal
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/client"
              className={cn(
                "text-gray-600 hover:text-client px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center group",
                isActivePath('/client') && !isActivePath('/client/features') && !isActivePath('/client/pricing') && !isActivePath('/client/testimonials') && !isActivePath('/client/support') && !isActivePath('/client/detailed-overview') && "text-client font-semibold"
              )}
            >
              <Home size={18} className="mr-1.5 group-hover:text-client transition-colors" />
              Home
            </Link>
            <Link 
              to="/client/detailed-overview"
              className={cn(
                "text-gray-600 hover:text-client px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center group",
                isActivePath('/client/detailed-overview') && "text-client font-semibold"
              )}
            >
              <Info size={18} className="mr-1.5 group-hover:text-client transition-colors" />
              Detailed Overview
            </Link>
            <Link 
              to="/client/features"
              className={cn(
                "text-gray-600 hover:text-client px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center group",
                isActivePath('/client/features') && "text-client font-semibold"
              )}
            >
              <Shield size={18} className="mr-1.5 group-hover:text-client transition-colors" />
              Features
            </Link>
            <Link 
              to="/client/pricing"
              className={cn(
                "text-gray-600 hover:text-client px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center group",
                isActivePath('/client/pricing') && "text-client font-semibold"
              )}
            >
              <CreditCard size={18} className="mr-1.5 group-hover:text-client transition-colors" />
              Pricing
            </Link>
            <Link 
              to="/client/testimonials"
              className={cn(
                "text-gray-600 hover:text-client px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center group",
                isActivePath('/client/testimonials') && "text-client font-semibold"
              )}
            >
              <Star size={18} className="mr-1.5 group-hover:text-client transition-colors" />
              Testimonials
            </Link>
            <Link 
              to="/client/support"
              className={cn(
                "text-gray-600 hover:text-client px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center group",
                isActivePath('/client/support') && "text-client font-semibold"
              )}
            >
              <LifeBuoy size={18} className="mr-1.5 group-hover:text-client transition-colors" />
              Support
            </Link>
          </nav>
          
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
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-gray-500 hover:text-client hover:bg-client-muted/10 focus:outline-none focus:ring-2 focus:ring-client focus:ring-offset-2 transition-colors"
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
            className="absolute top-6 right-6 p-2 rounded-full bg-client-muted/10 text-client hover:bg-client-muted/20 hover:text-client transition-colors"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          
          <div className="pt-24 pb-6 px-6 space-y-6">
            <div className="rounded-full bg-gradient-to-r from-client-muted/20 to-client-muted/30 text-client px-3 py-1 text-xs font-medium inline-block mb-4 shadow-sm">
              Care Seeker Portal
            </div>
            
            <Link
              to="/client"
              className={cn(
                "block text-gray-600 hover:text-client px-3 py-3 text-lg font-medium border-b border-gray-100 flex items-center",
                isActivePath('/client') && !isActivePath('/client/features') && !isActivePath('/client/pricing') && !isActivePath('/client/testimonials') && !isActivePath('/client/support') && !isActivePath('/client/detailed-overview') && "text-client"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={20} className="mr-2" />
              Home
            </Link>
            
            <Link
              to="/client/detailed-overview"
              className={cn(
                "block text-gray-600 hover:text-client px-3 py-3 text-lg font-medium border-b border-gray-100 flex items-center",
                isActivePath('/client/detailed-overview') && "text-client"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <Info size={20} className="mr-2" />
              Detailed Overview
            </Link>
            
            <Link
              to="/client/features"
              className={cn(
                "block text-gray-600 hover:text-client px-3 py-3 text-lg font-medium border-b border-gray-100 flex items-center",
                isActivePath('/client/features') && "text-client"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <Shield size={20} className="mr-2" />
              Features
            </Link>
            <Link
              to="/client/pricing"
              className={cn(
                "block text-gray-600 hover:text-client px-3 py-3 text-lg font-medium border-b border-gray-100 flex items-center",
                isActivePath('/client/pricing') && "text-client"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <CreditCard size={20} className="mr-2" />
              Pricing
            </Link>
            <Link
              to="/client/testimonials"
              className={cn(
                "block text-gray-600 hover:text-client px-3 py-3 text-lg font-medium border-b border-gray-100 flex items-center",
                isActivePath('/client/testimonials') && "text-client"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <Star size={20} className="mr-2" />
              Testimonials
            </Link>
            <Link
              to="/client/support"
              className={cn(
                "block text-gray-600 hover:text-client px-3 py-3 text-lg font-medium border-b border-gray-100 flex items-center",
                isActivePath('/client/support') && "text-client"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <LifeBuoy size={20} className="mr-2" />
              Support
            </Link>
            
            <div className="pt-6">
              <Button 
                variant="client" 
                size="md"
                fullWidth
                className="shadow-md"
                to="/login"
              >
                <User size={18} className="mr-2" />
                Login / Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;
