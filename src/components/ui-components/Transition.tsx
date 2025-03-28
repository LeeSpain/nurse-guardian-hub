
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type AnimationTypes = 
  | 'fade-up' 
  | 'fade-down' 
  | 'fade-left' 
  | 'fade-right' 
  | 'fade' 
  | 'fade-in'
  | 'scale' 
  | 'scale-up' 
  | 'scale-down'
  | 'slide-in-left'
  | 'slide-in-right';

interface TransitionProps {
  children: React.ReactNode;
  className?: string;
  animation?: AnimationTypes;
  delay?: 'delay-0' | 'delay-100' | 'delay-200' | 'delay-300' | 'delay-400' | 'delay-500';
  duration?: 'duration-300' | 'duration-500' | 'duration-700' | 'duration-1000';
  threshold?: number;
  once?: boolean;
}

const Transition: React.FC<TransitionProps> = ({
  children,
  className = '',
  animation = 'fade-up',
  delay = 'delay-0',
  duration = 'duration-500',
  threshold = 0.1,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated)) {
          setIsVisible(true);
          if (once) {
            setHasAnimated(true);
          }
        } else if (!entry.isIntersecting && !once && hasAnimated) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once, hasAnimated]);

  // Animation classes
  const animationClasses = {
    'fade-up': 'translate-y-10 opacity-0',
    'fade-down': 'translate-y-[-10px] opacity-0',
    'fade-left': 'translate-x-[-10px] opacity-0',
    'fade-right': 'translate-x-10 opacity-0',
    'fade': 'opacity-0',
    'fade-in': 'opacity-0',
    'scale': 'scale-95 opacity-0',
    'scale-up': 'scale-95 translate-y-10 opacity-0',
    'scale-down': 'scale-95 translate-y-[-10px] opacity-0',
    'slide-in-left': 'translate-x-[-50px] opacity-0',
    'slide-in-right': 'translate-x-50 opacity-0',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all transform',
        duration,
        delay,
        isVisible ? '' : animationClasses[animation],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Transition;
