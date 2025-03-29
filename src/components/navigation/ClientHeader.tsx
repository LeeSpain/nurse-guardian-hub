
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import our new components
import ClientHeaderBranding from './client/ClientHeaderBranding';
import ClientDesktopNav from './client/ClientDesktopNav';
import ClientDesktopActions from './client/ClientDesktopActions';
import ClientMobileMenu from './client/ClientMobileMenu';

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
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300",
      scrolled 
        ? "bg-white/95 shadow-md border-client-muted/30" 
        : "bg-white/90 shadow-sm border-client-muted/20"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <ClientHeaderBranding />
          
          {/* Desktop Navigation */}
          <ClientDesktopNav />
          
          {/* Desktop Actions (Search & Login) */}
          <ClientDesktopActions />
          
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
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <ClientMobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default ClientHeader;
