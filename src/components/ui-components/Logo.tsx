
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ className, size = 'medium' }) => {
  const sizeClasses = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-4xl',
  };
  
  return (
    <div className={cn('font-bold flex items-center gap-2', sizeClasses[size], className)}>
      <div className="h-8 w-8 rounded-lg split-gradient flex items-center justify-center overflow-hidden">
        <div className="text-white font-semibold text-sm">NS</div>
      </div>
      <span>NurseSync</span>
    </div>
  );
};

export default Logo;
