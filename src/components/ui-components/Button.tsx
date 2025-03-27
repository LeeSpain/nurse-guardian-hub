
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'nurse' | 'client';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  type = 'button',
  fullWidth = false,
}) => {
  const baseClasses = 'rounded-lg font-medium transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/50',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary/50',
    outline: 'bg-transparent border border-gray-200 hover:bg-gray-50 focus:ring-gray-200/50',
    ghost: 'bg-transparent hover:bg-gray-100 focus:ring-gray-200/50',
    nurse: 'bg-nurse text-white hover:bg-nurse/90 focus:ring-nurse/50',
    client: 'bg-client text-client-foreground hover:bg-client/90 focus:ring-client/50',
  };
  
  const sizeClasses = {
    sm: 'text-sm px-4 py-1.5',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-6 py-3',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      type={type}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        widthClass,
        disabledClass,
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
