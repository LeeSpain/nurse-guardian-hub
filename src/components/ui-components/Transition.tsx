
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TransitionProps {
  children: ReactNode;
  className?: string;
  show?: boolean;
  animation?: 'fade-in' | 'fade-up' | 'fade-down' | 'slide-in-left' | 'slide-in-right';
  delay?: string; // Accept any string for delay
  duration?: string; // Accept any string for duration
}

const Transition: React.FC<TransitionProps> = ({
  children,
  className = "",
  show = true,
  animation = 'fade-in',
  delay,
  duration = 'duration-500',
}) => {
  if (!show) return null;
  
  let animationClass = '';
  
  // Map animation types to classes
  switch (animation) {
    case 'fade-in':
      animationClass = 'animate-fade-in';
      break;
    case 'fade-up':
      animationClass = 'animate-fade-up';
      break;
    case 'fade-down':
      animationClass = 'animate-fade-down';
      break;
    case 'slide-in-left':
      animationClass = 'animate-slide-in-left';
      break;
    case 'slide-in-right':
      animationClass = 'animate-slide-in-right';
      break;
    default:
      animationClass = 'animate-fade-in';
  }
  
  return (
    <div 
      className={cn(
        "transition-all",
        animationClass,
        delay,
        duration,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Transition;
