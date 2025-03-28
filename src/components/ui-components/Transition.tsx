
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

// Define the allowed string values explicitly
type DelayValue = 'delay-100' | 'delay-200' | 'delay-300' | 'delay-400' | 'delay-500';
type DurationValue = 'duration-300' | 'duration-500' | 'duration-700' | 'duration-1000';
type AnimationValue = 'fade-in' | 'fade-up' | 'fade-down' | 'slide-in-left' | 'slide-in-right';

interface TransitionProps {
  children: ReactNode;
  className?: string;
  show?: boolean;
  animation?: AnimationValue;
  delay?: DelayValue;
  duration?: DurationValue;
}

const Transition: React.FC<TransitionProps> = ({
  children,
  className = "",
  show = true,
  animation = 'fade-in',
  delay,
  duration = 'duration-500',
}) => {
  // Map animation values to CSS classes
  const animationClasses: Record<AnimationValue, string> = {
    'fade-in': 'animate-fade-in',
    'fade-up': 'animate-fade-up',
    'fade-down': 'animate-fade-down',
    'slide-in-left': 'animate-slide-in-left',
    'slide-in-right': 'animate-slide-in-right'
  };

  if (!show) return null;
  
  return (
    <div 
      className={cn(
        "transition-all",
        animationClasses[animation],
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
