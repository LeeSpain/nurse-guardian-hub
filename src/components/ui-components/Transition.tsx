
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TransitionProps {
  children: ReactNode;
  className?: string;
  show?: boolean;
  animation?: 
    | 'fade-in' 
    | 'fade-up' 
    | 'fade-down' 
    | 'slide-in-left'
    | 'slide-in-right';
  delay?: 'delay-100' | 'delay-200' | 'delay-300' | 'delay-400' | 'delay-500';
  duration?: 'duration-300' | 'duration-500' | 'duration-700' | 'duration-1000';
}

const Transition: React.FC<TransitionProps> = ({
  children,
  className,
  show = true,
  animation = 'fade-in',
  delay,
  duration = 'duration-500',
}) => {
  const baseClass = "transition-all";
  const animationClass = `animate-${animation}`;
  const delayClass = delay ? `animate-delay-${delay.split('-')[1]}` : '';
  
  return show ? (
    <div className={cn(baseClass, animationClass, delayClass, duration, className)}>
      {children}
    </div>
  ) : null;
};

export default Transition;
