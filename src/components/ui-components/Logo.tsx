
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
      <div className="relative h-9 w-9 rounded-lg overflow-hidden bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-md">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBoLTQweiIvPjxwYXRoIGQ9Ik0xNiAyNGgxMnYtOEgyNHY0aC04di00aC00djh6TTggMTJoMjR2NEg4eiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="z-10 text-white font-bold text-base tracking-wider">NS</div>
        <div className="absolute top-0 right-0 w-3 h-3 bg-client rounded-full border-2 border-white shadow-sm"></div>
      </div>
      <div className="flex flex-col items-start leading-none">
        <span className="text-gradient-nurse font-extrabold tracking-tight">Nurse</span>
        <span className="text-gradient-client font-extrabold tracking-tight">Sync</span>
      </div>
    </div>
  );
};

export default Logo;
