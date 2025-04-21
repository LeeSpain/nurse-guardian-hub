
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ClientNavLinkProps {
  to: string;
  icon: LucideIcon;
  children: React.ReactNode;
  isMobile?: boolean;
  onClick?: () => void;
  basePath?: string;
  active?: boolean;
}

const ClientNavLink: React.FC<ClientNavLinkProps> = ({ 
  to, 
  icon: Icon, 
  children, 
  isMobile = false,
  onClick,
  basePath = '/client',
  active
}) => {
  const location = useLocation();
  
  const isActivePath = active !== undefined ? active : (path: string) => {
    if (path === basePath && (location.pathname === basePath || location.pathname === `${basePath}/`)) return true;
    if (path !== basePath && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isActive = typeof isActivePath === 'function' ? isActivePath(to) : isActivePath;

  if (isMobile) {
    return (
      <Link
        to={to}
        className={cn(
          "block text-gray-600 hover:text-client px-3 py-3 text-lg font-medium border-b border-gray-100 flex items-center",
          isActive && "text-client"
        )}
        onClick={onClick}
      >
        <Icon size={20} className="mr-2" />
        {children}
      </Link>
    );
  }

  return (
    <Link 
      to={to}
      className={cn(
        "text-gray-600 hover:text-client px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center group",
        isActive && "text-client font-semibold"
      )}
    >
      <Icon size={18} className="mr-1.5 group-hover:text-client transition-colors" />
      {children}
    </Link>
  );
};

export default ClientNavLink;
