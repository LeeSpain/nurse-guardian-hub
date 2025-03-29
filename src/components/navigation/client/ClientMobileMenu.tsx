
import React from 'react';
import { X, Home, CreditCard, Star, LifeBuoy, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '../../ui-components/Button';
import ClientNavLink from './ClientNavLink';

interface ClientMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClientMobileMenu: React.FC<ClientMobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div className={cn(
      "md:hidden fixed inset-0 z-40 bg-white/98 backdrop-blur-md transition-transform duration-300 ease-apple transform",
      isOpen ? "translate-x-0" : "translate-x-full"
    )}>
      <div className="relative h-full">
        <button
          className="absolute top-6 right-6 p-2 rounded-full bg-client-muted/10 text-client hover:bg-client-muted/20 hover:text-client transition-colors"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        
        <div className="pt-24 pb-6 px-6 space-y-6">
          <div className="rounded-full bg-gradient-to-r from-client-muted/20 to-client-muted/30 text-client px-3 py-1 text-xs font-medium inline-block mb-4 shadow-sm">
            Care Seeker Portal
          </div>
          
          <ClientNavLink to="/client" icon={Home} isMobile onClick={onClose}>Home</ClientNavLink>
          <ClientNavLink to="/client/pricing" icon={CreditCard} isMobile onClick={onClose}>Pricing</ClientNavLink>
          <ClientNavLink to="/client/testimonials" icon={Star} isMobile onClick={onClose}>Testimonials</ClientNavLink>
          <ClientNavLink to="/client/support" icon={LifeBuoy} isMobile onClick={onClose}>Support</ClientNavLink>
          
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
  );
};

export default ClientMobileMenu;
