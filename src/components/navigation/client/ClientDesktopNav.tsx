
import React from 'react';
import { Home, CreditCard, Star, LifeBuoy } from 'lucide-react';
import ClientNavLink from './ClientNavLink';

const ClientDesktopNav: React.FC = () => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <ClientNavLink to="/client" icon={Home}>Home</ClientNavLink>
      <ClientNavLink to="/client/pricing" icon={CreditCard}>Pricing</ClientNavLink>
      <ClientNavLink to="/client/testimonials" icon={Star}>Testimonials</ClientNavLink>
      <ClientNavLink to="/client/support" icon={LifeBuoy}>Support</ClientNavLink>
    </nav>
  );
};

export default ClientDesktopNav;
