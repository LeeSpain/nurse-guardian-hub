
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ClientNavLink from './ClientNavLink';
import { Home, FileText, Users, Calendar, User } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const ClientDesktopNav: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useUser();
  
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <ClientNavLink 
        to="/client/home" 
        icon={Home}
        active={location.pathname === '/client/home'}
      >
        Home
      </ClientNavLink>
      
      <ClientNavLink 
        to="/client/features" 
        icon={FileText}
        active={location.pathname === '/client/features'}
      >
        Features
      </ClientNavLink>
      
      <ClientNavLink 
        to="/client/testimonials" 
        icon={Users}
        active={location.pathname === '/client/testimonials'}
      >
        Testimonials
      </ClientNavLink>

      <ClientNavLink 
        to="/client/pricing" 
        icon={Calendar}
        active={location.pathname === '/client/pricing'}
      >
        Pricing
      </ClientNavLink>
      
      {isAuthenticated && (
        <ClientNavLink 
          to="/client/dashboard" 
          icon={User}
          active={location.pathname === '/client/dashboard'}
        >
          Dashboard
        </ClientNavLink>
      )}
    </nav>
  );
};

export default ClientDesktopNav;
