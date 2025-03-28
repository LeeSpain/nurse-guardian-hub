
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'nurse' | 'client';
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hover = false,
  variant = 'default',
}) => {
  const baseClasses = 'rounded-2xl backdrop-blur-sm border shadow-md p-6 transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white/90 border-gray-100',
    nurse: 'bg-white/95 border-nurse/20 nurse-panel',
    client: 'bg-white/95 border-client/20 client-panel',
  };
  
  const hoverClasses = hover 
    ? 'hover:shadow-xl hover:translate-y-[-2px] hover:border-opacity-50 hover:bg-white/100' 
    : '';
  
  return (
    <div className={cn(baseClasses, variantClasses[variant], hoverClasses, className)}>
      {children}
    </div>
  );
};

export default GlassCard;
