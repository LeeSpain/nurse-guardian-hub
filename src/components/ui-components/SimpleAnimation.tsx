
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SimpleAnimationProps {
  children: ReactNode;
  className?: string;
  type?: 'fade-up' | 'fade-in' | 'slide-in-left' | 'slide-in-right';
  delay?: string;
}

const SimpleAnimation: React.FC<SimpleAnimationProps> = ({
  children,
  className = "",
  type = 'fade-in',
  delay = ""
}) => {
  const animationClass = 
    type === 'fade-up' ? 'animate-fade-in translate-y-0' :
    type === 'slide-in-left' ? 'animate-slide-in-left' : 
    type === 'slide-in-right' ? 'animate-slide-in-right' :
    'animate-fade-in';
  
  const delayClass = delay ? `delay-${delay}` : '';
  
  return (
    <div className={cn("transition-all duration-500", animationClass, delayClass, className)}>
      {children}
    </div>
  );
};

export default SimpleAnimation;
