
import React, { useEffect, useRef, useState, memo } from 'react';
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

const Transition: React.FC<TransitionProps> = memo(({
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
    // Use IntersectionObserver only in client-side rendering
    if (typeof window !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting && (!once || !hasAnimated)) {
            // Use requestAnimationFrame for smoother animations
            requestAnimationFrame(() => {
              setIsVisible(true);
              if (once) {
                setHasAnimated(true);
              }
            });
          } else if (!entry.isIntersecting && !once && hasAnimated) {
            setIsVisible(false);
          }
        },
        {
          threshold,
          rootMargin: '0px 0px -50px 0px', // Trigger earlier for a smoother experience
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
    }

    // If SSR or no IntersectionObserver support, show content immediately
    setIsVisible(true);
    return undefined;
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

  // Performance optimization: only use transform and opacity transitions
  return (
    <div
      ref={ref}
      className={cn(
        'transition-transform opacity-100 will-change-transform',
        duration,
        delay,
        isVisible ? '' : animationClasses[animation],
        className
      )}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `transform ${duration === 'duration-300' ? '300ms' : duration === 'duration-500' ? '500ms' : duration === 'duration-700' ? '700ms' : '1000ms'} cubic-bezier(0.16, 1, 0.3, 1), opacity ${duration === 'duration-300' ? '300ms' : duration === 'duration-500' ? '500ms' : duration === 'duration-700' ? '700ms' : '1000ms'} cubic-bezier(0.16, 1, 0.3, 1)`
      }}
    >
      {children}
    </div>
  );
});

Transition.displayName = 'Transition';

export default Transition;
