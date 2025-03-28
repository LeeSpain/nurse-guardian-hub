
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
    default: 'bg-gray-50/70 border-gray-100/50 hover:bg-gray-100/50',
    nurse: 'bg-purple-50/70 border-purple-100/50 hover:bg-purple-100/50',
    client: 'bg-teal-50/70 border-teal-100/50 hover:bg-teal-100/50',
  };
  
  const hoverClasses = hover 
    ? 'hover:shadow-xl hover:translate-y-[-2px] hover:border-opacity-50' 
    : '';
  
  return (
    <div className={cn(baseClasses, variantClasses[variant], hoverClasses, className)}>
      {children}
    </div>
  );
};

export default GlassCard;
