
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SimpleAnimationProps {
  children: ReactNode;
  className?: string;
  type?: 'fade-up' | 'fade-in' | 'slide-in';
}

const SimpleAnimation: React.FC<SimpleAnimationProps> = ({
  children,
  className = "",
  type = 'fade-in'
}) => {
  const animationClass = 
    type === 'fade-up' ? 'animate-fade-in translate-y-0' :
    type === 'slide-in' ? 'animate-slide-in-left' : 
    'animate-fade-in';
  
  return (
    <div className={cn("transition-all duration-500", animationClass, className)}>
      {children}
    </div>
  );
};

export default SimpleAnimation;
