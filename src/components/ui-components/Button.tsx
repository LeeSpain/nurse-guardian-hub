
import React, { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Define button variants, sizes, and other props
interface ButtonBaseProps {
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
  isLoading?: boolean;
}

// Props when rendering as button
type ButtonAsButtonProps = ButtonBaseProps & {
  as?: 'button';
  to?: never;
} & Omit<ComponentPropsWithoutRef<'button'>, keyof ButtonBaseProps>;

// Props when rendering as Link
type ButtonAsLinkProps = ButtonBaseProps & {
  as: typeof Link;
  to: string;
} & Omit<LinkProps, keyof ButtonBaseProps>;

// Props when rendering as custom component
type ButtonAsCustomProps<T extends ElementType> = ButtonBaseProps & {
  as: T;
  to?: never;
} & Omit<ComponentPropsWithoutRef<T>, keyof ButtonBaseProps>;

// Union type for all possible button props
type ButtonProps<T extends ElementType = 'button'> = 
  | ButtonAsButtonProps 
  | ButtonAsLinkProps 
  | ButtonAsCustomProps<T>;

const Button = <T extends ElementType = 'button'>({
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
  isLoading = false,
  as,
  to,
  ...props
}: ButtonProps<T>) => {
  const baseClasses = 'rounded-lg font-medium transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/50',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary/50',
    outline: 'bg-transparent border border-gray-200 hover:bg-gray-50 focus:ring-gray-200/50',
    ghost: 'bg-transparent hover:bg-gray-100 focus:ring-gray-200/50',
    nurse: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500/50',
    client: 'bg-client text-client-foreground hover:bg-client/90 focus:ring-client/50',
  };
  
  const sizeClasses = {
    sm: 'text-sm px-4 py-1.5',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-6 py-3',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  // Button content that's shared between all button types
  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {isLoading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );
  
  // If we are using Link component from react-router
  if (as === Link && to) {
    return (
      <Link
        to={to}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          widthClass,
          disabledClass,
          className
        )}
        {...props as Omit<LinkProps, keyof ButtonBaseProps>}
      >
        {buttonContent}
      </Link>
    );
  }
  
  // For custom components or default button
  const Component = as || 'button';
  
  return (
    <Component
      type={Component === 'button' ? type : undefined}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        widthClass,
        disabledClass,
        className
      )}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {buttonContent}
    </Component>
  );
};

export default Button;
