
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../ui-components/Logo';

const ClientHeaderBranding: React.FC = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex-shrink-0">
        <Logo />
      </Link>
      <div className="ml-3 rounded-full bg-gradient-to-r from-client-muted/20 to-client-muted/30 text-client px-3 py-1 text-xs font-medium shadow-sm">
        Care Seeker Portal
      </div>
    </div>
  );
};

export default ClientHeaderBranding;
