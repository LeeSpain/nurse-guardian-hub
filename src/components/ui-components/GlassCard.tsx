
import React, { ReactNode, memo } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'nurse' | 'client';
}

const GlassCard: React.FC<GlassCardProps> = memo(({
  children,
  className,
  hover = false,
  variant = 'default',
}) => {
  const baseClasses = 'rounded-2xl backdrop-blur-sm border shadow-md p-6 transition-all duration-300 will-change-transform bg-card/80 border-border hover:bg-card/90';
  
  const variantClasses = {
    default: '',
    nurse: 'ring-1 ring-nurse/20 hover:ring-nurse/30',
    client: 'ring-1 ring-client/20 hover:ring-client/30',
  };
  
  const hoverClasses = hover 
    ? 'hover:shadow-xl hover:translate-y-[-2px]' 
    : '';
  
  return (
    <div className={cn(baseClasses, variantClasses[variant], hoverClasses, className)}>
      {children}
    </div>
  );
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;
