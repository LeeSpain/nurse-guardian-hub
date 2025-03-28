
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

// Define string literal types for animation options
type DelayType = 'delay-100' | 'delay-200' | 'delay-300' | 'delay-400' | 'delay-500';
type DurationType = 'duration-300' | 'duration-500' | 'duration-700' | 'duration-1000';
type AnimationType = 'fade-in' | 'fade-up' | 'fade-down' | 'slide-in-left' | 'slide-in-right';

interface TransitionProps {
  children: ReactNode;
  className?: string;
  show?: boolean;
  animation?: AnimationType;
  delay?: DelayType;
  duration?: DurationType;
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
  
  // Create the animation class based on the animation type
  let animationClass = "";
  if (animation === 'fade-in') animationClass = "animate-fade-in";
  if (animation === 'fade-up') animationClass = "animate-fade-up";
  if (animation === 'fade-down') animationClass = "animate-fade-down";
  if (animation === 'slide-in-left') animationClass = "animate-slide-in-left";
  if (animation === 'slide-in-right') animationClass = "animate-slide-in-right";
  
  return show ? (
    <div className={cn(
      baseClass,
      animationClass,
      delay,
      duration,
      className
    )}>
      {children}
    </div>
  ) : null;
};

export default Transition;
